/**
 * Welcome to Twinning part that is related to building initial config
 * Lets see whats bootstrapped and where
 */

import { bindSessionId, findRoute, parseData } from "../Core/Server/RequestPipes";
import { end, executeAction, setContent } from "../Core/Server/ResponsePipes";
import mysql from "../Core/Tomestone/Drivers/mysql";
import Driver from "../Core/Tomestone/Support/Driver";

export const microserviceKey: string = ''; //two or more twinning instances can communicate via key. Keep it private

export const pipeRequestsTrough = [
    bindSessionId, //binds unique ids to sessions
    findRoute, //finds routes for this request
    parseData, //shapes raw data into object
    //...and anything you want!
    //or just (t: TwinningRequest) => {whatever you want}
]

export const pipeResponseTrough = [
    executeAction, //run action duh
    setContent, //set content duh x2
    end, //response ends here 
]

export const databaseConfig: DatabaseConfig = {
    host: 'localhost',
    port: 3306,
    driver: mysql,
    user: 'root',
    password: '223322',
    database: 'db',
}

type DatabaseConfig = {
    host: string,
    port: number,
    driver: (
        address: string, 
        port: number, 
        user: string, 
        password: string, 
        database: string
        ) => Driver,
    user: string,
    password: string,
    database: string,
}