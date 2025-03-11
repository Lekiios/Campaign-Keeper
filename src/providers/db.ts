import { User, PrismaClient, Class, Spell } from "@prisma/client";

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

export type SpellEntity = Spell;
export type SpellCreateEntity = Omit<Spell, "id">;
export type SpellUpdateEntity = Partial<Spell>;
