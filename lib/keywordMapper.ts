// Map Turkish/foreign keywords to Google Places types and keywords

export function mapKeywordToPlaceType(keyword: string): {
  type?: string
  keyword?: string
} {
  const lower = keyword.toLowerCase().trim()
  
  // Turkish medical terms
  if (lower.includes('üroloji') || lower.includes('uroloji')) {
    return { type: 'doctor', keyword: 'urology urologist' }
  }
  if (lower.includes('diş') || lower.includes('dentist') || lower.includes('dental')) {
    return { type: 'dentist', keyword: 'dental clinic' }
  }
  if (lower.includes('doktor') || lower.includes('doctor')) {
    return { type: 'doctor', keyword: 'medical clinic' }
  }
  if (lower.includes('hastane') || lower.includes('hospital')) {
    return { type: 'hospital', keyword: 'hospital medical center' }
  }
  if (lower.includes('eczane') || lower.includes('pharmacy')) {
    return { type: 'pharmacy', keyword: 'pharmacy drugstore' }
  }
  
  // Restaurant/Food
  if (lower.includes('restoran') || lower.includes('restaurant')) {
    return { type: 'restaurant', keyword: 'restaurant' }
  }
  if (lower.includes('kafe') || lower.includes('cafe') || lower.includes('coffee')) {
    return { type: 'cafe', keyword: 'cafe coffee shop' }
  }
  
  // Services
  if (lower.includes('kuaför') || lower.includes('berber') || lower.includes('hair')) {
    return { type: 'hair_care', keyword: 'hair salon barber' }
  }
  if (lower.includes('güzellik') || lower.includes('beauty') || lower.includes('spa')) {
    return { type: 'beauty_salon', keyword: 'beauty spa' }
  }
  
  // Default: use original keyword
  return { keyword: lower.replace(/near me|in|at|around/gi, '').trim() }
}
