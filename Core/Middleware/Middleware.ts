import TwinningRequest from "../TwinningRequest";
import TwinningResponse from "../TwinningResponse";

type Middleware = (
    request: TwinningRequest,
    response: TwinningResponse,
    next: ()=>void,
    abort: ()=>void,
) => void;

export default Middleware;