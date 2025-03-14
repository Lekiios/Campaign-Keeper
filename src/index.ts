import { configurePlugins, server } from "@providers/server";
import "dotenv/config";
import { createDbClient } from "@providers/db";

const { SERVER_PORT = 5000, SERVER_HOST = "0.0.0.0" } = process.env;

const main = async () => {
    try {
        await configurePlugins();

        await Promise.all([
            await import("@routes/users.route"),
            await import("@routes/classes.route"),
            await import("@routes/spells.route"),
            await import("@routes/items.route"),
        ]);

        await server.listen({
            port: Number(SERVER_PORT),
            host: SERVER_HOST,
        });
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

export const db = createDbClient();
main().catch(console.error);
