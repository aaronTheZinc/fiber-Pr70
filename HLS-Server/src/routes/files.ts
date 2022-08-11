import { Response, Request, Router } from "express"
import { deleteFile, updateFileName } from "../db/files";

const router = Router();

type FileEditResponseType = {
    file_id: string;
    succeded: boolean;
    error: string;
}

router.get('/', async (req: Request, res: Response) => {

});

router.post('filename/edit', async (req: Request, res: Response) => {
    const { user_id, file_id, new_file_name } = req.body;
    updateFileName(file_id, new_file_name, user_id)
        .then((data => res.json({ file_id, succeded: true } as FileEditResponseType)))
        .catch(err => res.json({ file_id, succeded: false, error: "failed to edit" } as FileEditResponseType))
});


router.post('/delete', async (req: Request, res: Response) => {
    const { file_id, user_id } = req.body;

    deleteFile(file_id, user_id)
        .then((data => res.json({ file_id, succeded: true } as FileEditResponseType)))
        .catch(err => res.json({ file_id, succeded: false, error: "failed to edit" } as FileEditResponseType))
})

export default router;