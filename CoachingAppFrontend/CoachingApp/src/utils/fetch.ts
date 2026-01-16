import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;
console.log("BACKEND_BASE_URL:", BACKEND_BASE_URL);

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: RequestInit['body'] | Record<string, any>;
};

export async function fetchWithAuth(
    url: string,
    options: FetchOptions = {}
): Promise<any> {
    const token = await AsyncStorage.getItem('authToken');
    console.log("Token: ", token);
    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
    console.log("Header: ", headers);

    const bodyValue =
        options.body && typeof options.body === 'object'
            ? JSON.stringify(options.body)
            : options.body;

    const { body: _, ...restOptions } = options;
    const config: RequestInit = {
        ...restOptions,
        headers,
        body: bodyValue,
    };
    if (options.method && options.method !== 'GET' && bodyValue) {
      config.body = bodyValue;
    }

    const res = await fetch(`${BACKEND_BASE_URL}${url}`, config);

    if (res.status === 401) {
        await AsyncStorage.removeItem('authToken');
        router.replace('/auth/login');
        throw new Error('Unauthorized');
    }
    console.log(res.json)
    return res.json();
}

export async function fetchBase(
  url: string,
  options: FetchOptions = {}
) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const body =
    options.body && typeof options.body === 'object'
      ? JSON.stringify(options.body)
      : options.body;

  console.log("Fetch URL:", `${BACKEND_BASE_URL}${url}`);
  console.log("Fetch Options:", { ...options, headers, body });
  const res = await fetch(`${BACKEND_BASE_URL}${url}`, { ...options, headers, body });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }

  return res.json();
}