import FluentBuilder from "./FluentBuilder"

export default class Action {
    public static whenRequires(classname: string): FluentBuilder {
        return new FluentBuilder(classname);
    }
}