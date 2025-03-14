import { server } from "@providers/server";
import {
    createCharacterBodySchema,
    createCharacterResponseSchema,
    findAllCharactersQuerySchema,
    findAllCharactersResponseSchema,
} from "@schemas/characters.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";
import { ClassesService } from "@services/classes.service";
import { ClassesRepository } from "@repositories/classes.repository";
import { UsersRepository } from "@repositories/users.repository";
import { UsersService } from "@services/users.service";
import { CharactersController } from "@controllers/characters.controller";
import { CharactersService } from "@services/characters.service";
import { CharactersRepository } from "@repositories/characters.repository";

const charactersService = new CharactersService(new CharactersRepository());
const classService = new ClassesService(new ClassesRepository());
const usersService = new UsersService(new UsersRepository());
const charactersController = new CharactersController(
    charactersService,
    classService,
    usersService,
);

server.get(
    "/api/characters",
    {
        schema: {
            querystring: findAllCharactersQuerySchema,
            response: {
                200: findAllCharactersResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Characters"],
        },
    },
    async (request, reply) => {
        const res = await charactersController.findAllCharacters(request.query);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.post(
    "/api/characters",
    {
        schema: {
            body: createCharacterBodySchema,
            response: {
                201: createCharacterResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Characters"],
        },
    },
    async (request, reply) => {
        const res = await charactersController.createCharacter(request.body);
        return reply.code(res.statusCode).send(res.body);
    },
);
