import { SpellsService } from "@services/spells.service";
import { SpellsRepository } from "@repositories/spells.repository";
import { SpellsController } from "@controllers/spells.controller";
import { server } from "@providers/server";
import {
    createSpellBodySchema,
    createSpellResponseSchema,
    deleteSpellParamsSchema,
    findAllSpellsQuerySchema,
    findAllSpellsResponseSchema,
    findSpellByIdParamsSchema,
    findSpellByIdResponseSchema,
    updateSpellBodySchema,
    updateSpellParamsSchema,
    updateSpellResponseSchema,
} from "@schemas/spells.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";

const spellsService = new SpellsService(new SpellsRepository());
const spellsController = new SpellsController(spellsService);

server.get(
    "/api/spells",
    {
        schema: {
            querystring: findAllSpellsQuerySchema,
            response: {
                200: findAllSpellsResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
            tags: ["Spells"],
        },
    },
    async (request, reply) => {
        const res = await spellsController.findAllSpells(request.query);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.post(
    "/api/spells",
    {
        schema: {
            body: createSpellBodySchema,
            response: {
                201: createSpellResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Spells"],
        },
    },
    async (request, reply) => {
        const res = await spellsController.createSpell(request.body);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.get(
    "/api/spells/:id",
    {
        schema: {
            params: findSpellByIdParamsSchema,
            response: {
                200: findSpellByIdResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
            tags: ["Spells"],
        },
    },
    async (request, reply) => {
        const res = await spellsController.findSpellById(request.params);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.delete(
    "/api/spells/:id",
    {
        schema: {
            params: deleteSpellParamsSchema,
            response: {
                204: {},
                404: ErrorResponseSchema,
            },
            tags: ["Spells"],
        },
    },
    async (request, reply) => {
        const res = await spellsController.deleteSpellById(request.params);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.patch(
    "/api/spells/:id",
    {
        schema: {
            params: updateSpellParamsSchema,
            body: updateSpellBodySchema,
            response: {
                200: updateSpellResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
            tags: ["Spells"],
        },
    },
    async (request, reply) => {
        const res = await spellsController.updateSpellById(
            request.params,
            request.body,
        );
        return reply.code(res.statusCode).send(res.body);
    },
);
