import Fastify from "fastify";
import { response } from "./actions/response";
import { todoSchemas } from "./app/schemas/todo.schema";

import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";
import userRoutes from "./routes/user.route";
function bootstrap() {
     const app = Fastify({ logger: false });


     /**
      * schemas
     */
     for (const schema of [...todoSchemas]) {
          app.addSchema(schema);
     }


     /**
      * routes
     */
     app.get('/api', () => {
          return response(200, "pong");
     });
     app.register(authRoutes, { prefix: "api/" });
     app.register(userRoutes, { prefix: "api/user" });
     app.register(todoRoutes, { prefix: "api/todos" });
     return app;
}

export default bootstrap;