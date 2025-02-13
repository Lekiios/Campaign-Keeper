import { Static, Type as t } from "@sinclair/typebox";

export const getExampleQuerySchema = t.Object({
    id: t.Number(),
});

export type GetExampleQuery = Static<typeof getExampleQuerySchema>;

export const getExampleResponseSchema = t.Object({
    email: t.String(),
});

export type GetExampleResponse = Static<typeof getExampleResponseSchema>;

export const getExampleErrorSchema = t.Object({
    message: t.String(),
});

export type GetExampleError = Static<typeof getExampleErrorSchema>;
