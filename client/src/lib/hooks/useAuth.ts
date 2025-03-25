import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LoginData,
  RefreshTokenResponse,
  SignupData,
  UserData,
  UserDataResponse,
} from "../types/auth";
import {
  activeUser,
  changePassword,
  deleteUser,
  forgotPassword,
  getUsers,
  login,
  logout,
  refreshToken,
  resetPassword,
  signup,
  updateUser,
} from "../rest/auth";

export function useAuth() {
  // Logout Query
  const { data: logoutData } = useQuery<{ message: string }>({
    queryKey: ["logout"],
    queryFn: logout,
    retry: false,
    enabled: false,
  });

  // Refresh Token Query
  const { data: refreshData } = useQuery<RefreshTokenResponse>({
    queryKey: ["refreshToken"],
    queryFn: refreshToken,
    retry: false,
    enabled: false,
  });

  // get Users
  const { data: usersData, ...queryResult } = useQuery<UserDataResponse>({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
    retry: false,
  });
  return {
    logoutMessage: logoutData?.message || "",
    refreshTokenData: refreshData || null,
    users: usersData?.data || null,
  };
}

export function useAuthMutation() {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (data: SignupData) => await signup(data),
    onSuccess: () => {
      console.log("Register success!");
    },
    onError: (error) => {
      console.error("Error registering:", error);
    },
  });

  const activeMutation = useMutation({
    mutationFn: async (token: string) => await activeUser(token),
    onSuccess: () => {
      console.log("User activated!");
    },
    onError: (error) => {
      console.error("Error activating user:", error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => await login(data),
    onSuccess: () => {
      console.log("Login success!");
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<UserData>;
    }) => {
      return await updateUser(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const changeUserMutation = useMutation({
    mutationFn: async ({
      userId,
      oldPassword,
      password,
    }: {
      userId: string;
      oldPassword: string;
      password: string;
    }) => {
      return await changePassword(userId, oldPassword, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      return await forgotPassword(email);
    },
    onSuccess: (data) => {
      console.log("Success:", data.message);
    },
    onError: (error: any) => {
      console.error("Error during forgot password:", error);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (password: string) => {
      return await resetPassword(password);
    },
    onSuccess: (data) => {
      console.log("Success:", data.message);
    },
    onError: (error: any) => {
      console.error("Error during forgot password:", error);
    },
  });

  return {
    register: registerMutation.mutate,
    active: activeMutation.mutate,
    login: loginMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    changePassword: changeUserMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
  };
}
