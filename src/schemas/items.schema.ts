import { Static, Type as t } from "@sinclair/typebox";
import { ItemType } from "@prisma/client";

const Stats = t.Object({
    strength: t.Number(),
    dexterity: t.Number(),
    constitution: t.Number(),
    intelligence: t.Number(),
    wisdom: t.Number(),
    charisma: t.Number(),
});

export const itemSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
    type: t.Enum(ItemType),
    requiredLevel: t.Optional(t.Number()),
    stats: Stats,
});

export const createItemBodySchema = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    type: t.Enum(ItemType),
    requiredLevel: t.Optional(t.Number()),
    stats: Stats,
});
export type CreateItemBody = Static<typeof createItemBodySchema>;

export const createItemResponseSchema = itemSchema;
export type CreateItemResponse = Static<typeof createItemResponseSchema>;

export const findItemByIdParamsSchema = t.Object({
    id: t.Number(),
});
export type FindItemByIdParams = Static<typeof findItemByIdParamsSchema>;

export const findItemByIdResponseSchema = itemSchema;
export type FindItemByIdResponse = Static<typeof findItemByIdResponseSchema>;

export const findAllItemsQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
});
export type FindAllItemsQuery = Static<typeof findAllItemsQuerySchema>;

export const findAllItemsResponseSchema = t.Array(itemSchema);
export type FindAllItemsResponse = Static<typeof findAllItemsResponseSchema>;
