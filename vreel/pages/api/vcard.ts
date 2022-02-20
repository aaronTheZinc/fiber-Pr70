import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { GetUserByUsername } from "../../graphql/query"
import GenerateVcard from "../../utils/vcard";
export default async function handler(req: Request, res: Response) {
    const { username } = req.query;

    if (!username) {
        res.json({
            error: {
                message: "must provide an username."
            }
        })
    } else {
        try {
            const user = await GetUserByUsername(username.toString())
            const vcard = GenerateVcard(user)
            res.json({ data: { vcard_content: vcard } })
        } catch (e) {
            res.json(e)
        }
    }
}