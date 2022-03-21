import InjectorStorage from "../Injector/InjectorStorage";
import { json, object } from "../Responder";
import Router from "../Router/Router";
import Tomestone from "../Tomestone/Tomestone";
import TwinningRequest from "../TwinningRequest";
import TwinningResponse from "../TwinningResponse"

export const end = async (tr: TwinningResponse) => {
    tr.end();
    Promise.resolve();
}
export const executeAction = async (tr: TwinningResponse) => {
    //@ts-ignore
    const request: TwinningRequest = tr.__request;
    if (request.route !== null && request.route.controller !== null) {
        //@ts-ignore
        const controller = new request.route._controller();
        //@ts-ignore
        const controllerName = request.route._controller?.name ?? '';
        //@ts-ignore
        const methodName = request.route.methodName;
        const args = InjectorStorage.getDependencies(controllerName, methodName);
        const natives: {[key: string]: any} = {
            'TwinningRequest': request,
            'TwinningResponse': tr,
        }
        const extra = Router.catchArguments(request.route, request.url ?? '')
            .reduce((acc: {[key: string]: any}, n: any) => {acc[n.name] = n.value; return acc}, {});
        const injected: any[] = args.sort((a,b) => a.id - b.id)
            .map(i => InjectorStorage.getDependency(i.class) ?? natives[i.class] ?? extra[i.name] ?? null);
        const isAsync = InjectorStorage.isAsync(controllerName, methodName);
        if (request.route._middleware.length !== 0) {
            for (const middleware of request.route._middleware) {
                middleware(request, tr, ()=>{}, ()=>{});
            }
        }

        if (isAsync) {
            //@ts-ignore
            const res = await controller[methodName](...injected)
            tr.setResponsePayload(res ?? {});
        } else {
            //@ts-ignore
            tr.setResponsePayload(controller[methodName](...injected) ?? {});
        }


        Promise.resolve();
    }
}

export const setContent = async (tr: TwinningResponse) => {
    const map: {[key: string]: Function} = {
        'object': object,
        'array': json,
    }

    const payload = tr.getResponsePayload();
    const type = typeof payload;
    //@ts-ignore
    map[type](tr.__vanilla, payload);
    Promise.resolve();
}