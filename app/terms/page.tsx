import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Social Swipe Directory",
  description: "Terms of service and conditions for using Social Swipe Directory"
}

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Social Swipe Deck, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access the materials (information or software) on Social Swipe Deck for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-600 mb-4">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on Social Swipe Deck</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on Social Swipe Deck are provided on an 'as is' basis. Social Swipe Deck makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall Social Swipe Deck or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Social Swipe Deck, even if Social Swipe Deck or a Social Swipe Deck authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Revisions and Errata</h2>
            <p className="text-gray-600 mb-4">
              The materials appearing on Social Swipe Deck could include technical, typographical, or photographic errors. Social Swipe Deck does not warrant that any of the materials on its website are accurate, complete or current. Social Swipe Deck may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
} 