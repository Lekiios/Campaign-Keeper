import { ItemsRepository } from "@repositories/items.repository";
import { ItemCreateEntity, ItemUpdateEntity } from "@providers/db";

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

    /**
     * Find all stats of an item with its ID
     * @param id
     */
    async findItemStatsById(id: number) {
        const res = this.itemsRepository.findItemStatsById(id);
        return res.stats();
    }

    /**
     * Update an item in the database
     * @param id id of the item to update
     * @param item
     */
    async update(id: number, item: ItemUpdateEntity) {
        return this.itemsRepository.update(id, item);
    }

    /**
     * Delete an item in the database
     * @param id id of the item to delete
     */
    async delete(id: number) {
        return this.itemsRepository.delete(id);
    }
}
