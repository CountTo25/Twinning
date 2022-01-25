import RequestInstance from "./RequestInstance";

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
    public instance(): RequestInstance {return new RequestInstance}

}