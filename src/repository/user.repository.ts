import { UserCreateEntity } from "@providers/db";
import { db } from "../index";

export class UserRepository {
    /**
     * Create a user in the database
     * @param player
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
}
