import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
} 