import { apiClient } from "./client";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  ApiResponse,
} from "@/lib/types";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials
  );

  // Store token and user data in localStorage for client-side access
  if (typeof window !== "undefined") {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    // Set secure cookies for server-side auth with role information
    document.cookie = `auth-token=${response.token}; path=/; max-age=86400; secure; samesite=strict`;
    document.cookie = `user-role=${response.user.role.name}; path=/; max-age=86400; secure; samesite=strict`;
    document.cookie = `user-id=${response.user.id}; path=/; max-age=86400; secure; samesite=strict`;
  }

  return response;
};

export const register = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    userData
  );

  // // Store token and user data in localStorage for client-side access
  // if (typeof window !== 'undefined') {
  //   localStorage.setItem('token', response.token)
  //   localStorage.setItem('user', JSON.stringify(response.user))

  //   // Set secure cookies for server-side auth with role information
  //   document.cookie = `auth-token=${response.token}; path=/; max-age=86400; secure; samesite=strict`
  //   document.cookie = `user-role=${response.user.role.name}; path=/; max-age=86400; secure; samesite=strict`
  //   document.cookie = `user-id=${response.user.id}; path=/; max-age=86400; secure; samesite=strict`
  // }

  return response;
};

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user-id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>("/auth/me");
  return response.data;
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<void>> => {
  return await apiClient.post<ApiResponse<void>>("/auth/forgot-password", {
    email,
  });
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirmation: string
): Promise<ApiResponse<void>> => {
  return await apiClient.post<ApiResponse<void>>("/auth/reset-password", {
    token,
    password,
    password_confirmation: passwordConfirmation,
  });
};
