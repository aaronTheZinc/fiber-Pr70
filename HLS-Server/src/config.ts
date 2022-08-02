import * as dotenv from "dotenv";
dotenv.config();

export const ServerEndpoint = process.env.SERVER_ENDPOINT;
console.log(ServerEndpoint);
export const PORT = process.env.PORT;
