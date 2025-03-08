import { UserRepository } from "../repository/user.repository";
import { UserCreateEntity } from "@providers/db";

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
}
