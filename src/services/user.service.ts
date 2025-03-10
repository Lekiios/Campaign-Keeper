import { UserRepository } from "@repositories/user.repository";
import { UserCreateEntity, UserUpdateEntity } from "@providers/db";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    /**
     * Create a user in the database
     * @param user
     */
    async create(user: UserCreateEntity) {
        return this.userRepository.create(user);
    }

    /**
     * Read multiple user from the database
     * @param page page to start reading from
     * @param count number of players to read
     */
    async findAll(page?: number, count?: number) {
        return this.userRepository.findAll(page, count);
    }

    /**
     * Read a user from the database
     * @param id id of the user to read
     */
    async findById(id: number) {
        return this.userRepository.findById(id);
    }

    /**
     * Delete a user from the database
     * @param id id of the user to delete
     */
    async delete(id: number) {
        return this.userRepository.delete(id);
    }

    /**
     * Update a user in the database
     * @param id id of the user to update
     * @param user
     */
    async update(id: number, user: UserUpdateEntity) {
        return this.userRepository.update(id, user);
    }
}
