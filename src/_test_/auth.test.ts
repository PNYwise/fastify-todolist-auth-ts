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
let token: string;

test("auth test", async () => {
     test("register", async () => {
          test("success register", async (t) => {
               const name = faker.name.firstName();
               const email = faker.internet.email();
               const password = faker.internet.password();

               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
                    prisma.user.deleteMany({});
               });

               const response = await fastify.inject({
                    method: "POST",
                    url: "/api/register",
                    payload: {
                         email,
                         password,
                         name,
                    },
               });
               t.equal(response.statusCode, 201);
          })
          test("failed register", async (t) => {
               const name = faker.name.firstName();
               const email = faker.internet.email();

               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
               });

               const response = await fastify.inject({
                    method: "POST",
                    url: "/api/register",
                    payload: {
                         email,
                         password: "failed",
                         name,
                    },
               });
               t.equal(response.statusCode, 400);
          })
     })
     test("login", async () => {
          test("success login", async (t) => {
               const name = faker.name.firstName();
               const email = faker.internet.email();
               const password = faker.internet.password();

               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
                    prisma.user.deleteMany({})
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
               token = dataResponse.data.accessToken;

               const verified = fastify.jwt.verify<UserType & { iat: number }>(token);
               t.equal(verified.email, email);
               t.equal(verified.name, name);
               t.equal(response.statusCode, 200);
          })
          test("filed login", async (t) => {

               const fastify = buildServer();
               t.teardown(async () => {
                    fastify.close();
               });

               const response = await fastify.inject({
                    method: "POST",
                    url: "/api/login",
                    payload: {
                         email: "faild@gmail.com",
                         password: "faild12345"
                    },
               });

               t.equal(response.statusCode, 401);
          })
     })
})