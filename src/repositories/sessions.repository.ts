import { db, SessionUpdateEntity, SessionCreateEntity } from "@providers/db";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";

export class SessionsRepository {
    /**
     * Create a Session in the database
     * @param session Object that contains the Session data
     */
    async create(session: SessionCreateEntity) {
        const findCampaign = await db.campaign.findUnique({
            where: { id: session.campaignId },
        });
        if (!findCampaign) {
            throw new EntityNotFoundException(
                `Campaign with id ${session.campaignId} not found.`,
            );
        }

        return db.session.create({ data: session });
    }

    /**
     * Read multiple sessions from the database
     * @param [page=0] page to start reading from
     * @param [count=10] number of sessions to read
     * @param filter filter to apply to the query {campaignId: number}
     */
    async findAll(
        page: number = 0,
        count: number = 10,
        filter?: { campaignId?: number },
    ) {
        if (filter?.campaignId) {
            const findCampaign = await db.campaign.findUnique({
                where: { id: filter.campaignId },
            });
            if (!findCampaign) {
                throw new EntityNotFoundException(
                    `Campaign with id ${filter.campaignId} not found.`,
                );
            }
        }
        return db.session.findMany({
            skip: page * count,
            take: count,
            where: { campaignId: filter?.campaignId },
        });
    }

    /**
     * Read a session from the database
     * @param id id of the session to read
     */
    async findById(id: number) {
        const session = await db.session.findUnique({
            where: { id },
        });

        if (!session) {
            throw new EntityNotFoundException(
                `Session with id ${id} not found.`,
            );
        }
        return session;
    }

    /**
     * Delete a session from the database
     * @param id id of the session to delete
     */
    async delete(id: number) {
        const session = await db.session.findUnique({ where: { id } });

        if (!session) {
            throw new EntityNotFoundException(
                `Session with id ${id} not found.`,
            );
        }

        return db.session.delete({
            where: { id },
        });
    }

    /**
     * Update a session in the database
     * @param id id of the session to update
     * @param session
     */
    async update(id: number, session: SessionUpdateEntity) {
        const findSession = await db.session.findUnique({ where: { id } });

        if (!findSession) {
            throw new EntityNotFoundException(
                `Session with id ${id} not found.`,
            );
        }

        return db.session.update({
            where: { id },
            data: session,
        });
    }
}
