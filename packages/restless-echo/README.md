# Deno API Template

Starter api project in deno/oak. It uses Deno, TypeScript, Oak, Docker, Velociraptor, and MongoDB Atlas. You don't **_need_** to know all of these technologies to use it.

## Setup

```bash
mv .env.example .env # rename env file
npm install
npm run dev
```

## Deno

Deno is a Javascript runtime, similar to Nodejs. It is made by the same creator of Node, Ryan Dahl, and is supposed to be the superior version. Deno offers many superior features, like:

- Runtime Typescript compilation
- Secure by default
- Rust backend
- Simplified import/module system
- Promise/async based
- Built-in modern Javascript features

> Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
>
> - Secure by default. No file, network, or environment access, unless explicitly enabled.
> - Supports TypeScript out of the box.
> - Ships only a single executable file.
> - Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
> - Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std
>
> https://www.deno.land

## TypeScript

[TypeScript](https://github.com/microsoft/TypeScript) is a superset of JavaScript that introduces types.

When you use TypeScript with React, you can write JSX with TypeScript, called TSX.

#### tsconfig.json

This template comes with very strict TypeScript settings. See the tsconfig docs [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## Oak

#### Oak is a lightweight http framework for Deno.

Many Javascript/Nodejs developers know about ExpressJS, because it is the most popular one. Koa was a new-and-improved version of Express, for Node, which was created by the same people. For Deno, as Node code isn't compatible, Oak was created as a Deno-ified Koa.

If you know Express, Oak will be super easy to learn!

<a href="https://oakserver.github.io/oak/" target="_blank">Their site</a>

## Docker

In short, containerize your apps.
<a href="https://docs.docker.com/" target="_blank">Documentation</a>

## Velociraptor

Velociraptor is very simple, it is a Deno counterpart to the `npm run` command. Simply install the script, then run `vr <script_name>` or `vr run <script_name>`.

Installation command:

```bash
deno install -qAfn vr https://deno.land/x/velociraptor@1.4.0/cli.ts
```

## MongoDB

Mongo is a free simple cloud database solution.
<a href="https://www.mongodb.com/atlas" target="_blank">Documentation</a>

## Support me!

<a href="https://www.buymeacoffee.com/cooperrunyE" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
