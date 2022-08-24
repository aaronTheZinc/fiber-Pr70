import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserFile } from "./entity/UserFile"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5441,
    username: "gorm",
    password: "gorm",
    database: "gorm",
    synchronize: true,
    logging: false,
    entities: [UserFile],
    migrations: [],
    subscribers: [],
})
