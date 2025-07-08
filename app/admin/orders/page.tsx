"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample order data
const sampleOrders = [
  {
    id: "ORD-2024-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    product: "Ozempic 0.5mg Pen",
    quantity: 1,
    amount: 299.99,
    status: "Delivered",
    date: "2024-01-15",
    deliveryDate: "2024-01-18",
    address: "123 Medical Street, London, SW1A 1AA",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-2024-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    product: "Ozempic 1mg Pen",
    quantity: 2,
    amount: 599.98,
    status: "In Transit",
    date: "2024-01-28",
    deliveryDate: "2024-02-02",
    address: "456 Health Avenue, Manchester, M1 1AA",
    paymentMethod: "Mastercard ending in 8888",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-2024-003",
    customer: "Mike Johnson",
    email: "mike.johnson@example.com",
    product: "Ozempic 0.5mg Pen",
    quantity: 1,
    amount: 299.99,
    status: "Processing",
    date: "2024-02-10",
    deliveryDate: "2024-02-15",
    address: "789 Wellness Road, Birmingham, B1 1AA",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: null,
  },
  {
    id: "ORD-2024-004",
    customer: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    product: "Ozempic 1mg Pen",
    quantity: 3,
    amount: 899.97,
    status: "Cancelled",
    date: "2024-02-08",
    deliveryDate: null,
    address: "321 Care Street, Edinburgh, EH1 1AA",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: null,
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(sampleOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      case "In Transit":
        return <Truck className="h-4 w-4" />
      case "Processing":
        return <Clock className="h-4 w-4" />
      case "Cancelled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center sm:space-x-4 space-x-2">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1">
                  <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 sm:block hidden" />
              <Image src="/images/ozempo-logo.png" alt="Ozempo Admin" width={120} height={40} className="h-8 sm:w-40 w-20" />
              <Badge className="text-white text-xs sm:px-2 px-1 py-1" style={{ backgroundColor: "#14b8a6" }}>
                 ADMIN PANEL
              </Badge>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="text-red-600 border-red-500 hover:bg-red-50 sm:text-sm text-xs sm:px-3 px-1.5">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-teal-600" />
            Order Management
          </h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter((o) => o.status === "Processing").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {orders.filter((o) => o.status === "In Transit").length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter((o) => o.status === "Delivered").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
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
                    placeholder="Search orders by ID, customer, or product..."
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-600">{order.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm text-gray-900">{order.product}</div>
                          <div className="text-sm text-gray-600">Qty: {order.quantity}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">£{order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Processing">Processing</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <Badge className={`${getStatusColor(selectedOrder.status)} w-fit`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedOrder.status)}
                            {selectedOrder.status}
                          </div>
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Order Date</p>
                        <p className="text-sm text-gray-900">{selectedOrder.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer</p>
                        <p className="text-sm text-gray-900">{selectedOrder.customer}</p>
                        <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">£{selectedOrder.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">{selectedOrder.product}</h4>
                          <p className="text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">£{selectedOrder.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">
                            £{(selectedOrder.amount / selectedOrder.quantity).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Delivery Address</p>
                      <p className="text-sm text-gray-900">{selectedOrder.address}</p>
                    </div>
                    {selectedOrder.deliveryDate && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Expected Delivery</p>
                        <p className="text-sm text-gray-900">{selectedOrder.deliveryDate}</p>
                      </div>
                    )}
                    {selectedOrder.trackingNumber && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tracking Number</p>
                        <p className="text-sm font-mono text-gray-900">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Payment Method</p>
                      <p className="text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
