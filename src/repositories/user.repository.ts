import { UserCreateEntity, UserUpdateEntity } from "@providers/db";
import { db } from "../index";

export class UserRepository {
    /**
     * Create a user in the database
     * @param player Object that contains the player data
     */
    create(player: UserCreateEntity) {
        return db.user.create({ data: player });
    }

    /**
     * Read multiple user from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of players to read
     */
    findAll(page: number = 0, count: number = 10) {
        return db.user.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Read a user from the database
     * @param id id of the user to read
     */
    findById(id: number) {
        return db.user.findUnique({
            where: { id },
        });
    }

    /**
     * Delete a user from the database
     * @param id id of the user to delete
     */
    delete(id: number) {
        return db.user.delete({
            where: { id },
        });
    }

    /**
     * Update a user in the database
     * @param id id of the user to update
     * @param player
     */
    update(id: number, player: UserUpdateEntity) {
        return db.user.update({
            where: { id },
            data: player,
        });
    }
}
