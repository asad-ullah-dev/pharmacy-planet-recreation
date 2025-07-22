"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Star, Bell, Package, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logout from "@/components/logout/Logout"
import { getAllProducts, Product } from "@/lib/api/productService"
import { toast } from "sonner"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [medicalConsultation, setMedicalConsultation] = useState<boolean>(true)

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getAllProducts()
        
        // Ensure productsData is an array
        if (Array.isArray(response.products)) {
          setProducts(response.products)
          setMedicalConsultation(response.medicalConsultation)
        } else {
          console.error('Products data is not an array:', response.products)
          setProducts([])
          setMedicalConsultation(false)
          toast.error("Failed to load products")
        }
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
        setMedicalConsultation(false)
        toast.error("Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))]

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Format price
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`
  }

  // Get category icon and color
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'antibiotics':
        return { icon: Package, color: 'text-blue-500', bgColor: 'bg-blue-50' }
      case 'pain relief / analgesics':
        return { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-50' }
      default:
        return { icon: Package, color: 'text-gray-500', bgColor: 'bg-gray-50' }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
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

      {/* Medical Consultation Required Message */}
      {!medicalConsultation && (
        <section className="bg-yellow-50 border-b border-yellow-200 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg border border-yellow-200 p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      Medical Consultation Required
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      Before you can access our products, you need to complete a medical consultation form. 
                      This helps our medical team understand your health needs and provide the most appropriate care.
                    </p>
                    <Link href="/consultation">
                      <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="md:text-3xl text-2xl font-bold text-gray-900 mb-2">Available Products</h1>
              <p className="text-gray-600">Browse our comprehensive range of medications and treatments</p>
            </div>
            <Link href="/consultation">
              <Button variant="outline" className="flex items-center sm:gap-2 gap-1 sm:text-sm text-xs px-3">
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                Back to Consultation
              </Button>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <Button
                    key={category}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={isActive ? "bg-primary text-white" : "bg-white text-gray-700"}
                  >
                    {category === "all" ? "All Products" : category}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const categoryStyle = getCategoryStyle(product.category)
                const CategoryIcon = categoryStyle.icon
                
                return (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:from-gray-100 group-hover:to-gray-200 transition-colors">
                        <div className={`w-16 h-16 ${categoryStyle.bgColor} rounded-full flex items-center justify-center`}>
                          <CategoryIcon className={`w-8 h-8 ${categoryStyle.color}`} />
                        </div>
                      </div>
                      <CardTitle className="text-lg text-gray-900 line-clamp-2">{product.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
                        {product.available_stock > 0 ? (
                          <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600">Out of Stock</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      
                      {/* Product Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Package className="w-4 h-4 mr-2" />
                          <span>Stock: {product.available_stock}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Expires: {new Date(product.expiry_date).toLocaleDateString()}</span>
                        </div>
                        {product.total_sold > 0 && (
                          <div className="flex items-center text-sm text-gray-500">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span>Sold: {product.total_sold}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                        </div>
                        <Button  className="bg-primary hover:bg-blue-600 text-white">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.available_stock > 0 ? "View details" : "Out of Stock"}
                        </Button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">4.8/5</span>
                          <span className="mx-2">•</span>
                          <span>Verified Product</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">No products available in this category at the moment.</p>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-12 bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Our Products?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-sm">
                  All products are sourced from licensed manufacturers and meet strict quality standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Free shipping with delivery within 2-3 business days</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600 text-sm">
                  24/7 customer support and consultation with our medical team
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
