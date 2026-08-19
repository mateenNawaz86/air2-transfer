import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-8">
            Sorry, the page you're looking for doesn't exist or has been temporarily disabled.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </Link>
          
          <div className="text-gray-400 text-sm">
            <p>Need help? Contact us at:</p>
            <p className="text-blue-400">info@air2transport.com</p>
            <p className="text-blue-400">01213141080</p>
          </div>
        </div>
        
        <div className="mt-12 text-gray-500 text-sm">
          <p>© 2024 Air2Transport. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 