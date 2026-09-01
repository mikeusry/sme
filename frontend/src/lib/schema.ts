import { business } from './business'
import { sameAs } from './social'

export const farmId = `${business.url}/#farm`

export function farmJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Farm'],
    '@id': farmId,
    name: business.name,
    url: business.url,
    telephone: '+1-706-613-4415',
    email: business.email,
    image: 'https://res.cloudinary.com/southland-organics/image/upload/c_fill,w_1200,h_630,g_auto,q_auto,f_auto/Soul%20Miner\'s/bin_1',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    areaServed: [
      { '@type': 'City', name: 'Athens' },
      { '@type': 'City', name: 'Bogart' },
      { '@type': 'AdministrativeArea', name: 'Oconee County' },
    ],
    sameAs,
  }
}
