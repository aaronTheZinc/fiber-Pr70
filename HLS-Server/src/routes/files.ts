import { Response, Request, Router } from "express"
import { deleteFile, getUserFiles, updateDisplayName } from "../entity/UserFile";

const router = Router();

type FileEditResponseType = {
    file_id: string;
    succeded: boolean;
    error: string;
}

router.get('/', async (req: Request, res: Response) => {

});

router.get('/files', async (req: Request, res: Response) => {
    const { id } = req.query;
    if (!id) { res.json({ err: "must provide id" }); return }
    const files = await getUserFiles(id?.toString());

    res.json({ files });
    return
})

router.post('/filename/edit', async (req: Request, res: Response) => {
    const { user_id, file_id, new_file_name } = req.body;
    updateDisplayName(file_id, new_file_name, user_id)
        .then((() => res.json({ file_id, succeded: true } as FileEditResponseType)))
        .catch(() => res.json({ file_id, succeded: false, error: "failed to edit" } as FileEditResponseType))
});


router.post('/delete', async (req: Request, res: Response) => {
    const { file_id, user_id } = req.body;

    deleteFile(file_id, user_id)
        .then((data => res.json({ file_id, succeded: true } as FileEditResponseType)))
        .catch(err => res.json({ file_id, succeded: false, error: "failed to edit" } as FileEditResponseType))
})

export default router;