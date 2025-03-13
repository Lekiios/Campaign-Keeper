import { ItemsRepository } from "@repositories/items.repository";
import { ItemCreateEntity } from "@providers/db";

export class ItemsService {
    constructor(private itemsRepository: ItemsRepository) {}

    /**
     * Create an item in the database
     * @param item Object that contains the item data
     */
    async create(item: ItemCreateEntity) {
        return this.itemsRepository.create(item);
    }

    async findItemStatsById(id: number) {
        return this.itemsRepository.findItemStatsById(id);
    }

    /**
     * Find an item with its ID
     * @param id
     */
    async findById(id: number) {
        return this.itemsRepository.findById(id);
    }
}
