"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { updatePlatformPreference } from "@/lib/actions/onboarding"
import type { Platform } from "@/types/user"

export default function PlatformSelectionPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlatformSelect = async (platform: Platform) => {
    setIsLoading(true)
    setSelectedPlatform(platform)
    
    try {
      const result = await updatePlatformPreference(platform)
      if (result.success) {
        router.push("/onboarding/newsletter-opt-in")
      } else {
        throw new Error('Failed to update platform preference')
      }
    } catch (error) {
      console.error('Error:', error)
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Which platform do you want to grow on primarily?
        </h1>
        
        <div className="space-y-4">
          <Button
            onClick={() => handlePlatformSelect("X")}
            className="w-full justify-start gap-2"
            variant={selectedPlatform === "X" ? "default" : "outline"}
            disabled={isLoading}
          >
            <i className="bi bi-twitter text-xl" />
            X (Twitter)
          </Button>

          <Button
            onClick={() => handlePlatformSelect("LinkedIn")}
            className="w-full justify-start gap-2"
            variant={selectedPlatform === "LinkedIn" ? "default" : "outline"}
            disabled={isLoading}
          >
            <i className="bi bi-linkedin text-xl" />
            LinkedIn
          </Button>

          <Button
            onClick={() => handlePlatformSelect("Substack")}
            className="w-full justify-start gap-2"
            variant={selectedPlatform === "Substack" ? "default" : "outline"}
            disabled={isLoading}
          >
            <i className="bi bi-substack text-xl" />
            Substack
          </Button>
        </div>
      </Card>
    </div>
  )
} 