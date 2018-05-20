import { Page } from "../models/page.model";
import { EntityService } from "../services/entity-service.service";

export class Pagination<T> {
    pageset: Page<T>;
    error: any;
    message: any;
    page: number;
    constructor(public entityService: EntityService<T, number>) {
        this.pageset = new Page<T>();
    } 
    range(): Array<number> {
        if (this.pageset.totalPages === 0) { return []; }
        const step = 2;
        const doubleStep = step * 2;
        const start = Math.max(0, this.page - step);
        let end = start + 1 + doubleStep;
        if (end > this.pageset.totalPages) { end = this.pageset.totalPages; }

        const ret = [];
        for (let i = start; i !== end; ++i) {
            ret.push(i);
        }
        return ret;
    };

    pagePlus(count: number): number {
        return this.page + count;
    }

    search(i): void {
        this.page = i;
        window.scrollTo(0, 0);
        this.entityService.getAll(this.page, 12).subscribe(
            (pageset: Page<T>) => {
                this.pageset = pageset;
                this.page = pageset.number;
            },
            (error) => {
                this.error = error;
            }
        );
    };
}