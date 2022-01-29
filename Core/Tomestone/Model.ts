import Definition from "./Support/Types/Definition";
import Tomestone from "./Tomestone";

export default class Model {
    private __markModel = true;
    protected overloads = {};
    protected table: string|null = null;

    protected figureOutTable(): string {
        return this.constructor.name ?? '';
    }


    public static async all<T extends Model>(this: new() => T): Promise<T[]>
    {
        const models: T[] = [];
        const raw = await Tomestone.of(new this).all();
        const def = Tomestone.of(new this).define();
        for (const water of raw) {
            const model = new this() as T;
            model.__hydrate(def, water)
            models.push(model);
        }
        return models;
    }

    public static async create<T extends Model>(this: new() => T, data: object & Filler<T>): Promise<T>
    {
        const n = new this;
        const def = Tomestone.of(n).define();
        const reconstructed: {[key: string]: any} = {};
        for (const inModel of Object.keys(data)) {
            //@ts-ignore
            reconstructed[def.columns[inModel]] = data[inModel];
        }
        const raw = await Tomestone.of(n).create(reconstructed);
        n.__hydrate(def, raw);
        return n;
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

type Filler<T extends Model> = {
    [key in keyof Partial<T>]: string|number
}