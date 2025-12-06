// Google Maps Script Loader
let googleMapsLoaded = false
let googleMapsLoadPromise: Promise<void> | null = null

export function loadGoogleMapsScript(): Promise<void> {
  if (googleMapsLoaded) {
    console.log('✅ Google Maps already loaded (from cache)')
    return Promise.resolve()
  }

  if (googleMapsLoadPromise) {
    console.log('⏳ Google Maps loading in progress...')
    return googleMapsLoadPromise
  }

  googleMapsLoadPromise = new Promise((resolve, reject) => {
    // Access environment variable in browser
    const apiKey = typeof window !== 'undefined' 
      ? (window as any).ENV?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    console.log('🔑 API Key check:', {
      hasWindow: typeof window !== 'undefined',
      windowENV: (window as any).ENV?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Found' : 'Not found',
      processENV: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Found' : 'Not found',
      finalKey: apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'MISSING'
    })

    if (!apiKey) {
      console.error('❌ Google Maps API key not found in environment variables')
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('GOOGLE')))
      reject(new Error('Google Maps API key not found'))
      return
    }

    // Check if already loaded
    if (window.google?.maps) {
      console.log('✅ Google Maps already loaded on window')
      googleMapsLoaded = true
      resolve()
      return
    }

    console.log('📦 Creating Google Maps script tag...')
    const script = document.createElement('script')
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
    script.src = scriptUrl
    script.async = true
    script.defer = true
    
    console.log('📦 Script URL:', scriptUrl.replace(apiKey, apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4)))

    script.onload = () => {
      console.log('✅ Google Maps script loaded successfully')
      googleMapsLoaded = true
      resolve()
    }

    script.onerror = (error) => {
      console.error('❌ Failed to load Google Maps script:', error)
      reject(new Error('Failed to load Google Maps script'))
    }

    document.head.appendChild(script)
    console.log('📦 Script tag appended to document head')
  })

  return googleMapsLoadPromise
}

export function isGoogleMapsLoaded(): boolean {
  return googleMapsLoaded
}
