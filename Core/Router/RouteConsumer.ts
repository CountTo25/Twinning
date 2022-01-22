import Action from "../Action";
import RouteDefinition from "./Types/RouteDefinition";
import TwinningResponse from "./Types/TwinningResponse";

export default class RouteConsumer {
    constructor() {}

    public routes: RouteDefinition = {};
    public get(location: string): void {
        this.routes[location] = {
            method: 'GET',
        };
    }
}