import { ClassRepository } from "@repositories/class.repository";
import { ClassCreateEntity, ClassUpdateEntity } from "@providers/db";

export class ClassService {
    constructor(private classRepository: ClassRepository) {}

    /**
     * Create a class in the database
     * @param _class Object that contains the class data
     */
    async create(_class: ClassCreateEntity) {
        return this.classRepository.create(_class);
    }

    /**
     * Read multiple classes from the database
     * @param page page to start reading from
     * @param count number of classes to read
     */
    async findAll(page?: number, count?: number) {
        return this.classRepository.findAll(page, count);
    }

    /**
     * Read a class from the database
     * @param id id of the class to read
     */
    async findById(id: number) {
        return this.classRepository.findById(id);
    }

    /**
     * Delete a class from the database
     * @param id id of the class to delete
     */
    async delete(id: number) {
        return this.classRepository.delete(id);
    }

    /**
     * Update a class in the database
     * @param id id of the class to update
     * @param _class
     */
    async update(id: number, _class: ClassUpdateEntity) {
        return this.classRepository.update(id, _class);
    }
}
