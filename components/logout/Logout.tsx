"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/api/authService"
import { toast } from "sonner"

const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    try {
      logout()
      toast.success("Logged out successfully")
      router.push("/auth/login")
    } catch (error) {
      toast.error("Error logging out")
      console.error("Logout error:", error)
    }
  }

  return (
    <Button 
      variant="outline" 
      className="text-red-600 border-red-500 hover:bg-red-50 sm:text-sm text-xs sm:px-3 px-1.5" 
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default Logout