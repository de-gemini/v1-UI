import { getToken } from "./auth";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  if (!token) {
    console.error("No token found, user may not be authenticated.");
    throw new Error("Unauthorized");
  }

  console.log(token)

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  return fetch(url, { ...options, headers });
};