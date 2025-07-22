import { apiClient } from './client'
import { ApiResponse } from '@/lib/types'

// Medical consultation interface
export interface MedicalConsultation {
  has_type2_diabetes: boolean
  recent_a1c?: string
  taking_diabetes_medication: boolean
  diabetes_medication_details?: string
  taken_ozempic_or_glp1: boolean
  has_family_history_mtc_men2: boolean
  has_pancreatitis: boolean
  has_kidney_or_liver_disease: boolean
  has_gastrointestinal_conditions: boolean
  is_pregnant_or_breastfeeding: boolean
  has_medication_allergies: boolean
  medication_allergies_details?: string
  height?: string
  weight?: string
  consumes_alcohol: boolean
  alcohol_consumption_details?: string
  current_medications?: string
  comfortable_with_injectable: boolean
  understands_ozempic_risks: boolean
}

export interface ConsultationResponse {
  data: MedicalConsultation
  message?: string
  success: boolean
}

// Submit medical consultation
export const submitMedicalConsultation = async (consultationData: MedicalConsultation): Promise<ConsultationResponse> => {
  const response = await apiClient.post<ConsultationResponse>('/user/medical-consultation', consultationData)
  return response
}

// Get user's medical consultation (if needed for future use)
export const getUserMedicalConsultation = async (): Promise<MedicalConsultation> => {
  const response = await apiClient.get<ApiResponse<MedicalConsultation>>('/user/medical-consultation')
  return response.data
} 