import TwinningRequest from "../TwinningRequest";
import Pipeline from "./Support/Pipeline";

export default class RequestPipeline extends Pipeline<TwinningRequest> {
    
    public getResponse(): TwinningRequest
    {
        return this.subject;
    }
}