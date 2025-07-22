import { apiClient } from "./client";

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const createContact = async (data: ContactFormData) => {
  return await apiClient.post("/user/contact", data);
};
