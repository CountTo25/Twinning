import HTTP, {IncomingMessage, ServerResponse} from "http";
import Tomestone from "./Tomestone/Tomestone";

export function json(sr: ServerResponse, content: object|any[]) {
    sr.setHeader('content-type', 'application/json');
    sr.write(JSON.stringify(content));
}