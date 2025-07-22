import { apiClient } from './client'
import { ApiResponse } from '@/lib/types'

// Medicine interface
export interface Medicine {
  id: number
  name: string
  description: string
  price: string
  stock: number
  category: string
  expiry_date: string
  created_at: string
  updated_at: string
  short_description: string
  images: string[]
  status: string
}

// User Address interface
export interface UserAddress {
  id: number
  user_id: number
  first_name: string
  last_name: string
  phone_number: string
  street_address: string
  city: string
  county: string
  country: string
  zip_postal_code: string
  created_at: string
  updated_at: string
}

// Order interface
export interface Order {
  id: number
  user_id: number
  medicine_id: number
  user_address_id: number
  product_name: string
  product_price: string
  quantity: number
  subtotal: string
  tax: string
  shipping: string
  total: string
  billing_first_name: string
  billing_last_name: string
  billing_address: string
  billing_city: string
  billing_state: string
  billing_zip: string
  billing_country: string
  payment_card_last4: string | null
  payment_status: string
  status: string
  stripe_payment_intent_id: string
  created_at: string
  updated_at: string
  medicine: Medicine
  address: UserAddress
}

// Pagination link interface
export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

// Orders pagination interface
export interface OrdersPagination {
  current_page: number
  data: Order[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Totals interface
export interface OrderTotals {
  total_orders: number
  delivered: number
  in_progress: number
  total_spent: number
}

// Orders response interface
export interface OrdersResponse {
  orders: OrdersPagination
  totals: OrderTotals
}

// Summary interface
export interface Summary {
  subtotal: number
  tax: number
  shipping: number
  total: number
}

// Order Summary Response interface
export interface OrderSummaryResponse {
  medicine: Medicine
  summary: Summary
  user_address: UserAddress
}

// Get order summary
export const getOrderSummary = async (medicineId?: number): Promise<OrderSummaryResponse> => {
  try {
    const payload = medicineId ? { medicine_id: medicineId } : {}
    const response = await apiClient.post<ApiResponse<OrderSummaryResponse>>('/frontend/order/summary', payload)
    return response.data
  } catch (error) {
    console.error('Error fetching order summary:', error)
    throw error
  }
}

// Create order with Stripe token
export const createOrder = async (orderData: {
  medicine_id: number
  billing_first_name: string
  billing_last_name: string
  billing_address: string
  billing_city: string
  billing_state: string
  billing_zip: string
  billing_country: string
  user_address_id: number
  stripe_token: string
}): Promise<{ orderId: string; summary: OrderSummaryResponse }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ orderId: string; summary: OrderSummaryResponse }>>('/frontend/order', orderData)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

// Get user orders with pagination and totals
export const getUserOrders = async (): Promise<OrdersResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<OrdersResponse>>('/frontend/orders')
    return response.data
  } catch (error) {
    console.error('Error fetching user orders:', error)
    throw error
  }
} 