import { server } from "@providers/server";
import {
    createUserBodySchema,
    createUserResponseSchema,
    findAllUsersQuerySchema,
    findAllUsersResponseSchema,
} from "@schemas/user.schema";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repository/user.repository";

const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

server.get(
    "/api/users",
    {
        schema: {
            querystring: findAllUsersQuerySchema,
            response: { 200: findAllUsersResponseSchema },
            tags: ["users"],
        },
    },
    async (request, reply) => {
        const users = await userController.findAllUsers(request.query);
        reply.code(200).send(users);
    },
);

server.post(
    "/api/users",
    {
        schema: {
            body: createUserBodySchema,
            response: { 200: createUserResponseSchema },
            tags: ["users"],
        },
    },
    async (request, reply) => {
        const user = await userController.createUser(request.body);
        reply.code(200).send(user);
    },
);
