import { SignIn } from "@clerk/nextjs"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Social Swipe Directory",
  description: "Sign in to access your Social Swipe Directory account"
}

export default function SignInPage({
  searchParams
}: {
  searchParams: { redirect_url?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignIn 
        path="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "rounded-lg shadow-md",
            formButtonPrimary: "bg-[#5445FF] hover:bg-[#5445FF]/90",
            footerActionLink: "text-[#5445FF] hover:bg-[#5445FF]/90"
          }
        }}
        redirectUrl={searchParams.redirect_url || "/onboarding/platform-selection"}
      />
    </div>
  )
} 