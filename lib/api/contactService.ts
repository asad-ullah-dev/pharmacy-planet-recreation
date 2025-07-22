import { apiClient } from "./client";
import { ApiResponse } from "@/lib/types";

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface ContactsResponse {
  current_page: number;
  data: Contact[];
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
}

export const createContact = async (data: ContactFormData) => {
  return await apiClient.post("/user/contact", data);
};

export const getAllContacts = async (
  searchTerm?: string
): Promise<ContactsResponse> => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }

    const url = `/admin/contacts${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await apiClient.get<ApiResponse<ContactsResponse>>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const getContactById = async (id: number): Promise<Contact> => {
  const response = await apiClient.get<ApiResponse<Contact>>(
    `/admin/contacts/${id}`
  );
  return response.data;
};
