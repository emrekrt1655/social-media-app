const API_URL = "http://localhost:8000/api";

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("accessToken");
  return token ? { Token: `${token}` } : {};
};

/**
 * Generalized API Request Function
 * @param endpoint - API endpoint (relative path)
 * @param method - HTTP method (default: "GET")
 * @param body - Request body (optional)
 * @returns Parsed JSON response
 */
const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: body ? JSON.stringify(body) : undefined,
      //credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${method} ${endpoint}`, error);
    throw error;
  }
};

export { apiRequest };
