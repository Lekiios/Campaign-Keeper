import { UsersService } from "@services/users.service";
import {
    CreateUserBody,
    CreateUserResponse,
    DeleteUserParams,
    FindAllUsersQuery,
    FindAllUsersResponse,
    FindUserByIdParams,
    FindUserByIdResponse,
    UpdateUserBody,
    UpdateUserParams,
    UpdateUserResponse,
} from "@schemas/users.schema";
import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";

export class UsersController {
    constructor(private readonly userService: UsersService) {}

    async createUser(
        body: CreateUserBody,
    ): Promise<ControllerResponse<CreateUserResponse>> {
        const { username, password, email, profilePicture } = body;

        const user = await this.userService.create({
            username,
            password,
            email,
            profilePicture: profilePicture ?? null,
        });

        return {
            statusCode: 201,
            body: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                profilePicture: user.profilePicture ?? undefined,
            },
        };
    }

    async findAllUsers(
        query: FindAllUsersQuery,
    ): Promise<ControllerResponse<FindAllUsersResponse>> {
        const { page, count } = query;
        const users = await this.userService.findAll(page, count);

        return {
            statusCode: 200,
            body: users.map(
                ({ id, username, email, password, profilePicture }) => ({
                    id,
                    username,
                    email,
                    password,
                    profilePicture: profilePicture ?? undefined,
                }),
            ),
        };
    }

    async findUserById(
        params: FindUserByIdParams,
    ): Promise<ControllerResponse<FindUserByIdResponse | ErrorResponse>> {
        const { id } = params;

        const user = await this.userService.findById(id);

        return {
            statusCode: 200,
            body: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                profilePicture: user.profilePicture ?? undefined,
            },
        };
    }

    async deleteUserById(
        params: DeleteUserParams,
    ): Promise<ControllerResponse<ErrorResponse | undefined>> {
        const { id } = params;

        await this.userService.delete(id);
        return {
            statusCode: 204,
            body: undefined,
        };
    }

    async updateUserById(
        params: UpdateUserParams,
        body: UpdateUserBody,
    ): Promise<ControllerResponse<UpdateUserResponse | ErrorResponse>> {
        const { id } = params;
        const { username, email, password, profilePicture } = body;

        const updatedUser = await this.userService.update(id, {
            username,
            email,
            password,
            profilePicture: profilePicture,
        });

        return {
            statusCode: 200,
            body: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                password: updatedUser.password,
                profilePicture: updatedUser.profilePicture ?? undefined,
            },
        };
    }
}
