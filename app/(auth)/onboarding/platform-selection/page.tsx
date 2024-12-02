"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { updatePlatformPreference } from "@/lib/actions/onboarding"
import type { Platform } from "@/types/user"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function PlatformSelectionPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform)
  }

  const handleContinue = async () => {
    if (!selectedPlatform) return

    setIsLoading(true)
    try {
      const result = await updatePlatformPreference(selectedPlatform)
      if (result.success) {
        router.push("/onboarding/newsletter-opt-in")
      } else {
        toast.error("Failed to save your platform preference. Please try again.")
        throw new Error('Failed to update platform preference')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Which platform do you want to grow on primarily?
        </h1>

        <div className="space-y-3">
          <Button
            onClick={() => handlePlatformSelect("X")}
            className={cn(
              "w-full justify-start gap-2 transition-all hover:border-[#5445FF]/50",
              selectedPlatform === "X" && "border-[#5445FF] border-2",
              selectedPlatform && selectedPlatform !== "X" && "opacity-50"
            )}
            variant="outline"
            disabled={isLoading}
            type="button"
          >
            <i className="bi bi-twitter text-xl" />
            X (Twitter)
          </Button>

          <Button
            onClick={() => handlePlatformSelect("LinkedIn")}
            className={cn(
              "w-full justify-start gap-2 transition-all hover:border-[#5445FF]/50",
              selectedPlatform === "LinkedIn" && "border-[#5445FF] border-2",
              selectedPlatform && selectedPlatform !== "LinkedIn" && "opacity-50"
            )}
            variant="outline"
            disabled={isLoading}
            type="button"
          >
            <i className="bi bi-linkedin text-xl" />
            LinkedIn
          </Button>

          <Button
            onClick={() => handlePlatformSelect("Substack")}
            className={cn(
              "w-full justify-start gap-2 transition-all hover:border-[#5445FF]/50",
              selectedPlatform === "Substack" && "border-[#5445FF] border-2",
              selectedPlatform && selectedPlatform !== "Substack" && "opacity-50"
            )}
            variant="outline"
            disabled={isLoading}
            type="button"
          >
            <i className="bi bi-substack text-xl" />
            Substack
          </Button>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleContinue}
              className={cn(
                "transition-all px-12",
                !selectedPlatform 
                  ? "opacity-50 cursor-not-allowed bg-gray-400 text-white/70" 
                  : "bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
              )}
              disabled={!selectedPlatform || isLoading}
              type="button"
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 