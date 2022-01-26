import { databaseConfig } from "../../Server/Build";
import Model from "./Model";
import Driver from "./Support/Driver";
import TomestoneWorker from "./Support/TomestoneWorker";
import Parser from "../Parser/Parser";
import Definition from "./Support/Types/Definition";

class Tomestone {
    private driver!: Driver;
    private parsed: {[model: string]: Definition} = {}

    public bootDriver() {
        const dbc = databaseConfig;
        this.driver = dbc.driver(dbc.host, dbc.port, dbc.user, dbc.password, dbc.database);
    }

    public of(model: typeof Model): TomestoneWorker {
        const instance = new model();
        return new TomestoneWorker(instance, this.driver, this.parsed[instance.constructor.name]);
    }


    public stripModelData(from: object|any[]|any) {
        const strippable = [
            '__markModel',
            'overloads',
            'table',
        ];

        const isArray = Array.isArray(from);
        if (isArray) {
            for (const entry of from) {
                if ('__markModel' in entry) {
                    this.stripModelData(entry);
                }
            }
        } else {
            for (const toStrip of strippable) {
                delete from[toStrip];
            }

            const keys = Object.keys(from);
            for (const key of keys) {
                if (typeof from[key] === 'object' && '__markModel' in from[key]) {
                    this.stripModelData(from)[key];
                }
            }
        }

        return from;
    }

    public recordFile(filename: string) {
        const lines = Parser.parse('Models', filename);
        let accumulated = {};
        const className = this.findClassName(lines);
        console.log(className);
        for (const line of lines) {
            const entry = this.inspectModelLine(line);
            if (entry === null) {continue}
            accumulated = {...accumulated, ...entry};
        }
        const columns = this.getColumnsFromDefinitions(accumulated);
        const relations = {}//this.getRelationFromDefinitions(accumulated);
        this.parsed[className] = {columns, relations};
        console.log(this.parsed);
    }

    private inspectModelLine(line: string)
    {
        const facades = ['Column', 'HasOne', 'Key'];
        const regex = /public (.*): .*(Column|HasOne)+/gm;
        const matched = regex.exec(line) ?? null;
        if (matched === null) {return null}
        const prop = matched[1].replace('!', '');
        const rightSide = line.split(':')[1].trim();
        const keys = rightSide.split('|').filter(rs => facades.includes(rs.split('<')[0]))
        return {[prop]: keys};
    }

    private getColumnsFromDefinitions(accumulated: {[field: string]: string[]})
    {
        const keys = Object.keys(accumulated);
        const columns: {[key: string]: string} = {}
        for (const field of keys) {
            const columnDefinition = accumulated[field].find(f => f.startsWith('Column')) ?? null;
            if (columnDefinition !== null) {
                const fieldName = columnDefinition.includes('<') 
                    ? columnDefinition.replace(/<|>|'|"/gm, '').replace('Column', '')
                    : field;
                columns[field] = fieldName
            }
        }
        return columns;
    }

    private findClassName(lines: string[]) {
        const classLine = lines.find(l => l.includes('class ') && l.includes('extends Model')) ?? '';
        return classLine.replace('export default class', '').replace('extends Model', '').replace('{', '').trim();
    }
} 
export default new Tomestone()