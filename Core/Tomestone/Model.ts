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
        for (const water of raw) {
            const model = new this();
            model.__hydrate(water)
            models.push(model);
        }
        return models;
    }

    protected __hydrate(raw: object) {
        const keys = Object.keys(raw);
        for (const prop of keys) {
            //@ts-ignore
            this[prop] = raw[prop];
        }
    }
}


type Overloads = {
    relation: string,
    foreignKey?: string,
    relatedKey?: string,
}