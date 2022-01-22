import HTTP, {IncomingMessage, ServerResponse} from "http";
import {readdirSync, statSync} from 'fs';
import {resolve} from "path";
import config from '../twinning.config.json';
import "../Server/Routes"; //simply import them and they get built
import "../Server/Providers" //same

import {v4 as uuid} from 'uuid';
import RequestPipeline from "./Pipelines/RequestPipeline";
import TwinningRequest from "./TwinningRequest";
import { pipeRequestsTrough, pipeResponseTrough } from "../Server/Build";
import TwinningResponse from "./TwinningResponse";
import ResponsePipeline from "./Pipelines/ResponsePipeline";
import { Reader } from "./Injector/Reader";

export default class Twinning {


    public static run(port: number) {
        const twinning = new this();
        twinning.buildDependencyInjection();
        twinning.createServer(port);
        twinning.announceReady();
    }


    private createServer(port: number) {
        const twinning = this;
        HTTP.createServer(function (rawRequest: IncomingMessage, rawResponse: ServerResponse) {
            TwinningRequest.fromHttp(rawRequest).then((twinningRequest) => {
                twinning.handleRequest(twinningRequest);
                twinning.handleResponse(twinningRequest, rawResponse);
            });
        }).listen(port);
    };

    private handleRequest(tr: TwinningRequest): void
    {
        const pipeline = new RequestPipeline(tr);
        for (const pipe of pipeRequestsTrough) {
            pipeline.extend(pipe);
        }
        pipeline.run();
    }


    private handleResponse(twinningRequest: TwinningRequest, rawResponse: ServerResponse): void
    {
        TwinningResponse.fromHttp(rawResponse).then(twinningResponse => {
            twinningResponse.consumeRequest(twinningRequest);
            const pipeline = new ResponsePipeline(twinningResponse);
            pipeline.addContext(twinningRequest);
            for (const pipe of pipeResponseTrough) {
                pipeline.extend(pipe);
            }
            pipeline.run();
        });
    }

    private announceReady(): void 
    {
        console.log('Twinning is ready!');
        console.log('\x1b[32m▲ \x1b[0\x1b[34m▲ \x1b[0\x1b[31m▲ ▲\x1b[0m');
    }

    private buildDependencyInjection() {
        const dir = './Controllers';
        const all = this.getFiles(dir).filter(f => f.includes('.controller.ts')).map(f => {
            const s = f.split('/');
            return s[s.length-1];
        });
        for (const file of all) {
            const reader = new Reader(file);
            reader.parse();
        }
    }

    private getFiles(dir: string): string[]
    {
        const subdirs = readdirSync(dir);
        const files = subdirs.map((subdir) => {
            const res = resolve(dir, subdir);
            return (statSync(res)).isDirectory() ? this.getFiles(res) : res;
        });
        return files.flat();
    }
}