import { apiClient } from './client'
import { ApiResponse, Address, AddressResponse } from '@/lib/types'

// Get user's address
export const getUserAddress = async (): Promise<Address> => {
  const response = await apiClient.get<ApiResponse<Address>>('/user/address')
  return response.data
}

// Create or update user's address
export const createOrUpdateAddress = async (addressData: Address): Promise<AddressResponse> => {
  const response = await apiClient.post<AddressResponse>('/user/address', addressData)
  return response
}

// Delete user's address
export const deleteAddress = async (addressId: number): Promise<ApiResponse<void>> => {
  return await apiClient.delete<ApiResponse<void>>(`/user/address/${addressId}`)
} 