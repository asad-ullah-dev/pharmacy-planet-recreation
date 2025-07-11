import { apiClient } from './client'
import { ApiResponse, User } from '@/lib/types'

// Profile update interface
export interface ProfileUpdateData {
  first_name?: string
  last_name?: string
  phone_number?: string
  password?: string
  password_confirmation?: string
  gender?: string
  date_of_birth?: string
}

export interface ProfileResponse {
  data: User
  message?: string
  success: boolean
}

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/user/profile')
  return response.data
}

// Update user profile
export const updateUserProfile = async (profileData: ProfileUpdateData): Promise<ProfileResponse> => {
  const response = await apiClient.put<ProfileResponse>('/user/profile', profileData)
  return response
} 