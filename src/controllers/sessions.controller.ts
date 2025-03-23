import { ControllerResponse } from "@controllers/controllers";

import { SessionsService } from "@services/sessions.service";
import {
    CreateSessionBody,
    CreateSessionResponse,
    DeleteSessionParams,
    FindAllSessionsQuery,
    FindAllSessionsResponse,
    FindSessionByIdParams,
    FindSessionByIdResponse,
    UpdateSessionBody,
    UpdateSessionParams,
    UpdateSessionResponse,
} from "@schemas/sessions.schema";

export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    async createSession(
        body: CreateSessionBody,
    ): Promise<ControllerResponse<CreateSessionResponse>> {
        const { campaignId, apiUrl } = body;

        const session = await this.sessionsService.create({
            campaignId,
            apiUrl,
        });

        return {
            statusCode: 201,
            body: session,
        };
    }

    async findAllSessions(
        query: FindAllSessionsQuery,
    ): Promise<ControllerResponse<FindAllSessionsResponse>> {
        const { page, count, campaignId } = query;
        const sessions = await this.sessionsService.findAll(page, count, {
            campaignId,
        });

        return {
            statusCode: 200,
            body: sessions,
        };
    }

    async findSessionById(
        params: FindSessionByIdParams,
    ): Promise<ControllerResponse<FindSessionByIdResponse>> {
        const { id } = params;

        const session = await this.sessionsService.findById(id);

        return {
            statusCode: 200,
            body: session,
        };
    }

    async deleteSessionById(
        params: DeleteSessionParams,
    ): Promise<ControllerResponse<undefined>> {
        const { id } = params;
        await this.sessionsService.delete(id);
        return {
            statusCode: 204,
            body: undefined,
        };
    }

    async updateSessionById(
        params: UpdateSessionParams,
        body: UpdateSessionBody,
    ): Promise<ControllerResponse<UpdateSessionResponse>> {
        const { id } = params;
        const { campaignId, apiUrl } = body;

        const updatedSession = await this.sessionsService.update(id, {
            campaignId,
            apiUrl,
        });

        return {
            statusCode: 200,
            body: updatedSession,
        };
    }
}
