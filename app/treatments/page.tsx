"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Clock, Star, Phone, Mail, MapPin, Package, TrendingUp, Pill, Activity, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllProducts, Product } from "@/lib/api/productService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer/Footer"

export default function TreatmentsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [error, setError] = useState<string | null>(null)
  const [medicalConsultation, setMedicalConsultation] = useState<boolean>(true)
  const router = useRouter()

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getAllProducts()
        console.log(response,'11111');
        // Ensure pro ductsData is an array
        if (Array.isArray(response.products)) {
          setProducts(response.products)
          setMedicalConsultation(response.medicalConsultation)
          
          // If medical consultation is true, redirect to products page
          if (response.medicalConsultation) {
            router.push('/products')
            return
          }
        } else {
          console.error('Products data is not an array:', response.products)
          setProducts([])
          setMedicalConsultation(false)
          setError('Failed to load treatments data')
          toast.error("Failed to load treatments")
        }
      } catch (error) {
        console.error('Error loading treatments:', error)
        setProducts([])
        setMedicalConsultation(false)
        setError('Failed to load treatments')
        toast.error("Failed to load treatments")
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [router])

  // Get unique categories and group products
  const categories = Array.from(new Set(products.map(product => product.category)))
  
  // Filter products by selected category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Group products by category for display
  const groupedProducts = categories.reduce((acc, category) => {
    const categoryProducts = products.filter(product => product.category === category)
    acc[category] = categoryProducts
    return acc
  }, {} as Record<string, Product[]>)

  // Get category styling
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'antibiotics':
        return { icon: Pill, color: 'text-blue-500', bgColor: 'bg-blue-50' }
      case 'pain relief / analgesics':
        return { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-50' }
      case 'weight loss':
        return { icon: Heart, color: 'text-cyan-500', bgColor: 'bg-cyan-50' }
      case 'diabetes':
        return { icon: Activity, color: 'text-green-500', bgColor: 'bg-green-50' }
      default:
        return { icon: Package, color: 'text-gray-500', bgColor: 'bg-gray-50' }
    }
  }

  // Format price
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading treatments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Treatments</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // If medical consultation is true, show loading while redirecting
  if (medicalConsultation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center sm:mr-8 mr-2">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/treatments" className="text-primary font-medium">
                Treatments
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center sm:space-x-4 space-x-2">
              <Link href="/consultation">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1">Start Consultation</Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="bg-white text-primary border-primary hover:bg-primary hover:text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                >
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Medical Consultation Required Message */}
      {!medicalConsultation && (
        <section className="bg-yellow-50 border-b border-yellow-200 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl border-2 border-yellow-300 p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <AlertCircle className="h-16 w-16 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                      Medical Consultation Required
                    </h3>
                    <p className="text-yellow-700 mb-6 text-lg leading-relaxed max-w-2xl">
                      Before you can access our treatments, you need to complete a medical consultation form. 
                      This helps our medical team understand your health needs and provide the most appropriate care.
                    </p>
                    <Link href="/consultation">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all">
                        Complete Medical Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
       

      {/* Footer */}
      <Footer />
    </div>
  )
}
