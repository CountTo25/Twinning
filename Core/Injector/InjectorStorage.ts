class InjectorStorage {
    private controllers: {[key: string]: Controller} = {};
    private dependencyServers: {[key: string]: any} = {};

    public pushController(name: string) {
        const stripped = this.stripName(name);
        if (!(stripped in this.controllers)) {
            this.controllers[this.stripName(name)] = {};
        }
    }

    public addMethod(controller: string, method: string, props: Arguments[], isAsync: boolean) {
        this.controllers[this.stripName(controller)][method.trim()] = {
            arguments: props,
            isAsync
        };
    }

    public isAsync(controller: string, method: string): boolean 
    {
        return this.controllers[controller][method].isAsync
    }

    public getDependencies(controller: string, method: string): Arguments[] {
        const recordedController = this.controllers[this.stripName(controller)] ?? null;
        if (recordedController === null) {return []}
        return recordedController[method].arguments ?? [];
    }

    public pushDependency(className: string, value: any): void 
    {
        this.dependencyServers[className] = value;
    }

    public getDependency(name: string): any|null
    {
        return this.dependencyServers[name] ?? null;
    }

    private stripName(name: string) {
        return name.replace('.controller.ts', '');
    }
}




type Controller = {
    [method: string]: {isAsync: boolean, arguments: Arguments[]};
}

type Arguments = {
    id: number,
    name: string,
    class: string
}

export default new InjectorStorage();