import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { EntityInternalErrorException } from "../exceptions/entity-internal-error.exception";

export const server = fastify({
    logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

export const configureServer = async () => {
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
                {
                    name: "Campaigns",
                    description: "Campaigns routes",
                },
                {
                    name: "Sessions",
                    description: "Sessions routes",
                },
            ],
        },
    });
    await server.register(fastifySwaggerUi, {
        routePrefix: "/swagger-ui",
        theme: { title: "Campaign Keeper API" },
    });
};
