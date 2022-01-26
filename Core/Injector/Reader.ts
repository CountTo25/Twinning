import fs from "fs"
import InjectorStorage from "./InjectorStorage";

export class Reader {
    constructor(
        private filename: string
    ) {}

    public parse() {
        const buffer = fs.readFileSync('./Controllers/'+this.filename);
        const lines = buffer.toString().split(/\r?\n/);
        this.findMethods(lines);
    }

    private findMethods(lines: string[]) {
        const filtered = lines.map(l => l.trim()).filter(l => l.startsWith('public'));
        for (let line of filtered) {
            let async = false;
            if (line.includes('async ')) {
                async = true;
                line = line.replace('async ', '');
            }
            const regex = /public (.*)\((.*)\)/gm;
            const matched = regex.exec(line) ?? null;
            if (matched !== null) {
                const method = matched[1] ?? null;
                const args = matched[2] ?? null;
                if (method !== null && args !== null){
                    InjectorStorage.pushController(this.filename);
                    if (args === '') {
                        InjectorStorage.addMethod(this.filename, method, [], async);
                        continue;
                    }
                    const parsedArguments = args.split(',').map((a, i) => {
                        const split = a.split(':');
                        return {id: i, name: split[0].trim(), class: split[1].trim()}
                    })
                    InjectorStorage.addMethod(this.filename, method, parsedArguments, async);
                }
            }
        }
    }
}