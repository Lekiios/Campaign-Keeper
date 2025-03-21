import { PrismaClient } from "@prisma/client";
import { UsersController } from "@controllers/users.controller";
import { UsersService } from "@services/users.service";
import { UsersRepository } from "@repositories/users.repository";
import { ClassesController } from "@controllers/classes.controller";
import { SpellsController } from "@controllers/spells.controller";
import { ItemsController } from "@controllers/items.controller";
import { CharactersController } from "@controllers/characters.controller";
import { ClassesRepository } from "@repositories/classes.repository";
import { ClassesService } from "@services/classes.service";
import { SpellsRepository } from "@repositories/spells.repository";
import { SpellsService } from "@services/spells.service";
import { ItemsRepository } from "@repositories/items.repository";
import { ItemsService } from "@services/items.service";
import { CharactersRepository } from "@repositories/characters.repository";
import { CharactersService } from "@services/characters.service";

export class CampaignKeeperProvider {
    usersController: UsersController;
    classesController: ClassesController;
    spellsController: SpellsController;
    itemsController: ItemsController;
    charactersController: CharactersController;

    constructor(private readonly db: PrismaClient) {
        const usersService = new UsersService(new UsersRepository(this.db));
        this.usersController = new UsersController(usersService);

        const classesService = new ClassesService(
            new ClassesRepository(this.db),
        );
        this.classesController = new ClassesController(classesService);

        const spellsService = new SpellsService(new SpellsRepository(this.db));
        this.spellsController = new SpellsController(spellsService);

        const itemsService = new ItemsService(new ItemsRepository(this.db));
        this.itemsController = new ItemsController(itemsService);

        const charactersService = new CharactersService(
            new CharactersRepository(this.db),
        );
        this.charactersController = new CharactersController(charactersService);
    }
}
