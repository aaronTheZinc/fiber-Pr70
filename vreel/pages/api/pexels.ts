import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { createClient } from "pexels";

export default async function handler(req: Request, res: Response) {
   try {
    const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

    const videos = await client.videos.search({ query: 'waterfalls', per_page: 4 });

    res.json(videos);
  } catch (e) {
    res.json(e);
  }
}
