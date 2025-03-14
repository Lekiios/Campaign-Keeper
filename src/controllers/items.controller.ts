import { ItemsService } from "@services/items.service";
import { ControllerResponse } from "@controllers/controllers";
import {
    CreateItemBody,
    CreateItemResponse,
    FindItemByIdParams,
    FindItemByIdResponse,
    FindAllItemsQuery,
    FindAllItemsResponse,
    UpdateItemBody,
    UpdateItemParams,
    UpdateItemResponse,
} from "@schemas/items.schema";
import { ItemType } from "@prisma/client";
import { ErrorResponse } from "@schemas/common.schema";

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

    async findItemById(
        params: FindItemByIdParams,
    ): Promise<ControllerResponse<FindItemByIdResponse | ErrorResponse>> {
        const { id } = params;
        const item = await this.itemsService.findById(id);

        if (!item) {
            return {
                statusCode: 404,
                body: {
                    message: `Item with id ${id} not found`,
                },
            };
        }

        const stats = await this.itemsService.findItemStatsById(id);

        if (!stats) {
            throw new Error(
                "Internal Error - Something went wrong in items' stats entities :(",
            );
        }

        return {
            statusCode: 200,
            body: {
                id: item.id,
                name: item.name,
                description: item.description ?? undefined,
                type: item.type,
                requiredLevel: item.requiredLevel ?? undefined,
                stats: {
                    strength: stats.strength,
                    dexterity: stats.dexterity,
                    constitution: stats.constitution,
                    intelligence: stats.intelligence,
                    wisdom: stats.wisdom,
                    charisma: stats.charisma,
                },
            },
        };
    }

    async findAllItems(
        query: FindAllItemsQuery,
    ): Promise<ControllerResponse<FindAllItemsResponse>> {
        const { page, count } = query;
        const items = await this.itemsService.findAll(page, count);

        return {
            statusCode: 200,
            body: items.map(
                ({ id, name, description, type, requiredLevel, stats }) => ({
                    id,
                    name,
                    description: description ?? undefined,
                    type,
                    requiredLevel: requiredLevel ?? undefined,
                    stats,
                }),
            ),
        };
    }

    async updateItemById(
        params: UpdateItemParams,
        body: UpdateItemBody,
    ): Promise<ControllerResponse<UpdateItemResponse | ErrorResponse>> {
        const { id } = params;
        const { name, description, type, requiredLevel, stats } = body;

        const updatedItem = await this.itemsService.update(id, {
            name,
            description,
            type,
            requiredLevel,
            stats,
        });

        if (!updatedItem) {
            return {
                statusCode: 404,
                body: { message: `Item with id ${id} not found` },
            };
        }

        const itemStats = await this.itemsService.findItemStatsById(id);

        if (!itemStats) {
            throw new Error(
                "Internal Error - Something went wrong in items' stats entities :(",
            );
        }

        return {
            statusCode: 200,
            body: {
                id: updatedItem.id,
                name: updatedItem.name,
                description: updatedItem.description ?? undefined,
                type: updatedItem.type,
                requiredLevel: updatedItem.requiredLevel ?? undefined,
                stats: itemStats,
            },
        };
    }
}
