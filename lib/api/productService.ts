import { apiClient } from './client'
import { ApiResponse } from '@/lib/types'

// Product interface
export interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  available_stock: number
  total_sold: number
  description: string
  expiry_date: string
  status?: 'Active' | 'Inactive'
  created_at?: string
  updated_at?: string
  images?: string[]
}

export interface ProductsResponse {
  status: string
  message: string
  data: {
    products: Product[]
    medicalConsultation: boolean
  }
}

// Get all products
export const getAllProducts = async (): Promise<{ products: Product[], medicalConsultation: boolean }> => {
  try {
    const response = await apiClient.get<ProductsResponse>('/frontend/products')
    
    // Check if response has the expected structure
    if (response && response.data && response.data.products && Array.isArray(response.data.products)) {
      return {
        products: response.data.products,
        medicalConsultation: response.data.medicalConsultation || false
      }
    } else if (response && response.data && Array.isArray(response.data)) {
      // Fallback: if response.data is directly an array (old structure)
      return {
        products: response.data,
        medicalConsultation: true // Default to true for old structure
      }
    } else if (response && Array.isArray(response)) {
      // Fallback: if response is directly an array
      return {
        products: response,
        medicalConsultation: true // Default to true for old structure
      }
    } else {
      console.error('Unexpected API response structure:', response)
      return {
        products: [],
        medicalConsultation: false
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      products: [],
      medicalConsultation: false
    }
  }
}

// Get product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(`/frontend/products/${id}`)
    return response.data || null
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Get products by category
export const getProductsByCategory = async (category: string): Promise<{ products: Product[], medicalConsultation: boolean }> => {
  try {
    const response = await apiClient.get<ProductsResponse>(`/frontend/products?category=${category}`)
    
    // Check if response has the expected structure
    if (response && response.data && response.data.products && Array.isArray(response.data.products)) {
      return {
        products: response.data.products,
        medicalConsultation: response.data.medicalConsultation || false
      }
    } else if (response && response.data && Array.isArray(response.data)) {
      // Fallback: if response.data is directly an array (old structure)
      return {
        products: response.data,
        medicalConsultation: true // Default to true for old structure
      }
    } else if (response && Array.isArray(response)) {
      // Fallback: if response is directly an array
      return {
        products: response,
        medicalConsultation: true // Default to true for old structure
      }
    } else {
      console.error('Unexpected API response structure:', response)
      return {
        products: [],
        medicalConsultation: false
      }
    }
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return {
      products: [],
      medicalConsultation: false
    }
  }
} 