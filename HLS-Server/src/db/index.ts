import { DataSource } from "typeorm"
import { File } from "./files"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5441,
    username: "gorm",
    password: "gorm",
    database: "gorm",
    entities: [File],
    synchronize: true,
    logging: false,
})