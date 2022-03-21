import Microservice from "./Microservice";

export default class Joiner {
    constructor(
        private port: number
    ) {}

    public as(service: typeof Microservice) {

    }
}