import { FastifyInstance } from "fastify";
import { user } from "../app/controllers/user.controller";
import { $ref } from "../app/schemas/user.schema";


async function userRoutes(app: FastifyInstance) {

     app.get("/", {
          preHandler: [app.authenticate]
     }, user);
}

export default userRoutes;