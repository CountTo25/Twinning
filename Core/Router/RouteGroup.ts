import Router from "./Router";
import match from "../Tools/match";
import Middleware from "../Middleware/Middleware"

export default class RouteGroup {
    private _prefix: string|null = null;
    private _middleware: Middleware[] = [];

    public prefix(prefix: string) :this
    {
        this._prefix = prefix;
        return this;
    }
    public routes(fn: () => void) {
        if (this._prefix !== null) {
            Router.addPrefix(this._prefix);
        }

        if (this._middleware.length !== 0) {
            Router.addMiddleware(this._middleware);
        }
        fn();
        if (this._prefix !== null) {
            Router.removePrefix(this._prefix);
        }
        if (this._middleware.length !== 0) {
            Router.removeMiddleware(this._middleware);
        }
    }

    public middleware(mw: Middleware[]|Middleware): this 
    {
        this._middleware = this._middleware.concat(mw);
        return this;
    }
}