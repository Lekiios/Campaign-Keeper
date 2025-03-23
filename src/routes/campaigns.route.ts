import { server } from "@providers/server";
import { CampaignsController } from "@controllers/campaigns.controller";
import { CampaignsService } from "@services/campaigns.service";
import { CampaignsRepository } from "@repositories/campaigns.repository";

import {
    createCampaignBodySchema,
    createCampaignResponseSchema,
    updateCampaignParamsSchema,
    updateCampaignBodySchema,
    updateCampaignResponseSchema,
    deleteCampaignParamsSchema,
    findAllCampaignsResponseSchema,
    findAllCampaignsQuerySchema,
    findCampaignByIdParamsSchema,
    findCampaignSummaryByIdResponseSchema,
    findCampaignCharactersResponseSchema,
    campaignCharacterParamsSchema,
} from "@schemas/campaigns.schema";
import { ErrorResponseSchema } from "@schemas/common.schema";

const campaignsRepository = new CampaignsRepository();
const campaignsService = new CampaignsService(campaignsRepository);
const campaignsController = new CampaignsController(campaignsService);

server.post(
    "/api/campaigns",
    {
        schema: {
            body: createCampaignBodySchema,
            response: {
                201: createCampaignResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.createCampaign(request.body);
        return reply.status(response.statusCode).send(response.body);
    },
);

server.get(
    "/api/campaigns",
    {
        schema: {
            querystring: findAllCampaignsQuerySchema,
            response: {
                200: findAllCampaignsResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.findAllCampaigns(
            request.query,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.get(
    "/api/campaigns/:id",
    {
        schema: {
            params: findCampaignByIdParamsSchema,
            response: {
                200: findCampaignSummaryByIdResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.findCampaignSummaryById(
            request.params,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.get(
    "/api/campaigns/:id/characters",
    {
        schema: {
            params: findCampaignByIdParamsSchema,
            response: {
                200: findCampaignCharactersResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.findCampaignCharactersById(
            request.params,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.patch(
    "/api/campaigns/:id",
    {
        schema: {
            params: updateCampaignParamsSchema,
            body: updateCampaignBodySchema,
            response: {
                200: updateCampaignResponseSchema,
                404: ErrorResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.updateCampaign(
            request.params,
            request.body,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.delete(
    "/api/campaigns/:id",
    {
        schema: {
            params: deleteCampaignParamsSchema,
            response: { 204: {}, 404: ErrorResponseSchema },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.deleteCampaign(
            request.params,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.put(
    "/api/campaigns/:campaignId/character/:characterId/add",
    {
        schema: {
            params: campaignCharacterParamsSchema,
            response: {
                204: {},
                500: ErrorResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.addCharacterToCampaign(
            request.params,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);

server.put(
    "/api/campaigns/:campaignId/character/:characterId/remove",
    {
        schema: {
            params: campaignCharacterParamsSchema,
            response: {
                204: {},
                500: ErrorResponseSchema,
            },
            tags: ["Campaigns"],
        },
    },
    async (request, reply) => {
        const response = await campaignsController.deleteCharacterToCampaign(
            request.params,
        );
        return reply.status(response.statusCode).send(response.body);
    },
);
