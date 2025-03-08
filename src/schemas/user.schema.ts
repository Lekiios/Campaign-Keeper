import { Static, Type as t } from "@sinclair/typebox";

export const createUserBodySchema = t.Object({
    username: t.String(),
    email: t.String(),
    password: t.String(),
    profile_picture: t.Optional(t.String()),
});

export type createUserBody = Static<typeof createUserBodySchema>;

export const createUserResponseSchema = t.Object({
    id: t.Number(),
    username: t.String(),
    email: t.String(),
    password: t.String(),
    profile_picture: t.Optional(t.String()),
});

export type createUserResponse = Static<typeof createUserResponseSchema>;

export const findAllUsersQuerySchema = t.Object({
    page: t.Optional(t.Number()),
    count: t.Optional(t.Number()),
});

export type findAllUsersQuery = Static<typeof findAllUsersQuerySchema>;

export const findAllUsersResponseSchema = t.Array(
    t.Object({
        id: t.Number(),
        username: t.String(),
        email: t.String(),
        password: t.String(),
        profile_picture: t.Optional(t.String()),
    }),
);

export type findAllUsersResponse = Static<typeof findAllUsersResponseSchema>;
