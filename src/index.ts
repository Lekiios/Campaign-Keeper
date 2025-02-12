import { configurePlugins, server } from "@providers/server";

const { SERVER_PORT = 3000, SERVER_HOST = "127.0.0.1" } = process.env;

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
