import { server } from "@providers/server";
import {
    getExampleQuerySchema,
    getExampleResponseSchema,
} from "@schemas/Example.schema";

server.get(
    "/example",
    {
        schema: {
            querystring: getExampleQuerySchema,
            response: { 200: getExampleResponseSchema },
        },
    },
    async (request, reply) => {
        const { toto, tata } = request.query;

        return reply
            .status(200)
            .send({ titi: `{toto: ${toto}, tata: ${tata}}` });
    },
);
