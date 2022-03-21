import Action from "../Core/Injector/Facades/Action";

/** 
 * DI cant work by itself: it needs to know what to serve and when to do it.
 * If something that is not in ./Services is needed, you can go here to inject it
 * Need something boring that you can provide by yourself? Make a type and use it as basis!
 */

Action.whenRequires('TwinningWelcome').serve({text: 'Hello world'});