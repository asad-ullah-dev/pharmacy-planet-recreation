"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const Logout = () => {
  const router = useRouter()

  const Handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login") // ya jahan bhi redirect karna ho
  }

  return (
    <Button variant="outline" className="text-red-600 border-red-500 hover:bg-red-50 sm:text-sm text-xs sm:px-3 px-1.5" onClick={Handlelogout}>
    Logout
    </Button>
  )
}

export default Logout