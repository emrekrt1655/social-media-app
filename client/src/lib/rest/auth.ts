import { apiRequest } from "./global/httpRequests";
import type {
  ChangePasswordData,
  LoginData,
  LoginResponse,
  RefreshTokenResponse,
  SignupData,
  SignupResponse,
  UpdateUserResponse,
} from "../types/auth";

// register
export const register = (data: SignupData) =>
  apiRequest<SignupResponse>("/register", "POST", data);

//active user

export const activeUser = (token: string) =>
  apiRequest<{ message: String }>("/active", "POST", { active_token: token });

// login

export const login = (data: LoginData) =>
  apiRequest<LoginResponse>("/login", "POST", data);

// logout
export const logout = () => apiRequest<{ message: string }>("/logout");

// refresh token
export const refreshToken = () =>
  apiRequest<RefreshTokenResponse>("/refresh_token");

// get users
export const getUsers = () => apiRequest<UserDataResponse>("/users");

export const updateUser = (userId: string, data: Partial<UserData>) =>
  apiRequest<UserDataResponse | { message: string }>(
    `/useredit/${userId}`,
    "PUT",
    data
  );

export const deleteUser = (userId: string) =>
  apiRequest<{ message: string }>(`/userdelete/${userId}`, "DELETE");

export const changePassword = (data: ChangePasswordData) =>
  apiRequest<UpdateUserResponse | { message: string }>(
    `/changePassword/${data?.userId}`,
    "PUT",
    data
  );

export const forgetPassword = (email: string) =>
  apiRequest<{ message: string }>("/forgot_password", "POST", email);

export const resetPassword = (password: string) =>
  apiRequest<{ message: string }>("/reset_password", "PUT", password);
