import { CharacterCreateEntity, CharacterUpdateEntity } from "@providers/db";
import { CharactersRepository } from "@repositories/characters.repository";

export class CharactersService {
    constructor(private charactersRepository: CharactersRepository) {}

    /**
     * Create a character in the database
     * @param character
     */
    async create(character: CharacterCreateEntity) {
        return this.charactersRepository.create(character);
    }

    /**
     * Read multiple character from the database
     * @param page page to start reading from
     * @param count number of characters to read
     * @param filter Object that contains the filter data: classId or userId
     */
    async findAll(
        page?: number,
        count?: number,
        filter?: { classId?: number; userId?: number },
    ) {
        return this.charactersRepository.findAll(page, count, filter);
    }

    /**
     * Read a character from the database
     * @param id id of the character to read
     */
    async findById(id: number) {
        return this.charactersRepository.findById(id);
    }

    /**
     * Delete a character from the database
     * @param id id of the character to delete
     */
    async delete(id: number) {
        return this.charactersRepository.delete(id);
    }

    /**
     * Update a character in the database
     * @param id id of the character to update
     * @param character
     */
    async update(id: number, character: CharacterUpdateEntity) {
        return this.charactersRepository.update(id, character);
    }

    /**
     * Get the stats of a character
     * @param id id of the character
     */
    async findCharacterStatById(id: number) {
        const res = this.charactersRepository.findCharacterStatsById(id);
        return res.stats();
    }
}
