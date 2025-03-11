import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";

import { SpellsService } from "@services/spells.service";
import {
    CreateSpellBody,
    CreateSpellResponse,
    DeleteSpellParams,
    FindAllSpellsBody,
    FindAllSpellsQuery,
    FindAllSpellsResponse,
    FindSpellByIdParams,
    FindSpellByIdResponse,
    UpdateSpellBody,
    UpdateSpellParams,
    UpdateSpellResponse,
} from "@schemas/spells.schema";
import { ClassesService } from "@services/classes.service";
import { ClassEntity } from "@providers/db";

export class SpellsController {
    constructor(
        private readonly spellService: SpellsService,
        private readonly classService: ClassesService,
    ) {}

    async createSpell(
        body: CreateSpellBody,
    ): Promise<ControllerResponse<CreateSpellResponse | ErrorResponse>> {
        const { name, description, type, requiredLevel, classId } = body;

        let _class: ClassEntity | null = null;
        if (classId) {
            _class = await this.classService.findById(classId);
            if (!_class) {
                return {
                    statusCode: 404,
                    body: {
                        message: `Class with id ${classId} not found`,
                    },
                };
            }
        }

        const spell = await this.spellService.create({
            name,
            description: description ?? null,
            type,
            requiredLevel: requiredLevel ?? null,
            classId: classId ?? null,
        });

        return {
            statusCode: 201,
            body: {
                id: spell.id,
                name: spell.name,
                description: spell.description ?? undefined,
                type: spell.type,
                requiredLevel: spell.requiredLevel ?? undefined,
                class: _class
                    ? {
                          id: _class.id,
                          name: _class.name,
                          description: _class.description ?? undefined,
                      }
                    : undefined,
            },
        };
    }

    async findAllSpells(
        query: FindAllSpellsQuery,
        body: FindAllSpellsBody,
    ): Promise<ControllerResponse<FindAllSpellsResponse | ErrorResponse>> {
        const { page, count } = query;

        let _class: ClassEntity | null = null;
        if (body.classId) {
            _class = await this.classService.findById(body.classId);
            if (!_class) {
                return {
                    statusCode: 404,
                    body: {
                        message: `Class with id ${body.classId} not found`,
                    },
                };
            }
        }

        const filter = { classId: body?.classId, type: body?.type };
        const spells = await this.spellService.findAll(page, count, filter);

        const res = spells.map(
            async ({ id, name, description, type, requiredLevel, classId }) => {
                if (!classId) {
                    return {
                        id,
                        name,
                        description: description ?? undefined,
                        type,
                        requiredLevel: requiredLevel ?? undefined,
                    };
                }

                _class = await this.classService.findById(classId);

                if (!_class) {
                    throw new Error(
                        "Internal Error - Something went wrong in classes entities!",
                    );
                }

                return {
                    id,
                    name,
                    description: description ?? undefined,
                    type,
                    requiredLevel: requiredLevel ?? undefined,
                    class: {
                        id: _class.id,
                        name: _class.name,
                        description: _class.description ?? undefined,
                    },
                };
            },
        );

        return {
            statusCode: 200,
            body: await Promise.all(res),
        };
    }

    async findSpellById(
        params: FindSpellByIdParams,
    ): Promise<ControllerResponse<FindSpellByIdResponse | ErrorResponse>> {
        const { id } = params;
        const spell = await this.spellService.findById(id);

        if (!spell) {
            return {
                statusCode: 404,
                body: {
                    message: `Spell with id ${id} not found`,
                },
            };
        }

        if (!spell.classId) {
            return {
                statusCode: 200,
                body: {
                    id: spell.id,
                    name: spell.name,
                    description: spell.description ?? undefined,
                    type: spell.type,
                    requiredLevel: spell.requiredLevel ?? undefined,
                },
            };
        }

        const _class = await this.classService.findById(spell.classId);

        if (!_class) {
            throw new Error(
                "Internal Error - Something went wrong in classes entities!",
            );
        }

        return {
            statusCode: 200,
            body: {
                id: spell.id,
                name: spell.name,
                description: spell.description ?? undefined,
                type: spell.type,
                requiredLevel: spell.requiredLevel ?? undefined,
                class: {
                    id: _class.id,
                    name: _class.name,
                    description: _class.description ?? undefined,
                },
            },
        };
    }

    async deleteSpellById(
        params: DeleteSpellParams,
    ): Promise<ControllerResponse<undefined>> {
        const { id } = params;
        await this.spellService.delete(id);
        return {
            statusCode: 204,
            body: undefined,
        };
    }

    async updateSpellById(
        params: UpdateSpellParams,
        body: UpdateSpellBody,
    ): Promise<ControllerResponse<UpdateSpellResponse | ErrorResponse>> {
        const { id } = params;
        const { name, description, classId, requiredLevel, type } = body;

        let _class: ClassEntity | null = null;
        if (classId) {
            _class = await this.classService.findById(classId);
            if (!_class) {
                return {
                    statusCode: 404,
                    body: {
                        message: `Class with id ${classId} not found`,
                    },
                };
            }
        }

        const updatedSpell = await this.spellService.update(id, {
            name,
            description,
            type,
            requiredLevel,
            classId,
        });

        if (!updatedSpell) {
            return {
                statusCode: 404,
                body: {
                    message: `Spell with id ${id} not found`,
                },
            };
        }

        if (!updatedSpell.classId) {
            return {
                statusCode: 200,
                body: {
                    id: updatedSpell.id,
                    name: updatedSpell.name,
                    description: updatedSpell.description ?? undefined,
                    type: updatedSpell.type,
                    requiredLevel: updatedSpell.requiredLevel ?? undefined,
                },
            };
        }

        if (!_class) {
            _class = await this.classService.findById(updatedSpell.classId);
        }

        return {
            statusCode: 200,
            body: {
                id: updatedSpell.id,
                name: updatedSpell.name,
                description: updatedSpell.description ?? undefined,
                type: updatedSpell.type,
                requiredLevel: updatedSpell.requiredLevel ?? undefined,
                class: _class
                    ? {
                          id: _class.id,
                          name: _class.name,
                          description: _class.description ?? undefined,
                      }
                    : undefined,
            },
        };
    }
}
