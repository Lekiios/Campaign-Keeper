import { db, SpellCreateEntity, SpellUpdateEntity } from "@providers/db";
import { SpellType } from "@prisma/client";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

export class SpellsRepository {
    /**
     * Create a spell in the database
     * @param spell Object that contains the spell data
     */
    async create(spell: SpellCreateEntity) {
        if (spell.classId) {
            const classExists = await db.class.findUnique({
                where: { id: spell.classId },
            });

            if (!classExists) {
                throw new EntityNotFoundException(
                    `Class with id ${spell.classId} not found`,
                );
            }
        }
        // Set requiredLevel to undefined if it is not provided to handle default value
        const { requiredLevel } = spell;
        return db.spell.create({
            data: { ...spell, requiredLevel: requiredLevel ?? undefined },
        });
    }

    /**
     * Read multiple spells from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of spells to read
     * @param filter object that contains the filter data: classId or type
     */
    async findAll(
        page: number = 0,
        count: number = 10,
        filter?: { classId?: number; type?: SpellType },
    ) {
        if (filter?.classId) {
            const classExists = await db.class.findUnique({
                where: { id: filter.classId },
            });

            if (!classExists) {
                throw new EntityNotFoundException(
                    `Class with id ${filter.classId} not found`,
                );
            }
        }

        return db.spell.findMany({
            skip: page * count,
            take: count,
            where: {
                classId: filter?.classId,
                type: filter?.type,
            },
        });
    }

    /**
     * Read a spell from the database
     * @param id id of the spell to read
     */
    async findById(id: number) {
        const spell = await db.spell.findUnique({
            where: { id },
        });

        if (!spell) {
            throw new EntityNotFoundException(`Spell with id ${id} not found.`);
        }

        return spell;
    }

    /**
     * Delete a spell from the database
     * @param id id of the spell to delete
     */
    async delete(id: number) {
        const findSpell = await db.spell.findUnique({ where: { id } });

        if (!findSpell) {
            throw new EntityNotFoundException(`Spell with id ${id} not found.`);
        }

        return db.spell.delete({
            where: { id },
        });
    }

    /**
     * Update a spell in the database
     * @param id id of the spell to update
     * @param spell
     */
    async update(id: number, spell: SpellUpdateEntity) {
        const findSpell = await db.spell.findUnique({ where: { id } });

        if (!findSpell) {
            throw new EntityNotFoundException(`Spell with id ${id} not found.`);
        }

        return db.spell.update({
            where: { id },
            data: spell,
        });
    }

    /**
     * Get the spell class from the database
     * @param id id of the spell to get the class from
     */
    async findSpellClassById(id: number) {
        const spell = await db.spell.findUnique({
            where: { id },
            include: {
                class: true,
            },
        });

        if (!spell) {
            throw new EntityNotFoundException(`Spell with id ${id} not found.`);
        }

        if (!spell.class) {
            throw new EntityInternalErrorException(
                `Class {id: ${spell.classId}} of spell with id ${id} not found. Check the database.`,
            );
        }

        return spell.class;
    }
}
