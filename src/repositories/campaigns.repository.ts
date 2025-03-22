import { db } from "../index";
import { CampaignCreateEntity, CampaignUpdateEntity } from "@providers/db";

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
     * @param id
     */
    async findCharactersById(id: number) {
        const campaign = await db.campaign.findUnique({
            where: { id },
        });

        if (!campaign) return null;

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
        return db.campaign.findUnique({
            where: { id },
        });
    }

    /**
     * Update a campaign in the database
     * @param id id of the campaign to update
     * @param campaign
     */
    async update(id: number, campaign: CampaignUpdateEntity) {
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
        return db.campaign.delete({ where: { id } });
    }
}
