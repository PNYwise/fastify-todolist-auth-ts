import { TodoInput, TodoParam, todoQueryStringInput, TodoUpdateInput } from "../schemas/todo.schema";
import prisma from "../../config/database";
import { Prisma, Todo } from "@prisma/client";

export async function create(data: TodoInput & { user_id: "ksjdfksdbf" }): Promise<Todo> {
     return await prisma.todo.create({ data });
}

export async function update(param: TodoParam, data: TodoUpdateInput): Promise<Todo> {

     return await prisma.todo.update({ where: param, data });
}

export async function destroy(param: TodoParam): Promise<Todo> {
     return await prisma.todo.delete({ where: param });
}

export async function findId(param: TodoParam): Promise<Todo | null> {
     const todo: Todo | null = await prisma.todo.findUnique({ where: { ...param } });
     return todo
}

export async function findAll(query: todoQueryStringInput): Promise<Todo[] | []> {
     const { search, skip, take, sort } = query
     const searchInput: Prisma.TodoWhereInput = search ? { title: { search: `%${search}%` } } : {}
     const data = await prisma.todo.findMany({
          where: { ...searchInput },
          take: Number(take) || undefined,
          skip: Number(skip) || undefined,
          orderBy: { updated_at: sort }
     });
     return (data) ? data : []
}