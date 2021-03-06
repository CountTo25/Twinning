export default class RequestInstance {
    public select(fields: string|string[] = '*'): this {return this}
    public from(table: string): this {return this}
    public async finish(): Promise<object[]> {return []}
    public insert(table: string, data: object): this {return this}
}