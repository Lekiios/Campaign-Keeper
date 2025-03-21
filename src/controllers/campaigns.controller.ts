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
} from "@schemas/campaigns.schema";
import { ErrorResponse } from "@schemas/common.schema";

export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) {}

    async createCampaign(
        body: CreateCampaignBody,
    ): Promise<ControllerResponse<CreateCampaignResponse>> {
        const { name, description, status } = body;

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
            body: campaigns.map(({ id, name, description, status }) => ({
                id,
                name,
                description: description ?? undefined,
                status: status,
            })),
        };
    }

    async updateCampaign(
        params: UpdateCampaignParams,
        body: UpdateCampaignBody,
    ): Promise<ControllerResponse<UpdateCampaignResponse | ErrorResponse>> {
        const { id } = params;
        const { name, description, status } = body;

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
