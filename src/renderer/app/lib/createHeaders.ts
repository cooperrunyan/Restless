import type { Request } from './Settings';

export function createHeaders(headers: Request['headers']) {
  return headers
    .slice()
    .filter((header) => header.enabled)
    .map((header) => [header.key, header.value]);
}
