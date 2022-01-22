import Controller from "../Controller";
import RequestType from "../Types/RequestType"

export default class Route {
    public template: string = '';
    public requestMethod: RequestType;

    private _controller: typeof Controller | null = null;
    private methodName: string = '';


    constructor(route: string, method: RequestType) {
        this.template = route;
        this.requestMethod = method;
    }

    public controller(type: typeof Controller): this
    {
        this._controller = type;
        return this;
    }

    public method(name: string): this 
    {
        if (this._controller === null) {
            throw 'Unable to bind method before binding controller';
        }

        const instance = new this._controller();
        if (!(name in instance)) {
            throw `There is no such method as "${name}" in ${this._controller.name}`
        }
        this.methodName = name;
        return this;
    }
}