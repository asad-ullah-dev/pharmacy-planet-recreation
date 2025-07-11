import { apiClient } from './client'
import { Medicine, ApiResponse, PaginatedResponse } from '@/lib/types'

export const getAllMedicines = async (searchTerm?: string): Promise<Medicine[] | any> => {
  try {
    const url = searchTerm 
      ? `/admin/medicines?search=${encodeURIComponent(searchTerm)}`
      : '/admin/medicines';
    const response = await apiClient.get<ApiResponse<{ medicines: Medicine[] }>>(url);
    return response.data?.medicines || [];
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
}

  export const createMedicine = async (data: FormData): Promise<ApiResponse<Medicine>> => {
    return await apiClient.post<ApiResponse<Medicine>>('/admin/medicines', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    })
  }

export const getMedicineById = async (id: number): Promise<Medicine> => {
  const response = await apiClient.get<ApiResponse<Medicine>>(`/admin/medicines/${id}`)
  return response.data
}

export const updateMedicine = async (id: number, updatedData: Partial<Medicine>): Promise<ApiResponse<Medicine>> => {
  return await apiClient.put<ApiResponse<Medicine>>(`/admin/medicines/${id}`, updatedData)
}

export const deleteMedicine = async (id: number): Promise<ApiResponse<void>> => {
  return await apiClient.delete<ApiResponse<void>>(`/admin/medicines/${id}`)
} 