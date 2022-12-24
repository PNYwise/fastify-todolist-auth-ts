import dotenv from "dotenv";
dotenv.config()
export default {
     appPort: process.env.APP_PORT,
     appName: process.env.APP_NAME
}