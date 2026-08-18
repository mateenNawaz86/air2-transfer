'use client'

import { Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function StickyPhone() {
  const pathname = usePathname()
  
  // Hide on dashboard pages
  const isDashboardPage = pathname?.startsWith('/admin') || 
                         pathname?.startsWith('/bookings') || 
                         pathname?.startsWith('/dashboard') ||
                         pathname?.startsWith('/driver') ||
                         pathname?.startsWith('/login') ||
                         pathname?.startsWith('/register')
  
  if (isDashboardPage) {
    return null
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Desktop - Show phone number and icon */}
      <div className="hidden md:flex items-center space-x-3 bg-jet2-orange text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse">
        <Phone className="h-5 w-5 animate-bounce" />
        <a 
          href="tel:01213141080" 
          className="font-semibold text-lg hover:text-gray-200 transition-colors"
        >
          01213141080
        </a>
      </div>
      
      {/* Mobile - Show only icon */}
      <div className="md:hidden">
        <a 
          href="tel:01213141080"
          className="flex items-center justify-center w-14 h-14 bg-jet2-orange text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
        >
          <Phone className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </div>
  )
}
