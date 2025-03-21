import { configureServer, FastifyTypeBox } from "@providers/server";
import "dotenv/config";
import "@providers/db";
import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { UsersRoutes } from "@routes/users.route";
import { ClassesRoutes } from "@routes/classes.route";
import { SpellsRoutes } from "@routes/spells.route";
import { ItemsRoutes } from "@routes/items.route";
import { CharactersRoutes } from "@routes/characters.route";
import { CampaignKeeperProvider } from "@providers/campaignKeeper";
import { db } from "@providers/db";

const { SERVER_PORT = 5000, SERVER_HOST = "0.0.0.0" } = process.env;

const main = async () => {
    const server: FastifyTypeBox = fastify({
        logger: true,
    }).withTypeProvider<TypeBoxTypeProvider>();

    try {
        const ck = new CampaignKeeperProvider(db);

        await configureServer(server);

        UsersRoutes(server, ck.usersController);
        ClassesRoutes(server, ck.classesController);
        SpellsRoutes(server, ck.spellsController);
        ItemsRoutes(server, ck.itemsController);
        CharactersRoutes(server, ck.charactersController);

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
