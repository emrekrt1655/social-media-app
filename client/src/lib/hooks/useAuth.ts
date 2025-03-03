import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginData, RefreshTokenResponse, SignupData } from "../types/auth";
import { activeUser, login, logout, refreshToken, signup } from "../rest/auth";


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

    return {
        logoutMessage: logoutData?.message || "",
        refreshTokenData: refreshData || null,
    };
}

export function useAuthMutation(){
    const registerMutation = useMutation({
        mutationFn: async (data: SignupData) => await signup(data), 
        onSuccess: () => {
            console.log("Register success!")
        },
        onError: (error) => {
            console.error("Error registering:", error)
        },
    })

    const activeMutation = useMutation({
        mutationFn: async (token: string) => await activeUser(token), 
        onSuccess: () => {
            console.log("User activated!")
        },
        onError: (error) => {
            console.error("Error activating user:", error)
        },
    })

    const loginMutation = useMutation({
        mutationFn: async (data: LoginData) => await login(data), 
        onSuccess: () => {
            console.log("Login success!")
        },
        onError: (error) => {
            console.error("Error logging in:", error)
        },
    })
 
    return {
        register: registerMutation.mutate,
        active: activeMutation.mutate,
        login: loginMutation.mutate,
    }
}