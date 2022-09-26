import { Entity, PrimaryGeneratedColumn, Column, getConnection } from "typeorm"
import { v4 } from "uuid";
import path from "path";
import { BASE_URL } from "../";


@Entity()
export class UserFile {

    @PrimaryGeneratedColumn("uuid")
    fileId: string;

    @Column({ nullable: true })
    fileSize: number;

    @Column({ nullable: true })
    author: string;

    @Column({ nullable: true })
    fileName: string;

    @Column({ nullable: true })
    fileType: string;

    @Column({ nullable: true })
    username: string

    @Column({ nullable: true })
    displayName: string

}

// import "reflect-metadata"



export const saveFile = async ({ fileSize, author, fileName, fileType, id, username }: any) => {
    const connection = getConnection();
    const filesRepository = connection.getRepository(UserFile);

    const file = new UserFile();
    file.fileId = v4();
    file.author = author;
    file.fileName = fileName;
    file.fileSize = fileSize
    file.fileType = fileType;
    file.username = username;
    filesRepository.save(file);
    // return await AppDataSource.manager.save(file)

}

export const updateDisplayName = async (fileId: string, newName: string, author: string) => {
    const connection = getConnection();
    const filesRepository = connection.getRepository(UserFile)

    return filesRepository.update({ fileId }, { displayName: newName })

}

export const deleteFile = async (fileId: string, author: string) => {
    const connection = getConnection();
    const filesRepository = connection.getRepository(UserFile)

    return filesRepository.delete({ fileId })

}

export const getUserFiles = async (author: string) => {
    const connection = getConnection();
    const filesRepository = connection.getRepository(UserFile)
    const result = await filesRepository.find({
        where: { author }
    })

    const files = result.map((file => {
        let uri;
        const baseFileName = path.parse(file.fileName).name;
        const isVideo = file.fileType.includes("video");
        if (isVideo) {
            uri = `${BASE_URL}/hls/${file.username}/${baseFileName}/media.m3u8`
        } else {
            uri = `${BASE_URL}/uploads/${file.fileName}`
        }
        const content = {
            id: file.fileId,
            file_name: file.displayName || file.fileName,
            file_type: file.fileType,
            file_size: file.fileSize,
            uri
        }
        return content;
    }))

    return files;

}