export const SERVICE_ROUTES = {
  airportTransfers: '/services/airport-transfers',
  chauffeurServices: '/services/chauffeur-services',
  eventsAndWeddings: '/services/events-chauffeur-service',
  cityToCityTransfers: '/services/city-to-city-transfers',
  conciergeServices: '/services/concierge-services',
} as const

export type ServiceRouteKey = keyof typeof SERVICE_ROUTES
