import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

export type FastifyTypeBox = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    TypeBoxTypeProvider
>;

export const configureServer = async (server: FastifyTypeBox) => {
    server.setErrorHandler((error, _, reply) => {
        if (error instanceof EntityNotFoundException) {
            return reply.code(404).send({ message: error.message });
        } else if (error instanceof EntityInternalErrorException) {
            return reply.code(500).send({ message: error.message });
        } else {
            throw error;
        }
    });

    await server.register(fastifySwagger, {
        swagger: {
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                {
                    name: "Users",
                    description: "Users routes",
                },
                {
                    name: "Classes",
                    description: "Classes routes",
                },
                {
                    name: "Items",
                    description: "Items routes",
                },
                {
                    name: "Spells",
                    description: "Spells routes",
                },
                {
                    name: "Characters",
                    description: "Characters routes",
                },
            ],
        },
    });
    await server.register(fastifySwaggerUi, {
        routePrefix: "/swagger-ui",
        theme: {
            title: "Campaign Keeper API",
        },
        uiConfig: { docExpansion: "list" },
    });
};
