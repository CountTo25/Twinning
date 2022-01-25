export default class Driver {
    constructor(
        protected address: string,
        protected port: number,
        protected user: string,
        protected password: string,
        protected database: string,
    ) {
        this.init();
    }
    public init() {}
    public select(fields: string|string[] = '*'): this {return this}
    public from(table: string): this {return this}
    public async finish(): Promise<object[]> {return []}
}