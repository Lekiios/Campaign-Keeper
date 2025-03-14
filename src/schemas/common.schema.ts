import { Static, Type as t } from "@sinclair/typebox";

export const ErrorResponseSchema = t.Object({
    message: t.String(),
});

export type ErrorResponse = Static<typeof ErrorResponseSchema>;

/**
 * Create a string enum schema from literals array.
 *
 * !!!!! This should be used instead of TypeBox Enum !!!!!
 * @param items - Array of string literals
 * @constructor
 */
export const StringEnum = <T extends string[]>(items: [...T]) =>
    t.Unsafe<T[number]>({ type: "string", enum: items });
