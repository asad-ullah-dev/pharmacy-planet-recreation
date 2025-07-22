import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { toast } from 'sonner'

// Environment validation
const requiredEnvVars = ['NEXT_PUBLIC_API_BASE_URL']

// Check if we're in development and provide a fallback
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.devnstage.xyz/api'

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn('NEXT_PUBLIC_API_BASE_URL not found, using fallback:', apiBaseUrl)
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: apiBaseUrl,
       headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token to requests
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        this.handleApiError(error)
        return Promise.reject(error)
      }
    )
  }

  private handleApiError(error: AxiosError) {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/auth/login'
          }
          toast.error('Session expired. Please login again.')
          break

        case 403:
          toast.error('Access denied. You do not have permission to perform this action.')
          break

        case 404:
          toast.error('Resource not found.')
          break

        case 422:
          // Validation errors
          if (data && typeof data === 'object' && 'errors' in data) {
            const errors = (data as any).errors
            Object.values(errors).forEach((errorMsg: any) => {
              if (Array.isArray(errorMsg)) {
                errorMsg.forEach((msg: string) => toast.error(msg))
              } else {
                toast.error(errorMsg as string)
              }
            })
          } else {
            toast.error('Validation failed. Please check your input.')
          }
          break

        case 500:
          toast.error('Server error. Please try again later.')
          break

        default:
          toast.error('Something went wrong. Please try again.')
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Other error
      toast.error('An unexpected error occurred.')
    }
  }

  // Generic request methods
  async get<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  async patch<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export the class for testing purposes
export { ApiClient }