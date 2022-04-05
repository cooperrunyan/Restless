import { Request } from './Settings';
import yaml from 'yaml';

export function createBody(body: Request['body']) {
  if (body.type === 'json') {
    let data;

    try {
      data = JSON.parse(body.data!) as object;
      return { data: JSON.stringify(data), type: 'application/json' };
    } catch {
      throw 'Body is not valid JSON data';
    }
  }

  if (body.type === 'yaml') {
    try {
      yaml.parse(body.data!);

      return { data: body.data!, type: 'text/yaml' };
    } catch {
      throw 'Body is not valid YAML data';
    }
  }

  if (body.type === 'text' && body.data) return { data: body.data!, type: 'text/plain' };

  return null;
}
