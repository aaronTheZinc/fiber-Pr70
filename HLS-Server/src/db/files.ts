import { BaseEntity, Column, PrimaryColumn } from "typeorm"
import { AppDataSource } from ".";

export class File extends BaseEntity {
    @PrimaryColumn("string")
    fileId: string;

    @Column("int")
    fileSize: number;

    @Column()
    author: string;

    @Column()
    fileName: string;

    @Column()
    fileType: string;
}



export const saveFile = async (file: File) => {
    const fileRepository = AppDataSource.getRepository(File)
    return await fileRepository.save(file)
}

export const updateFileName = async (fileId: string, newName: string, author: string) => {
    const fileRepository = AppDataSource.getRepository(File)
    const file = await fileRepository.findOneBy({ fileId, author });
    if (file) {
        file.fileName = newName;
        return await fileRepository.save(file);
    }
    throw new Error("failed to update")

}

export const deleteFile = async (fileId: string, author: string) => {
    const fileRepository = AppDataSource.getRepository(File)
    return await fileRepository.delete({ fileId, author })
}