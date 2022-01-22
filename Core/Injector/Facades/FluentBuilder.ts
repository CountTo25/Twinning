import InjectorStorage from "../InjectorStorage";

export default class FluentBuilder {
    constructor(private classname: string) {

    }

    public serve(what: any) {
        InjectorStorage.pushDependency(this.classname, what);
    }


}