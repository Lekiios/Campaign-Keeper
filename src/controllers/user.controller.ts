import { UserService } from "../services/user.service";
import {
    createUserBody,
    createUserResponse,
    findAllUsersQuery,
    findAllUsersResponse,
} from "@schemas/user.schema";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async createUser(body: createUserBody): Promise<createUserResponse> {
        const { username, password, email, profilePicture } = body;

        const user = await this.userService.create({
            username,
            password,
            email,
            profilePicture: profilePicture ?? null,
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            profilePicture: user.profilePicture ?? undefined,
        };
    }

    async findAllUsers(
        query: findAllUsersQuery,
    ): Promise<findAllUsersResponse> {
        const { page, count } = query;
        const users = await this.userService.findAll(page, count);

        return users.map(
            ({ id, username, email, password, profilePicture }) => ({
                id,
                username,
                email,
                password,
                profilePicture: profilePicture ?? undefined,
            }),
        );
    }
}
