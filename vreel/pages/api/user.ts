import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { getUserByUsername } from "../../graphql/query";

export default async function handler(req: Request, res: Response) {
  const { username } = req.query;
  console.log("query", username);

  if (!username)
    return res.json({
      error: {
        message: "must provide an username.",
      },
    });

  try {
    const user = await getUserByUsername(username.toString());

    res.json({ user });
  } catch (e) {
    res.json(e);
  }
}
