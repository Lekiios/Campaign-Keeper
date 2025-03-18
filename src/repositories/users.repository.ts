import { UserCreateEntity, UserUpdateEntity } from "@providers/db";
import { db } from "../index";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";

export class UsersRepository {
    /**
     * Create a user in the database
     * @param player Object that contains the player data
     */
    async create(player: UserCreateEntity) {
        return db.user.create({ data: player });
    }

    /**
     * Read multiple user from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of players to read
     */
    async findAll(page: number = 0, count: number = 10) {
        return db.user.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a user from the database
     * @param id id of the user to read
     */
    async findById(id: number) {
        const user = await db.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new EntityNotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    /**
     * Delete a user from the database
     * @param id id of the user to delete
     */
    async delete(id: number) {
        const findUser = await db.user.findUnique({
            where: { id },
        });

        if (!findUser) {
            throw new EntityNotFoundException(`User with id ${id} not found`);
        }

        return db.user.delete({
            where: { id },
        });
    }

    /**
     * Update a user in the database
     * @param id id of the user to update
     * @param user
     */
    async update(id: number, user: UserUpdateEntity) {
        const findUser = await db.user.findUnique({
            where: { id },
        });

        if (!findUser) {
            throw new EntityNotFoundException(`User with id ${id} not found`);
        }

        return db.user.update({
            where: { id },
            data: user,
        });
    }
}
