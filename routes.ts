import Routes from "./Core/Router/Routes";
import RouteConsumer from "./Core/Router/RouteConsumer";

export default () => Routes.define((route: RouteConsumer) => {
    route.get('/');
    route.get('/test');
});