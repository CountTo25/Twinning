import TwinningRequest from "../Core/TwinningRequest";
import TwinningResponse from "../Core/TwinningResponse";

export default function requiresJson(
    request: TwinningRequest,
    response: TwinningResponse,
    next: ()=>void,
    abort: ()=>void,
) {
    if (
        //@ts-ignore
        !("content-type" in request.__vanilla.headers 
        //@ts-ignore
        || request.__vanilla.headers["content-type"] !== 'application/json')
    ) {
        console.log('Not json!');
    };
}