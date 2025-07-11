"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserAddress, createOrUpdateAddress } from "@/lib/api/addressService"
import { Address } from "@/lib/types"
import { toast } from "sonner"
import WithAuth from "@/components/auth/WithAuth"

export default function TestAddressPage() {
  const [address, setAddress] = useState<Address | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testAddress] = useState<Address>({
    first_name: "John",
    last_name: "Doe",
    phone_number: "18683087654",
    street_address: "#13 Manuel Junction",
    city: "Port of Spain",
    county: "Trinidad",
    country: "Trinidad & Tobago",
    zip_postal_code: "00000"
  })

  const loadAddress = async () => {
    setIsLoading(true)
    try {
      const userAddress = await getUserAddress()
      setAddress(userAddress)
      toast.success("Address loaded successfully!")
    } catch (error) {
      console.error('Error loading address:', error)
      toast.error("Failed to load address")
    } finally {
      setIsLoading(false)
    }
  }

  const saveTestAddress = async () => {
    setIsLoading(true)
    try {
      const response = await createOrUpdateAddress(testAddress)
      setAddress(response.data)
      toast.success(response.message || "Test address saved successfully!")
    } catch (error) {
      console.error('Error saving address:', error)
      toast.error("Failed to save test address")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <WithAuth requiredRole="any" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Address API Test Page</h1>
          
          <div className="grid gap-6">
            {/* Test Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Test Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={loadAddress} 
                    disabled={isLoading}
                    className="mr-4"
                  >
                    {isLoading ? "Loading..." : "Load Current Address"}
                  </Button>
                  
                  <Button 
                    onClick={saveTestAddress} 
                    disabled={isLoading}
                    variant="outline"
                  >
                    {isLoading ? "Saving..." : "Save Test Address"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Address */}
            <Card>
              <CardHeader>
                <CardTitle>Current Address</CardTitle>
              </CardHeader>
              <CardContent>
                {address ? (
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {address.first_name} {address.last_name}</div>
                    <div><strong>Phone:</strong> {address.phone_number}</div>
                    <div><strong>Street:</strong> {address.street_address}</div>
                    <div><strong>City:</strong> {address.city}</div>
                    <div><strong>County:</strong> {address.county}</div>
                    <div><strong>Country:</strong> {address.country}</div>
                    <div><strong>Postal Code:</strong> {address.zip_postal_code}</div>
                    {address.id && <div><strong>ID:</strong> {address.id}</div>}
                    {address.is_default_billing && <div><strong>Default Billing:</strong> Yes</div>}
                    {address.is_default_shipping && <div><strong>Default Shipping:</strong> Yes</div>}
                  </div>
                ) : (
                  <p className="text-gray-500">No address loaded</p>
                )}
              </CardContent>
            </Card>

            {/* Test Address Data */}
            <Card>
              <CardHeader>
                <CardTitle>Test Address Data</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(testAddress, null, 2)}
                </pre>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/dashboard/address">Go to Address Page</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WithAuth>
  )
} 