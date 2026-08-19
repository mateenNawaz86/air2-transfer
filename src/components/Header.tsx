'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, Phone, Mail, MapPin, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { createClient } from '@/lib/auth'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Check authentication on component mount and listen for auth changes
  useEffect(() => {
    console.log('Header: Starting auth check...')
    
    // Set loading to false after a short delay to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    // Initial auth check
    const initialCheck = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('role, first_name, last_name')
            .eq('user_id', user.id)
            .single()
          
          if (!profileError && profile) {
            setUserProfile(profile)
          } else {
            setUserProfile(null)
          }
        } else {
          setUserProfile(null)
        }
      } catch (error) {
        console.error('Error in initial auth check:', error)
        setUserProfile(null)
      } finally {
        clearTimeout(timeout)
        setLoading(false)
      }
    }
    
    initialCheck()
    
    // Listen for authentication state changes
    // REMOVED - AUTH STATE LISTENER DISABLED TO PREVENT AUTO REFRESH ISSUES
    /*
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('Header: User signed in, updating state...')
        setUser(session.user)
        setLoading(true)
        try {
          // Fetch updated profile data
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('role, first_name, last_name')
            .eq('user_id', session.user.id)
            .single()
          
          if (!profileError && profile) {
            setUserProfile(profile)
          } else {
            setUserProfile(null)
          }
        } catch (error) {
          console.error('Error fetching profile in auth listener:', error)
          setUserProfile(null)
        } finally {
          setLoading(false)
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('Header: User signed out, clearing state...')
        setUser(null)
        setUserProfile(null)
        setShowProfileDropdown(false)
        setLoading(false)
      }
    })
    */

    // Cleanup subscription and timeout on unmount
    return () => {
      // subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false)
      }
    }

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileDropdown])



  const handleLogout = async () => {
    try {
      console.log('Header: Logout initiated...')
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        return
      }
      
      console.log('Header: Logout successful, clearing state...')
      // Clear sessionStorage items
      sessionStorage.removeItem('dashboardRefreshed')
      // Delete the dashboard refresh cookie on logout
      document.cookie = 'dashboardRefreshed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      setUser(null)
      setUserProfile(null)
      setShowProfileDropdown(false)
      router.push('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const getPortalLink = () => {
    return '/dashboard'
  }

  const navigation = [
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Airport Transfers', href: '/services/airport-transfers' },
        { name: 'Chauffeur Services', href: '/services/chauffeur-services' },
        { name: 'Events & Weddings', href: '/services/events-chauffeur-service' },
        { name: 'City to City Transfers', href: '/services/city-to-city-transfers' },
        { name: 'Concierge Services', href: '/services/concierge-services' }
      ]
    },
    {
      name: 'Airport Transfers',
      href: '/airport-transfers',
      dropdown: [
        { name: 'Heathrow Airport', href: '/airport-transfers/heathrow' },
        { name: 'Gatwick Airport', href: '/airport-transfers/gatwick' },
        { name: 'Birmingham Airport', href: '/airport-transfers/birmingham' },
        { name: 'Manchester Airport', href: '/airport-transfers/manchester' },
        { name: 'Stansted Airport', href: '/airport-transfers/stansted' },
        { name: 'Luton Airport', href: '/airport-transfers/luton' },
        { name: 'London City Airport', href: '/airport-transfers/london-city' },
        { name: 'East Midlands Airport', href: '/airport-transfers/east-midlands' }
      ]
    },
    {
      name: 'Cities',
      href: '/cities',
      dropdown: [
        { name: 'London', href: '/cities/london' },
        { name: 'Birmingham', href: '/cities/birmingham' },
        { name: 'Manchester', href: '/cities/manchester' },
        { name: 'Leeds', href: '/cities/leeds' },
        { name: 'Liverpool', href: '/cities/liverpool' },
        { name: 'Sheffield', href: '/cities/sheffield' },
        { name: 'Nottingham', href: '/cities/nottingham' },
        { name: 'Coventry', href: '/cities/coventry' }
      ]
    },
    { name: 'Fleet', href: '/fleet' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Now', href: '/bookings/new', isButton: true }
  ]

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-jet2-dark text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-jet2-orange" />
                <a href="tel:01213141080" className="font-bold text-base hover:text-white transition-colors phone-color-animation">
                  01213141080
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@air2transport.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Serving All UK Locations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://assetshost.sirv.com/jet2transport/logoair2.png"
              alt="Air2Transport"
              width={130}
              height={60}
              className="h-16 w-auto max-w-[130px]"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center space-x-1 text-jet2-dark hover:text-jet2-orange font-medium transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`${
                      item.isButton
                        ? 'btn-primary'
                        : 'text-jet2-dark hover:text-jet2-orange font-medium transition-colors duration-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-200 ${
                    activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-jet2-dark hover:bg-jet2-light hover:text-jet2-orange transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Authentication Button */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-jet2-orange rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <ChevronDown className={`h-4 w-4 text-jet2-dark transition-transform duration-200 ${
                      showProfileDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-jet2-dark">
                          {userProfile?.first_name && userProfile?.last_name 
                            ? `${userProfile.first_name} ${userProfile.last_name}`
                            : user.email
                          }
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{userProfile?.role || 'client'}</div>
                      </div>
                      
                      <Link
                        href={getPortalLink()}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-jet2-dark hover:bg-jet2-light hover:text-jet2-orange transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>My Portal</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-jet2-dark" />
            ) : (
              <Menu className="h-6 w-6 text-jet2-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full text-left px-4 py-3 rounded-lg text-jet2-dark hover:bg-jet2-light hover:text-jet2-orange transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block w-full text-left px-4 py-3 rounded-lg ${
                      item.isButton
                        ? 'btn-primary text-center'
                        : 'text-jet2-dark hover:bg-jet2-light hover:text-jet2-orange transition-colors'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Mobile Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-jet2-gray hover:text-jet2-orange transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Authentication */}
            <div className="border-t pt-4 mt-4">
              {loading ? (
                <div className="px-4 py-3 space-y-2">
                  <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-jet2-dark">
                      {userProfile?.first_name && userProfile?.last_name 
                        ? `${userProfile.first_name} ${userProfile.last_name}`
                        : user.email
                      }
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{userProfile?.role || 'client'}</div>
                  </div>
                  
                  <Link
                    href={getPortalLink()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-jet2-dark hover:bg-jet2-light hover:text-jet2-orange transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>My Portal</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 