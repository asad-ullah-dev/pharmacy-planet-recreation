"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Calendar, CreditCard, Eye, Search, Filter, MapPin, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Logout from "@/components/logout/Logout"

// Sample order data with more details
const sampleOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 299.99,
    items: [
      {
        name: "Ozempic 0.5mg Pen",
        quantity: 1,
        price: 299.99,
        description: "Pre-filled injection pen for weight management",
      },
    ],
    deliveryDate: "2024-01-18",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Medical Street",
      line2: "Apt 4B",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "TRK123456789",
    timeline: [
      {
        date: "2024-01-15",
        status: "Order Placed",
        description: "Your order has been received and is being processed",
      },
      { date: "2024-01-16", status: "Payment Confirmed", description: "Payment has been successfully processed" },
      { date: "2024-01-17", status: "Shipped", description: "Your order has been dispatched from our pharmacy" },
      { date: "2024-01-18", status: "Delivered", description: "Package delivered successfully" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-28",
    status: "In Transit",
    total: 599.98,
    items: [
      {
        name: "Ozempic 1mg Pen",
        quantity: 2,
        price: 299.99,
        description: "Pre-filled injection pen for weight management",
      },
    ],
    deliveryDate: "2024-02-02",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Medical Street",
      line2: "Apt 4B",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    paymentMethod: "Mastercard ending in 8888",
    trackingNumber: "TRK987654321",
    timeline: [
      {
        date: "2024-01-28",
        status: "Order Placed",
        description: "Your order has been received and is being processed",
      },
      { date: "2024-01-29", status: "Payment Confirmed", description: "Payment has been successfully processed" },
      { date: "2024-01-30", status: "Shipped", description: "Your order has been dispatched from our pharmacy" },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-02-10",
    status: "Processing",
    total: 299.99,
    items: [
      {
        name: "Ozempic 0.5mg Pen",
        quantity: 1,
        price: 299.99,
        description: "Pre-filled injection pen for weight management",
      },
    ],
    deliveryDate: "2024-02-15",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Medical Street",
      line2: "Apt 4B",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    paymentMethod: "Visa ending in 4242",
    trackingNumber: null,
    timeline: [
      {
        date: "2024-02-10",
        status: "Order Placed",
        description: "Your order has been received and is being processed",
      },
      { date: "2024-02-11", status: "Payment Confirmed", description: "Payment has been successfully processed" },
    ],
  },
  {
    id: "ORD-2023-045",
    date: "2023-12-20",
    status: "Delivered",
    total: 899.97,
    items: [
      {
        name: "Ozempic 1mg Pen",
        quantity: 3,
        price: 299.99,
        description: "Pre-filled injection pen for weight management",
      },
    ],
    deliveryDate: "2023-12-23",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Medical Street",
      line2: "Apt 4B",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "TRK555666777",
    timeline: [
      {
        date: "2023-12-20",
        status: "Order Placed",
        description: "Your order has been received and is being processed",
      },
      { date: "2023-12-21", status: "Payment Confirmed", description: "Payment has been successfully processed" },
      { date: "2023-12-22", status: "Shipped", description: "Your order has been dispatched from our pharmacy" },
      { date: "2023-12-23", status: "Delivered", description: "Package delivered successfully" },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "In Transit":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof sampleOrders)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (order: (typeof sampleOrders)[0]) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex sm:flex-row flex-col items-center sm:space-x-4 space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="pr-3 pl-0">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 sm:block hidden" />
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={120} height={40} className="h-8 w-auto" />
            </div>
            <div className="flex items-center sm:space-x-4 space-x-3">
              <span className="text-sm text-gray-600">My Account</span>
               <div>
                  <Logout />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600">Track and manage your medication orders</p>
        </div>

        {/* Summary Stats - Moved above filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{sampleOrders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {sampleOrders.filter((o) => o.status === "Delivered").length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {sampleOrders.filter((o) => o.status === "Processing" || o.status === "In Transit").length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                £{sampleOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Ordered: {new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-2" />
                          <span>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="font-medium">£{order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-600">
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span>£{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:w-32">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Order Date:</span>
                    <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Expected Delivery:</span>
                    <span>{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tracking Number:</span>
                      <span className="font-mono text-sm">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Payment Method:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Items Ordered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">£{item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>£{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.line1}</p>
                    {selectedOrder.shippingAddress.line2 && <p>{selectedOrder.shippingAddress.line2}</p>}
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postcode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{event.status}</h4>
                            <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Trust Logos Section */}
      <div className="border-t border-gray-800 mt-8 pt-8">
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <div className="bg-white p-3 rounded-lg">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Novo Nordisk"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="bg-white p-3 rounded-lg">
            <Image
              src="/placeholder.svg?height=40&width=80"
              alt="Lilly"
              width={80}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="bg-white p-3 rounded-lg">
            <Image
              src="/placeholder.svg?height=40&width=100"
              alt="Verified Website"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="bg-white p-3 rounded-lg">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Registered Pharmacy"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2024 Ozempo. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
