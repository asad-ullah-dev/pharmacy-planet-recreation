"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Calendar, CreditCard, Eye, Search, Filter, MapPin, Truck, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Logout from "@/components/logout/Logout"
import { getUserOrders, Order, OrdersResponse } from "@/lib/api/orderService"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "in transit":
    case "shipped":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Transform API order to display format
const transformOrder = (order: Order) => {
  const orderDate = new Date(order.created_at)
  const deliveryDate = new Date(order.created_at)
  deliveryDate.setDate(deliveryDate.getDate() + 3) // Add 3 days for estimated delivery

  return {
    id: `ORD-${order.id}`,
    date: order.created_at,
    status: order.status,
    total: parseFloat(order.total),
    items: [
      {
        name: order.product_name,
        quantity: order.quantity,
        price: parseFloat(order.product_price),
        description: order.medicine.short_description || order.medicine.description,
      },
    ],
    deliveryDate: deliveryDate.toISOString().split('T')[0],
    shippingAddress: {
      name: `${order.address.first_name} ${order.address.last_name}`,
      line1: order.address.street_address,
      line2: "",
      city: order.address.city,
      postcode: order.address.zip_postal_code,
      country: order.address.country,
    },
    paymentMethod: order.payment_card_last4 
      ? `Card ending in ${order.payment_card_last4}`
      : "Payment completed",
    trackingNumber: order.stripe_payment_intent_id ? `TRK${order.stripe_payment_intent_id.slice(-8)}` : null,
    timeline: [
      {
        date: order.created_at,
        status: "Order Placed",
        description: "Your order has been received and is being processed",
      },
      {
        date: new Date(order.created_at).toISOString().split('T')[0],
        status: "Payment Confirmed",
        description: "Payment has been successfully processed",
      },
      ...(order.status.toLowerCase() === "processing" ? [] : [
        {
          date: new Date(order.created_at).toISOString().split('T')[0],
          status: "Shipped",
          description: "Your order has been dispatched from our pharmacy",
        },
      ]),
      ...(order.status.toLowerCase() === "delivered" ? [
        {
          date: deliveryDate.toISOString().split('T')[0],
          status: "Delivered",
          description: "Package delivered successfully",
        },
      ] : []),
    ],
    originalOrder: order,
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<ReturnType<typeof transformOrder> | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ordersData, setOrdersData] = useState<OrdersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Initial load (full page)
  useEffect(() => {
    setLoading(true)
    getUserOrders(1, "", "all").then(data => {
      setOrdersData(data)
    }).finally(() => setLoading(false))
  }, [])

  // Table updates (search/filter/pagination)
  useEffect(() => {
    if (loading) return
    setTableLoading(true)
    getUserOrders(currentPage, debouncedSearch, statusFilter).then(data => {
      setOrdersData(data)
    }).finally(() => setTableLoading(false))
  }, [currentPage, debouncedSearch, statusFilter, loading])

  const orders = ordersData?.orders.data.map(transformOrder) || []

  const handleViewDetails = (order: ReturnType<typeof transformOrder>) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
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

        {/* Summary Stats */}
        {ordersData && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{ordersData.totals.total_orders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{ordersData.totals.delivered}</div>
                <div className="text-sm text-gray-600">Delivered</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{ordersData.totals.in_progress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">£{ordersData.totals.total_spent.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </CardContent>
            </Card>
          </div>
        )}

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
        <div className="relative space-y-4">
          {orders.length === 0 && !tableLoading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
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
          {tableLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
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
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Payment Status:</span>
                    <Badge className={selectedOrder.originalOrder.payment_status === "paid" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
                      {selectedOrder.originalOrder.payment_status}
                    </Badge>
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
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Subtotal:</span>
                        <span>£{selectedOrder.originalOrder.subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Tax:</span>
                        <span>£{selectedOrder.originalOrder.tax}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Shipping:</span>
                        <span>£{selectedOrder.originalOrder.shipping}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
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
