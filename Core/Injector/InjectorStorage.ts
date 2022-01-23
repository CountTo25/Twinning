class InjectorStorage {
    private controllers: {[key: string]: Controller} = {};
    private dependencyServers: {[key: string]: any} = {};

    public pushController(name: string) {
        const stripped = this.stripName(name);
        if (!(stripped in this.controllers)) {
            this.controllers[this.stripName(name)] = {};
        }
    }

    public addMethod(controller: string, method: string, props: Arguments[]) {
        this.controllers[this.stripName(controller)][method.trim()] = props;
    }

    public getDependencies(controller: string, method: string): Arguments[] {
        const recordedController = this.controllers[this.stripName(controller)] ?? null;
        if (recordedController === null) {return []}
        return recordedController[method] ?? [];
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
    [method: string]: Arguments[];
}

type Arguments = {
    id: number,
    name: string,
    class: string
}

export default new InjectorStorage();