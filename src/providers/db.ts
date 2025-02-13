import { PrismaClient } from "@prisma/client";

export const createDbClient = () => {
    return new PrismaClient({
        log: ["info", "query", "error", "warn"],
    });
};
