import { CampaignsService } from "@services/campaigns.service";
import { ControllerResponse } from "@controllers/controllers";
import {
    CreateCampaignBody,
    CreateCampaignResponse,
    FindAllCampaignsQuery,
    FindAllCampaignsResponse,
    UpdateCampaignBody,
    UpdateCampaignParams,
    UpdateCampaignResponse,
    DeleteCampaignParams,
    FindCampaignByIdParams,
    FindCampaignCharactersResponse,
    FindCampaignSummaryByIdResponse,
} from "@schemas/campaigns.schema";
import { ErrorResponse } from "@schemas/common.schema";
import { CampaignStatus } from "@prisma/client";

export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) {}

    async createCampaign(
        body: CreateCampaignBody,
    ): Promise<ControllerResponse<CreateCampaignResponse>> {
        const {
            name,
            description,
            status,
        }: {
            name: string;
            description?: string;
            status?: CampaignStatus;
        } = body;

        const campaign = await this.campaignsService.create({
            name,
            description: description ?? null,
            status: status ?? "PLANNED",
        });

        return {
            statusCode: 201,
            body: {
                id: campaign.id,
                name: campaign.name,
                description: campaign.description ?? undefined,
                status: campaign.status,
            },
        };
    }

    async findAllCampaigns(
        query: FindAllCampaignsQuery,
    ): Promise<ControllerResponse<FindAllCampaignsResponse>> {
        const { page, count } = query;
        const campaigns = await this.campaignsService.findAll(page, count);

        return {
            statusCode: 200,
            body: campaigns.map(
                (campaign: {
                    id: number;
                    name: string;
                    description: string | null;
                    status: string;
                }) => ({
                    id: campaign.id,
                    name: campaign.name,
                    description: campaign.description ?? undefined,
                    status: campaign.status as FindCampaignSummaryByIdResponse["status"],
                }),
            ),
        };
    }

    async findCampaignSummaryById(
        params: FindCampaignByIdParams,
    ): Promise<
        ControllerResponse<FindCampaignSummaryByIdResponse | ErrorResponse>
    > {
        const { id } = params;
        const campaign =
            await this.campaignsService.findCampaignSummaryById(id);

        if (!campaign) {
            return {
                statusCode: 404,
                body: { message: `Campaign with id ${id} not found` },
            };
        }

        return {
            statusCode: 200,
            body: {
                id: campaign.id,
                name: campaign.name,
                description: campaign.description ?? undefined,
                status: campaign.status as FindCampaignSummaryByIdResponse["status"],
            },
        };
    }

    async findCampaignCharactersById(
        params: FindCampaignByIdParams,
    ): Promise<
        ControllerResponse<FindCampaignCharactersResponse | ErrorResponse>
    > {
        const campaign = await this.campaignsService.findCampaignCharactersById(
            params.id,
        );

        if (!campaign) {
            return {
                statusCode: 404,
                body: { message: `Campaign with id ${params.id} not found` },
            };
        }

        const simplifiedCharacters = campaign.characters.map(
            (character: {
                id: number;
                name: string;
                level: number;
                maxHp: number;
                class: { name: string };
                stats: {
                    strength: number;
                    dexterity: number;
                    constitution: number;
                    intelligence: number;
                    wisdom: number;
                    charisma: number;
                };
            }) => ({
                id: character.id,
                name: character.name,
                level: character.level,
                maxHp: character.maxHp,
                class: {
                    name: character.class.name,
                },
                stats: character.stats,
            }),
        );

        const response: FindCampaignCharactersResponse = {
            name: campaign.name,
            characters: simplifiedCharacters,
        };

        return {
            statusCode: 200,
            body: response,
        };
    }

    async updateCampaign(
        params: UpdateCampaignParams,
        body: UpdateCampaignBody,
    ): Promise<ControllerResponse<UpdateCampaignResponse | ErrorResponse>> {
        const { id } = params;
        const {
            name,
            description,
            status,
        }: {
            name?: string;
            description?: string;
            status?: CampaignStatus;
        } = body;

        const updatedCampaign = await this.campaignsService.update(id, {
            name,
            description,
            status,
        });

        if (!updatedCampaign) {
            return {
                statusCode: 404,
                body: { message: `Campaign with id ${params.id} not found` },
            };
        }

        return {
            statusCode: 200,
            body: {
                id: updatedCampaign.id,
                name: updatedCampaign.name,
                description: updatedCampaign.description ?? undefined,
                status: updatedCampaign.status,
            },
        };
    }

    async deleteCampaign(
        params: DeleteCampaignParams,
    ): Promise<ControllerResponse<undefined>> {
        await this.campaignsService.delete(params.id);
        return {
            statusCode: 204,
            body: undefined,
        };
    }
}
