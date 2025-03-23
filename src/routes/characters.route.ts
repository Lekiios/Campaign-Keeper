import { FastifyTypeBox } from "@providers/server";
import {
    createCharacterBodySchema,
    createCharacterResponseSchema,
    deleteCharacterParamsSchema,
    findAllCharactersQuerySchema,
    findAllCharactersResponseSchema,
    findCharacterByIdParamsSchema,
    findCharacterByIdResponseSchema,
    updateCharacterBodySchema,
    updateCharacterParamsSchema,
    updateCharacterResponseSchema,
} from "@schemas/characters.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";
import { CharactersController } from "@controllers/characters.controller";

export const CharactersRoutes = (
    server: FastifyTypeBox,
    charactersController: CharactersController,
) => {
    server.get(
        "/api/characters",
        {
            schema: {
                querystring: findAllCharactersQuerySchema,
                response: {
                    200: findAllCharactersResponseSchema,
                    404: ErrorResponseSchema,
                    500: ErrorResponseSchema,
                },
                tags: ["Characters"],
            },
        },
        async (request, reply) => {
            const res = await charactersController.findAllCharacters(
                request.query,
            );
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
                    500: ErrorResponseSchema,
                },
                tags: ["Characters"],
            },
        },
        async (request, reply) => {
            const res = await charactersController.createCharacter(
                request.body,
            );
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.get(
        "/api/characters/:id",
        {
            schema: {
                params: findCharacterByIdParamsSchema,
                response: {
                    200: findCharacterByIdResponseSchema,
                    404: ErrorResponseSchema,
                    500: ErrorResponseSchema,
                },
                tags: ["Characters"],
            },
        },
        async (request, reply) => {
            const res = await charactersController.findCharacterById(
                request.params,
            );
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.delete(
        "/api/characters/:id",
        {
            schema: {
                params: deleteCharacterParamsSchema,
                response: { 204: {}, 404: ErrorResponseSchema },
                tags: ["Characters"],
            },
        },
        async (request, reply) => {
            const res = await charactersController.deleteCharacter(
                request.params,
            );
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.patch(
        "/api/characters/:id",
        {
            schema: {
                params: updateCharacterParamsSchema,
                body: updateCharacterBodySchema,
                response: {
                    200: updateCharacterResponseSchema,
                    404: ErrorResponseSchema,
                    500: ErrorResponseSchema,
                },
                tags: ["Characters"],
            },
        },
        async (request, reply) => {
            const res = await charactersController.updateCharacter(
                request.params,
                request.body,
            );
            return reply.code(res.statusCode).send(res.body);
        },
    );
};
