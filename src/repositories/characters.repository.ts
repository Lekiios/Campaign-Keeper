import { CharacterCreateEntity, CharacterUpdateEntity } from "@providers/db";
import { db } from "../index";

export class CharactersRepository {
    /**
     * Create a character in the database
     * @param character Object that contains the character data
     */
    async create(character: CharacterCreateEntity) {
        const stats = await db.stats.create({ data: character.stats });

        // Set fields manually to undefined if it is not provided to handle default value
        return db.character.create({
            data: {
                ...character,
                stats: undefined,
                statsId: stats.id,
            },
        });
    }

    /**
     * Read multiple character from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of characters to read
     */
    findAll(page: number = 0, count: number = 10) {
        return db.character.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a character from the database
     * @param id id of the character to read
     */
    findById(id: number) {
        return db.character.findUnique({
            where: { id },
        });
    }

    /**
     * Delete a character from the database
     * @param id id of the character to delete
     */
    delete(id: number) {
        return db.character.delete({
            where: { id },
        });
    }

    /**
     * Update a character in the database
     * @param id id of the character to update
     * @param character Object that contains the character data
     */
    update(id: number, character: CharacterUpdateEntity) {
        return db.character.update({
            where: { id },
            data: { ...character, stats: undefined },
        });
    }

    /**
     * Get the stats of a character
     * @param id id of the character
     */
    getCharacterStats(id: number) {
        return db.character.findUnique({
            where: { id },
            include: { stats: true },
        });
    }
}
