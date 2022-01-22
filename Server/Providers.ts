import Action from "../Core/Injector/Facades/Action";

/** 
 * DI cant work by itself: it needs to know what to serve and when to do it.
 * Need something boring that you can provide by yourself? Make a type and use it as basis!
 */

Action.whenRequires('TwinningWelcome').serve({text: 'Hello world'});