import HTTP, {IncomingMessage, ServerResponse} from "http";
import {readFileSync} from "fs";
import Tomestone from "./Tomestone/Tomestone";
import View from "./Views/View";

export function json(sr: ServerResponse, content: object|any[]) {
    sr.setHeader('content-type', 'application/json');
    sr.write(JSON.stringify(content));
}


function view(sr: ServerResponse, content: View) {
    sr.setHeader('content-type', 'text/html');
    sr.write(readFileSync(content.getAssetPath()))
}

function model(sr: ServerResponse, content: object) {
    content = Tomestone.stripModelData(content);
    json(sr, content);
}   

export function object(sr: ServerResponse, content: object) {
    const markers: {[key: string]: (sr: ServerResponse, c: object|any) => void} =  {
        '__markView': view, //serve a view
    };
    content = Tomestone.stripModelData(content);

    const key = Object.keys(markers).find(m => m in content);
    let resolver = json;
    if (key !== undefined) {
        resolver = markers[key];
    }
    resolver(sr, content);
}