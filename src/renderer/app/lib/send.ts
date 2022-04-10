import { buildRequest } from './buildRequest';
import type { Request } from './Settings';
import YAML from 'yaml';

export async function send(request: Request) {
  const args = buildRequest(request);

  const startTime = Date.now();
  const sentAt = new Date();

  const res = await window.electron.fetch(...args);

  return { ...res, body: parseBodyToJSON(res.body), time: Date.now() - startTime, sentAt };
}

function parseBodyToJSON(body: string) {
  let data: string | Record<string, any> = body;

  try {
    data = JSON.parse(body);
  } catch {
    try {
      data = YAML.parse(body);
    } catch {
      data = body;
    }
  }

  return data;
}

// 'https://echo.hoppscotch.io/', {
//     headers: {
//       accept: 'application/json, text/plain, */*',
//       'accept-language': 'en-US,en;q=0.9',
//       'cache-control': 'no-cache',
//       'content-type': 'application/json',
//       pragma: 'no-cache',
//       'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
//       'sec-ch-ua-mobile': '?0',
//       'sec-ch-ua-platform': '"macOS"',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-site',
//     },
//     referrer: 'https://hoppscotch.io/',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     body: null,
//     method: 'GET',
//   };
