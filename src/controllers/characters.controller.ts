import { CharactersService } from "@services/characters.service";
import {
    CreateCharacterBody,
    CreateCharacterResponse,
} from "@schemas/characters.schema";
import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";
import { ClassesService } from "@services/classes.service";
import { UsersService } from "@services/users.service";

export class CharactersController {
    constructor(
        private readonly charactersService: CharactersService,
        private readonly classesService: ClassesService,
        private readonly usersService: UsersService,
    ) {}

    async createCharacter(
        body: CreateCharacterBody,
    ): Promise<ControllerResponse<CreateCharacterResponse | ErrorResponse>> {
        const {
            name,
            description,
            level,
            userId,
            inventorySize,
            maxHp,
            money,
            xp,
            requiredXp,
            classId,
            stats,
        } = body;

        // Check if class exists
        const _class = await this.classesService.findById(classId);
        if (!_class) {
            return {
                statusCode: 404,
                body: {
                    message: `Class with id ${classId} not found`,
                },
            };
        }

        // Check user exists
        const user = await this.usersService.findById(userId);
        if (!user) {
            return {
                statusCode: 404,
                body: {
                    message: `User with id ${userId} not found`,
                },
            };
        }

        const character = await this.charactersService.create({
            name,
            description: description ?? null,
            level: level ?? 1,
            userId,
            inventorySize,
            maxHp,
            currentHp: maxHp,
            money: money ?? 0,
            xp: xp ?? 0,
            requiredXp: requiredXp ?? 100,
            classId,
            stats,
        });

        return {
            statusCode: 201,
            body: {
                ...character,
                description: character.description ?? undefined,
                class: {
                    id: _class.id,
                    name: _class.name,
                    description: _class.description ?? undefined,
                },
                stats,
                user: { username: user.username, id: user.id },
            },
        };
    }
}
