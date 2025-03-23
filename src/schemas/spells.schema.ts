import { Static, Type as t } from "@sinclair/typebox";
import { SpellType } from "@prisma/client";
import { classesSchema } from "@schemas/classes.schema";
import { StringEnum } from "@schemas/common.schema";

const SpellTypeEnum = StringEnum(Object.values(SpellType));

export const spellsSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
    type: SpellTypeEnum,
    requiredLevel: t.Optional(t.Number()),
    class: t.Optional(classesSchema),
});

export type Spells = Static<typeof spellsSchema>;

export const createSpellBodySchema = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    type: SpellTypeEnum,
    requiredLevel: t.Optional(t.Number()),
    classId: t.Optional(t.Number()),
});

export type CreateSpellBody = Static<typeof createSpellBodySchema>;

export const createSpellResponseSchema = spellsSchema;

export type CreateSpellResponse = Static<typeof createSpellResponseSchema>;

export const findAllSpellsQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
    classId: t.Optional(t.Number()),
    type: t.Optional(SpellTypeEnum),
});

export type FindAllSpellsQuery = Static<typeof findAllSpellsQuerySchema>;

export const findAllSpellsResponseSchema = t.Array(spellsSchema);
export type FindAllSpellsResponse = Static<typeof findAllSpellsResponseSchema>;

export const findSpellByIdParamsSchema = t.Object({
    id: t.Number(),
});

export type FindSpellByIdParams = Static<typeof findSpellByIdParamsSchema>;

export const findSpellByIdResponseSchema = spellsSchema;
export type FindSpellByIdResponse = Static<typeof findSpellByIdResponseSchema>;

export const deleteSpellParamsSchema = findSpellByIdParamsSchema;
export type DeleteSpellParams = FindSpellByIdParams;

export const updateSpellBodySchema = t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    type: t.Optional(SpellTypeEnum),
    requiredLevel: t.Optional(t.Number()),
    classId: t.Optional(t.Number()),
});

export type UpdateSpellBody = Static<typeof updateSpellBodySchema>;

export const updateSpellParamsSchema = findSpellByIdParamsSchema;
export type UpdateSpellParams = FindSpellByIdParams;

export const updateSpellResponseSchema = spellsSchema;
export type UpdateSpellResponse = Static<typeof updateSpellResponseSchema>;
