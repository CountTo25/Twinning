import fs from "fs"

export default class Parser {
    public static parse(from: string, filename: string): string[] 
    {
        const buffer = fs.readFileSync(`./${from}/`+filename);
        const lines = buffer.toString().split(/\r?\n/);
        return lines.map(l => l.trim());
    }
}