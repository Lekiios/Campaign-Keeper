import { Static, Type as t } from "@sinclair/typebox";

export const userSchema = t.Object({
    id: t.Number(),
    username: t.String(),
    email: t.String({ format: "email" }),
    password: t.String(),
    profilePicture: t.Optional(t.String()),
});

export const createUserBodySchema = t.Object({
    username: t.String(),
    email: t.String({ format: "email" }),
    password: t.String(),
    profilePicture: t.Optional(t.String()),
});

export type CreateUserBody = Static<typeof createUserBodySchema>;

export const createUserResponseSchema = userSchema;

export type CreateUserResponse = Static<typeof createUserResponseSchema>;

export const findAllUsersQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
});

export type FindAllUsersQuery = Static<typeof findAllUsersQuerySchema>;

export const findAllUsersResponseSchema = t.Array(userSchema);

export type FindAllUsersResponse = Static<typeof findAllUsersResponseSchema>;

export const findUserByIdParamsSchema = t.Object({
    id: t.Number(),
});

export type FindUserByIdParams = Static<typeof findUserByIdParamsSchema>;

export const findUserByIdResponseSchema = userSchema;

export type FindUserByIdResponse = Static<typeof findUserByIdResponseSchema>;

export const deleteUserParamsSchema = findUserByIdParamsSchema;

export type DeleteUserParams = FindUserByIdParams;

export const updateUserBodySchema = t.Object({
    username: t.Optional(t.String()),
    email: t.Optional(t.String({ format: "email" })),
    password: t.Optional(t.String()),
    profilePicture: t.Optional(t.String()),
});
export type UpdateUserBody = Static<typeof updateUserBodySchema>;

export const updateUserParamsSchema = findUserByIdParamsSchema;
export type UpdateUserParams = FindUserByIdParams;

export const updateUserResponseSchema = createUserResponseSchema;
export type UpdateUserResponse = CreateUserResponse;
