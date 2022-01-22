# Welcome to Twinning
***
Imagine someone trying to learn Node by making crappy framework since @decorators look stupid and dumb, so DI is based on parsing and storing controllers and their methods/arguments

## Should i use it?
Hell no. Maybe in a year, but still hell no

## Is there any reason for this DI?
Nope. It probably performs like ass, i dont care, i just toy around with Node

## For some ungodly reason i decided to use it
God have mercy on you.
Routes go into ./Server/Routes.ts Use Route.get(), Route.post() or such
Provide stuff for DI @ ./Server/Providers.ts. Using function makes it fire each time instead of just serving something. Think singleton vs new instance every time or smth
Write controllers at ./Controllers/*.controller.ts. They will get parsed before app is ready for DI, so you dont have @Put('VariablenameButString') @Decorators('Ohgodwhy') @Each('Save me') @Time('Sheesh')
Modify request and response pipelines at ./Server/Build.ts