import TrueRoute from "../Route";
import RouteGroup from "../RouteGroup";
import Router from "../Router";

export default class Route {
    public static get(path: string) {
        const route = new TrueRoute(path, 'GET');
        Router.pushRoute(route);
        return route;
    }

    public static post(path: string) {
        const route = new TrueRoute(path, 'POST');
        Router.pushRoute(route);
        return route;
    }

    public static group(): RouteGroup
    {
        return new RouteGroup;
    }
}