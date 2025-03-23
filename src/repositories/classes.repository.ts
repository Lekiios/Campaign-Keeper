import { db, ClassCreateEntity, ClassUpdateEntity } from "@providers/db";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";

export class ClassesRepository {
    /**
     * Create a class in the database
     * @param _class Object that contains the class data
     */
    async create(_class: ClassCreateEntity) {
        return db.class.create({ data: _class });
    }

    /**
     * Read multiple classes from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of classes to read
     */
    async findAll(page: number = 0, count: number = 10) {
        return db.class.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a class from the database
     * @param id id of the class to read
     */
    async findById(id: number) {
        const _class = await db.class.findUnique({
            where: { id },
        });

        if (!_class) {
            throw new EntityNotFoundException(`Class with id ${id} not found.`);
        }
        return _class;
    }

    /**
     * Delete a class from the database
     * @param id id of the class to delete
     */
    async delete(id: number) {
        const _class = await db.class.findUnique({ where: { id } });

        if (!_class) {
            throw new EntityNotFoundException(`Class with id ${id} not found.`);
        }

        return db.class.delete({
            where: { id },
        });
    }

    /**
     * Update a class in the database
     * @param id id of the class to update
     * @param _class
     */
    async update(id: number, _class: ClassUpdateEntity) {
        const findClass = await db.class.findUnique({ where: { id } });

        if (!findClass) {
            throw new EntityNotFoundException(`Class with id ${id} not found.`);
        }

        return db.class.update({
            where: { id },
            data: _class,
        });
    }
}
