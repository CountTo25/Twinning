/** 
 * Routes are defined here. Have fun!
 */

import Hello from "../Controllers/Hello.controller";
import Route from "../Core/Router/Facade/Route";

Route.get('/').controller(Hello).method('sayHi');
Route.get('/test').controller(Hello).method('doSomething');
Route.get('/welcome').controller(Hello).method('somethingElse');
Route.post('/post').controller(Hello).method('somethingElse');
Route.get('/dir/:id').controller(Hello).method('withArgument');
Route.get('/posts/all').controller(Hello).method('allPosts');