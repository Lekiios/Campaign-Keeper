import { Static, Type as t } from "@sinclair/typebox";

export const classesSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Optional(t.String()),
});

export const createClassBodySchema = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
});

export type CreateClassBody = Static<typeof createClassBodySchema>;

export const createClassResponseSchema = classesSchema;

export type CreateClassResponse = Static<typeof createClassResponseSchema>;

export const findAllClassesQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
});

export type FindAllClassesQuery = Static<typeof findAllClassesQuerySchema>;

export const findAllClassesResponseSchema = t.Array(classesSchema);

export type FindAllClassesResponse = Static<
    typeof findAllClassesResponseSchema
>;

export const findClassByIdParamsSchema = t.Object({
    id: t.Number(),
});

export type FindClassByIdParams = Static<typeof findClassByIdParamsSchema>;

export const findClassByIdResponse = classesSchema;

export type FindClassByIdResponse = Static<typeof findClassByIdResponse>;

export const deleteClassParamsSchema = findClassByIdParamsSchema;

export type DeleteClassParams = FindClassByIdParams;

export const updateClassParamsSchema = findClassByIdParamsSchema;
export type UpdateClassParams = FindClassByIdParams;

export const updateClassBodySchema = t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
});

export type UpdateClassBody = Static<typeof updateClassBodySchema>;

export const updateClassResponseSchema = classesSchema;
export type UpdateClassResponse = Static<typeof updateClassResponseSchema>;
