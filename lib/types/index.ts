// Role interface
export interface Role {
  id: number
  name: 'admin' | 'user'
  created_at: string
  updated_at: string
}

// User related types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  date_of_birth?: string
  phone_number?: string
  gender?: string
  street_address?: string
  county?: string
  city?: string
  country?: string
  zip_postal_code?: string
  ethnicity?: string
  email_verified_at?: string
  role_id: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  role: Role
}

// Medicine/Product related types
export interface Medicine {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  status: 'Active' | 'Inactive'
  expiry_date: string
  created_at: string
  updated_at: string
}

// Order related types
export interface Order {
  id: string
  customer: string
  product: string
  amount: string
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled'
  date: string
  user_id: number
  medicine_id: number
  quantity: number
  created_at: string
  updated_at: string
}

// Authentication types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  date_of_birth: string
  phone_number: string
  gender: string
  street_address: string
  county: string
  city: string
  country: string
  zip_postal_code: string
  ethnicity: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  token: string
  user: User
  message?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// Form types
export interface ConsultationFormData {
  hasType2Diabetes: string
  a1cLevel: string
  currentDiabetesMeds: string
  diabetesMedsList: string
  previousGLP1: string
  thyroidHistory: string
  pancreatitisHistory: string
  kidneyLiverDisease: string
  giConditions: string
  pregnancyStatus: string
  allergies: string
  allergiesList: string
  height: string
  weight: string
  alcoholConsumption: string
  alcoholDetails: string
  currentMedications: string
  comfortableWithInjection: string
  understandsRisks: string
}

// Dashboard stats types
export interface DashboardStats {
  totalRevenue: string
  totalOrders: string
  activeUsers: string
  conversionRate: string
}

// Support ticket types
export interface SupportTicket {
  id: number
  subject: string
  message: string
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  priority: 'Low' | 'Medium' | 'High'
  user_id: number
  created_at: string
  updated_at: string
}

// Address types
export interface Address {
  id?: number
  first_name: string
  last_name: string
  phone_number: string
  street_address: string
  city: string
  county: string
  country: string
  zip_postal_code: string
  is_default_billing?: boolean
  is_default_shipping?: boolean
  created_at?: string
  updated_at?: string
}

export interface AddressResponse {
  data: Address
  message?: string
  success: boolean
} 