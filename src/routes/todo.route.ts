import { FastifyInstance } from "fastify";
import { createTodo, todoWithId, todos, updateTodo, deleteTodo } from "../app/controllers/todo.controller";
import { $ref } from "../app/schemas/todo.schema";

async function todoRoutes(app: FastifyInstance) {

     // create todo
     app.post('/', {
          // preValidation
          schema: {
               body: $ref("todoSchema"),
               response: { 201: $ref("todoResponseSchema"), }
          },
          attachValidation: true
     }, createTodo);

     // get todo
     app.get('/:id', {
          schema: {
               params: $ref("todoParamSchema"),
               response: { 200: $ref("todoResponseSchema") }
          },
          attachValidation: true
     }, todoWithId);

     // get todos with query string
     app.get('/', {
          schema: {
               response: { 200: $ref("todosResponseSchema") }
          }
     }, todos)

     // update todo
     app.put('/:id', {
          schema: {
               params: $ref("todoParamSchema"),
               body: $ref("todoUpdateSchema"),
               response: { 200: $ref("todoResponseSchema") }
          },
          attachValidation: true
     }, updateTodo);


     // delete todo
     app.delete('/:id', {
          schema: {
               params: $ref("todoParamSchema"),
               response: { 200: $ref("responseSchema") }
          },
          attachValidation: true
     }, deleteTodo);
}

export default todoRoutes;