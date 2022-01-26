import Model from "../Model";
import pluralize from "pluralize";
import Driver from "./Driver";
import Definition from "./Types/Definition";

export default class TomestoneWorker {
    private model: Model;
    private driver: Driver;
    private table: string;
    private definition: Definition;
    constructor(m: Model, d: Driver, def: Definition) {
        //@ts-ignore
        this.table = pluralize(m.figureOutTable().toLowerCase());
        this.model = m;
        this.driver = d;
        this.definition = def;
    }

    public define(): Definition
    {
        return this.definition;
    }

    public async all(): Promise<object[]>
    {
        const columns = Object.values(this.definition.columns);
        return await this.driver.instance()
            .select(columns).from(this.table).finish();
    }
}