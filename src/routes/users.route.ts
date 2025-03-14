import { server } from "@providers/server";
import {
    createUserBodySchema,
    createUserResponseSchema,
    deleteUserParamsSchema,
    findAllUsersQuerySchema,
    findAllUsersResponseSchema,
    findUserByIdParamsSchema,
    findUserByIdResponseSchema,
    updateUserBodySchema,
    updateUserParamsSchema,
    updateUserResponseSchema,
} from "@schemas/users.schema";
import { UsersController } from "@controllers/users.controller";
import { UsersService } from "@services/users.service";
import { UsersRepository } from "@repositories/users.repository";
import { ErrorResponseSchema } from "@schemas/common.schema";

const userService = new UsersService(new UsersRepository());
const userController = new UsersController(userService);

server.get(
    "/api/users",
    {
        schema: {
            querystring: findAllUsersQuerySchema,
            response: { 200: findAllUsersResponseSchema },
            tags: ["Users"],
        },
    },
    async (request, reply) => {
        const res = await userController.findAllUsers(request.query);
        reply.code(res.statusCode).send(res.body);
    },
);

server.post(
    "/api/users",
    {
        schema: {
            body: createUserBodySchema,
            response: { 201: createUserResponseSchema },
            tags: ["Users"],
        },
    },
    async (request, reply) => {
        const res = await userController.createUser(request.body);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.get(
    "/api/users/:id",
    {
        schema: {
            params: findUserByIdParamsSchema,
            response: {
                200: findUserByIdResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Users"],
        },
    },
    async (request, reply) => {
        const res = await userController.findUserById(request.params);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.delete(
    "/api/users/:id",
    {
        schema: {
            params: deleteUserParamsSchema,
            response: { 204: {} },
            tags: ["Users"],
        },
    },
    async (request, reply) => {
        const res = await userController.deleteUserById(request.params);
        return reply.code(res.statusCode).send();
    },
);

server.patch(
    "/api/users/:id",
    {
        schema: {
            params: updateUserParamsSchema,
            body: updateUserBodySchema,
            response: {
                200: updateUserResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Users"],
        },
    },
    async (request, reply) => {
        const res = await userController.updateUserById(
            request.params,
            request.body,
        );
        return reply.code(res.statusCode).send(res.body);
    },
);
