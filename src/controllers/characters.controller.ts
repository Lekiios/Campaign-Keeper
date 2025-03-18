import { CharactersService } from "@services/characters.service";
import {
    CreateCharacterBody,
    CreateCharacterResponse,
    FindAllCharactersQuery,
    FindAllCharactersResponse,
    FindCharacterByIdParams,
    FindCharacterByIdResponse,
    UpdateCharacterBody,
    UpdateCharacterParams,
    UpdateCharacterResponse,
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
            const _class = await this.classesService.findById(
                character.classId,
            );
            if (!_class) {
                throw new Error(
                    "Internal Error - Something went wrong in classes entities!",
                );
            }

            const user = await this.usersService.findById(character.userId);
            if (!user) {
                throw new Error(
                    "Internal Error - Something went wrong in Users entities!",
                );
            }

            const stats = await this.charactersService.findCharacterStatById(
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

    async findCharacterById(
        params: FindCharacterByIdParams,
    ): Promise<ControllerResponse<FindCharacterByIdResponse | ErrorResponse>> {
        const { id } = params;
        const character = await this.charactersService.findById(id);

        if (!character) {
            return {
                statusCode: 404,
                body: {
                    message: `Character with id ${id} not found`,
                },
            };
        }

        const _class = await this.classesService.findById(character.classId);
        if (!_class) {
            throw new Error(
                "Internal Error - Something went wrong in classes entities!",
            );
        }

        const user = await this.usersService.findById(character.userId);
        if (!user) {
            throw new Error(
                "Internal Error - Something went wrong in Users entities!",
            );
        }

        const stats = await this.charactersService.findCharacterStatById(
            character.id,
        );
        if (!stats) {
            throw new Error(
                "Internal Error - Something went wrong in Stats entities!",
            );
        }

        return {
            statusCode: 200,
            body: {
                ...character,
                description: character.description ?? undefined,
                class: {
                    id: _class.id,
                    name: _class.name,
                    description: _class.description ?? undefined,
                },
                user: { id: user.id, username: user.username },
                stats,
            },
        };
    }

    async updateCharacter(
        params: UpdateCharacterParams,
        body: UpdateCharacterBody,
    ): Promise<ControllerResponse<UpdateCharacterResponse | ErrorResponse>> {
        const { id } = params;
        const {
            name,
            description,
            level,
            requiredXp,
            xp,
            maxHp,
            money,
            inventorySize,
            classId,
            stats,
            userId,
        } = body;

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

        const updatedCharacter = await this.charactersService.update(id, {
            name,
            description,
            level,
            requiredXp,
            xp,
            maxHp,
            money,
            inventorySize,
            classId,
            stats,
            userId,
        });

        if (!updatedCharacter) {
            return {
                statusCode: 404,
                body: {
                    message: `Character with id ${id} not found`,
                },
            };
        }

        if (!_class) {
            _class = await this.classesService.findById(
                updatedCharacter.classId,
            );
            if (!_class) {
                throw new Error(
                    "Internal Error - Something went wrong in classes entities!",
                );
            }
        }
        if (!user) {
            user = await this.usersService.findById(updatedCharacter.userId);
            if (!user) {
                throw new Error(
                    "Internal Error - Something went wrong in Users entities!",
                );
            }
        }

        const updatedStats =
            await this.charactersService.findCharacterStatById(id);

        if (!updatedStats) {
            throw new Error(
                "Internal Error - Something went wrong in Stats entities!",
            );
        }

        return {
            statusCode: 200,
            body: {
                ...updatedCharacter,
                description: updatedCharacter.description ?? undefined,
                class: {
                    id: _class.id,
                    name: _class.name,
                    description: _class.description ?? undefined,
                },
                user: { id: user.id, username: user.username },
                stats: updatedStats,
            },
        };
    }

    async deleteCharacter(
        params: FindCharacterByIdParams,
    ): Promise<ControllerResponse<undefined>> {
        const { id } = params;
        await this.charactersService.delete(id);

        return {
            statusCode: 204,
            body: undefined,
        };
    }
}
