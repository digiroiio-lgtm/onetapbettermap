import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { runGeoGridScan } from '@/lib/geoGridScanner'
import { fetchCompetitors, analyzeCompetitors } from '@/lib/competitorAnalyzer'
import { calculateVisibilityScore } from '@/lib/visibilityScore'
import { generateOptimizationChecklist } from '@/lib/checklistGenerator'
import { getPlaceDetails } from '@/lib/googlePlaces'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { location_id } = body

    if (!location_id) {
      return NextResponse.json({ error: 'location_id is required' }, { status: 400 })
    }

    // Get location data
    const { data: location, error: locationError } = await supabaseAdmin
      .from('locations')
      .select('*')
      .eq('id', location_id)
      .single()

    if (locationError || !location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }

    // Create scan record
    const { data: scan, error: scanError } = await supabaseAdmin
      .from('scans')
      .insert({
        location_id: location.id,
        status: 'processing',
      })
      .select()
      .single()

    if (scanError || !scan) {
      return NextResponse.json({ error: 'Failed to create scan' }, { status: 500 })
    }

    // Start async processing
    processScan(scan.id, location).catch(console.error)

    return NextResponse.json({
      scan_id: scan.id,
      status: 'processing',
      message: 'Scan started successfully',
    })
  } catch (error) {
    console.error('Scan API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Process scan asynchronously
 */
async function processScan(scanId: string, location: any) {
  try {
    console.log(`Processing scan ${scanId} for location ${location.business_name}`)

    // 1. Run GeoGrid Scan
    console.log('Step 1: Running GeoGrid scan...')
    const gridData = await runGeoGridScan(
      location.business_name,
      location.latitude,
      location.longitude,
      location.target_keyword
    )

    // 2. Fetch Competitors
    console.log('Step 2: Fetching competitor data...')
    const competitors = await fetchCompetitors(
      location.latitude,
      location.longitude,
      location.target_keyword
    )

    // 3. Analyze Competitors
    console.log('Step 3: Analyzing competitors...')
    const competitorMetrics = analyzeCompetitors(competitors)

    // 4. Get business details
    console.log('Step 4: Fetching business details...')
    let businessDetails = null
    if (location.place_id) {
      businessDetails = await getPlaceDetails(location.place_id)
    }

    const businessData = {
      review_count: businessDetails?.user_ratings_total || 0,
      photos_count: businessDetails?.photos?.length || 0,
      categories: businessDetails?.types || [],
    }

    // 5. Calculate Visibility Score
    console.log('Step 5: Calculating visibility score...')
    const scoreBreakdown = calculateVisibilityScore(
      gridData,
      businessData,
      competitorMetrics
    )

    // 6. Generate Checklist
    console.log('Step 6: Generating optimization checklist...')
    const checklist = generateOptimizationChecklist(
      {
        name: location.business_name,
        review_count: businessData.review_count,
        photos_count: businessData.photos_count,
        categories: businessData.categories,
        has_website: !!businessDetails?.website,
        has_hours: !!businessDetails?.opening_hours,
        rating: businessDetails?.rating || null,
      },
      competitorMetrics
    )

    // 7. Save competitors to database
    console.log('Step 7: Saving competitor data...')
    const competitorRecords = competitors.map((c) => ({
      scan_id: scanId,
      place_id: c.place_id,
      name: c.name,
      rating: c.rating,
      review_count: c.review_count,
      photos_count: c.photos_count,
      categories: c.categories,
      website: c.website,
      has_hours: c.has_hours,
      business_status: c.business_status,
    }))

    await supabaseAdmin.from('competitors').insert(competitorRecords)

    // 8. Update scan with results
    console.log('Step 8: Updating scan record...')
    await supabaseAdmin
      .from('scans')
      .update({
        status: 'completed',
        visibility_score: scoreBreakdown.total_score,
        grid_data: gridData,
        competitor_data: competitorMetrics,
        checklist_data: checklist,
      })
      .eq('id', scanId)

    console.log(`Scan ${scanId} completed successfully`)
  } catch (error) {
    console.error(`Error processing scan ${scanId}:`, error)

    // Update scan with error
    await supabaseAdmin
      .from('scans')
      .update({
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      })
      .eq('id', scanId)
  }
}
