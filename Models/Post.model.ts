import { Column } from "../Core/Tomestone/Facades/BelongsTo";
import Model from "../Core/Tomestone/Model";

export default class Post extends Model {
    public id!: number|Column;
    public content!: string|Column;  
}