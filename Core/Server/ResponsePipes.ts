import InjectorStorage from "../Injector/InjectorStorage";
import TwinningRequest from "../TwinningRequest";
import TwinningResponse from "../TwinningResponse"

export const end = (tr: TwinningResponse) => tr.end() 
export const executeAction = (tr: TwinningResponse) => {
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

        const injected: any[] = args.sort((a,b) => a.id - b.id)
            .map(i => InjectorStorage.getDependency(i.class) ?? natives[i.class] ?? null);
        //@ts-ignore
        controller[methodName](...injected);
    }
}