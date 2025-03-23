import { server } from "@providers/server";

import { ErrorResponseSchema } from "@schemas/common.schema";
import { SessionsService } from "@services/sessions.service";
import { SessionsController } from "@controllers/sessions.controller";
import { SessionsRepository } from "@repositories/sessions.repository";
import {
    createSessionBodySchema,
    createSessionResponseSchema,
    deleteSessionParamsSchema,
    findAllSessionsQuerySchema,
    findAllSessionsResponseSchema,
    findSessionByIdParamsSchema,
    findSessionByIdResponse,
    updateSessionBodySchema,
    updateSessionParamsSchema,
    updateSessionResponseSchema,
} from "@schemas/sessions.schema";

const sessionsService = new SessionsService(new SessionsRepository());
const sessionsController = new SessionsController(sessionsService);

server.get(
    "/api/sessions",
    {
        schema: {
            querystring: findAllSessionsQuerySchema,
            response: { 200: findAllSessionsResponseSchema },
            tags: ["Sessions"],
        },
    },
    async (request, reply) => {
        const res = await sessionsController.findAllSessions(request.query);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.post(
    "/api/sessions",
    {
        schema: {
            body: createSessionBodySchema,
            response: { 201: createSessionResponseSchema },
            tags: ["Sessions"],
        },
    },
    async (request, reply) => {
        const res = await sessionsController.createSession(request.body);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.get(
    "/api/sessions/:id",
    {
        schema: {
            params: findSessionByIdParamsSchema,
            response: {
                200: findSessionByIdResponse,
                404: ErrorResponseSchema,
            },
            tags: ["Sessions"],
        },
    },
    async (request, reply) => {
        const res = await sessionsController.findSessionById(request.params);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.delete(
    "/api/sessions/:id",
    {
        schema: {
            params: deleteSessionParamsSchema,
            response: { 204: {}, 404: ErrorResponseSchema },
            tags: ["Sessions"],
        },
    },
    async (request, reply) => {
        const res = await sessionsController.deleteSessionById(request.params);
        return reply.code(res.statusCode).send(res.body);
    },
);

server.patch(
    "/api/sessions/:id",
    {
        schema: {
            params: updateSessionParamsSchema,
            body: updateSessionBodySchema,
            response: {
                200: updateSessionResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Sessions"],
        },
    },
    async (request, reply) => {
        const res = await sessionsController.updateSessionById(
            request.params,
            request.body,
        );
        return reply.code(res.statusCode).send(res.body);
    },
);
