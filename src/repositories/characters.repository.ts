import {
    db,
    CharacterCreateEntity,
    CharacterUpdateEntity,
} from "@providers/db";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

export class CharactersRepository {
    /**
     * Create a character in the database
     * @param character Object that contains the character data
     */
    async create(character: CharacterCreateEntity) {
        const _class = await db.class.findUnique({
            where: { id: character.classId },
        });
        if (!_class) {
            throw new EntityNotFoundException(
                `Class with id ${character.classId} not found.`,
            );
        }
        const user = await db.user.findUnique({
            where: { id: character.userId },
        });
        if (!user) {
            throw new EntityNotFoundException(
                `User with id ${character.userId} not found.`,
            );
        }

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
    async findAll(
        page: number = 0,
        count: number = 10,
        filter?: { classId?: number; userId?: number },
    ) {
        if (filter?.classId) {
            const _class = await db.class.findUnique({
                where: { id: filter.classId },
            });
            if (!_class) {
                throw new EntityNotFoundException(
                    `Class with id ${filter.classId} not found.`,
                );
            }
        }
        if (filter?.userId) {
            const user = await db.user.findUnique({
                where: { id: filter.userId },
            });
            if (!user) {
                throw new EntityNotFoundException(
                    `User with id ${filter.userId} not found.`,
                );
            }
        }

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
    async findById(id: number) {
        const character = await db.character.findUnique({
            where: { id },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${id} not found.`,
            );
        }
        return character;
    }

    /**
     * Delete a character from the database
     * @param id id of the character to delete
     */
    async delete(id: number) {
        const character = await db.character.findUnique({ where: { id } });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${id} not found.`,
            );
        }
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
        if (character.classId) {
            const _class = await db.class.findUnique({
                where: { id: character.classId },
            });
            if (!_class) {
                throw new EntityNotFoundException(
                    `Class with id ${character.classId} not found.`,
                );
            }
        }
        if (character.userId) {
            const user = await db.user.findUnique({
                where: { id: character.userId },
            });
            if (!user) {
                throw new EntityNotFoundException(
                    `User with id ${character.userId} not found.`,
                );
            }
        }

        if (character.stats) {
            const stats = await this.findCharacterStatsById(id);

            await db.stats.update({
                where: { id: stats.id },
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
     * @param id id of the character to get the stats from
     */
    async findCharacterStatsById(id: number) {
        const character = await db.character.findUnique({
            where: { id },
            include: { stats: true },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${id} not found.`,
            );
        }
        if (!character.stats) {
            throw new EntityInternalErrorException(
                `Stats {id: ${character.statsId}} of character with id ${id} not found. Check the database.`,
            );
        }

        return character.stats;
    }

    /**
     * Get the class of a character
     * @param id id of the character to get the class from
     */
    async findCharacterClassById(id: number) {
        const character = await db.character.findUnique({
            where: { id },
            include: { class: true },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${id} not found.`,
            );
        }
        if (!character.class) {
            throw new EntityInternalErrorException(
                `Class {id: ${character.classId}} of character with id ${id} not found. Check the database.`,
            );
        }
        return character.class;
    }

    /**
     * Get the user of a character
     * @param id id of the character to get the user from
     */
    async findCharacterUserById(id: number) {
        const character = await db.character.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${id} not found.`,
            );
        }
        if (!character.user) {
            throw new EntityInternalErrorException(
                `User {id: ${character.userId}} of character with id ${id} not found. Check the database.`,
            );
        }
        return character.user;
    }
}
