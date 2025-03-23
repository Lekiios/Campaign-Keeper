import { SessionCreateEntity, SessionUpdateEntity } from "@providers/db";
import { SessionsRepository } from "@repositories/sessions.repository";

export class SessionsService {
    constructor(private sessionsRepository: SessionsRepository) {}

    /**
     * Create a session in the database
     * @param session Object that contains the session data
     */
    async create(session: SessionCreateEntity) {
        return this.sessionsRepository.create(session);
    }

    /**
     * Read multiple sessions from the database
     * @param page page to start reading from
     * @param count number of sessions to read
     * @param filter filter to apply to the query {campaignId: number}
     */
    async findAll(
        page?: number,
        count?: number,
        filter?: { campaignId?: number },
    ) {
        return this.sessionsRepository.findAll(page, count, filter);
    }

    /**
     * Read a session from the database
     * @param id id of the session to read
     */
    findById(id: number) {
        return this.sessionsRepository.findById(id);
    }

    /**
     * Delete a session from the database
     * @param id id of the session to delete
     */
    async delete(id: number) {
        return this.sessionsRepository.delete(id);
    }

    /**
     * Update a session in the database
     * @param id id of the session to update
     * @param session
     */
    async update(id: number, session: SessionUpdateEntity) {
        return this.sessionsRepository.update(id, session);
    }
}
