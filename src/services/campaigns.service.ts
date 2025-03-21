import { CampaignsRepository } from "@repositories/campaigns.repository";
import { CampaignCreateEntity, CampaignUpdateEntity } from "@providers/db";

export class CampaignsService {
    constructor(private campaignsRepository: CampaignsRepository) {}

    async create(campaign: CampaignCreateEntity) {
        return this.campaignsRepository.create(campaign);
    }

    async findAll(page = 0, count = 10) {
        return this.campaignsRepository.findAll(page, count);
    }

    async findById(id: number) {
        return this.campaignsRepository.findById(id);
    }

    async update(id: number, campaign: CampaignUpdateEntity) {
        return this.campaignsRepository.update(id, campaign);
    }

    async delete(id: number) {
        return this.campaignsRepository.delete(id);
    }
}
