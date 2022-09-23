import { Router, Request, Response } from "express";
import { GetFonts } from "../client/fonts";

const router = Router();

router.get('/font', (req: Request, res: Response) => {
    const { family, limit } = req.query;
    if (!family) res.json({ error: "must provide family" });

    const fonts = GetFonts(family!.toString(), limit as any || 20)
    res.json({ fonts });
})

export default router;