# About this application


## Technology that I use
* [Fastify](https://www.fastify.io/) - Web server
* [Prisma](https://www.prisma.io/) - Database ORM
* [Zod](https://github.com/colinhacks/zod) - Request and response validation
* [TypeScript](https://www.typescriptlang.org/) - Types & other cool stuff

## Features 
* [Authentication](#auth)
* [Register](#register)
* [Login](#login)
* [User](#user)
* [Todo](#todo)
* [Todos](#todos)
* [Create a todo](#createtodo)
* [Update a todo](#updatetodo)
* [Delete a todo](#deletetodo)
* Validation

# API SPEC
## Ping 
**GET** *http://localhost:3000/api*

**Response** 200
```json
{
     "message": "string", //pong
     "code": "number",
}
```

## **Auth**
-----
## register 
**POST** *http://localhost:3000/api/register*

**Request**
```json
{
     "email":"string",
     "name": "string",
     "password": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
}
```


## login
**POST** *http://localhost:3000/api/login*

**Request**
```json
{
     "email":"string",
     "password": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "token":"string"
     }
}
```
## **USER**
----------
## User
**GET** *http://localhost:3000/api/user*

**RequestHeader**
* authentication : *token*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "id": "string",
          "email": "string",
          "name": "string",
          "created_at":"date",
          "updated_at":"date"
     }
}
```
## **TODO**
----------

## Todo
**GET** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* authentication : *token*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "id": "string",
          "title": "string",
          "desc": "string",
          "created_at":"date",
          "updated_at":"date"
     }
}
```
## Todos
**GET** *http://localhost:3000/api/todos*

**RequestHeader**
* authentication : *token*

**Query"String"s**
* search : *title*
* sort : *asc* || *desc*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" :[
          {
               "id": "string",
               "title": "string",
               "desc": "string",
               "created_at":"date",
               "updated_at":"date"
          },
          {
               "id": "string",
               "title": "string",
               "desc": "string",
               "created_at":"date",
               "updated_at":"date"
          }
     ] 
}
```
## CreateTodo
**POST** *http://localhost:3000/api/todos*

**RequestHeader**
* authentication : *token*

**Request**
```json
{
     "title":"string",
     "desc": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "title": "string",
          "desc": "string",
     }
}
```
## UpdateTodo
**PUT** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* authentication : *token*

**Request**
```json
{
     "title":"string",
     "desc": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "title": "string",
          "desc": "string",
     }
}
```
## DeleteTodo
**DELETE** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* authentication : *token*
**Response** 200
```json
{
     "message": "string",
     "code": "number",
}
```


## **ERRORS**
----------

**Response** 400
```json
{
     "message": "string",
     "code": "number",
     "error" : [
          {
               "code": "string",
               "expected": "string",
               "received": "string",
               "path": [],
               "message": "string",
          },
          {
               "code": "string",
               "keys": [],
               "path": [],
               "message": "string",
          },
          {
               "code": "string",
               "minimum": "number",
               "type": "string",
               "inclusive": "boolean",
               "path": [],
               "message": "string",
          },
     ]
}
```
**Response** 401
```json
{
     "message": "string",
     "code": "number",
}
```
**Response** 500
```json
{
     "message": "string",
     "code": "number",
}
```
