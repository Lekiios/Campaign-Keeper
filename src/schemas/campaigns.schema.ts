import { Static, Type as t } from "@sinclair/typebox";
import { CampaignStatus } from "@prisma/client";

export const campaignSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
    status: t.Enum(CampaignStatus),
});

// =============================
// CREATE
// =============================

export const createCampaignBodySchema = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    status: t.Optional(t.Enum(CampaignStatus)),
});
export type CreateCampaignBody = Static<typeof createCampaignBodySchema>;

export const createCampaignResponseSchema = campaignSchema;
export type CreateCampaignResponse = Static<
    typeof createCampaignResponseSchema
>;

// =============================
// READ
// =============================

export const findCampaignByIdParamsSchema = t.Object({
    id: t.Number(),
});
export type FindCampaignByIdParams = Static<
    typeof findCampaignByIdParamsSchema
>;

export const simplifiedCharacterSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    level: t.Number(),
    maxHp: t.Number(),
    class: t.Object({
        name: t.String(),
    }),
    stats: t.Object({
        strength: t.Number(),
        dexterity: t.Number(),
        constitution: t.Number(),
        intelligence: t.Number(),
        wisdom: t.Number(),
        charisma: t.Number(),
    }),
});

export const campaignWithSimplifiedCharactersSchema = t.Object({
    name: t.String(),
    characters: t.Array(simplifiedCharacterSchema),
});

export const findCampaignCharactersResponseSchema =
    campaignWithSimplifiedCharactersSchema;
export type FindCampaignCharactersResponse = Static<
    typeof findCampaignCharactersResponseSchema
>;

export const findCampaignSummaryByIdResponseSchema = campaignSchema;
export type FindCampaignSummaryByIdResponse = Static<
    typeof findCampaignSummaryByIdResponseSchema
>;

export const findAllCampaignsQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
});
export type FindAllCampaignsQuery = Static<typeof findAllCampaignsQuerySchema>;

export const findAllCampaignsResponseSchema = t.Array(campaignSchema);
export type FindAllCampaignsResponse = Static<
    typeof findAllCampaignsResponseSchema
>;

// =============================
// UPDATE
// =============================

export const updateCampaignParamsSchema = findCampaignByIdParamsSchema;
export type UpdateCampaignParams = FindCampaignByIdParams;

export const updateCampaignBodySchema = t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    status: t.Optional(t.Enum(CampaignStatus)),
});
export type UpdateCampaignBody = Static<typeof updateCampaignBodySchema>;

export const updateCampaignResponseSchema = campaignSchema;
export type UpdateCampaignResponse = Static<
    typeof updateCampaignResponseSchema
>;

// =============================
// DELETE
// =============================

export const deleteCampaignParamsSchema = findCampaignByIdParamsSchema;
export type DeleteCampaignParams = Static<typeof deleteCampaignParamsSchema>;
