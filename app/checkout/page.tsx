"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Lock, Star, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logout from "@/components/logout/Logout"
import WithAuth from "@/components/auth/WithAuth"
 import { getOrderSummary, OrderSummaryResponse, createOrder } from "@/lib/api/orderService"
import { createOrUpdateAddress } from "@/lib/api/addressService"
import { toast } from "sonner"
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Define proper types
interface AddressData {
  shippingFirstName: string
  shippingLastName: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
  shippingCountry: string
}

// Stripe Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

// Checkout Form Component that uses Stripe Elements
const CheckoutForm = React.forwardRef((props: any, ref) => {
  const { 
    formData, 
    setFormData, 
    productData, 
    orderSummary, 
    isSubmitting, 
    originalAddress, 
    showUpdateButton,
    setShowUpdateButton,
    handleAddressUpdate,
    isUpdatingAddress,
    subtotal,
    tax,
    shipping,
    total,
    isLoadingSummary,
    formatValue
  } = props
  const stripe = useStripe()
  const elements = useElements()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => {
      const newFormData = { ...prev, [field]: value }
      
      // Check if shipping address fields have changed
      if (originalAddress && field.startsWith('shipping')) {
        const currentShippingAddress = {
          shippingFirstName: newFormData.shippingFirstName,
          shippingLastName: newFormData.shippingLastName,
          shippingAddress: newFormData.shippingAddress,
          shippingCity: newFormData.shippingCity,
          shippingState: newFormData.shippingState,
          shippingZip: newFormData.shippingZip,
          shippingCountry: newFormData.shippingCountry,
        }
        
        const hasChanged = Object.keys(currentShippingAddress).some(key => 
          currentShippingAddress[key as keyof typeof currentShippingAddress] !== originalAddress[key as keyof AddressData]
        )
        
        setShowUpdateButton(hasChanged)
      }
      
      return newFormData
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission is handled by the parent component
  }

  // Expose submit function to parent
  const submitOrder = async () => {
    if (!stripe || !elements) {
      toast.error('Payment system is not ready. Please try again.')
      return false
    }

      // Basic validation
  if (!formData.cardholderName.trim()) {
    toast.error('Please enter cardholder name')
    return false
  }
  
  if (!productData.id) {
    toast.error('Product information is missing')
    return false
  }
  
  // Validate billing address fields
  if (!formData.billingFirstName.trim()) {
    toast.error('Please enter billing first name')
    return false
  }
  
  if (!formData.billingLastName.trim()) {
    toast.error('Please enter billing last name')
    return false
  }
  
  if (!formData.billingAddress.trim()) {
    toast.error('Please enter billing address')
    return false
  }
  
  if (!formData.billingCity.trim()) {
    toast.error('Please enter billing city')
    return false
  }
  
  if (!formData.billingState.trim()) {
    toast.error('Please enter billing state')
    return false
  }
  
  if (!formData.billingZip.trim()) {
    toast.error('Please enter billing postal code')
    return false
  }
  
  if (!formData.billingCountry.trim()) {
    toast.error('Please enter billing country')
    return false
  }
  
  // Validate shipping address if not using billing as shipping
  if (!formData.useBillingAsShipping) {
    if (!formData.shippingFirstName.trim()) {
      toast.error('Please enter shipping first name')
      return false
    }
    
    if (!formData.shippingLastName.trim()) {
      toast.error('Please enter shipping last name')
      return false
    }
    
    if (!formData.shippingAddress.trim()) {
      toast.error('Please enter shipping address')
      return false
    }
    
    if (!formData.shippingCity.trim()) {
      toast.error('Please enter shipping city')
      return false
    }
    
    if (!formData.shippingState.trim()) {
      toast.error('Please enter shipping state')
      return false
    }
    
    if (!formData.shippingZip.trim()) {
      toast.error('Please enter shipping postal code')
      return false
    }
    
    if (!formData.shippingCountry.trim()) {
      toast.error('Please enter shipping country')
      return false
    }
  }
  
  // Check if we have either a saved user address or complete form data
  if (!orderSummary?.user_address?.id) {
    // If no saved address, ensure all form fields are filled
    if (!formData.billingFirstName.trim() || !formData.billingLastName.trim() || 
        !formData.billingAddress.trim() || !formData.billingCity.trim() || 
        !formData.billingState.trim() || !formData.billingZip.trim() || 
        !formData.billingCountry.trim()) {
      toast.error('Please complete all billing address fields')
      return false
    }
    
    // If not using billing as shipping, validate shipping fields too
    if (!formData.useBillingAsShipping) {
      if (!formData.shippingFirstName.trim() || !formData.shippingLastName.trim() || 
          !formData.shippingAddress.trim() || !formData.shippingCity.trim() || 
          !formData.shippingState.trim() || !formData.shippingZip.trim() || 
          !formData.shippingCountry.trim()) {
        toast.error('Please complete all shipping address fields')
        return false
      }
    }
  }
    
    try {
      // Get the card element
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        toast.error('Card information is missing')
        return false
      }

      // Create token like in the example
      const { token, error } = await stripe.createToken(cardElement)
      
      if (error) {
        toast.error(error.message || 'Token creation failed')
        return false
      }
      
      if (!token) {
        toast.error('Failed to create payment token')
        return false
      }
      
      // Prepare order data in the required format
      const orderData = {
        medicine_id: productData.id,
        billing_first_name: formData.billingFirstName,
        billing_last_name: formData.billingLastName,
        billing_address: formData.billingAddress,
        billing_city: formData.billingCity,
        billing_state: formData.billingState,
        billing_zip: formData.billingZip,
        billing_country: formData.billingCountry,
        user_address_id: orderSummary?.user_address?.id || null, // Can be null if no saved address
        stripe_token: token.id, // Use token ID
      }
      
      console.log("Submitting order with data:", orderData)
      
      // Submit order to API
      const result = await createOrder(orderData)
      
      console.log("Order submitted successfully:", result)
      
      // Check if payment URL is provided and redirect user
      if (result?.data?.payment_url) {
        toast.success('Order created successfully! Redirecting to payment...')
        // Redirect to the payment URL
        window.location.href = result.data.payment_url
        return true
      } else {
        toast.success('Order submitted successfully!')
        // Fallback redirect to orders page if no payment URL
        window.location.href = '/dashboard/orders'
        return true
      }
      
    } catch (error) {
      console.error('Error submitting order:', error)
      toast.error('Failed to submit order. Please try again.')
      return false
    }
  }

  // Expose submitOrder to parent component
  React.useImperativeHandle(ref, () => ({
    submitOrder
  }), [stripe, elements, formData, productData, orderSummary])

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Information</Label>
            <div className="border rounded-md p-3">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Billing Address
            {!orderSummary?.user_address?.id && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                New Address
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billingFirstName">First Name</Label>
              <Input
                id="billingFirstName"
                value={formData.billingFirstName}
                onChange={(e) => handleInputChange("billingFirstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="billingLastName">Last Name</Label>
              <Input
                id="billingLastName"
                value={formData.billingLastName}
                onChange={(e) => handleInputChange("billingLastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="billingAddress">Address</Label>
            <Input
              id="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange("billingAddress", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billingCity">City</Label>
              <Input
                id="billingCity"
                value={formData.billingCity}
                onChange={(e) => handleInputChange("billingCity", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="billingState">State</Label>
              <Input
                id="billingState"
                value={formData.billingState}
                onChange={(e) => handleInputChange("billingState", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billingZip">ZIP Code</Label>
              <Input
                id="billingZip"
                value={formData.billingZip}
                onChange={(e) => handleInputChange("billingZip", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="billingCountry">Country</Label>
              <Input
                id="billingCountry"
                value={formData.billingCountry}
                onChange={(e) => handleInputChange("billingCountry", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Shipping Address
            {showUpdateButton && !formData.useBillingAsShipping && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddressUpdate}
                disabled={isUpdatingAddress}
                className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                {isUpdatingAddress ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600 mr-1"></div>
                    Updating...
                  </>
                ) : (
                  'Update Address'
                )}
              </Button>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="useBillingAsShipping"
              checked={formData.useBillingAsShipping}
              onCheckedChange={(checked) => handleInputChange("useBillingAsShipping", checked)}
            />
            <Label htmlFor="useBillingAsShipping">Use billing address as shipping address</Label>
          </div>
        </CardHeader>
        {!formData.useBillingAsShipping && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingFirstName">First Name</Label>
                <Input
                  id="shippingFirstName"
                  value={formData.shippingFirstName}
                  onChange={(e) => handleInputChange("shippingFirstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="shippingLastName">Last Name</Label>
                <Input
                  id="shippingLastName"
                  value={formData.shippingLastName}
                  onChange={(e) => handleInputChange("shippingLastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shippingAddress">Address</Label>
              <Input
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingCity">City</Label>
                <Input
                  id="shippingCity"
                  value={formData.shippingCity}
                  onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="shippingState">State</Label>
                <Input
                  id="shippingState"
                  value={formData.shippingState}
                  onChange={(e) => handleInputChange("shippingState", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingZip">ZIP Code</Label>
                <Input
                  id="shippingZip"
                  value={formData.shippingZip}
                  onChange={(e) => handleInputChange("shippingZip", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="shippingCountry">Country</Label>
                <Input
                  id="shippingCountry"
                  value={formData.shippingCountry}
                  onChange={(e) => handleInputChange("shippingCountry", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </form>
  )
})

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  
  // Initialize Stripe
  const [stripe, setStripe] = useState<any>(null)
  const checkoutFormRef = useRef<any>(null)
  
  useEffect(() => {
    const initStripe = async () => {
      // Replace with your actual Stripe publishable key
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51H53ooEqYSOnfCSIBkWz0ahtPjtivD3WHremtZecacDWIoOBi2mVyDkElVM731U6Hd2d8qG5KYNP7WIiqpf5MLhm00SO1lNikk')
      setStripe(stripeInstance)
    }
    initStripe()
  }, [])
  
  const [productData, setProductData] = useState({
    id: null as number | null,
    name: "",
    price: "",
    category: "",
    description: ""
  })
  
  const [orderSummary, setOrderSummary] = useState<OrderSummaryResponse | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showUpdateButton, setShowUpdateButton] = useState(false)
  const [originalAddress, setOriginalAddress] = useState<AddressData | null>(null)
  
  const [formData, setFormData] = useState({
    // Payment Information
    cardholderName: "",

    // Billing Address (will be populated from API)
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",

    // Shipping Address (will be populated from API)
    shippingFirstName: "",
    shippingLastName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",

    // Use billing as shipping
    useBillingAsShipping: true,
  })

  // Fetch order summary from API
  const fetchOrderSummary = async (productId: number) => {
    try {
      setIsLoadingSummary(true)
      const summary = await getOrderSummary(productId)
      setOrderSummary(summary)
      
      // Populate form with address data from API
      if (summary.user_address) {
        const addressData = {
          billingFirstName: summary.user_address.first_name || formData.billingFirstName,
          billingLastName: summary.user_address.last_name || formData.billingLastName,
          billingAddress: summary.user_address.street_address || formData.billingAddress,
          billingCity: summary.user_address.city || formData.billingCity,
          billingState: summary.user_address.county || formData.billingState,
          billingZip: summary.user_address.zip_postal_code || formData.billingZip,
          billingCountry: summary.user_address.country || formData.billingCountry,
          shippingFirstName: summary.user_address.first_name || formData.shippingFirstName,
          shippingLastName: summary.user_address.last_name || formData.shippingLastName,
          shippingAddress: summary.user_address.street_address || formData.shippingAddress,
          shippingCity: summary.user_address.city || formData.shippingCity,
          shippingState: summary.user_address.county || formData.shippingState,
          shippingZip: summary.user_address.zip_postal_code || formData.shippingZip,
          shippingCountry: summary.user_address.country || formData.shippingCountry,
        }
        setFormData(prev => ({ ...prev, ...addressData }))
        setOriginalAddress(addressData)
      } else {
        // If no user address exists, we'll use the form data as is
        console.log('No user address found, using form data')
      }
    } catch (error) {
      console.error('Error fetching order summary:', error)
      // Continue with local data if API fails
    } finally {
      setIsLoadingSummary(false)
    }
  }

  // Load product data from URL parameters and fetch order summary
  useEffect(() => {
    const productId = searchParams.get('productId')
    const name = searchParams.get('name')
    const price = searchParams.get('price')
    const category = searchParams.get('category')
    
    if (productId && name && price && category) {
      setProductData({
        id: parseInt(productId),
        name: decodeURIComponent(name),
        price: price,
        category: decodeURIComponent(category),
        description: "Monthly supply"
      })
    }
  }, [searchParams])
  
  // Call fetchOrderSummary when productData.id changes
  useEffect(() => {
    if (productData.id) {
      fetchOrderSummary(productData.id)
    }
  }, [productData.id])


  // Helper function to handle empty values
  const formatValue = (value: string | null | undefined): string => {
    return value && value.trim() !== '' ? value : 'N/A'
  }

  // Update address when form data changes
  const handleAddressUpdate = async () => {
    if (!orderSummary?.user_address) return
    
    try {
      setIsUpdatingAddress(true)
      const addressData = {
        first_name: formData.shippingFirstName,
        last_name: formData.shippingLastName,
        phone_number: orderSummary.user_address.phone_number,
        street_address: formData.shippingAddress,
        city: formData.shippingCity,
        county: formData.shippingState,
        country: formData.shippingCountry,
        zip_postal_code: formData.shippingZip,
      }
      
      await createOrUpdateAddress(addressData)
      toast.success('Address updated successfully!')
      
      // Update original address to hide update button
      setOriginalAddress({
        shippingFirstName: formData.shippingFirstName,
        shippingLastName: formData.shippingLastName,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingState: formData.shippingState,
        shippingZip: formData.shippingZip,
        shippingCountry: formData.shippingCountry,
      })
      setShowUpdateButton(false)
      
      // Refresh order summary to get updated data
      if (productData.id) {
        const summary = await getOrderSummary(productData.id)
        setOrderSummary(summary)
      }
    } catch (error) {
      console.error('Error updating address:', error)
      toast.error('Failed to update address')
    } finally {
      setIsUpdatingAddress(false)
    }
  }

  // Handle form submission from the Complete Order button
  const handleSubmit = async () => {
    if (checkoutFormRef.current) {
      setIsSubmitting(true)
      const success = await checkoutFormRef.current.submitOrder()
      setIsSubmitting(false)
      if (success) {
        // Order was successful
        console.log("Order completed successfully")
        // You can add redirect here if needed
        // router.push('/dashboard/orders')
      }
    } else {
      toast.error('Checkout form is not ready')
    }
  }



  // Calculate totals - use API data if available, otherwise use local data
  const subtotal = orderSummary ? orderSummary.summary.subtotal : parseFloat(productData.price || "0")
  const tax = orderSummary ? orderSummary.summary.tax : (parseFloat(productData.price || "0") * 0.08)
  const shipping = orderSummary ? orderSummary.summary.shipping : 0
  const total = orderSummary ? orderSummary.summary.total : (subtotal + tax + shipping)

  return (
    <WithAuth requiredRole="user" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:space-x-8 md:space-x-4">
              <Link href="/" className="flex items-center">
                <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
              </Link>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-600">WEIGHT LOSS CLINIC</span>
              </div>
            </div>

            <div className="flex items-center sm:space-x-6 space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  2,354 reviews on Trustpilot
                </Badge>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    1
                  </Badge>
                </Button>
              </div>

              <Link href="/">
                <Button className="bg-primary hover:bg-blue-600 text-white">HOME</Button>
              </Link>
               <div>
                  <Logout />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-600">
                {orderSummary 
                  ? `Complete your order for ${orderSummary.medicine.name || 'treatment'}`
                  : `Complete your order for ${productData.name || 'treatment'}`
                }
              </p>
            </div>
            <Link href={productData.id ? `/products/${productData.id}` : "/products"}>
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Product
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {stripe ? (
                <Elements stripe={stripe}>
                  <CheckoutForm
                    ref={checkoutFormRef}
                    formData={formData}
                    setFormData={setFormData}
                    productData={productData}
                    orderSummary={orderSummary}
                    isSubmitting={isSubmitting}
                    originalAddress={originalAddress}
                    showUpdateButton={showUpdateButton}
                    setShowUpdateButton={setShowUpdateButton}
                    handleAddressUpdate={handleAddressUpdate}
                    isUpdatingAddress={isUpdatingAddress}
                    subtotal={subtotal}
                    tax={tax}
                    shipping={shipping}
                    total={total}
                    isLoadingSummary={isLoadingSummary}
                    formatValue={formatValue}
                  />
                </Elements>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading payment system...</span>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product */}
                  {isLoadingSummary ? (
                    <div className="flex items-center space-x-4 pb-4 border-b">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 pb-4 border-b">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt={orderSummary?.medicine?.name || productData.name}
                          width={64}
                          height={64}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {orderSummary?.medicine?.name || productData.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {productData.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {productData.category}
                        </p>
                        <p className="text-xs text-gray-500">Qty: 1</p>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  {isLoadingSummary ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Complete Order Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-blue-600 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order
                      </>
                    )}
                  </Button>

                  {/* Order Summary Info */}
                  {orderSummary && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="text-xs text-gray-500">
                        <div className="flex justify-between">
                          <span>Medicine ID:</span>
                          <span className="font-mono">{orderSummary.medicine.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span>${orderSummary.medicine.price}</span>
                        </div>
                        {orderSummary.user_address && (
                          <div className="flex justify-between">
                            <span>Delivery to:</span>
                            <span>{formatValue(orderSummary.user_address.first_name)} {formatValue(orderSummary.user_address.last_name)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Lock className="w-4 h-4" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <p>Your payment information is safe and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
    </WithAuth>
  )
}
