import {
    User,
    PrismaClient,
    Class,
    Spell,
    Character,
    Stats,
    Item,
    Campaign, Session
} from "@prisma/client";

export const createDbClient = () => {
    return new PrismaClient({
        log: ["info", "query", "error", "warn"],
    });
};

export const db = createDbClient();

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

export type SpellEntity = Spell;
export type SpellCreateEntity = Omit<Spell, "id">;
export type SpellUpdateEntity = Partial<Spell>;

export type CharacterEntity = Character;
export type CharacterAllStatsEntity = Omit<Character, "statsId"> & {
    stats: Omit<Stats, "id">;
};
export type CharacterCreateEntity = Omit<CharacterAllStatsEntity, "id">;
export type CharacterPartialAllStatsEntity = Omit<Character, "statsId"> & {
    stats: Partial<Omit<Stats, "id">>;
};
export type CharacterUpdateEntity = Partial<CharacterPartialAllStatsEntity>;

export type CampaignCreateEntity = Omit<Campaign, "id">;
export type CampaignUpdateEntity = Partial<CampaignCreateEntity>;

export type SessionEntity = Session;
export type SessionCreateEntity = Omit<SessionEntity, "id">;
export type SessionUpdateEntity = Partial<SessionCreateEntity>;
