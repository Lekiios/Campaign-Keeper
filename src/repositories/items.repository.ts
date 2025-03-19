import { db } from "../index";
import { ItemCreateEntity, ItemUpdateEntity } from "@providers/db";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

export class ItemsRepository {
    /**
     * * Create an item in the database
     * @param item Object that contains the item data
     */
    async create(item: ItemCreateEntity) {
        const stats = await db.stats.create({ data: item.stats });
        const { requiredLevel } = item;
        return db.item.create({
            data: {
                ...item,
                requiredLevel: requiredLevel ?? undefined,
                stats: undefined,
                statsId: stats.id,
            },
        });
    }

    /**
     * Find all stats of an item with its ID
     * @param id id of the item to get the stats from
     */
    async findItemStatsById(id: number) {
        const item = await db.item.findUnique({
            where: { id },
            include: { stats: true },
        });
        if (!item) {
            throw new EntityNotFoundException(`Item with id ${id} not found`);
        }
        if (!item.stats) {
            throw new EntityInternalErrorException(
                `Stats of item with id ${id} not found`,
            );
        }

        return item.stats;
    }

    /**
     * Find a specific item with its ID
     * @param id
     */
    async findById(id: number) {
        const item = await db.item.findUnique({
            where: { id },
        });

        if (!item) {
            throw new EntityNotFoundException(`Item with id ${id} not found`);
        }

        return item;
    }

    /**
     * Read multiple items from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of items to read
     */
    async findAll(page: number = 0, count: number = 10) {
        return db.item.findMany({
            skip: page * count,
            take: count,
            include: {
                stats: true,
            },
        });
    }

    /**
     * Update an item in the database
     * @param id id of the item to update
     * @param item
     */
    async update(id: number, item: ItemUpdateEntity) {
        if (item.stats) {
            // Find the stats of the item & will check if the item exists
            const stats = await this.findItemStatsById(id);

            await db.stats.update({
                where: { id: stats.id },
                data: item.stats,
            });
        } else {
            // Check if the item exists if not done by findItemStatsById
            const findItem = await db.item.findUnique({ where: { id } });
            if (!findItem) {
                throw new EntityNotFoundException(
                    `Item with id ${id} not found`,
                );
            }
        }

        return db.item.update({
            where: { id },
            data: {
                name: item.name,
                description: item.description,
                type: item.type,
                requiredLevel: item.requiredLevel,
            },
        });
    }

    /**
     * Delete an item in the database
     * @param id id of the item to delete
     */
    async delete(id: number) {
        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            throw new EntityNotFoundException(`Item with id ${id} not found`);
        }

        return db.item.delete({
            where: { id },
            include: { stats: true },
        });
    }
}
