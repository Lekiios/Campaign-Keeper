import { Static, Type as t } from "@sinclair/typebox";
import { classesSchema } from "@schemas/classes.schema";

const Stats = t.Object({
    strength: t.Number(),
    dexterity: t.Number(),
    constitution: t.Number(),
    intelligence: t.Number(),
    wisdom: t.Number(),
    charisma: t.Number(),
});

export const charactersSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
    level: t.Optional(t.Number()),
    requiredXp: t.Optional(t.Number()),
    xp: t.Optional(t.Number()),
    maxHp: t.Number(),
    currentHp: t.Optional(t.Number()),
    money: t.Optional(t.Number()),
    inventorySize: t.Number(),
    class: classesSchema,
    stats: Stats,
    user: t.Object({ id: t.Number(), username: t.String() }),
});
export type Characters = Static<typeof charactersSchema>;

export const createCharacterBodySchema = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    level: t.Optional(t.Number()),
    requiredXp: t.Optional(t.Number()),
    xp: t.Optional(t.Number()),
    maxHp: t.Number(),
    money: t.Optional(t.Number()),
    inventorySize: t.Number(),
    classId: t.Number(),
    stats: Stats,
    userId: t.Number(),
});

export type CreateCharacterBody = Static<typeof createCharacterBodySchema>;

export const createCharacterResponseSchema = charactersSchema;
export type CreateCharacterResponse = Static<
    typeof createCharacterResponseSchema
>;

export const findAllCharactersQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
    classId: t.Optional(t.Number()),
    userId: t.Optional(t.Number()),
});
export type FindAllCharactersQuery = Static<
    typeof findAllCharactersQuerySchema
>;

export const findAllCharactersResponseSchema = t.Array(charactersSchema);
export type FindAllCharactersResponse = Static<
    typeof findAllCharactersResponseSchema
>;
