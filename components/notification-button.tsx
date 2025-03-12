"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface NotificationButtonProps {
  onClick: () => Promise<boolean>
  text: string
}

export function NotificationButton({ onClick, text }: NotificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const result = await onClick()

      if (result) {
        toast({
          title: "Success!",
          description: "Notification sent successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send notification",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        className="w-full py-6 text-lg font-medium bg-[#1d103a] hover:bg-[#2f1a61] border border-[#6434ce] rounded-full transition-all duration-300 ease-in-out"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : (
          text
        )}
      </Button>
    </motion.div>
  )
}

