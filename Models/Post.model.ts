import { Column, KeyBy } from "../Core/Tomestone/Facades/Descriptions";
import Model from "../Core/Tomestone/Model";

export default class Post extends Model {
    public id!: number|Column
    public text!: string|Column<'content'>  

    public doSomething() {
        
    }
}