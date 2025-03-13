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

    /**
     * Find all stats of an item with its ID
     * @param id
     */
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

    /**
     * Read multiple items from the database
     * @param page page to start reading from
     * @param count number of items to read
     */
    async findAll(page?: number, count?: number) {
        return this.itemsRepository.findAll(page, count);
    }
}
