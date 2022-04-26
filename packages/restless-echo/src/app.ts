import Application from 'koa';

export const app = new Application();

app.use(async (ctx) => {
  const args: Record<string, string> = {};
  ctx.request.URL.searchParams.forEach(([v, k]) => (args[k!] = v!));

  const headers: Record<string, string | string[]> = {};
  Object.entries(ctx.request.headers).forEach(([k, v]) => (headers[k!] = v!));

  ctx.response.headers;

  ctx.response.headers['access-control-allow-credentials'] = 'true';
  ctx.response.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  ctx.response.headers['access-control-allow-methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD';
  ctx.response.headers['access-control-allow-origin'] = '*';
  ctx.response.headers['cache-control'] = 'no-cache';
  ctx.response.headers['content-type'] = 'application/json';
  ctx.response.headers['date'] = new Date().toDateString();

  const body = {
    method: ctx.request.method,
    args,
    body: await ctx.request.toJSON(),
    headers,
    path: ctx.request.URL.pathname,
  };

  ctx.response.headers['content-length'] = `${JSON.stringify(body).length}`;

  ctx.response.body = body;
});
