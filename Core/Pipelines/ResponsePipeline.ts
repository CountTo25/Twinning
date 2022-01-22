import TwinningRequest from "../TwinningRequest";
import TwinningResponse from "../TwinningResponse";
import Pipeline from "./Support/Pipeline";

export default class ResponsePipeline extends Pipeline<TwinningResponse> {
    private request!: TwinningRequest;

    public addContext(tr: TwinningRequest) {
        this.request = tr;
    }
}