import { apiClient } from './client'
import { ApiResponse } from '@/lib/types'

export interface SupportTicket {
  subject: string
  message: string
  category: string
  priority: string
  attachment?: File | null
}

export const createSupportTicket = async (ticket: SupportTicket): Promise<ApiResponse<any>> => {
  const formData = new FormData()
  formData.append('subject', ticket.subject)
  formData.append('message', ticket.message)
  formData.append('category', ticket.category)
  formData.append('priority', ticket.priority)
  if (ticket.attachment) {
    formData.append('attachment', ticket.attachment)
  }
  return await apiClient.postMultipart<ApiResponse<any>>('/user/support-tickets', formData)
}

export type AdminSupportTicket = {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  category: string;
  status: string;
  priority: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export type AdminSupportTicketsResponse = {
  current_page: number;
  data: AdminSupportTicket[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const getAdminSupportTickets = async (): Promise<AdminSupportTicket[]> => {
  const response = await apiClient.get<ApiResponse<AdminSupportTicketsResponse>>('/admin/support-tickets')
  return response.data?.data || []
}  
export const updateSupportTicketStatus = async (id: number, status: string) => {
  return await apiClient.patch(`/admin/support-tickets/${id}/status`, { status });
};