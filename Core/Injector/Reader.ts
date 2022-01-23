import fs from "fs"
import InjectorStorage from "./InjectorStorage";

export class Reader {
    constructor(
        private filename: string
    ) {}

    public parse() {
        const buffer =fs.readFileSync('./Controllers/'+this.filename);
        const lines = buffer.toString().split(/\r?\n/);
        this.findMethods(lines);
    }

    private findMethods(lines: string[]) {
        const filtered = lines.map(l => l.trim()).filter(l => l.startsWith('public'));
        for (const line of filtered) {
            const regex = /public (.*)\((.*)\)/gm;
            const matched = regex.exec(line) ?? null;
            if (matched !== null) {
                const method = matched[1] ?? null;
                const args = matched[2] ?? null;

                if (method !== null && args !== null && args !== ''){
                    InjectorStorage.pushController(this.filename);
                    const parsedArguments = args.split(',').map((a, i) => {
                        const split = a.split(':');
                        return {id: i, name: split[0].trim(), class: split[1].trim()}
                    })
                    InjectorStorage.addMethod(this.filename, method, parsedArguments);
                }
            }
        }
    }
}