import { SpellCreateEntity, SpellUpdateEntity } from "@providers/db";
import { SpellsRepository } from "@repositories/spells.repository";
import { SpellType } from "@prisma/client";

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
     * @param filter object that contains the filter data: classId or type
     */
    async findAll(
        page?: number,
        count?: number,
        filter?: { classId?: number; type?: SpellType },
    ) {
        return this.spellsRepository.findAll(page, count, filter);
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

    /**
     * Get the spell class from the database
     * @param id id of the spell to get the class from
     */
    async getSpellClass(id: number) {
        return this.spellsRepository.findSpellClassById(id);
    }
}
