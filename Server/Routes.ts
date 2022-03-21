/** 
 * Routes are defined here. Have fun!
 */

import Route from "../Core/Router/Facade/Route";

import Editor from "../Controllers/Editor.controller";
import Hello from "../Controllers/Hello.controller";
import requiresJson from "../Middleware/RequiresJson.middleware";

Route.get('/').controller(Hello).method('hello');
Route.get('/test').controller(Hello).method('doSomething');
Route.get('/welcome').controller(Hello).method('somethingElse');
Route.post('/post').controller(Hello).method('somethingElse');
Route.get('/dir/:id').controller(Hello).method('withArgument');
Route.get('/posts/all').controller(Hello).method('allPosts');

Route.post('/posts/create').middleware(requiresJson).controller(Editor).method('createPost');

Route.group().prefix('post').middleware((tr, r, n, a) => {console.log('bruuuuh')}).routes(() => {
    Route.get('show').controller(Hello).method('allPosts');
});

