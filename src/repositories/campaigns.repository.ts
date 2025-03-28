import { db } from "@providers/db";
import { CampaignCreateEntity, CampaignUpdateEntity } from "@providers/db";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";

export class CampaignsRepository {
    /**
     * * Create a campaign in the database
     * @param campaign Object that contains the campaign data
     */
    async create(campaign: CampaignCreateEntity) {
        return db.campaign.create({ data: campaign });
    }

    /**
     * Read multiple campaigns from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of campaigns to read
     */
    async findAll(page: number = 0, count: number = 10) {
        return db.campaign.findMany({
            skip: page * count,
            take: count,
        });
    }

    /**
     * Find a specific campaign with its ID
     * @param id id of the campaign to find characters from
     */
    async findCharactersById(id: number) {
        const campaign = await db.campaign.findUnique({
            where: { id },
        });

        if (!campaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${id} not found.`,
            );
        }

        const links = await db.campaignCharacter.findMany({
            where: { campaignId: id },
            select: { characterId: true },
        });

        const characterIds = links.map(
            (link: { characterId: number }) => link.characterId,
        );

        const characters = await db.character.findMany({
            where: { id: { in: characterIds } },
            include: {
                class: true,
                stats: true,
                user: {
                    select: { id: true, username: true },
                },
            },
        });

        return {
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            status: campaign.status,
            characters,
        };
    }

    /**
     * Find a specific campaign with its ID
     * @param id
     */
    async findSummaryById(id: number) {
        const campaign = await db.campaign.findUnique({
            where: { id },
        });

        if (!campaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${id} not found.`,
            );
        }
        return campaign;
    }

    /**
     * Update a campaign in the database
     * @param id id of the campaign to update
     * @param campaign
     */
    async update(id: number, campaign: CampaignUpdateEntity) {
        const findCampaign = await db.campaign.findUnique({ where: { id } });
        if (!findCampaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${id} not found.`,
            );
        }
        return db.campaign.update({
            where: { id },
            data: campaign,
        });
    }

    /**
     * Delete a campaign in the database
     * @param id id of the campaign to delete
     */
    async delete(id: number) {
        const findCampaign = await db.campaign.findUnique({ where: { id } });
        if (!findCampaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${id} not found.`,
            );
        }

        return db.campaign.delete({ where: { id } });
    }

    /**
     * Add a character to a campaign
     * @param characterId id of the character to add in the campaign
     * @param campaignId id of the campaign
     */
    async addCharacterToCampaign(campaignId: number, characterId: number) {
        const campaign = await db.campaign.findUnique({
            where: { id: campaignId },
        });
        if (!campaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${campaignId} not found.`,
            );
        }

        const character = await db.character.findUnique({
            where: { id: characterId },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${characterId} not found.`,
            );
        }

        await db.campaignCharacter.create({
            data: {
                campaignId,
                characterId,
            },
        });
    }

    /**
     * delete a character to a campaign
     * @param characterId id of the character to delete in the campaign
     * @param campaignId id of the campaign
     */
    async deleteCharacterToCampaign(campaignId: number, characterId: number) {
        const campaign = await db.campaign.findUnique({
            where: { id: campaignId },
        });
        if (!campaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${campaignId} not found.`,
            );
        }

        const character = await db.character.findUnique({
            where: { id: characterId },
        });
        if (!character) {
            throw new EntityNotFoundException(
                `Character with id ${characterId} not found.`,
            );
        }

        await db.campaignCharacter.deleteMany({
            where: {
                campaignId,
                characterId,
            },
        });
    }
}
