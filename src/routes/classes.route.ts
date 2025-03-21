import { FastifyTypeBox } from "@providers/server";

import { ClassesController } from "@controllers/classes.controller";
import {
    createClassBodySchema,
    createClassResponseSchema,
    deleteClassParamsSchema,
    findAllClassesQuerySchema,
    findAllClassesResponseSchema,
    findClassByIdParamsSchema,
    findClassByIdResponse,
    updateClassBodySchema,
    updateClassParamsSchema,
    updateClassResponseSchema,
} from "@schemas/classes.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";

export const ClassesRoutes = (
    server: FastifyTypeBox,
    classController: ClassesController,
) => {
    server.get(
        "/api/classes",
        {
            schema: {
                querystring: findAllClassesQuerySchema,
                response: { 200: findAllClassesResponseSchema },
                tags: ["Classes"],
            },
        },
        async (request, reply) => {
            const res = await classController.findAllClasses(request.query);
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.post(
        "/api/classes",
        {
            schema: {
                body: createClassBodySchema,
                response: { 201: createClassResponseSchema },
                tags: ["Classes"],
            },
        },
        async (request, reply) => {
            const res = await classController.createClass(request.body);
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.get(
        "/api/classes/:id",
        {
            schema: {
                params: findClassByIdParamsSchema,
                response: {
                    200: findClassByIdResponse,
                    404: ErrorResponseSchema,
                },
                tags: ["Classes"],
            },
        },
        async (request, reply) => {
            const res = await classController.findClassById(request.params);
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.delete(
        "/api/classes/:id",
        {
            schema: {
                params: deleteClassParamsSchema,
                response: { 204: {}, 404: ErrorResponseSchema },
                tags: ["Classes"],
            },
        },
        async (request, reply) => {
            const res = await classController.deleteClassById(request.params);
            return reply.code(res.statusCode).send(res.body);
        },
    );

    server.patch(
        "/api/classes/:id",
        {
            schema: {
                params: updateClassParamsSchema,
                body: updateClassBodySchema,
                response: {
                    200: updateClassResponseSchema,
                    404: ErrorResponseSchema,
                },
                tags: ["Classes"],
            },
        },
        async (request, reply) => {
            const res = await classController.updateClassById(
                request.params,
                request.body,
            );
            return reply.code(res.statusCode).send(res.body);
        },
    );
};
