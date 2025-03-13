import { ItemsService } from "@services/items.service";
import { ControllerResponse } from "@controllers/controllers";
import { CreateItemBody, CreateItemResponse } from "@schemas/items.schema";
import { ItemType } from "@prisma/client";

export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    async createItem(
        body: CreateItemBody,
    ): Promise<ControllerResponse<CreateItemResponse>> {
        const { name, description, type, requiredLevel, stats } = body;

        const item = await this.itemsService.create({
            name,
            description: description ?? null,
            type: type as ItemType,
            requiredLevel: requiredLevel ?? null,
            stats,
        });

        return {
            statusCode: 201,
            body: {
                id: item.id,
                name: item.name,
                description: item.description ?? undefined,
                type: item.type,
                requiredLevel: item.requiredLevel ?? 1,
                stats,
            },
        };
    }
}
