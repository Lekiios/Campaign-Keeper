import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";

import { SpellsService } from "@services/spells.service";
import {
    CreateSpellBody,
    CreateSpellResponse,
    DeleteSpellParams,
    FindAllSpellsQuery,
    FindAllSpellsResponse,
    FindSpellByIdParams,
    FindSpellByIdResponse,
    UpdateSpellBody,
    UpdateSpellParams,
    UpdateSpellResponse,
} from "@schemas/spells.schema";

export class SpellsController {
    constructor(private readonly spellService: SpellsService) {}

    async createSpell(
        body: CreateSpellBody,
    ): Promise<ControllerResponse<CreateSpellResponse | ErrorResponse>> {
        const { name, description, type, requiredLevel, classId } = body;

        const spell = await this.spellService.create({
            name,
            description: description ?? null,
            type,
            requiredLevel: requiredLevel ?? null,
            classId: classId ?? null,
        });

        const _class = classId
            ? await this.spellService.getSpellClass(spell.id)
            : undefined;

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
    ): Promise<ControllerResponse<FindAllSpellsResponse | ErrorResponse>> {
        const { page, count } = query;

        const filter = { classId: query?.classId, type: query?.type };
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

                const _class = await this.spellService.getSpellClass(id);

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

        const _class = await this.spellService.getSpellClass(spell.id);

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
    ): Promise<ControllerResponse<ErrorResponse | undefined>> {
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

        const updatedSpell = await this.spellService.update(id, {
            name,
            description,
            type,
            requiredLevel,
            classId,
        });

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

        const _class = await this.spellService.getSpellClass(updatedSpell.id);

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
