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
    DeleteItemParams,
} from "@schemas/items.schema";
import { ItemType } from "@prisma/client";
import { ErrorResponse } from "@schemas/common.schema";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

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
        try {
            const item = await this.itemsService.findById(id);

            const stats = await this.itemsService.findItemStatsById(id);

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
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: { message: error.message },
                };
            } else {
                throw error;
            }
        }
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

        try {
            const updatedItem = await this.itemsService.update(id, {
                name,
                description,
                type,
                requiredLevel,
                stats,
            });

            const itemStats = await this.itemsService.findItemStatsById(id);

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
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: { message: error.message },
                };
            } else if (error instanceof EntityInternalErrorException) {
                return {
                    statusCode: 500,
                    body: { message: error.message },
                };
            } else {
                throw error;
            }
        }
    }

    async deleteItemById(
        params: DeleteItemParams,
    ): Promise<ControllerResponse<ErrorResponse | undefined>> {
        const { id } = params;
        try {
            await this.itemsService.delete(id);
            return {
                statusCode: 204,
                body: undefined,
            };
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: { message: error.message },
                };
            } else {
                throw error;
            }
        }
    }
}
