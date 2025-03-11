import { db } from "../index";
import { ClassCreateEntity, ClassUpdateEntity } from "@providers/db";

export class ClassesRepository {
    /**
     * Create a class in the database
     * @param _class Object that contains the class data
     */
    create(_class: ClassCreateEntity) {
        return db.class.create({ data: _class });
    }

    /**
     * Read multiple classes from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of classes to read
     */
    findAll(page: number = 0, count: number = 10) {
        return db.class.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a class from the database
     * @param id id of the class to read
     */
    findById(id: number) {
        return db.class.findUnique({
            where: { id },
        });
    }

    /**
     * Delete a class from the database
     * @param id id of the class to delete
     */
    delete(id: number) {
        return db.class.delete({
            where: { id },
        });
    }

    /**
     * Update a class in the database
     * @param id id of the class to update
     * @param _class
     */
    update(id: number, _class: ClassUpdateEntity) {
        return db.class.update({
            where: { id },
            data: _class,
        });
    }
}
