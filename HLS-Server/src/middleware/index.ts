import { Request, Response, NextFunction } from "express"
import { authorizeToken } from "../client/auth";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path);
    if (req.path === "/upload") {
        const token = req.query["token"]?.toString();
        if (!token) {
            console.log("no token provided")
            res.status(401).json({
                err: "token is required"
            })
            return
        }
        try {
            const { is_authorized, username, id } = await authorizeToken(token!);
            if (!is_authorized) {
                res.status(401).json({ err: "user unauthorized" });
                return;
            } else {
                res.locals.username = username;
                res.locals.id = id;
                next();
            }
        } catch (e) {
            res.status(500).json({
                err: "Internal Server Error While Authorizing",
            });
        }
    } else {
        next();
    }

}