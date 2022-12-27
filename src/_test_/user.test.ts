import { test } from "tap";
import buildServer from "../bootstrap";
import { faker } from "@faker-js/faker";
import prisma from "../config/database";
import { UserType } from "@fastify/jwt";



interface ResponseData {
     message: string,
     code: number,
     data: Data
}
interface Data {
     accessToken: string

}

test("user test", async () => {
     test("user", async () => {
          test("success get user", async (t) => {
               const name = faker.name.firstName();
               const email = faker.internet.email();
               const password = faker.internet.password();

               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
                    prisma.user.deleteMany({});
               });

               await fastify.inject({
                    method: "POST",
                    url: "/api/register",
                    payload: {
                         email,
                         password,
                         name,
                    },
               });
               const response = await fastify.inject({
                    method: "POST",
                    url: "/api/login",
                    payload: {
                         email,
                         password
                    },
               });
               const dataResponse: ResponseData = JSON.parse(response.body);
               const token = dataResponse.data.accessToken;

               const user = await fastify.inject({
                    method: "GET",
                    url: "/api/user",
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               });
               t.equal(user.statusCode, 200);
          })
          test("error get user", async (t) => {
               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
                    prisma.user.deleteMany({});
               });

               const user = await fastify.inject({
                    method: "GET",
                    url: "/api/user",
               });
               t.equal(user.statusCode, 422);
          })
     })
})