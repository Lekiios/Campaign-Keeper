import { User, PrismaClient, Class, Item, Stats } from "@prisma/client";

export const createDbClient = () => {
    return new PrismaClient({
        log: ["info", "query", "error", "warn"],
    });
};

export type UserEntity = User;
export type UserCreateEntity = Omit<User, "id">;
export type UserUpdateEntity = Partial<User>;

export type ClassEntity = Class;
export type ClassCreateEntity = Omit<Class, "id">;
export type ClassUpdateEntity = Partial<Class>;

export type ItemEntity = Item;
export type ItemAllStatsEntity = Omit<Item, "statsId"> & {
    stats: Omit<Stats, "id">;
};
export type ItemCreateEntity = Omit<ItemAllStatsEntity, "id">;
export type ItemUpdateEntity = Partial<ItemCreateEntity>;
