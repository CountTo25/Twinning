class Matcher {
    constructor(private what: any) {}

    to(values: {[key: string]: any}): any {
        return values[this.what.toString()] ?? null
    }
}

export default function(what: any): Matcher
{
    return new Matcher(what)
}