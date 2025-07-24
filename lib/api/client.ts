import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

// Environment validation
const requiredEnvVars = ["NEXT_PUBLIC_API_BASE_URL"];

// Check if we're in development and provide a fallback
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.devnstage.xyz/api";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn(
    "NEXT_PUBLIC_API_BASE_URL not found, using fallback:",
    apiBaseUrl
  );
}

class ApiClient {
  private client: AxiosInstance;
  private lastErrorToast: { message: string; timestamp: number } | null = null;
  private readonly TOAST_DEBOUNCE_MS = 2000; // 2 seconds

  constructor() {
    this.client = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token to requests
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleApiError(error: AxiosError) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
          }
          this.showToast("Session expired. Please login again.");
          break;

        case 403:
          this.showToast(
            "Access denied. You do not have permission to perform this action."
          );
          break;

        case 404:
          // Show the actual error message from the API response
          if (data && typeof data === "object" && "error" in data) {
            this.showToast((data as any).error);
          } else {
            this.showToast("Resource not found.");
          }
          break;

        case 422:
          // Validation errors
          if (data && typeof data === "object" && "errors" in data) {
            const errors = (data as any).errors;
            Object.values(errors).forEach((errorMsg: any) => {
              if (Array.isArray(errorMsg)) {
                errorMsg.forEach((msg: string) => this.showToast(msg));
              } else {
                this.showToast(errorMsg as string);
              }
            });
          } else {
            this.showToast("Validation failed. Please check your input.");
          }
          break;

        case 500:
          this.showToast("Server error. Please try again later.");
          break;

        default:
          this.showToast("Something went wrong. Please try again.");
      }
    } else if (error.request) {
      // Network error
      this.showToast("Network error. Please check your connection.");
    } else {
      // Other error
      this.showToast("An unexpected error occurred.");
    }
  }

  private showToast(message: string) {
    const now = Date.now();

    // Check if this is a duplicate toast within the debounce period
    if (
      this.lastErrorToast &&
      this.lastErrorToast.message === message &&
      now - this.lastErrorToast.timestamp < this.TOAST_DEBOUNCE_MS
    ) {
      return; // Skip duplicate toast
    }

    // Show the toast and update the last error record
    toast.error(message);
    this.lastErrorToast = { message, timestamp: now };
  }

  // Generic request methods
  async get<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async postMultipart<T>(url: string, data: FormData, config = {}): Promise<T> {
    const response = await this.client.post<T>(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...((config as any).headers || {}),
      },
      ...config,
    });
    return response.data;
  }

  async put<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export the class for testing purposes
export { ApiClient };
