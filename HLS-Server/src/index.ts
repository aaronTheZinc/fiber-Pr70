
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import { transcodeVideo } from "./lib/transcode";
import { findRootDir } from "./utils/dir";
import { authorizeToken } from "./client/auth";
import { v4 as uuidV4 } from "uuid"
import * as dotenv from "dotenv";
import { AppDataSource } from "./connection";
import { raw } from "body-parser";
import FilesDataRouter from "./routes/files"
dotenv.config();

export const rootDir = findRootDir(__dirname);
export const BASE_URL = process.env.BASE_URL;
export const GoogleApiKey = process.env.GOOGLE_API_KEY;
export const ServerEndpoint = process.env.SERVER_ENDPOINT;

import FontsRouter from "./routes/fonts"
import { v4 } from "uuid"
import { saveFile } from "./entity/UserFile";
import { authMiddleware } from "./middleware";
import { createConnection } from "typeorm";
import { UserFile } from "./entity/UserFile";
import LoadFonts from "./client/fonts";
const storage = multer.diskStorage({
    destination: `${rootDir}/uploads`,
    filename: async (req, file, cb) => {
        console.log("hit storage")
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

console.log("server end point =>", ServerEndpoint);

const app = express();

async function Server() {
    await LoadFonts();
    await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5441,
        username: "gorm",
        password: "gorm",
        database: "gorm",
        synchronize: true,
        logging: false,
        entities: [UserFile],
    });
    app.use(express.json())
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.use(express.static(rootDir));
    app.use('/data', FilesDataRouter)
    app.use("/", authMiddleware)
    app.use('/fonts', FontsRouter)
    const uploadMedia = multer({ storage }).single("content");
    app.use(cors({ origin: "*", credentials: true }));
    app.use(express.static("dist"));

    app.get("/uploader", (req: Request, res: Response) => {
        res.sendFile(path.join(rootDir + "/dist/index.html"));
    });

    app.get("/view", (req: Request, res: Response) => {
        res.sendFile(path.join(`${rootDir}/client.html`));
    });
    app.options('*', cors<Request>())
    app.post("/upload", uploadMedia, (req: Request, res: Response) => {
        if (req.file) {
            const fileType = req.body.type;
            const fileName = req.file.filename;
            const fileExtension = path.extname(fileName);
            console.log("locals ->", res.locals)
            const { id, username } = res.locals
            const isVideo = fileType.includes("video");
            let HEADERS_SENT = false;
            console.log(isVideo === "video/mp4");
            if (isVideo) {
                const dir = `${rootDir}/uploads/${fileName}`;
                //stop uppy from timing out (25 seconds)
                const responseTimeout = setTimeout(() => {
                    res.json({
                        msg: "[currently transcoding]",
                    });
                    HEADERS_SENT = true;
                }, 25000);
                try {
                    transcodeVideo({
                        fileDir: dir,
                        username: username,
                        cb: async (response) => {
                            clearTimeout(responseTimeout);
                            console.log("[transcoding completed]", response);
                            console.log(response);

                            await saveFile({
                                fileSize: req.file?.size || 0,
                                author: id,
                                fileName: `${response.rootFolderName}${fileExtension}`,
                                fileType,
                                username
                            }).then(() => {
                                if (!HEADERS_SENT) {
                                    res.json(response);
                                }
                                return
                            })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({ err: "failed" })
                                })
                        },
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                saveFile({
                    fileSize: req.file?.size || 0,
                    author: id,
                    fileName,
                    fileType,
                    username
                }).then(() => res.json({
                    msg: "image successfully uploaded"
                }))
                    .catch((err) => res.send(err))

            }
        }
    });
    app.listen(9000, () => console.log("[content server has started]"))

}

Server();
