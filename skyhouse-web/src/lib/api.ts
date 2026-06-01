const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path: string, accept: string): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { headers: { Accept: accept } });
  } catch {
    throw new ApiError('Could not reach the SkyHouse API. Is the backend running on port 3000?');
  }

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) detail = body.error;
    } catch {
      detail = `Request failed (${response.status})`;
    }
    throw new ApiError(detail, response.status);
  }

  return response;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await request(path, 'application/json');
  return response.json() as Promise<T>;
}

export async function apiGetText(path: string): Promise<string> {
  const response = await request(path, 'text/csv');
  return response.text();
}
