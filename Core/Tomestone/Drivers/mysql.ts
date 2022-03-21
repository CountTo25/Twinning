import mysql2 from "mysql2";
import Driver from "../Support/Driver";
import RequestInstance from "../Support/RequestInstance";


export default function mysql(
        address: string, 
        port: number, 
        user: string, 
        password: string, 
        database: string
    ): Driver
{
    return new MysqlDriver(address, port, user, password, database);
}

class MysqlDriver extends Driver {
    private connection!: mysql2.Connection;


    private build: {[table: string]: {
        select: string[],
    }} = {

    }

    public init() {
        if (!(this.address.startsWith('http://') || this.address.startsWith('https://'))) {
            this.address = 'http://'+this.address;
        }
        this.connection = mysql2.createConnection({
            user: this.user,
            uri: this.address,
            port: this.port,
            password: this.password,
            database: this.database,
        });
    }

    public instance(): MysqlRequestInstance
    {
        return new MysqlRequestInstance().setConnection(this.connection);
    }
}

class MysqlRequestInstance extends RequestInstance {
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

    public insert(table: string, content: {[field: string]: string}) {
        this.query+=`INSERT INTO ${table} (${Object.keys(content).join(',')}) VALUES (${Object.values(content).map(v => `'${v}'`).join(',')})`;
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
                } else {
                    console.log(e);
                }
            });
        })
    }
}