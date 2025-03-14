import { CharactersService } from "@services/characters.service";
import {
    CreateCharacterBody,
    CreateCharacterResponse,
    FindAllCharactersQuery,
    FindAllCharactersResponse,
} from "@schemas/characters.schema";
import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";
import { ClassesService } from "@services/classes.service";
import { UsersService } from "@services/users.service";
import { ClassEntity, UserEntity } from "@providers/db";

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

    async findAllCharacters(
        query: FindAllCharactersQuery,
    ): Promise<ControllerResponse<FindAllCharactersResponse | ErrorResponse>> {
        const { page, count, classId, userId } = query;

        // Check if class exists
        let _class: ClassEntity | null = null;
        if (classId) {
            _class = await this.classesService.findById(classId);
            if (!_class) {
                return {
                    statusCode: 404,
                    body: {
                        message: `Class with id ${classId} not found`,
                    },
                };
            }
        }

        // Check user exists
        let user: UserEntity | null = null;
        if (userId) {
            user = await this.usersService.findById(userId);
            if (!user) {
                return {
                    statusCode: 404,
                    body: {
                        message: `User with id ${userId} not found`,
                    },
                };
            }
        }

        const characters = await this.charactersService.findAll(page, count, {
            classId,
            userId,
        });

        const res = characters.map(async (character) => {
            _class = await this.classesService.findById(character.classId);

            if (!_class) {
                throw new Error(
                    "Internal Error - Something went wrong in classes entities!",
                );
            }

            user = await this.usersService.findById(character.userId);

            if (!user) {
                throw new Error(
                    "Internal Error - Something went wrong in Users entities!",
                );
            }

            const stats = await this.charactersService.getCharacterStats(
                character.id,
            );

            if (!stats) {
                throw new Error(
                    "Internal Error - Something went wrong in Stats entities!",
                );
            }

            return {
                ...character,
                description: character.description ?? undefined,
                class: {
                    id: _class.id,
                    name: _class.name,
                    description: _class.description ?? undefined,
                },
                user: { id: user.id, username: user.username },
                statsId: undefined,
                stats,
            };
        });

        return {
            statusCode: 200,
            body: await Promise.all(res),
        };
    }
}
