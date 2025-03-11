import { SpellCreateEntity, SpellUpdateEntity } from "@providers/db";
import { SpellsRepository } from "@repositories/spells.repository";

export class SpellsService {
    constructor(private spellsRepository: SpellsRepository) {}

    /**
     * Create a spell in the database
     * @param spell Object that contains the spell data
     */
    async create(spell: SpellCreateEntity) {
        return this.spellsRepository.create(spell);
    }

    /**
     * Read multiple spells from the database
     * @param page page to start reading from
     * @param count number of spells to read
     */
    async findAll(page?: number, count?: number) {
        return this.spellsRepository.findAll(page, count);
    }

    /**
     * Read a spell from the database
     * @param id id of the spell to read
     */
    async findById(id: number) {
        return this.spellsRepository.findById(id);
    }

    /**
     * Delete a spell from the database
     * @param id id of the spell to delete
     */
    async delete(id: number) {
        return this.spellsRepository.delete(id);
    }

    /**
     * Update a spell in the database
     * @param id id of the spell to update
     * @param spell
     */
    async update(id: number, spell: SpellUpdateEntity) {
        return this.spellsRepository.update(id, spell);
    }
}
