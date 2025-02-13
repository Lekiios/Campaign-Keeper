import { server } from "@providers/server";
import {
    getExampleErrorSchema,
    getExampleQuerySchema,
    getExampleResponseSchema,
} from "@schemas/Example.schema";
import { db } from "../index";

server.get(
    "/example",
    {
        schema: {
            querystring: getExampleQuerySchema,
            response: {
                200: getExampleResponseSchema,
                500: getExampleErrorSchema,
            },
            tags: ["Example"],
        },
    },
    async (request, reply) => {
        const { id } = request.query;

        const user = await db.user.findUnique({ where: { id } });

        if (!user) {
            return reply.status(500).send({ message: "User not found" });
        }

        return reply.status(200).send({ email: user.email });
    },
);
