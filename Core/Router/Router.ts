import Route from "./Route";
import RequestType from "../Types/RequestType";

class Router {

    private routes: {[key in RequestType]: {[key: string]: Route}} = {
        'GET': {},
        'POST': {},
        'PUT': {},
        'PATCH': {},
        'DELETE': {},
    };

    private catchArguments(route: Route) 
    {
        const split = route.template.split('/');
        //const splitActual = this.actual.split('/');
        const argumentable = split.filter(part => part.startsWith('{') && part.endsWith('}'));
        const indexes = argumentable.map(a => split.indexOf(a));
        //return indexes.map(i => splitActual[i]);
    }

    public pushRoute(route: Route) {
        route.template = this.cleanupPath(route.template);
        this.routes[route.requestMethod][route.template] = route;
    }

    public findRoute(name: string, method: RequestType)
    {
        name = this.cleanupPath(name);
        const source = this.routes[method]
        let route: Route|null = source[name] ?? null;
        if (route.requestMethod !== method) {route = null}
        return route;
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
}

export default new Router();