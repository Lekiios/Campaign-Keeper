import { db } from "../index";
import { ItemCreateEntity, ItemUpdateEntity } from "@providers/db";

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
     * @param id
     */
    findItemStatsById(id: number) {
        return db.item.findUnique({ where: { id }, select: { stats: true } });
    }

    /**
     * Find a specific item with its ID
     * @param id
     */
    async findById(id: number) {
        return db.item.findUnique({
            where: { id },
        });
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
            const previousItem = await this.findById(id);

            if (!previousItem) {
                return null;
            }

            await db.stats.update({
                where: { id: previousItem.statsId },
                data: item.stats,
            });
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
}
