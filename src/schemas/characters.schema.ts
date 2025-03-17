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

const OptionalStats = t.Object({
    strength: t.Optional(t.Number()),
    dexterity: t.Optional(t.Number()),
    constitution: t.Optional(t.Number()),
    intelligence: t.Optional(t.Number()),
    wisdom: t.Optional(t.Number()),
    charisma: t.Optional(t.Number()),
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

export const findCharacterByIdParamsSchema = t.Object({ id: t.Number() });
export type FindCharacterByIdParams = Static<
    typeof findCharacterByIdParamsSchema
>;

export const findCharacterByIdResponseSchema = charactersSchema;
export type FindCharacterByIdResponse = Static<
    typeof findCharacterByIdResponseSchema
>;

export const deleteCharacterParamsSchema = t.Object({ id: t.Number() });
export type DeleteCharacterParams = Static<typeof deleteCharacterParamsSchema>;

export const updateCharacterParamsSchema = t.Object({ id: t.Number() });
export type UpdateCharacterParams = Static<typeof updateCharacterParamsSchema>;

export const updateCharacterBodySchema = t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    level: t.Optional(t.Number()),
    requiredXp: t.Optional(t.Number()),
    xp: t.Optional(t.Number()),
    maxHp: t.Optional(t.Number()),
    money: t.Optional(t.Number()),
    inventorySize: t.Optional(t.Number()),
    classId: t.Optional(t.Number()),
    stats: t.Optional(OptionalStats),
    userId: t.Optional(t.Number()),
});
export type UpdateCharacterBody = Static<typeof updateCharacterBodySchema>;

export const updateCharacterResponseSchema = charactersSchema;
export type UpdateCharacterResponse = Static<
    typeof updateCharacterResponseSchema
>;
