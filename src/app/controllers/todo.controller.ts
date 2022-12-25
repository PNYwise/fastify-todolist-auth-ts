import { FastifyReply, FastifyRequest } from "fastify";
import error from "../../actions/errorValidation";
import { response, responseData, responseError } from "../../actions/response";
import logger from "../../config/winston";
import { TodoInput, TodoParam, todoQueryStringInput, UpdateTodoInput } from "../schemas/todo.schema";
import { create, findAll, findId, update, destroy } from "../services/todo.service";




export async function createTodo(request: FastifyRequest<{ Body: TodoInput }>, rep: FastifyReply): Promise<void> {
     if (request.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(request.validationError.validation)));
     }
     try {
          const todo = await create({ ...request.body, user_id: "ksjdfksdbf" });
          rep.code(201).send(responseData(201, "todo created", todo));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}
export async function updateTodo(request: FastifyRequest<{ Params: TodoParam, Body: UpdateTodoInput }>, rep: FastifyReply): Promise<void> {
     if (request.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(request.validationError.validation)));
     }
     try {
          const data = await findId(request.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${request.params.id} not found`));
          }
          const todo = await update(request.params, request.body);
          rep.code(200).send(responseData(200, "todo updated", todo));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}
export async function deleteTodo(request: FastifyRequest<{ Params: TodoParam }>, rep: FastifyReply): Promise<void> {
     if (request.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(request.validationError.validation)));
     }
     try {
          const data = await findId(request.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${request.params.id} not found`));
          }
          await destroy(request.params);
          rep.code(200).send(response(200, "todo deleted"));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}

export async function todoWithId(request: FastifyRequest<{ Params: TodoParam }>, rep: FastifyReply): Promise<void> {
     try {
          const data = await findId(request.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${request.params.id} not found`));
          }
          rep.code(200).send(responseData(200, "data found", data));
     } catch (error) {
          logger.error(error);
          rep.code(500).send(response(500, "internal server error"));

     }

}
export async function todos(request: FastifyRequest<{ Querystring: todoQueryStringInput }>, rep: FastifyReply): Promise<void> {
     try {
          const data = await findAll(request.query);
          rep.code(200).send(responseData(200, "success", data));
     } catch (error) {
          logger.error(error);
     }

}