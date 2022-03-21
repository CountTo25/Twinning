import Route from "./Route";
import RequestType from "../Types/RequestType";
import Middleware from "../Middleware/Middleware";

class Router {

    private routes: {[key in RequestType]: {[key: number]: {[key: string]: Route}}} = {
        'GET': {},
        'POST': {},
        'PUT': {},
        'PATCH': {},
        'DELETE': {},
    };

    private prefixStorage: string[] = [];
    private middlewareStorage: Middleware[] = [];

    public catchArguments(route: Route, actual: string) 
    {
        const split = route.template.split('/');
        const splitActual = this.cleanupPath(actual).split('/');
        const argumentable = split.filter(part => part.startsWith(':'));
        const indexes = argumentable.map(a => split.indexOf(a));
        return indexes.map(i => {return {name: split[i].replace(':', ''), value: splitActual[i]}});
    }

    public pushRoute(route: Route) {
        route.template = this.cleanupPath(route.template);
        route.template = this.mixInPrefixes(route.template);
        route._middleware = this.middlewareStorage.slice();
        const key = route.template.split('/').length;
        if (!(key in this.routes[route.requestMethod])) {
            this.routes[route.requestMethod][key] = {};
        }
        this.routes[route.requestMethod][key][route.template] = route;
    }

    public findRoute(name: string, method: RequestType)
    {
        name = this.cleanupPath(name);
        const split = name.split('/');
        const length = split.length;
        const source = this.routes[method]

        const possible = this.routes[method][length];
        let iterable = Object.keys(possible).map(m => m.split('/'));
        for (let i = 0; i<split.length; i++) {
            iterable = iterable.filter(possible => (possible[i] === split[i] || possible[i].startsWith(':')));
        }
        if (iterable.length > 1) {
            iterable = iterable.sort((a,b) => 
                a.filter(s => s.startsWith(':')).length - b.filter(s => s.startsWith(':')).length
            )
        }
        if (iterable.length === 0) {return null};
        const restored = this.cleanupPath(iterable[0].join('/'));
        return this.routes[method][length][restored];
    }

    private cleanupPath(path: string): string
    {
        if (path.startsWith('/')) {
            path = path.slice(1);
        }
        if (path.endsWith('/')) {
            path = path.slice(0, path.length - 1);
        }
        return path
    }

    public addPrefix(prefix: string): void {
        this.prefixStorage.push(prefix);
    }

    public addMiddleware(mw: Middleware[]): void {
        this.middlewareStorage = this.middlewareStorage.concat(mw.filter(mwe => !this.middlewareStorage.includes(mwe)));
    }

    public removePrefix(prefix: string) {
        this.prefixStorage = this.prefixStorage.filter(p => p !== prefix);
    }

    public removeMiddleware(mw: Middleware[]) {
        this.middlewareStorage = this.middlewareStorage.filter(mwe => !mw.includes(mwe));
    }

    private mixInPrefixes(path: string): string 
    {
        for (const prefix of this.prefixStorage) {
            path = prefix + '/' + path;
        }
        return path;
    }
}

export default new Router();