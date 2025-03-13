import { server } from "@providers/server";

import { ItemsService } from "@services/items.service";
import { ItemsRepository } from "@repositories/items.repository";
import { ItemsController } from "@controllers/items.controller";
import {
    createItemBodySchema,
    createItemResponseSchema,
} from "@schemas/items.schema";

const itemsRepository = new ItemsRepository();
const itemsService = new ItemsService(itemsRepository);
const itemsController = new ItemsController(itemsService);

server.post(
    "/api/items",
    {
        schema: {
            body: createItemBodySchema,
            response: { 201: createItemResponseSchema },
            tags: ["Items"]
        },
    },
    async (request, reply) => {
        const response = await itemsController.createItem(request.body);
        return reply.status(response.statusCode).send(response.body);
    }
);
