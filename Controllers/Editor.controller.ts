import Controller from "../Core/Controller";
import TwinningRequest from "../Core/TwinningRequest";
import TwinningResponse from "../Core/TwinningResponse";
import Post from "../Models/Post.model";

export default class Editor extends Controller {
    public async createPost() {
        await Post.create({text: 'New post!'});
    }
}