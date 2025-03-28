import { configureServer, server } from "@providers/server";
import "dotenv/config";
import "@providers/db";

const { SERVER_PORT = 5000, SERVER_HOST = "0.0.0.0" } = process.env;

const main = async () => {
    try {
        await configureServer();

        await Promise.all([
            await import("@routes/users.route"),
            await import("@routes/classes.route"),
            await import("@routes/spells.route"),
            await import("@routes/characters.route"),
            await import("@routes/items.route"),
            await import("@routes/campaigns.route"),
            await import("@routes/sessions.route"),
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

main().catch(console.error);
