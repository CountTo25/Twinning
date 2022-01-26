import mysql2 from "mysql2";
import RequestInstance from "../Support/RequestInstance";

export default class MysqlRequestInstance extends RequestInstance {
    private connection!: mysql2.Connection;
    private query = '';

    public setConnection(connection: mysql2.Connection): this {
        this.connection = connection;
        return this;
    }

    public select(fields: string[]|string = '*') {
        if (Array.isArray(fields)) {
            fields = fields.join(',');
        }
        this.query+=`SELECT ${fields} `
        return this;
    }

    public from(table: string) {
        this.query+=`FROM ${table} `;
        return this;
    }

    public async finish(): Promise<object[]>
    {
        return new Promise((resolve, reject) => {
            const res = this.connection.execute(this.query, function(e,r,f) {
                if (e === null) {
                    //@ts-ignore
                    const response: object[] = r;
                    resolve(response);
                }
            });
        })
    }
}