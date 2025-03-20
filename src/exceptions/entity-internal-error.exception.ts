export class EntityInternalErrorException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EntityNotFoundException";
    }
}
