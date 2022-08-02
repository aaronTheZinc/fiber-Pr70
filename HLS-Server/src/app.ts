import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import hls from "hls-server";
import path from "path";
import fs from "fs";
import cors from "cors";
import { transcodeVideo } from "./lib/transcode";
import { findRootDir } from "./utils/dir";
import { authorizeToken } from "./client/auth";

export const rootDir = findRootDir(__dirname);
console.log(rootDir);

const storage = multer.diskStorage({
  destination: `${rootDir}/uploads`,
  filename: async (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.path);
  if (req.path === "/upload") {
    const token = req.headers["token"]?.toString();
    try {
      const { authorized, username } = await authorizeToken(token);
      if (!authorized) res.status(401).json({ err: "user unauthorized" });
      res.locals.username = username;
    } catch (e) {
      res.status(500).json({
        err: "Internal Server Error While Authorizing",
      });
    }
    next();
  } else {
    next();
  }
});

const uploadMedia = multer({ storage }).single("content");
app.use(cors({ origin: "*" }));
app.use(express.static("dist"));

app.get("/uploader", (req: Request, res: Response) => {
  res.sendFile(path.join(rootDir + "/dist/index.html"));
});

app.get("/view", (req: Request, res: Response) => {
  res.sendFile(path.join(`${rootDir}/client.html`));
});

app.post("/upload", uploadMedia, (req: Request, res: Response) => {
  console.log(res.locals);
  if (req.file) {
    const fileType = req.body.type;
    const fileName = req.file.filename;

    const isVideo = fileType.includes("video");
    console.log(isVideo === "video/mp4");
    if (isVideo) {
      const dir = `${rootDir}/uploads/${fileName}`;
      try {
        transcodeVideo({
          fileDir: dir,
          username: "aaron",
          cb: (response) => {
            console.log("[transcoding completed]", response);
            console.log(response);
            res.json(response);
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

const server = app.listen(9000, () => console.log("[hls server started]"));

new hls(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split(".").pop();

      if (ext !== "m3u8" && ext !== "ts") {
        return cb(null, true);
      }

      fs.access(rootDir + req.url, fs.constants.F_OK, function (err) {
        if (err) {
          console.log("File not exist");
          return cb(null, false);
        }
        cb(null, true);
      });
    },
    getManifestStream: (req, cb) => {
      const stream = fs.createReadStream(rootDir + req.url);
      cb(null, stream);
    },
    getSegmentStream: (req, cb) => {
      const stream = fs.createReadStream(rootDir + req.url);
      cb(null, stream);
    },
  },
});
