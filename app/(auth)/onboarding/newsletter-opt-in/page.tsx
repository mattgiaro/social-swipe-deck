"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { updateNewsletterPreference } from "@/lib/actions/onboarding"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function NewsletterOptInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = "/dashboard"
    }
  }, [shouldRedirect])

  const handleOptionSelect = (optIn: boolean) => {
    setSelectedOption(optIn)
  }

  const handleContinue = async () => {
    if (selectedOption === null) return
    
    setIsLoading(true)
    try {
      const result = await updateNewsletterPreference(selectedOption)
      if (result.success) {
        toast.success("Preferences saved successfully!")
        // Add a small delay to allow metadata to sync
        await new Promise(resolve => setTimeout(resolve, 1500))
        setShouldRedirect(true)
      } else {
        toast.error("Failed to update preference. Please try again.")
        throw new Error('Failed to update newsletter preference')
      }
    } catch (error) {
      console.error("Error saving preference:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Get Our Proven Templates to Grow Your Platform 🚀
        </h1>
        <p className="text-xl text-center mb-8 text-muted-foreground">
          Join thousands of creators who've accelerated their growth with our proven strategies
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => handleOptionSelect(true)}
            className={cn(
              "w-full text-xl font-medium h-14 transition-all",
              selectedOption === true 
                ? "bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
                : "bg-white hover:border-[#5445FF]/50",
              selectedOption !== null && selectedOption !== true && "opacity-50"
            )}
            variant={selectedOption === true ? "default" : "outline"}
            disabled={isLoading}
          >
            Yes, I want to grow faster! 🎯
          </Button>

          <Button
            onClick={() => handleOptionSelect(false)}
            className={cn(
              "w-full text-xl font-medium h-14 transition-all",
              selectedOption === false 
                ? "bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
                : "bg-white hover:border-[#5445FF]/50",
              selectedOption !== null && selectedOption !== false && "opacity-50"
            )}
            variant={selectedOption === false ? "default" : "outline"}
            disabled={isLoading}
          >
            No, I'll grow on my own
          </Button>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleContinue}
              className={cn(
                "transition-all px-12",
                selectedOption === null
                  ? "opacity-50 cursor-not-allowed bg-gray-400 text-white/70" 
                  : "bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
              )}
              disabled={selectedOption === null || isLoading}
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