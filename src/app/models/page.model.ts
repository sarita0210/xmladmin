export class Page<Entity> {
    constructor(public content?: Array<Entity>, public totalPages?: number, public totalElements?: number,
    public last?: boolean, public size?: number,public number?: number, public numberOfElements?: number, public first?: boolean) {}
}