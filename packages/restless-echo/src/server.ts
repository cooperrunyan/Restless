console.log('Starting...');

import { app } from './app.ts';
import { config as env } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';

Object.entries(env()).forEach(([key, value]) => Deno.env.set(key, value));

await app.listen({ port: +Deno.env.get('PORT')! });
