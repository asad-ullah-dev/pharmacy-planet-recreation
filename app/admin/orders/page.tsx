"use client"

import { useState, useEffect } from "react"
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
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logout from "@/components/logout/Logout"
import { getAdminOrders, AdminOrder, AdminOrdersPagination, updateAdminOrderStatus } from "@/lib/api/orderService"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [pagination, setPagination] = useState<AdminOrdersPagination | null>(null)
  const [totals, setTotals] = useState<{ total_orders: number; processing: number; in_transit: number; delivered: number }>({ total_orders: 0, processing: 0, in_transit: 0, delivered: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusUpdating, setStatusUpdating] = useState<{ [orderId: number]: boolean }>({})
  const { toast } = useToast()
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Initial load (full page loading)
  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAdminOrders(1, "", "all")
        setOrders(data.orders.data)
        setPagination(data.orders)
        setTotals(data.totals)
      } catch (err) {
        setError("Failed to load orders.")
      } finally {
        setLoading(false)
      }
    }
    fetchInitialOrders()
  }, [])

  // Table updates (search/filter/pagination) - only after initial load
  useEffect(() => {
    if (loading) return // Don't double-load on first mount
    const fetchOrders = async () => {
      try {
        setTableLoading(true)
        setError(null)
        const data = await getAdminOrders(currentPage, debouncedSearch, statusFilter)
        setOrders(data.orders.data)
        setPagination(data.orders)
        setTotals(data.totals)
      } catch (err) {
        setError("Failed to load orders.")
      } finally {
        setTableLoading(false)
      }
    }
    fetchOrders()
  }, [currentPage, debouncedSearch, statusFilter, loading])

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

  const handleViewOrder = (order: AdminOrder) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && pagination && page <= pagination.last_page) {
      setCurrentPage(page)
    }
  }

  const handleStatusChange = async (order: AdminOrder, newStatus: string) => {
    setStatusUpdating((prev) => ({ ...prev, [order.id]: true }))
    try {
      await updateAdminOrderStatus(order.id, newStatus)
      setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status: newStatus } : o))
      toast({ title: "Order status updated", description: `Order #${order.id} status set to ${newStatus}.` })
    } catch (err) {
      toast({ title: "Error", description: "Failed to update order status.", variant: "destructive" })
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [order.id]: false }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
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
             <div>
              <Logout />
            </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totals.total_orders}</p>
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
                    {totals.processing}
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
                    {totals.in_transit}
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
                    {totals.delivered}
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
                    <SelectItem value="Processing">Processing ({totals.processing})</SelectItem>
                    <SelectItem value="In Transit">In Transit ({totals.in_transit})</SelectItem>
                    <SelectItem value="delivered">Delivered ({totals.delivered})</SelectItem>
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
            <CardTitle>Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
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
                  {orders.length === 0 && !tableLoading && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500 text-lg">
                        No orders found
                      </td>
                    </tr>
                  )}
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{order.user.first_name} {order.user.last_name}</div>
                          <div className="text-sm text-gray-600">{order.user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm text-gray-900">{order.product_name}</div>
                          <div className="text-sm text-gray-600">Qty: {order.quantity}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">£{Number(order.total).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.created_at}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status !== "Cancelled" && (
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleStatusChange(order, value)}
                              disabled={!!statusUpdating[order.id]}
                            >
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
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tableLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.prev_page_url}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            {pagination.links
              .filter(link => !isNaN(Number(link.label)))
              .map(link => (
                <Button
                  key={link.label}
                  variant={link.active ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(Number(link.label))}
                  disabled={link.active}
                >
                  {link.label}
                </Button>
              ))}
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.next_page_url}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}

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
                        <p className="text-sm text-gray-900">{selectedOrder.created_at}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer</p>
                        <p className="text-sm text-gray-900">{selectedOrder.user.first_name} {selectedOrder.user.last_name}</p>
                        <p className="text-sm text-gray-600">{selectedOrder.user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">£{Number(selectedOrder.total).toFixed(2)}</p>
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
                          <h4 className="font-medium text-gray-900">{selectedOrder.product_name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">£{Number(selectedOrder.total).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">
                            £{(Number(selectedOrder.total) / selectedOrder.quantity).toFixed(2)} each
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
                      <p className="text-sm text-gray-900">{selectedOrder.address.street_address}, {selectedOrder.address.city}, {selectedOrder.address.county}, {selectedOrder.address.country}, {selectedOrder.address.zip_postal_code}</p>
                    </div>
                    {/* Optionally estimate delivery date or omit if not available */}
                    {/* Tracking Number */}
                    {selectedOrder.stripe_payment_intent_id && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tracking Number</p>
                        <p className="text-sm font-mono text-gray-900">TRK{selectedOrder.stripe_payment_intent_id.slice(-8)}</p>
                      </div>
                    )}
                    {selectedOrder.shipping && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Shipping</p>
                        <p className="text-sm text-gray-900">£{selectedOrder.shipping}</p>
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
                      <p className="text-sm text-gray-900">{selectedOrder.payment_card_last4 ? `Card ending in ${selectedOrder.payment_card_last4}` : 'Payment completed'}</p>
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
