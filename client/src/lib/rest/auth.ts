import { API_URL, apiRequest } from "./global/httpRequests";
import type {
  LoginData,
  LoginResponse,
  RefreshTokenResponse,
  SignupData,
  SignupResponse,
  UpdateUserResponse,
  UserData,
  UserDataResponse,
} from "../types/auth";

/**
 *
 * @returns {Promise<SignupResponse>}
 */

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const url = `${API_URL}/register`;

  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
      body: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error("Error  signup:", error);
    throw new Error("Failed to sign up");
  }
};

export const activeUser = async (
  token: string
): Promise<{ message: string }> => {
  const url = `${API_URL}/active`;

  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, // Set the content type to JSON
      body: JSON.stringify({ active_token: token }),
    });
    return result;
  } catch (error) {
    console.error("Error  activeUser:", error);
    throw new Error("Failed to active user");
  }
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const url = `${API_URL}/login`;

  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
      body: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error("Error  login:", error);
    throw new Error("Failed to login");
  }
};

export const logout = async (): Promise<{ message: string }> => {
  const url = `${API_URL}/logout`;

  try {
    const result = await apiRequest(url);
    return result;
  } catch (error) {
    console.error("Error  logout:", error);
    throw new Error("Failed to logout");
  }
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const url = `${API_URL}/refresh_token`;

  try {
    const result = await apiRequest(url);
    return result;
  } catch (error) {
    console.error("Error  refreshToken:", error);
    throw new Error("Failed to refresh token");
  }
};

export const getUsers = async (): Promise<UserDataResponse> => {
  const url = `${API_URL}/users`;

  try {
    const result = await apiRequest(url);
    return result;
  } catch (error) {
    console.error("Error  getUsers:", error);
    throw new Error("Failed to get users");
  }
};
export const updateUser = async (
  userId: string,
  data: Partial<UserData>
): Promise<UpdateUserResponse | { message: string }> => {
  const url = `${API_URL}/useredit/${userId}`;
  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = await apiRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error("Error  updateUser:", error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (
  userId: string
): Promise<{ message: string }> => {
  const url = `${API_URL}/userdelete/${userId}`;
  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = await apiRequest(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
    });
    return result;
  } catch (error) {
    console.error("Error  deleteUser:", error);
    throw new Error("Failed to delete user");
  }
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  password: string
): Promise<UpdateUserResponse | { message: string }> => {
  const url = `${API_URL}/changePassword/${userId}`;
  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    console.log(oldPassword + " changed");
    const result = await apiRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify({ userId, oldPassword, password }),
    });
    return result;
  } catch (error) {
    console.error("Error  changePassword:", error);
    throw new Error("Failed to change password");
  }
};

export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  const url = `${API_URL}/forgot_password`;
  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return result;
  } catch (error: any) {
    console.error("Error  forgotpassword:", error);
    throw new Error("Failed to forgot password");
  }
};

export const resetPassword = async (
  password: string
): Promise<{ message: string }> => {
  const url = `${API_URL}/reset_password`; // Ensure this URL matches your backend route for reset password
  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    // check new token
    const result = await apiRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify({ password }),
    });

    return result;
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    throw new Error("Failed to reset password");
  }
};
