import { databaseConfig } from "../../Server/Build";
import Model from "./Model";
import Driver from "./Support/Driver";
import TomestoneWorker from "./Support/TomestoneWorker";

class Tomestone {
    private driver!: Driver;

    public bootDriver() {
        const dbc = databaseConfig;
        this.driver = dbc.driver(dbc.host, dbc.port, dbc.user, dbc.password, dbc.database);
    }

    public of(model: typeof Model): TomestoneWorker {
        return new TomestoneWorker(new model(), this.driver);
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
} 
export default new Tomestone()