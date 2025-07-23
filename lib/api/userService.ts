import { apiClient } from "./client";
import { ApiResponse, PaginatedResponse } from "@/lib/types";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  gender: string;
  street_address: string;
  county: string | null;
  city: string;
  zip_postal_code: string;
  ethnicity: string;
  email: string;
  email_verified_at: string | null;
  role_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_orders: number;
  total_amount: string | number; // Handle both string and number types
  role: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface CreateUserData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  gender: string;
  street_address: string;
  county?: string;
  city: string;
  zip_postal_code: string;
  ethnicity: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
  status: string;
}

export interface UsersResponse {
  users: {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  totals: {
    total_users: number;
    active_users: number;
    inactive_users: number;
    new_this_month: number;
  };
}

export const getAllUsers = async (
  searchTerm?: string,
  statusFilter?: string
): Promise<UsersResponse> => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (statusFilter && statusFilter !== "all") {
      params.append("status", statusFilter);
    }

    const url = `/admin/users${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await apiClient.get<ApiResponse<UsersResponse>>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/admin/users/${id}`);
  return response.data;
};

export const createUser = async (
  data: CreateUserData
): Promise<ApiResponse<User>> => {
  return await apiClient.post<ApiResponse<User>>("/admin/users", data);
};

export const updateUser = async (
  id: number,
  data: Partial<CreateUserData>
): Promise<ApiResponse<User>> => {
  return await apiClient.put<ApiResponse<User>>(`/admin/users/${id}`, data);
};

export const deleteUser = async (id: number): Promise<ApiResponse<void>> => {
  return await apiClient.delete<ApiResponse<void>>(`/admin/users/${id}`);
};

export const toggleUserStatus = async (
  id: number
): Promise<ApiResponse<User>> => {
  return await apiClient.patch<ApiResponse<User>>(
    `/admin/users/${id}/toggle-status`
  );
};
