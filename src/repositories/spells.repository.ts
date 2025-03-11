import { db } from "../index";
import { SpellCreateEntity, SpellUpdateEntity } from "@providers/db";

export class SpellsRepository {
    /**
     * Create a spell in the database
     * @param spell Object that contains the spell data
     */
    create(spell: SpellCreateEntity) {
        return db.spell.create({ data: spell });
    }

    /**
     * Read multiple spells from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of spells to read
     */
    findAll(page: number = 0, count: number = 10) {
        return db.spell.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a spell from the database
     * @param id id of the spell to read
     */
    findById(id: number) {
        return db.spell.findUnique({
            where: { id },
        });
    }

    /**
     * Delete a spell from the database
     * @param id id of the spell to delete
     */
    delete(id: number) {
        return db.spell.delete({
            where: { id },
        });
    }

    /**
     * Update a spell in the database
     * @param id id of the spell to update
     * @param spell
     */
    update(id: number, spell: SpellUpdateEntity) {
        return db.spell.update({
            where: { id },
            data: spell,
        });
    }
}
