// Google Maps Script Loader
let googleMapsLoaded = false
let googleMapsLoadPromise: Promise<void> | null = null

export function loadGoogleMapsScript(): Promise<void> {
  if (googleMapsLoaded) {
    return Promise.resolve()
  }

  if (googleMapsLoadPromise) {
    return googleMapsLoadPromise
  }

  googleMapsLoadPromise = new Promise((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      reject(new Error('Google Maps API key not found'))
      return
    }

    // Check if already loaded
    if (window.google?.maps) {
      googleMapsLoaded = true
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
    script.async = true
    script.defer = true

    script.onload = () => {
      googleMapsLoaded = true
      resolve()
    }

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps script'))
    }

    document.head.appendChild(script)
  })

  return googleMapsLoadPromise
}

export function isGoogleMapsLoaded(): boolean {
  return googleMapsLoaded
}
