"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { updateNewsletterPreference } from "@/lib/actions/onboarding"

export default function NewsletterOptInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleResponse = async (optIn: boolean) => {
    setIsLoading(true)
    try {
      const result = await updateNewsletterPreference(optIn)
      if (result.success) {
        router.push("/")
      } else {
        throw new Error('Failed to update newsletter preference')
      }
    } catch (error) {
      console.error("Error saving preference:", error)
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Do you want to get our proven templates to grow your platform?
        </h1>

        <div className="space-y-4">
          <Button
            onClick={() => handleResponse(true)}
            className="w-full"
            disabled={isLoading}
          >
            Yes, send me the templates
          </Button>

          <Button
            onClick={() => handleResponse(false)}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            No, thanks
          </Button>
        </div>
      </Card>
    </div>
  )
} 