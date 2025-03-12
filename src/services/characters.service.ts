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
     */
    async findAll(page?: number, count?: number) {
        return this.charactersRepository.findAll(page, count);
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
}
