"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Shield,
  Truck,
  Clock,
  Bell,
  Package,
  Calendar,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/logout/Logout";
import { getProductById, Product } from "@/lib/api/productService";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!params.id) {
          setError("Product ID is required");
          return;
        }

        const productId = parseInt(params.id as string);
        if (isNaN(productId)) {
          setError("Invalid product ID");
          return;
        }

        const productData = await getProductById(productId);
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (error: any) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");

        if (error?.response?.status === 403) {
          const errorMessage =
            error?.response?.data?.message || "Access denied";
          toast.error(errorMessage);
        } else if (error?.response?.status !== 422) {
          toast.error("Failed to load product");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Format price
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Get category icon and color
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "antibiotics":
        return { icon: Package, color: "text-blue-500", bgColor: "bg-blue-50" };
      case "pain relief / analgesics":
        return {
          icon: TrendingUp,
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      default:
        return { icon: Package, color: "text-gray-500", bgColor: "bg-gray-50" };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center lg:space-x-8 md:space-x-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/ozempo-logo.png"
                    alt="Ozempo"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-gray-600">
                    WEIGHT LOSS CLINIC
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:space-x-6 space-x-3">
                <Link href="/">
                  <Button className="bg-primary hover:bg-blue-600 text-white">
                    HOME
                  </Button>
                </Link>
                <div>
                  <Logout />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <div className="space-x-4">
              <Link href="/products">
                <Button variant="outline">Back to Products</Button>
              </Link>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const categoryStyle = getCategoryStyle(product.category);
  const CategoryIcon = categoryStyle.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:space-x-8 md:space-x-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/ozempo-logo.png"
                  alt="Ozempo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-600">
                  WEIGHT LOSS CLINIC
                </span>
              </div>
            </div>

            <div className="flex items-center sm:space-x-6 space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
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
                <Button className="bg-primary hover:bg-blue-600 text-white">
                  HOME
                </Button>
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
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                {product.images?.length ? (
                  <>
                    <img
                      src={product.images[currentImage]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </>
                ) : (
                  <div
                    className={`w-32 h-32 ${categoryStyle.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <CategoryIcon
                      className={`w-16 h-16 ${categoryStyle.color}`}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 justify-center mt-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`border-2 rounded-lg overflow-hidden focus:outline-none transition-all duration-150 ${
                        currentImage === idx
                          ? "border-primary ring-2 ring-primary"
                          : "border-gray-200"
                      }`}
                      style={{ width: 64, height: 64 }}
                      onClick={() => setCurrentImage(idx)}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Single image - show thumbnail */}
              {Array.isArray(product.images) &&
                typeof product.images.length === "number" &&
                product.images.length === 1 && (
                  <div className="flex justify-center mt-2">
                    <div
                      className="border-2 border-primary rounded-lg overflow-hidden"
                      style={{ width: 64, height: 64 }}
                    >
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

              {/* No images - show placeholder */}
              {(!product.images || product.images.length === 0) && (
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 ${categoryStyle.bgColor} rounded-full flex items-center justify-center`}
                      >
                        <CategoryIcon
                          className={`w-4 h-4 ${categoryStyle.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className="bg-blue-100 text-blue-800">
                    {product.category}
                  </Badge>
                  {product.available_stock > 0 ? (
                    <Badge className="bg-green-100 text-green-800">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600">
                      Out of Stock
                    </Badge>
                  )}
                  <Badge variant="outline">Prescription Required</Badge>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600">4.8/5 (1,247 reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500">/unit</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Price includes medical consultation and prescription
                </p>
              </div>

              {/* Product Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    <span>Stock: {product.available_stock} units</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Expires:{" "}
                      {new Date(product.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                  {product.total_sold > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span>Total Sold: {product.total_sold} units</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      FDA approved and clinically tested
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Professional medical consultation included
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Secure and confidential service
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Fast delivery to your doorstep
                    </span>
                  </li>
                </ul>
              </div>

              {/* Buy Now Button */}
              <div className="space-y-4">
                <Link
                  href={`/checkout?productId=${
                    product.id
                  }&name=${encodeURIComponent(product.name)}&price=${
                    product.price
                  }&category=${encodeURIComponent(product.category)}`}
                >
                  <Button
                    className="w-full bg-primary hover:bg-blue-600 text-white py-4 text-lg font-semibold"
                    disabled={product.available_stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.available_stock > 0
                      ? `Buy Now - ${formatPrice(product.price)}`
                      : "Out of Stock"}
                  </Button>
                </Link>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>2-3 Day Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* How It Works */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Our process ensures you receive the highest quality care and
                    medication:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Complete a comprehensive medical consultation</li>
                    <li>
                      • Our licensed healthcare providers review your
                      information
                    </li>
                    <li>• Receive a personalized treatment plan</li>
                    <li>• Get your medication delivered safely to your door</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Important Safety Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Important Safety Information
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Important:</strong> This medication requires a
                    prescription and medical consultation. Please consult with
                    our healthcare providers before starting any treatment.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Common side effects may include nausea, headache, and mild
                    gastrointestinal symptoms. Most side effects improve over
                    time.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Do not use if you are allergic to any of the ingredients or
                    have certain medical conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
