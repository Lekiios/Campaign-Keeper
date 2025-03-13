import { server } from "@providers/server";

import { ItemsService } from "@services/items.service";
import { ItemsRepository } from "@repositories/items.repository";
import { ItemsController } from "@controllers/items.controller";
import {
    createItemBodySchema,
    createItemResponseSchema,
    findItemByIdParamsSchema,
    findItemByIdResponseSchema,
    findAllItemsQuerySchema,
    findAllItemsResponseSchema,
} from "@schemas/items.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";

const itemsRepository = new ItemsRepository();
const itemsService = new ItemsService(itemsRepository);
const itemsController = new ItemsController(itemsService);

server.post(
    "/api/items",
    {
        schema: {
            body: createItemBodySchema,
            response: { 201: createItemResponseSchema },
            tags: ["Items"],
        },
    },
    async (request, reply) => {
        const response = await itemsController.createItem(request.body);
        return reply.status(response.statusCode).send(response.body);
    },
);

server.get(
    "/api/items/:id",
    {
        schema: {
            params: findItemByIdParamsSchema,
            response: {
                200: findItemByIdResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Items"],
        },
    },
    async (request, reply) => {
        const response = await itemsController.findItemById(request.params);
        return reply.status(response.statusCode).send(response.body);
    },
);

server.get(
    "/api/items",
    {
        schema: {
            params: findAllItemsQuerySchema,
            response: { 200: findAllItemsResponseSchema },
            tags: ["Items"],
        },
    },
    async (request, reply) => {
        const response = await itemsController.findAllItems(request.params);
        return reply.status(response.statusCode).send(response.body);
    },
);
