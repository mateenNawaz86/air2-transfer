import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/cookie-policy/',
  title: 'Cookie Policy | Air2Transport',
  description:
    'Find out how Air2Transport uses cookies on our website and how to manage your cookie preferences.',
})

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files that are placed on your computer or mobile device when 
              you visit a website. They are widely used to make websites work more efficiently 
              and to provide information to website owners.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 mb-6">
              Air2Transport uses cookies to enhance your browsing experience, analyze site traffic, 
              and personalize content. We use both session cookies (which expire when you close your 
              browser) and persistent cookies (which remain on your device for a set period).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They enable basic 
              functions like page navigation, access to secure areas, and form submissions. The 
              website cannot function properly without these cookies.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously. This helps us improve our website's performance 
              and user experience.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies enable enhanced functionality and personalization, such as remembering 
              your preferences and settings. They may be set by us or by third-party providers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
            <p className="text-gray-700 mb-6">
              These cookies are used to track visitors across websites to display relevant and 
              engaging advertisements. They help us measure the effectiveness of our marketing campaigns.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-6">
              You can control and manage cookies in various ways. Most web browsers allow you to 
              refuse cookies or delete them. However, please note that disabling cookies may affect 
              the functionality of our website and your user experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser Settings</h2>
            <p className="text-gray-700 mb-6">
              You can manage cookies through your browser settings. Each browser is different, so 
              check your browser's help menu to learn how to modify your cookie settings. Popular 
              browsers include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
              <li>Internet Explorer</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-6">
              Some cookies on our website are set by third-party services that appear on our pages. 
              We do not control these cookies and recommend you check the third-party websites for 
              more information about their cookies and how to manage them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please revisit this page 
              regularly to stay informed about our use of cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> info@air2transport.com<br />
                <strong>Phone:</strong> 01213141080<br />
                <strong>Address:</strong> Birmingham, UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
