import mysql2 from "mysql2";
import Driver from "../Support/Driver";
import MysqlRequestInstance from "./MysqlRequestInstance";

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
    private query: string = '';


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