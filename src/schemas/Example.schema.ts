import { Static, Type as t } from "@sinclair/typebox";

export const getExampleQuerySchema = t.Object({
    toto: t.Number(),
    tata: t.String(),
});

export type GetExampleQuery = Static<typeof getExampleQuerySchema>;

export const getExampleResponseSchema = t.Object({
    titi: t.String(),
});

export type GetExampleResponse = Static<typeof getExampleResponseSchema>;
