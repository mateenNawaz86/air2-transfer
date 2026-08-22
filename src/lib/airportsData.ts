export type AirportRoute = {
  name: string
  description: string
  duration: string
}

export type AirportData = {
  slug: string
  name: string
  fullName: string
  whyChooseTagline: string
  about: string
  facts: [string, string, string]
  routes: AirportRoute[]
}

export const AIRPORTS: AirportData[] = [
  {
    slug: 'heathrow',
    name: 'Heathrow',
    fullName: 'London Heathrow Airport',
    whyChooseTagline: "London's busiest airport",
    about:
      "London Heathrow Airport is the UK's busiest airport and one of the world's major aviation hubs. Located 15 miles west of Central London, it serves over 80 million passengers annually.",
    facts: ['15 miles west of Central London', 'Approximately 45-60 minutes from Central London', '5 passenger terminals'],
    routes: [
      { name: 'Central London', description: 'Westminster, Mayfair, Soho', duration: '45-60 minutes' },
      { name: 'City of London', description: 'Financial District, Canary Wharf', duration: '60-75 minutes' },
      { name: 'West London', description: 'Kensington, Chelsea, Fulham', duration: '30-45 minutes' },
      { name: 'North London', description: 'Camden, Islington, Hampstead', duration: '50-65 minutes' },
      { name: 'South London', description: 'Clapham, Wimbledon, Richmond', duration: '40-55 minutes' },
      { name: 'East London', description: 'Shoreditch, Hackney, Stratford', duration: '55-70 minutes' },
    ],
  },
  {
    slug: 'gatwick',
    name: 'Gatwick',
    fullName: 'London Gatwick Airport',
    whyChooseTagline: "London's second busiest airport",
    about:
      "London Gatwick Airport is the UK's second busiest airport and a major international hub. Located 30 miles south of Central London, it serves over 46 million passengers annually.",
    facts: ['30 miles south of Central London', 'Approximately 60-90 minutes from Central London', '2 passenger terminals'],
    routes: [
      { name: 'Central London', description: 'Westminster, Mayfair, Soho', duration: '60-90 minutes' },
      { name: 'South London', description: 'Croydon, Sutton, Bromley', duration: '30-45 minutes' },
      { name: 'West Sussex', description: 'Crawley, Horsham, Haywards Heath', duration: '20-40 minutes' },
      { name: 'East Sussex', description: 'Brighton, Eastbourne, Hastings', duration: '45-90 minutes' },
      { name: 'Kent', description: 'Tunbridge Wells, Sevenoaks, Maidstone', duration: '40-70 minutes' },
      { name: 'Surrey', description: 'Guildford, Woking, Reigate', duration: '30-60 minutes' },
    ],
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    fullName: 'Birmingham Airport',
    whyChooseTagline: "the Midlands' major airport",
    about:
      "Birmingham Airport is the UK's seventh busiest airport and the major airport serving the Midlands. Located 6 miles east of Birmingham city center, it serves over 12 million passengers annually.",
    facts: ['6 miles east of Birmingham city center', 'Approximately 15-30 minutes from Birmingham', '1 passenger terminal'],
    routes: [
      { name: 'Birmingham City', description: 'City center, business district', duration: '15-30 minutes' },
      { name: 'Solihull', description: 'Business and residential area', duration: '10-20 minutes' },
      { name: 'Coventry', description: 'Historic city and university', duration: '20-35 minutes' },
      { name: 'Warwick', description: 'Historic town and castle', duration: '25-40 minutes' },
      { name: 'Leamington Spa', description: 'Spa town and business center', duration: '30-45 minutes' },
      { name: 'Stratford-upon-Avon', description: "Shakespeare's birthplace", duration: '35-50 minutes' },
    ],
  },
  {
    slug: 'east-midlands',
    name: 'East Midlands',
    fullName: 'East Midlands Airport',
    whyChooseTagline: "the Midlands' major airport",
    about:
      'East Midlands Airport is a major airport serving the East Midlands region. Located between Derby, Leicester, and Nottingham, it serves over 4 million passengers annually.',
    facts: ['Between Derby, Leicester, and Nottingham', 'Approximately 20-40 minutes from major cities', '1 passenger terminal'],
    routes: [
      { name: 'Nottingham', description: 'City center and business district', duration: '20-35 minutes' },
      { name: 'Derby', description: 'Industrial city and business center', duration: '15-30 minutes' },
      { name: 'Leicester', description: 'Historic city and university', duration: '25-40 minutes' },
      { name: 'Loughborough', description: 'University town and business center', duration: '15-25 minutes' },
      { name: 'Mansfield', description: 'Market town and business center', duration: '20-35 minutes' },
      { name: 'Chesterfield', description: 'Historic market town', duration: '25-40 minutes' },
    ],
  },
  {
    slug: 'london-city',
    name: 'London City',
    fullName: 'London City Airport',
    whyChooseTagline: "London's most central airport",
    about:
      "London City Airport is London's most central airport, located in the heart of the capital's business district. Located just 6 miles east of Central London, it serves over 5 million passengers annually.",
    facts: ['6 miles east of Central London', 'Approximately 20-40 minutes from Central London', '1 passenger terminal'],
    routes: [
      { name: 'Central London', description: 'Westminster, Mayfair, Soho', duration: '20-40 minutes' },
      { name: 'City of London', description: 'Financial district, Canary Wharf', duration: '10-25 minutes' },
      { name: 'East London', description: 'Shoreditch, Hackney, Stratford', duration: '15-30 minutes' },
      { name: 'North London', description: 'Camden, Islington, Hampstead', duration: '25-45 minutes' },
      { name: 'South London', description: 'Clapham, Wimbledon, Richmond', duration: '30-50 minutes' },
      { name: 'West London', description: 'Kensington, Chelsea, Fulham', duration: '35-55 minutes' },
    ],
  },
  {
    slug: 'luton',
    name: 'Luton',
    fullName: 'London Luton Airport',
    whyChooseTagline: "London's fourth busiest airport",
    about:
      "London Luton Airport is the UK's fifth busiest airport and a major hub for low-cost carriers. Located 28 miles north of Central London, it serves over 16 million passengers annually.",
    facts: ['28 miles north of Central London', 'Approximately 45-75 minutes from Central London', '1 passenger terminal'],
    routes: [
      { name: 'Central London', description: 'Westminster, Mayfair, Soho', duration: '45-75 minutes' },
      { name: 'North London', description: 'Camden, Islington, Hampstead', duration: '35-60 minutes' },
      { name: 'West London', description: 'Kensington, Chelsea, Fulham', duration: '50-80 minutes' },
      { name: 'Bedfordshire', description: 'Bedford, Luton, Dunstable', duration: '15-45 minutes' },
      { name: 'Buckinghamshire', description: 'Milton Keynes, Aylesbury, High Wycombe', duration: '20-50 minutes' },
      { name: 'Hertfordshire', description: 'St Albans, Watford, Hemel Hempstead', duration: '20-40 minutes' },
    ],
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    fullName: 'Manchester Airport',
    whyChooseTagline: "the North's major airport",
    about:
      "Manchester Airport is the UK's third busiest airport and the major airport serving the North of England. Located 8 miles south of Manchester city center, it serves over 28 million passengers annually.",
    facts: ['8 miles south of Manchester city center', 'Approximately 20-40 minutes from Manchester', '3 passenger terminals'],
    routes: [
      { name: 'Manchester City', description: 'City center, business district', duration: '20-40 minutes' },
      { name: 'Stockport', description: 'Business and residential area', duration: '15-25 minutes' },
      { name: 'Altrincham', description: 'Affluent suburb and business center', duration: '25-35 minutes' },
      { name: 'Warrington', description: 'Business and industrial town', duration: '30-45 minutes' },
      { name: 'Bolton', description: 'Historic market town', duration: '25-40 minutes' },
      { name: 'Bury', description: 'Market town and business center', duration: '20-35 minutes' },
    ],
  },
  {
    slug: 'stansted',
    name: 'Stansted',
    fullName: 'London Stansted Airport',
    whyChooseTagline: "London's third busiest airport",
    about:
      "London Stansted Airport is the UK's fourth busiest airport and a major hub for low-cost carriers. Located 42 miles northeast of Central London, it serves over 28 million passengers annually.",
    facts: ['42 miles northeast of Central London', 'Approximately 60-90 minutes from Central London', '1 passenger terminal'],
    routes: [
      { name: 'Central London', description: 'Westminster, Mayfair, Soho', duration: '60-90 minutes' },
      { name: 'North London', description: 'Camden, Islington, Hampstead', duration: '45-75 minutes' },
      { name: 'East London', description: 'Shoreditch, Hackney, Stratford', duration: '40-70 minutes' },
      { name: 'Cambridge', description: 'University city and business center', duration: '30-45 minutes' },
      { name: 'Essex', description: 'Chelmsford, Colchester, Southend', duration: '20-60 minutes' },
      { name: 'Hertfordshire', description: 'St Albans, Watford, Hemel Hempstead', duration: '25-50 minutes' },
    ],
  },
]

export function getAirportBySlug(slug: string): AirportData | undefined {
  return AIRPORTS.find((a) => a.slug === slug)
}
