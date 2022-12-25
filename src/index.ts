
import prisma from "./config/database";
import logger from "./config/winston";
import bootstrap from "./bootstrap";
import app from "./config/app";



const server = bootstrap();
const appPort = app.appPort;
async function main() {

     /**
      * run server
      */
     server.listen({ port: Number(appPort), host: '0.0.0.0' }, (err, address) => {
          if (err) {
               logger.error(err);
               prisma.$disconnect()
               logger.error("server down");
               process.exit(1);
          }
          logger.info(`Server listening at ${address}`);
     });
}

main();