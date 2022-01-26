import Definition from "./Support/Types/Definition";
import Tomestone from "./Tomestone";

export default class Model {
    private __markModel = true;
    protected overloads = {};
    protected table: string|null = null;

    protected figureOutTable(): string {
        return this.constructor.name ?? '';
    }


    public static async all()
    {
        const models = [];
        const raw = await Tomestone.of(this).all();
        const def = Tomestone.of(this).define();
        for (const water of raw) {
            const model = new this();
            model.__hydrate(def, water)
            models.push(model);
        }
        return models;
    }

    protected __hydrate(definition: Definition, raw: object) {
        const keys = Object.keys(raw);
        for (const prop of Object.keys(definition.columns)) {
            const keyToUse = definition.columns[prop] === prop ? prop : definition.columns[prop];
            //@ts-ignore
            this[prop] = raw[keyToUse];
        }
    }
}


type Overloads = {
    relation: string,
    foreignKey?: string,
    relatedKey?: string,
}