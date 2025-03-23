import { Static, Type as t } from "@sinclair/typebox";

export const SessionsSchema = t.Object({
    id: t.Number(),
    campaignId: t.Number(),
    apiUrl: t.String(),
});

export const createSessionBodySchema = t.Object({
    campaignId: t.Number(),
    apiUrl: t.String(),
});
export type CreateSessionBody = Static<typeof createSessionBodySchema>;

export const createSessionResponseSchema = SessionsSchema;
export type CreateSessionResponse = Static<typeof createSessionResponseSchema>;

export const findAllSessionsQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
    campaignId: t.Optional(t.Number()),
});
export type FindAllSessionsQuery = Static<typeof findAllSessionsQuerySchema>;

export const findAllSessionsResponseSchema = t.Array(SessionsSchema);
export type FindAllSessionsResponse = Static<
    typeof findAllSessionsResponseSchema
>;

export const findSessionByIdParamsSchema = t.Object({
    id: t.Number(),
});
export type FindSessionByIdParams = Static<typeof findSessionByIdParamsSchema>;

export const findSessionByIdResponse = SessionsSchema;
export type FindSessionByIdResponse = Static<typeof findSessionByIdResponse>;

export const deleteSessionParamsSchema = findSessionByIdParamsSchema;
export type DeleteSessionParams = FindSessionByIdParams;

export const updateSessionParamsSchema = findSessionByIdParamsSchema;
export type UpdateSessionParams = FindSessionByIdParams;

export const updateSessionBodySchema = t.Object({
    campaignId: t.Optional(t.Number()),
    apiUrl: t.Optional(t.String()),
});
export type UpdateSessionBody = Static<typeof updateSessionBodySchema>;

export const updateSessionResponseSchema = SessionsSchema;
export type UpdateSessionResponse = Static<typeof updateSessionResponseSchema>;
