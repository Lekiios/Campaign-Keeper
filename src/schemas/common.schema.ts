import { Static, Type as t } from "@sinclair/typebox";

export const ErrorResponseSchema = t.Object({
    message: t.String(),
});

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
