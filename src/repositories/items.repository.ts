import { db } from "../index";
import { ItemCreateEntity } from "@providers/db";

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
}
