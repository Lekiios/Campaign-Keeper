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
        const { username, password, email, profile_picture } = body;

        const user = await this.userService.create({
            username,
            password,
            email,
            profile_picture: profile_picture ?? null,
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            profile_picture: user.profile_picture ?? undefined,
        };
    }

    async findAllUsers(
        query: findAllUsersQuery,
    ): Promise<findAllUsersResponse> {
        const { page, count } = query;
        const users = await this.userService.findAll(page, count);

        return users.map(
            ({ id, username, email, password, profile_picture }) => ({
                id,
                username,
                email,
                password,
                profile_picture: profile_picture ?? undefined,
            }),
        );
    }
}
