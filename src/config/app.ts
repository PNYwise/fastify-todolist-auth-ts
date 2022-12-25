import dotenv from "dotenv";
dotenv.config()
export default {
     appPort: process.env.APP_PORT,
     appUrl: process.env.APP_URL,
     appName: process.env.APP_NAME
}