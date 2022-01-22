import HTTP, {IncomingMessage, ServerResponse} from "http";
import Route from "./Router/Route";

export default class TwinningRequest {
    public readonly type!: ('POST'|'GET')|null;
    public readonly url!: string|null
    public readonly __content!: string;
    public readonly content!: {[key: string]: any};

    private sessionId: string|null = null;


    private chunks: any[] = [];
    private __vanilla!: IncomingMessage;

    public route: Route|null = null;

    public static async fromHttp(vanilla: IncomingMessage): Promise<TwinningRequest>
    {
        const instance = new this();
        instance.__vanilla = vanilla;            
        //@ts-ignore
        instance.type = vanilla.method; 
        //@ts-ignore
        instance.url = vanilla.url;
        const content = await instance.readContent();
        //@ts-ignore
        instance.__content = content;
        return Promise.resolve(instance);
    }

    public setSession(id: string): void
    {
        if (this.sessionId === null) {return;}
        this.sessionId = id;
    }

    public getSession(): string|null 
    {
        return this.sessionId;
    }

    private async readContent() {
        const promise: Promise<string> = new Promise((resolve, reject) => {
            if (this.type !== 'POST') {
                resolve('{}');
            }

            this.__vanilla.on('data', (partial) => {
                this.chunks.push(partial);
            }).on('end', () => {
                resolve(Buffer.concat(this.chunks).toString());
            })
        })

        return promise;  
    }
}