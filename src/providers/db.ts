import {
    User,
    PrismaClient,
    Class,
    Spell,
    Character,
    Stats,
} from "@prisma/client";

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

export type CharacterEntity = Character;
export type CharacterAllStatsEntity = Omit<Character, "statsId"> & {
    stats: Omit<Stats, "id">;
};
export type CharacterCreateEntity = Omit<CharacterAllStatsEntity, "id">;
export type CharacterUpdateEntity = Partial<CharacterAllStatsEntity>;
