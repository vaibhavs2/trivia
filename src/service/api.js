/**
 * @flow strict-local
 */

export function apiRequest(url: string, method: 'GET') {
  return fetch(url, {method});
}

export async function getNextQuestion() {
  try {
    const response = await apiRequest('https://jservice.io/api/random', 'GET');
    const json = await response.json().catch(() => undefined);
    if (json !== undefined) {
      return json;
    }
    throw new Error(json.message || 'Got some error, try later!');
  } finally {
    // don't need this for now
  }
}
