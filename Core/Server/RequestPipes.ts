import TwinningRequest from "../TwinningRequest";
import {v4 as uuid} from "uuid";
import Router from "../Router/Router";


export const bindSessionId = (tr: TwinningRequest) => {
    tr.setSession(uuid())
}

export const findRoute = (tr: TwinningRequest) => {
    if (tr.url !== null) {
        tr.route = Router.findRoute(tr.url, tr.type ?? 'GET');     
    }
}

export const parseData = (tr: TwinningRequest) => {
    let parsed = JSON.parse(tr.__content);
    if (Array.isArray(parsed)) {
        parsed = {parsed};
    }
    //@ts-ignore
    tr.content = parsed;
}