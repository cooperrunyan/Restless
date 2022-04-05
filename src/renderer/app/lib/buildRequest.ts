import { addQueryParams } from './addQueryParams';
import { createBody } from './createBody';
import { createHeaders } from './createHeaders';
import type { Request } from './Settings';

export function buildRequest(request: Request) {
  const url = addQueryParams(request);
  const body = createBody(request.body);
  const headers = createHeaders(request.headers);

  if (body?.type) headers.unshift(['Content-type', body.type]);

  headers.push(['user-agent', 'restless/0.0.0']);

  const options: RequestInit = {
    body: body?.data,
    headers,
    method: request.method,
    window: null,
  };

  if (!options.body) delete options.body;

  return [url, options] as const;
}
