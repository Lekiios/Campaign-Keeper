import { ClassesService } from "@services/classes.service";
import { ControllerResponse } from "@controllers/controllers";
import { ErrorResponse } from "@schemas/common.schema";
import {
    CreateClassBody,
    CreateClassResponse,
    DeleteClassParams,
    FindAllClassesQuery,
    FindAllClassesResponse,
    FindClassByIdParams,
    FindClassByIdResponse,
    UpdateClassBody,
    UpdateClassParams,
    UpdateClassResponse,
} from "@schemas/classes.schema";

export class ClassesController {
    constructor(private readonly classService: ClassesService) {}

    async createClass(
        body: CreateClassBody,
    ): Promise<ControllerResponse<CreateClassResponse>> {
        const { name, description } = body;

        const _class = await this.classService.create({
            name,
            description: description ?? null,
        });

        return {
            statusCode: 201,
            body: {
                id: _class.id,
                name: _class.name,
                description: _class.description ?? undefined,
            },
        };
    }

    async findAllClasses(
        query: FindAllClassesQuery,
    ): Promise<ControllerResponse<FindAllClassesResponse>> {
        const { page, count } = query;
        const classes = await this.classService.findAll(page, count);

        return {
            statusCode: 200,
            body: classes.map(({ id, name, description }) => ({
                id,
                name,
                description: description ?? undefined,
            })),
        };
    }

    async findClassById(
        params: FindClassByIdParams,
    ): Promise<ControllerResponse<FindClassByIdResponse | ErrorResponse>> {
        const { id } = params;

        const _class = await this.classService.findById(id);

        return {
            statusCode: 200,
            body: {
                id: _class.id,
                name: _class.name,
                description: _class.description ?? undefined,
            },
        };
    }

    async deleteClassById(
        params: DeleteClassParams,
    ): Promise<ControllerResponse<ErrorResponse | undefined>> {
        const { id } = params;
        await this.classService.delete(id);
        return {
            statusCode: 204,
            body: undefined,
        };
    }

    async updateClassById(
        params: UpdateClassParams,
        body: UpdateClassBody,
    ): Promise<ControllerResponse<UpdateClassResponse | ErrorResponse>> {
        const { id } = params;
        const { name, description } = body;

        const updatedClass = await this.classService.update(id, {
            name,
            description,
        });

        return {
            statusCode: 200,
            body: {
                id: updatedClass.id,
                name: updatedClass.name,
                description: updatedClass.description ?? undefined,
            },
        };
    }
}
