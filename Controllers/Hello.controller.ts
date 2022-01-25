import Controller from "../Core/Controller";
import { TwinningWelcome } from "../Core/Misc/TwinningWelcome";
import TwinningRequest from "../Core/TwinningRequest";
import TwinningResponse from "../Core/TwinningResponse";
import Post from "../Models/Post.model";

export default class Hello extends Controller {
    public sayHi() {
        console.log('wow!')
        return {'wow': 'nice'}
    }

    public doSomething(name: string)
    {
        console.log(name);   
    }

    public somethingElse(response: TwinningResponse, request: TwinningRequest, r: TwinningWelcome)
    {
        console.log(r);
        return {'success': 'true'}
    }

    public withArgument(request: TwinningRequest, id: number, response: TwinningResponse) {
        console.log('wowzers');
    }

    public async allPosts() {
        const posts = await Post.all();
        return posts;
    }
}