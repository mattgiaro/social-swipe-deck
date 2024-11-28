import { type Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Authentication - Social Swipe Directory",
    template: "%s - Social Swipe Directory"
  },
  description: "Authentication pages for Social Swipe Directory"
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
} 