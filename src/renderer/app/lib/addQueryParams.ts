import type { Request } from './Settings';

export function addQueryParams(request: Request) {
  let preview = '';
  preview += request.endpoint;
  preview += '?';
  for (const query of request.query) {
    if (!query.key || !query.enabled) continue;
    preview += encodeURIComponent(query.key) + '=' + encodeURIComponent(query.value) + '&';
  }

  return preview.slice(0, -1);
}
