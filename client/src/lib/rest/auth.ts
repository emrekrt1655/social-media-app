import { API_URL, apiRequest } from "./global/httpRequests";
import type { LoginData, LoginResponse, RefreshTokenResponse, SignupData, SignupResponse } from "../types/auth";

/**
 * 
 * @returns {Promise<SignupResponse>}
 */

 export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const url = `${API_URL}/register`;

  try {
    const result = await apiRequest(url, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },  // Set the content type to JSON
        body: JSON.stringify(data) });
    return result;
  } catch (error) {
    console.error("Error  signup:", error);
    throw new Error("Failed to sign up");
  }
};

export const  activeUser = async (token: string): Promise<{message: string}> => {
  const url = `${API_URL}/active`;

  try {
    const result = await apiRequest(url, { 
        method: "POST", 
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },  // Set the content type to JSON
        body: JSON.stringify({ active_token: token }) });
    return result;
  } catch (error) {
    console.error("Error  activeUser:", error);
    throw new Error("Failed to active user");
  }
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const url = `${API_URL}/login`;

  try {
    const result = await apiRequest(url, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },  // Set the content type to JSON
        body: JSON.stringify(data) });
    return result;
  } catch (error) {
    console.error("Error  login:", error);
    throw new Error("Failed to login");
  }
}

export const logout = async () : Promise<{message: string}> => {
  const url = `${API_URL}/logout`;

  try {
    const result = await apiRequest(url)
    return result;
  } catch (error) {
    console.error("Error  logout:", error);
    throw new Error("Failed to logout");
  }
}

export const refreshToken =  async (): Promise<RefreshTokenResponse> => {
  const url = `${API_URL}/refresh_token`;

  try {
    const result = await apiRequest(url);
    return result;
  } catch (error) {
    console.error("Error  refreshToken:", error);
    throw new Error("Failed to refresh token");
  }
}