import { SignUp } from "@clerk/nextjs"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Social Swipe Directory", 
  description: "Create your Social Swipe Directory account"
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignUp 
        path="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "rounded-lg shadow-md",
            formButtonPrimary: "bg-[#5445FF] hover:bg-[#5445FF]/90",
            footerActionLink: "text-[#5445FF] hover:bg-[#5445FF]/90"
          }
        }}
        redirectUrl="/onboarding/platform-selection"
      />
    </div>
  )
}