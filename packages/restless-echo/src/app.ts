import { oak } from './deps.ts';

export const app = new oak.Application();

app.addEventListener('listen', (e) => console.log(`App running on port: ${e.port}`));
app.addEventListener('error', (e) => console.error(e.error));

app.use(async (ctx) => {
  const args: Record<string, string> = {};
  ctx.request.url.searchParams.forEach(([v, k]) => (args[k] = v));

  const headers: Record<string, string> = {};
  Array.from(ctx.request.headers.entries()).forEach(([k, v]) => {
    headers[k] = v;
  });

  ctx.response.headers.set('access-control-allow-credentials', 'true');
  ctx.response.headers.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.response.headers.set('access-control-allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  ctx.response.headers.set('access-control-allow-origin', '*');
  ctx.response.headers.set('cache-control', 'no-cache');
  ctx.response.headers.set('content-type', 'application/json');
  ctx.response.headers.set('date', new Date().toDateString());

  const body = {
    method: ctx.request.method,
    args,
    body: await ctx.request.body().value,
    headers,
    path: ctx.request.url.pathname,
  };

  ctx.response.headers.set('content-length', `${JSON.stringify(body).length}`);

  ctx.response.body = body;
});
