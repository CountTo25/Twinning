import Controller from "../Core/Controller";
import { TwinningWelcome } from "../Core/Misc/TwinningWelcome";
import TwinningRequest from "../Core/TwinningRequest";
import TwinningResponse from "../Core/TwinningResponse";
import Post from "../Models/Post.model";
import Homepage from "../Views/Homepage.view";

export default class Hello extends Controller {
    public sayHi() {
        return {'wow': 'nice'}
    }

    public doSomething(name: string)
    {
    }

    public somethingElse(response: TwinningResponse, request: TwinningRequest, r: TwinningWelcome)
    {
        return {'success': 'true'}
    }

    public withArgument(request: TwinningRequest, id: number, response: TwinningResponse) {
    }

    public async allPosts() {
        const posts = await Post.all();
        return posts;
    }

    public allRoutes() {}

    public hello() {
        return new Homepage();
    }
}