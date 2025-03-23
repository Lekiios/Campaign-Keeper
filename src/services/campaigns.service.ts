import { CampaignsRepository } from "@repositories/campaigns.repository";
import { CampaignCreateEntity, CampaignUpdateEntity } from "@providers/db";

export class CampaignsService {
    constructor(private campaignsRepository: CampaignsRepository) {}

    async create(campaign: CampaignCreateEntity) {
        return this.campaignsRepository.create(campaign);
    }

    async findAll(page?: number, count?: number) {
        return this.campaignsRepository.findAll(page, count);
    }

    async findCampaignCharactersById(id: number) {
        return this.campaignsRepository.findCharactersById(id);
    }

    async findCampaignSummaryById(id: number) {
        return this.campaignsRepository.findSummaryById(id);
    }

    async update(id: number, campaign: CampaignUpdateEntity) {
        return this.campaignsRepository.update(id, campaign);
    }

    async delete(id: number) {
        return this.campaignsRepository.delete(id);
    }

    async addCharacterToCampaign(campaignId: number, characterId: number) {
        return this.campaignsRepository.addCharacterToCampaign(
            campaignId,
            characterId,
        );
    }

    async deleteCharacterToCampaign(campaignId: number, characterId: number) {
        return this.campaignsRepository.deleteCharacterToCampaign(
            campaignId,
            characterId,
        );
    }
}
