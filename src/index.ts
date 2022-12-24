import Fastify from "fastify";
import { response } from "./actions/response";
import app from "./config/app";
import logger from "./config/winston";

const appPort = app.appPort;
const server = Fastify();


async function main() {
     server.get('/api', () => {
          return response(200, "pong");
     });
     try {
          await server.listen({ port: Number(appPort), host: '0.0.0.0' });
          logger.info(`Server ready at http://localhost:${Number(appPort)}`);
     } catch (e) {
          logger.error(e);
          process.exit(1);
     }
}

main();