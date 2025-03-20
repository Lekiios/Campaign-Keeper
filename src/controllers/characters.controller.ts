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
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";

export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}

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
        try {
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

            const _class = await this.charactersService.findCharacterClassById(
                character.classId,
            );

            const user = await this.charactersService.findCharacterUserById(
                character.userId,
            );

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
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: {
                        message: error.message,
                    },
                };
            } else if (error instanceof EntityInternalErrorException) {
                return {
                    statusCode: 500,
                    body: {
                        message: error.message,
                    },
                };
            } else {
                throw error;
            }
        }
    }

    async findAllCharacters(
        query: FindAllCharactersQuery,
    ): Promise<ControllerResponse<FindAllCharactersResponse | ErrorResponse>> {
        const { page, count, classId, userId } = query;
        try {
            const characters = await this.charactersService.findAll(
                page,
                count,
                {
                    classId,
                    userId,
                },
            );

            const res = characters.map(async (character) => {
                const _class =
                    await this.charactersService.findCharacterClassById(
                        character.classId,
                    );
                const user = await this.charactersService.findCharacterUserById(
                    character.userId,
                );

                const stats =
                    await this.charactersService.findCharacterStatsById(
                        character.id,
                    );

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
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: {
                        message: error.message,
                    },
                };
            } else if (error instanceof EntityInternalErrorException) {
                return {
                    statusCode: 500,
                    body: {
                        message: error.message,
                    },
                };
            } else {
                throw error;
            }
        }
    }

    async findCharacterById(
        params: FindCharacterByIdParams,
    ): Promise<ControllerResponse<FindCharacterByIdResponse | ErrorResponse>> {
        const { id } = params;
        try {
            const character = await this.charactersService.findById(id);

            const _class = await this.charactersService.findCharacterClassById(
                character.classId,
            );
            const user = await this.charactersService.findCharacterUserById(
                character.userId,
            );

            const stats = await this.charactersService.findCharacterStatsById(
                character.id,
            );

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
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: {
                        message: error.message,
                    },
                };
            } else if (error instanceof EntityInternalErrorException) {
                return {
                    statusCode: 500,
                    body: {
                        message: error.message,
                    },
                };
            } else {
                throw error;
            }
        }
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
                    message: `Character with id ${id} not found.`,
                },
            };
        }
        const _class = await this.charactersService.findCharacterClassById(id);
        const user = await this.charactersService.findCharacterUserById(id);

        const updatedStats =
            await this.charactersService.findCharacterStatsById(id);

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
    ): Promise<ControllerResponse<ErrorResponse | undefined>> {
        const { id } = params;
        try {
            await this.charactersService.delete(id);

            return {
                statusCode: 204,
                body: undefined,
            };
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                return {
                    statusCode: 404,
                    body: {
                        message: error.message,
                    },
                };
            } else {
                throw error;
            }
        }
    }
}
