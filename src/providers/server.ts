import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

export const server = fastify({
    logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

export const configurePlugins = async () => {
    await server.register(fastifySwagger, {
        swagger: {
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                {
                    name: "users",
                    description: "Users routes",
                },
            ],
        },
    });
    await server.register(fastifySwaggerUi, {
        routePrefix: "/swagger-ui",
    });
};
