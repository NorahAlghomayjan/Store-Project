export enum Status {
    active = 'ACTIVE',
    compeleted = 'COMPELETED',
}
export class Order {
    id: number;
    status: Status;
    constructor() {
        this.id = 1;
        this.status = Status.active;
    }
}
