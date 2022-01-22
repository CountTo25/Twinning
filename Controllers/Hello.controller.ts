import Controller from "../Core/Controller";
import { TwinningWelcome } from "../Core/Misc/TwinningWelcome";
import TwinningRequest from "../Core/TwinningRequest";
import TwinningResponse from "../Core/TwinningResponse";

export default class Hello extends Controller {
    public sayHi() {
        console.log('wow!')
    }

    public doSomething(name: string)
    {
        console.log(name);   
    }

    public somethingElse(response: TwinningResponse, request: TwinningRequest, r: TwinningWelcome)
    {
        const content = request.content;
        console.log(content.meme);
        console.log(r.text);
        response.json({'success': 'json!'});
    }
}