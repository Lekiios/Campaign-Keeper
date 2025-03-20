import { Static, Type as t } from "@sinclair/typebox";
import { CampaignStatus } from "@prisma/client";

export const campaignSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
    status: t.Enum(CampaignStatus),
});

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

export const findCampaignByIdParamsSchema = t.Object({
    id: t.Number(),
});
export type FindCampaignByIdParams = Static<
    typeof findCampaignByIdParamsSchema
>;

export const findCampaignByIdResponseSchema = campaignSchema;
export type FindCampaignByIdResponse = Static<
    typeof findCampaignByIdResponseSchema
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

export const deleteCampaignParamsSchema = findCampaignByIdParamsSchema;
export type DeleteCampaignParams = Static<typeof deleteCampaignParamsSchema>;
