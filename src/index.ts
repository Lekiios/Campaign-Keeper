import { configurePlugins, server } from "@providers/server";
import "dotenv/config";

const { SERVER_PORT = 5000, SERVER_HOST = "0.0.0.0" } = process.env;

const main = async () => {
    try {
        await configurePlugins();

        await Promise.all([await import("@routes/Example")]);

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
