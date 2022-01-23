import HTTP, {IncomingMessage, ServerResponse} from "http";

export function json(sr: ServerResponse, content: object|any[]) {
    sr.setHeader('content-type', 'application/json');
    sr.write(JSON.stringify(content));
}