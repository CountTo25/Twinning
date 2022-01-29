import TwinningRequest from "../TwinningRequest";
import {v4 as uuid} from "uuid";
import Router from "../Router/Router";


export const bindSessionId = async (tr: TwinningRequest) => {
    tr.setSession(uuid())
    Promise.resolve();
}

export const findRoute = async (tr: TwinningRequest) => {
    if (tr.url !== null) {
        tr.route = Router.findRoute(tr.url, tr.type ?? 'GET');     
    }
    Promise.resolve();
}

export const parseData = async (tr: TwinningRequest) => {
    const raw = tr.__content;
    if (raw === '') {
        //@ts-ignore
        tr.content = {};
        Promise.resolve();
        return;
    }
    let parsed = JSON.parse(tr.__content ?? "{}");
    if (Array.isArray(parsed)) {
        parsed = {parsed};
    }
    //@ts-ignore
    tr.content = parsed;
    Promise.resolve();
}