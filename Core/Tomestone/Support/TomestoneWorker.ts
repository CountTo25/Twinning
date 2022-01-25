import Model from "../Model";
import pluralize from "pluralize";
import Driver from "./Driver";

export default class TomestoneWorker {
    private model: Model;
    private driver: Driver;
    private table: string;
    constructor(m: Model, d: Driver) {
        //@ts-ignore
        this.table = pluralize(m.figureOutTable().toLowerCase());
        this.model = m;
        this.driver = d;
    }

    public async all(): Promise<object[]>
    {
        return await this.driver.select().from(this.table).finish();
    }
}