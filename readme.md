# Welcome to Twinning
***
Imagine someone trying to learn Node a bit deeper by making crappy framework since @decorators look stupid and dumb, so DI is based on parsing and storing controllers and their methods/arguments

## Should i use it?
Hell no. Maybe in a year, but still hell no

## Is there any reason for this DI?
Nope. It probably performs like ass, i dont care, i just toy around with Node and making my own framework from scratch

## ORM?

Eeeeeeeh. I didnt go into making it just yet, but there's simple one already using same style of parsing to achieve it. Current in-project example has an example (duh)

```ts
import { Column, KeyBy } from "../Core/Tomestone/Facades/Descriptions";
import Model from "../Core/Tomestone/Model";

export default class Post extends Model {
    public id!: number|Column
    public text!: string|Column<'content'>  
}
```

Column-typed fields will use variable name for its column, but if you provide generic string it will use that as column name. Same will happen with relations (BelongsTo<Author, 'someCustomTable', 'someCustomId'>) once i get around to that

## For some ungodly reason i decided to use it
God have mercy on you.

Routes go into ./Server/Routes.ts Use Route.get(), Route.post() or such. Interface is kinda fluent, but will require more cleanup later on. For now dont use _-prefixed variables unless you know what you are doing

Provide stuff for DI @ ./Server/Providers.ts. Using function makes it fire each time instead of just serving something. Think singleton vs new instance every time or smth. Actually wait, thats still TODO KEKW

Write controllers at ./Controllers/*.controller.ts. They will get parsed before app is ready for DI, so you dont have @Put('VariablenameButString') @Decorators('Ohgodwhy') @Each('Save me') @Time('Sheesh')

Modify request and response pipelines at ./Server/Build.ts