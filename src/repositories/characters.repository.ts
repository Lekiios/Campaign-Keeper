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
     * @param filter Object that contains the filter data: classId or userId
     */
    findAll(
        page: number = 0,
        count: number = 10,
        filter?: { classId?: number; userId?: number },
    ) {
        return db.character.findMany({
            skip: page * count,
            take: count,
            where: {
                classId: filter?.classId,
                userId: filter?.userId,
            },
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
            include: { stats: true },
        });
    }

    /**
     * Update a character in the database
     * @param id id of the character to update
     * @param character Object that contains the character data
     */
    async update(id: number, character: CharacterUpdateEntity) {
        if (character.stats) {
            const res = await this.findCharacterStatsById(id);
            if (!res) {
                throw new Error(
                    "Internal Error - Something went wrong in Stats entities!",
                );
            }

            await db.stats.update({
                where: { id: res.stats.id },
                data: character.stats,
            });
        }

        return db.character.update({
            where: { id },
            data: { ...character, stats: undefined },
        });
    }

    /**
     * Get the stats of a character
     * @param id id of the character
     */
    findCharacterStatsById(id: number) {
        return db.character.findUnique({
            where: { id },
            select: { stats: true },
        });
    }
}
