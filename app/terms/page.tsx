import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Privacy Policy - Social Swipe Directory",
  description: "Terms of service, conditions, and privacy policy for using Social Swipe Directory"
}

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Terms and Conditions Section */}
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">
          Welcome to SocialSwipeDeck.com! By using this website, you agree to the following terms and conditions. 
          Please read them carefully before accessing the content.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Copyright Notice</h2>
            <p className="text-gray-600">
              All content reproduced on this site is the property of its respective owners. This compilation is intended 
              solely for educational and inspirational purposes. If you are the owner of any content displayed and wish 
              it to be removed or amended, please contact us immediately via this form: 
              <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
                https://tally.so/r/n0bRk6
              </a>.
            </p>
            <p className="text-gray-600 mt-4">
              We believe that the use of this content falls under the "fair use" exception as provided for in EU Directive 2001/29/EC. 
              However, if you have concerns regarding the use of your content, please reach out, and we will address your concerns promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Educational Use Statement</h2>
            <p className="text-gray-600">
              This website is intended for educational and inspirational purposes only. The content provided helps users 
              learn from successful examples of high-engagement social media posts. We do not claim any ownership over 
              the content featured, and all rights remain with their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Compliance with Platform Terms of Service</h2>
            <p className="text-gray-600">
              We respect the terms of service of all platforms from which content is curated. No automated scraping tools 
              are used to compile this content; all content is manually selected for its educational value.
            </p>
            <p className="text-gray-600 mt-4">
              If you believe any content violates the terms of a specific platform, please notify us via this form: 
              <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
                https://tally.so/r/n0bRk6
              </a>
              , and we will review and take appropriate action.
            </p>
          </section>

          {/* Additional Terms sections... */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">No Endorsement Disclaimer</h2>
            <p className="text-gray-600">
              This site is not affiliated with or endorsed by any individuals, entities, or platforms featured. 
              All trademarks, names, and content belong to their respective owners. The presence of content on 
              this site does not imply any endorsement or association.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Content Accuracy Disclaimer</h2>
            <p className="text-gray-600">
              While we strive to ensure that all content is accurately represented, the information on this site is 
              provided "as is" without warranties of any kind. If you believe that any content is inaccurate or 
              misrepresented, please contact us via 
              <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
                this form
              </a>
              , and we will take corrective action promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              Under no circumstances shall we be liable for any direct, indirect, incidental, or consequential damages 
              resulting from the use of this website. Your use of the content on this website is entirely at your own risk.
            </p>
          </section>

          <hr className="my-12 border-gray-200" />

          {/* Privacy Policy Section */}
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Effective Date:</span> 11/29/2024<br />
              <span className="font-semibold">Last Updated:</span> 11/29/2024
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            SocialSwipeDeck.com ("we," "our," or "us") is committed to protecting your personal data and ensuring 
            transparency about how we collect, use, and share your information. This Privacy Policy outlines how we 
            handle your data in compliance with applicable privacy laws, including the General Data Protection 
            Regulation (GDPR).
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Personal Information You Provide to Us:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Name</li>
                <li>Email address</li>
                <li>Any other information you voluntarily provide when contacting us or subscribing to our email list</li>
              </ul>

              <h3 className="text-xl font-medium">Automatically Collected Information:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Referring URLs</li>
                <li>Information about how you interact with our website</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">To Provide Services:</span> Sending email updates, newsletters, and curated content to subscribers who opt-in.</li>
              <li><span className="font-medium">To Improve Our Services:</span> Analyzing website traffic and engagement to enhance user experience.</li>
              <li><span className="font-medium">To Respond to Inquiries:</span> Addressing any questions, feedback, or concerns you submit via our contact forms or email.</li>
              <li><span className="font-medium">For Legal Compliance:</span> Ensuring compliance with applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Legal Basis for Processing Your Information</h2>
            <p className="text-gray-600 mb-4">Under GDPR, we rely on the following legal bases to process your personal information:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Consent:</span> When you opt-in to our email list or provide your information voluntarily.</li>
              <li><span className="font-medium">Legitimate Interests:</span> To improve our website and ensure its security.</li>
              <li><span className="font-medium">Legal Obligation:</span> Where processing is necessary to comply with laws or respond to lawful requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Email Communication: Opt-In and Opt-Out</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Opting In:</span> By subscribing to our email list, you consent to receive email communications from us.</li>
              <li>
                <span className="font-medium">Opting Out:</span> You can unsubscribe from our emails at any time by clicking the "unsubscribe" link in any email or 
                <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">by contacting us</a>. 
                Once you opt-out, we will stop sending you emails unless you re-subscribe.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. How We Share Your Information</h2>
            <p className="text-gray-600 mb-4">We do not sell, trade, or rent your personal data. However, we may share your information in the following situations:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">With Service Providers:</span> Trusted third-party vendors who assist us in operating our website, such as email service providers or analytics tools.</li>
              <li><span className="font-medium">For Legal Obligations:</span> If required by law, regulation, or legal process (e.g., court orders or subpoenas).</li>
              <li><span className="font-medium">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new owner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal data only as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              or as required by law. Once your information is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights Under GDPR</h2>
            <p className="text-gray-600 mb-4">If you are located in the European Union, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><span className="font-medium">Access:</span> Request a copy of the personal data we hold about you.</li>
              <li><span className="font-medium">Rectification:</span> Request corrections to any inaccurate or incomplete data.</li>
              <li><span className="font-medium">Erasure:</span> Request the deletion of your personal data (the "right to be forgotten").</li>
              <li><span className="font-medium">Restriction:</span> Request that we restrict the processing of your data.</li>
              <li><span className="font-medium">Portability:</span> Request that we provide your data in a structured, commonly used, and machine-readable format.</li>
              <li><span className="font-medium">Objection:</span> Object to the processing of your personal data for direct marketing purposes.</li>
              <li><span className="font-medium">Withdraw Consent:</span> If processing is based on consent, you can withdraw it at any time.</li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise any of these rights, please contact us by 
              <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
                filling out this form
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our site. 
              Cookies may collect anonymous information about how you interact with our website.
            </p>
            <p className="text-gray-600">
              You can control cookies through your browser settings or disable them entirely. 
              Note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Security Measures</h2>
            <p className="text-gray-600">
              We take reasonable steps to protect your personal data against unauthorized access, alteration, 
              disclosure, or destruction. While no method of data transmission or storage is 100% secure, 
              we strive to use commercially acceptable means to safeguard your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="text-gray-600">
              If you are located outside the European Union, please note that your information may be transferred to, 
              processed, and stored in the EU or other countries where we or our service providers operate. 
              By using our services, you consent to such data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Third-Party Links</h2>
            <p className="text-gray-600">
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices or content of these external sites. Please review the privacy policies of any 
              third-party websites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Updates to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or 
              legal requirements. Any updates will be posted on this page with the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions or concerns about this Privacy Policy or wish to exercise your rights, 
              please contact us by 
              <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
                filling out this form
              </a>.
            </p>
            <p className="text-gray-600 mt-4">
              Thank you for trusting Social Swipe Deck. Your privacy is important to us.
            </p>
          </section>
        </div>

        <div className="mt-12 text-gray-600 text-sm">
          <p>
            For any questions or concerns about these terms or privacy policy, please contact us via 
            <a href="https://tally.so/r/n0bRk6" className="text-blue-600 hover:text-blue-800 ml-1">
              this form
            </a>.
          </p>
        </div>
      </div>
    </main>
  )
} 