export const AUTH_TOKEN_KEY = 'auth-token';
export const AUTH_EXPIRED_EVENT = 'auth-expired';

export function getAuthToken() {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export async function apiFetch(input, options) {
  const token = getAuthToken();

  if (!token) {
    return options === undefined ? fetch(input) : fetch(input, options);
  }

  const requestOptions = options || {};
  const headers = new Headers(requestOptions.headers || {});
  headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(input, { ...requestOptions, headers });

  if ((response.status === 401 || response.status === 403) && token) {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }

  return response;
}
