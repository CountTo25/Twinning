/**
 * Welcome to Twinning part that is related to building initial config
 * Lets see whats bootstrapped and where
 */

import { bindSessionId, findRoute, parseData } from "../Core/Server/RequestPipes";
import { end, executeAction, setContent } from "../Core/Server/ResponsePipes";


export const pipeRequestsTrough = [
    bindSessionId, //binds unique ids sessions
    findRoute, //finds routes for this request
    parseData, //shapes raw data into object
    //...and anything you want!
    //or just (t: TwinningRequest) => {whatever you want}

]

export const pipeResponseTrough = [
    executeAction,
    setContent,
    end, //response ends here
]