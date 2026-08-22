export type CityArea = {
  name: string
  description: string
  landmarks: string
}

export type CityData = {
  slug: string
  name: string
  tagline: string
  about: string
  facts: [string, string, string]
  areas: CityArea[]
}

export const CITIES: CityData[] = [
  {
    slug: 'london',
    name: 'London',
    tagline: 'the capital city',
    about:
      "London is the capital and largest city of England and the United Kingdom. It's a global hub for business, finance, culture, and tourism, with a rich history spanning over 2,000 years.",
    facts: ['Capital city of England and the UK', 'Population of over 9 million', 'Global financial and business center'],
    areas: [
      { name: 'Westminster', description: 'Government and royal palaces', landmarks: 'Buckingham Palace, Houses of Parliament' },
      { name: 'Mayfair', description: 'Luxury shopping and fine dining', landmarks: 'Bond Street, Savile Row' },
      { name: 'Soho', description: 'Entertainment and nightlife', landmarks: 'Theatres, restaurants, bars' },
      { name: 'City of London', description: 'Financial district', landmarks: "Bank of England, St Paul's Cathedral" },
      { name: 'Kensington', description: 'Museums and royal parks', landmarks: 'Natural History Museum, Hyde Park' },
      { name: 'Chelsea', description: 'Fashionable residential area', landmarks: "King's Road, Chelsea Harbour" },
    ],
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    tagline: 'the second city',
    about:
      'Birmingham is the UK\'s second-largest city and a major business and cultural hub. Known as the "City of a Thousand Trades," it\'s a vibrant metropolis with rich industrial heritage.',
    facts: ['Second largest city in the UK', 'Population of over 1.1 million', 'Major business and financial center'],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'Bullring, Grand Central' },
      { name: 'Jewellery Quarter', description: 'Historic jewelry district', landmarks: 'Craft workshops, museums' },
      { name: 'Digbeth', description: 'Creative quarter and nightlife', landmarks: 'Bars, restaurants, arts' },
      { name: 'Edgbaston', description: 'Residential and business area', landmarks: 'University, cricket ground' },
      { name: 'Solihull', description: 'Affluent suburb', landmarks: 'Shopping, business parks' },
      { name: 'Bournville', description: 'Historic model village', landmarks: 'Cadbury World, gardens' },
    ],
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    tagline: 'the northern powerhouse',
    about:
      "Manchester is a vibrant city in the North of England, known for its rich industrial heritage, world-class universities, and thriving cultural scene. It's a major business and financial center.",
    facts: ['Major city in the North of England', 'Population of over 550,000', 'Business and financial center'],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'Spinningfields, Arndale' },
      { name: 'Northern Quarter', description: 'Creative and cultural hub', landmarks: 'Independent shops, bars' },
      { name: 'Spinningfields', description: 'Business and dining district', landmarks: 'Offices, restaurants' },
      { name: 'Deansgate', description: 'Shopping and entertainment', landmarks: 'Retail, dining, hotels' },
      { name: 'Castlefield', description: 'Historic canals and heritage', landmarks: 'Museums, canals, bars' },
      { name: 'Salford Quays', description: 'Media and business district', landmarks: 'MediaCity, Lowry Centre' },
    ],
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    tagline: "Yorkshire's capital",
    about:
      'Leeds is the largest city in Yorkshire and a major business and financial center. Known for its vibrant culture, excellent shopping, and strong economy.',
    facts: ['Largest city in Yorkshire', 'Population of over 800,000', 'Major business and financial center'],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'Trinity Leeds, Victoria Gate' },
      { name: 'Headingley', description: 'Student area and sports', landmarks: 'University, cricket ground' },
      { name: 'Roundhay', description: 'Residential and park area', landmarks: 'Roundhay Park, Tropical World' },
      { name: 'Chapel Allerton', description: 'Trendy suburb', landmarks: 'Bars, restaurants, independent shops' },
      { name: 'Kirkstall', description: 'Historic area', landmarks: 'Kirkstall Abbey, Abbey House Museum' },
      { name: 'Horsforth', description: 'Suburban area', landmarks: 'Residential, good schools' },
    ],
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    tagline: 'the historic port city',
    about:
      "Liverpool is a historic port city in North West England, known for its maritime heritage, music culture, and football clubs. It's a UNESCO World Heritage site with rich history.",
    facts: ['Historic port city in North West England', 'Population of over 500,000', 'UNESCO World Heritage site'],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: "Liverpool One, St John's" },
      { name: 'Albert Dock', description: 'Historic waterfront area', landmarks: 'Museums, restaurants, bars' },
      { name: 'Bold Street', description: 'Independent shopping and dining', landmarks: 'Restaurants, cafes, shops' },
      { name: 'Lark Lane', description: 'Trendy suburb with nightlife', landmarks: 'Bars, restaurants, independent shops' },
      { name: 'Woolton', description: 'Affluent residential area', landmarks: 'Village atmosphere, good schools' },
      { name: 'Crosby', description: 'Coastal suburb', landmarks: 'Beach, Antony Gormley statues' },
    ],
  },
  {
    slug: 'sheffield',
    name: 'Sheffield',
    tagline: 'the steel city',
    about:
      "Sheffield is a city in South Yorkshire, known for its steel industry heritage and green spaces. It's the UK's greenest city with over 250 parks and woodlands.",
    facts: ['City in South Yorkshire', 'Population of over 580,000', "UK's greenest city"],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'Meadowhall, The Moor' },
      { name: 'Ecclesall Road', description: 'Trendy dining and shopping', landmarks: 'Restaurants, bars, independent shops' },
      { name: 'Kelham Island', description: 'Industrial heritage area', landmarks: 'Museums, craft breweries, restaurants' },
      { name: 'Broomhill', description: 'Student and residential area', landmarks: 'University area, cafes, shops' },
      { name: 'Dore', description: 'Affluent suburb', landmarks: 'Village atmosphere, good schools' },
      { name: 'Peak District', description: 'National park access', landmarks: 'Hiking, outdoor activities' },
    ],
  },
  {
    slug: 'nottingham',
    name: 'Nottingham',
    tagline: "Robin Hood's city",
    about:
      "Nottingham is a city in the East Midlands, famous for its connection to Robin Hood. It's a vibrant city with a rich history, excellent shopping, and a strong university presence.",
    facts: ['City in the East Midlands', 'Population of over 330,000', "Robin Hood's legendary city"],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'Victoria Centre, Broadmarsh' },
      { name: 'Lace Market', description: 'Historic area and nightlife', landmarks: 'Bars, restaurants, historic buildings' },
      { name: 'Hockley', description: 'Creative and independent area', landmarks: 'Independent shops, cafes, galleries' },
      { name: 'West Bridgford', description: 'Affluent suburb', landmarks: 'Residential, good schools, parks' },
      { name: 'Beeston', description: 'University area', landmarks: 'University of Nottingham, student life' },
      { name: 'Sherwood Forest', description: 'Historic woodland', landmarks: 'Robin Hood legend, outdoor activities' },
    ],
  },
  {
    slug: 'coventry',
    name: 'Coventry',
    tagline: 'the Midlands hub',
    about:
      'Coventry is a city in the West Midlands, known for its automotive heritage and medieval cathedral. It\'s a vibrant city with a rich history and strong industrial background.',
    facts: ['City in the West Midlands', 'Population of over 360,000', 'UK City of Culture 2021'],
    areas: [
      { name: 'City Center', description: 'Business district and shopping', landmarks: 'West Orchards, Cathedral Lanes' },
      { name: 'Cathedral Quarter', description: 'Historic area and cathedral', landmarks: 'Coventry Cathedral, historic buildings' },
      { name: 'Earlsdon', description: 'Residential and shopping area', landmarks: 'Independent shops, cafes, restaurants' },
      { name: 'Canley', description: 'University area', landmarks: 'University of Warwick, student life' },
      { name: 'Kenilworth', description: 'Nearby historic town', landmarks: 'Kenilworth Castle, historic attractions' },
      { name: 'Warwick', description: 'Historic market town', landmarks: 'Warwick Castle, historic center' },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}

export function possessive(name: string): string {
  return name.endsWith('s') ? `${name}'` : `${name}'s`
}
