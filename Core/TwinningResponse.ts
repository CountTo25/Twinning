import HTTP, {IncomingMessage, ServerResponse} from "http";
import TwinningRequest from "./TwinningRequest";

export default class TwinningResponse {

    private __vanilla!: ServerResponse;
    private __request!: TwinningRequest;
    public route: string = '';
    private responsePayload: any = null;


    public static async fromHttp(vanilla: ServerResponse): Promise<TwinningResponse>
    {
        const instance = new this();
        instance.__vanilla = vanilla;            
        return Promise.resolve(instance);
    }

    public end() {
        this.__vanilla.end();
    }

    public consumeRequest(tr: TwinningRequest) {
        this.__request = tr;
    }

    public setResponsePayload(payload: any) {
        this.responsePayload = payload;
    }

    public getResponsePayload() {
        return this.responsePayload;
    }
}