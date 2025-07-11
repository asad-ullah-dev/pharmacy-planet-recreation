import { toast } from "sonner"

// Custom toast configuration for pharmacy theme
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#166534',
    },
    icon: '✅',
    duration: 4000,
  })
}

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
    },
    icon: '❌',
    duration: 5000,
  })
}

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    style: {
      background: '#fffbeb',
      border: '1px solid #fed7aa',
      color: '#d97706',
    },
    icon: '⚠️',
    duration: 4000,
  })
}

export const showInfoToast = (message: string) => {
  toast.info(message, {
    style: {
      background: '#eff6ff',
      border: '1px solid #bfdbfe',
      color: '#2563eb',
    },
    icon: 'ℹ️',
    duration: 3000,
  })
}

// Pharmacy-specific toast messages
export const pharmacyToasts = {
  // Authentication
  loginSuccess: () => showSuccessToast('Welcome back! You have been successfully logged in.'),
  loginError: () => showErrorToast('Login failed. Please check your credentials and try again.'),
  logoutSuccess: () => showSuccessToast('You have been successfully logged out.'),
  registerSuccess: () => showSuccessToast('Account created successfully! Please check your email for verification.'),
  registerError: () => showErrorToast('Registration failed. Please try again.'),
  
  // Medicine/Product Management
  medicineCreated: () => showSuccessToast('Medicine added successfully to the inventory.'),
  medicineUpdated: () => showSuccessToast('Medicine information updated successfully.'),
  medicineDeleted: () => showSuccessToast('Medicine removed from inventory.'),
  medicineError: () => showErrorToast('Failed to process medicine operation. Please try again.'),
  
  // Orders
  orderPlaced: () => showSuccessToast('Order placed successfully! You will receive a confirmation email.'),
  orderUpdated: () => showSuccessToast('Order status updated successfully.'),
  orderError: () => showErrorToast('Failed to process order. Please try again.'),
  
  // Consultation
  consultationSubmitted: () => showSuccessToast('Medical consultation submitted successfully. Our team will review shortly.'),
  consultationError: () => showErrorToast('Failed to submit consultation. Please try again.'),
  
  // User Management
  profileUpdated: () => showSuccessToast('Profile information updated successfully.'),
  passwordChanged: () => showSuccessToast('Password changed successfully.'),
  accountDeleted: () => showSuccessToast('Account deleted successfully.'),
  
  // Support
  ticketCreated: () => showSuccessToast('Support ticket created successfully. We will respond within 24 hours.'),
  ticketUpdated: () => showSuccessToast('Support ticket updated successfully.'),
  
  // General
  sessionExpired: () => showWarningToast('Your session has expired. Please login again.'),
  networkError: () => showErrorToast('Network error. Please check your connection and try again.'),
  validationError: () => showErrorToast('Please check your input and try again.'),
  serverError: () => showErrorToast('Server error. Please try again later.'),
  
  // Medical Specific
  prescriptionIssued: () => showSuccessToast('Prescription issued successfully by our medical team.'),
  prescriptionPending: () => showInfoToast('Your prescription is being reviewed by our medical team.'),
  medicalReviewRequired: () => showWarningToast('Additional medical information required. Please complete your consultation.'),
}

// Form validation toasts
export const formToasts = {
  requiredField: (fieldName: string) => showErrorToast(`${fieldName} is required.`),
  invalidEmail: () => showErrorToast('Please enter a valid email address.'),
  invalidPassword: () => showErrorToast('Password must be at least 8 characters with uppercase, lowercase, and number.'),
  passwordMismatch: () => showErrorToast('Passwords do not match.'),
  invalidPhone: () => showErrorToast('Please enter a valid phone number.'),
  invalidDate: () => showErrorToast('Please enter a valid date.'),
  fileTooLarge: (maxSize: string) => showErrorToast(`File size must be less than ${maxSize}.`),
  invalidFileType: () => showErrorToast('Please select a valid file type.'),
}

// Loading states
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    style: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      color: '#475569',
    },
    icon: '⏳',
  })
}

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId)
} 