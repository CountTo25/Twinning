import Controller from "../Controller";
import Middleware from "../Middleware/Middleware";
import RequestType from "../Types/RequestType"
import View from "../Views/View";

export default class Route {
    public template: string = '';
    public requestMethod: RequestType;

    private _controller: typeof Controller | null = null;
    private methodName: string = '';
    public _middleware: Middleware[] = [];
    private _view: typeof View | null = null;




    constructor(route: string, method: RequestType) {
        this.template = route;
        this.requestMethod = method;
    }

    public view(view: typeof View): void
    { //cant chain after this
        this._view = view;
    }

    public middleware(mw: Middleware[]|Middleware): this
    {
        this._middleware = this._middleware.concat(mw);
        return this;
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