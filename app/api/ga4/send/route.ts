import { NextRequest, NextResponse } from 'next/server'

// GA4 Event Names (Standard Events)
const SUPPORTED_EVENTS = [
  'page_view',
  'search',
  'sign_up',
  'login',
  'add_to_cart',
  'view_item',
  'begin_checkout',
  'purchase',
  'generate_lead',
  'view_item_list',
  'add_to_wishlist',
  'remove_from_cart',
  'select_item',
  'view_cart',
  'add_payment_info',
  'add_shipping_info',
  'refund',
]

interface GA4Event {
  name: string
  params: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_name, parameters = {}, mode = 'fixed', test_event_code, event_id } = body

    // Validate event name
    if (!SUPPORTED_EVENTS.includes(event_name)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid event name',
          details: [`Event "${event_name}" is not a supported GA4 event`],
        },
        { status: 400 }
      )
    }

    // Get configuration from environment
    const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
    const apiSecret = process.env.GA4_API_SECRET

    if (!measurementId || !apiSecret) {
      return NextResponse.json(
        {
          ok: false,
          error: 'GA4 not configured',
          details: ['Missing NEXT_PUBLIC_GA4_MEASUREMENT_ID or GA4_API_SECRET'],
        },
        { status: 500 }
      )
    }

    // Generate client_id (in production, you'd get this from the user's cookie)
    const client_id = `${Date.now()}.${Math.random().toString().slice(2, 11)}`

    // Build the GA4 Measurement Protocol payload
    const eventData: any = {
      client_id,
      events: [
        {
          name: event_name,
          params: {
            ...parameters,
            engagement_time_msec: parameters.engagement_time_msec || 100,
          },
        },
      ],
    }

    // Add event_id if provided (for deduplication)
    if (event_id) {
      eventData.events[0].params.event_id = event_id
    }

    // Add timestamp
    eventData.timestamp_micros = Date.now() * 1000

    // In broken mode, intentionally break the structure
    if (mode === 'broken') {
      // Remove required fields or use wrong types
      delete eventData.events[0].params.engagement_time_msec
      
      // Mess up some data types
      if (parameters.value) {
        eventData.events[0].params.value = String(parameters.value) + 'invalid'
      }
    }

    // Build the API URL
    let apiUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`
    
    // Add test_event_code if in test mode
    if (test_event_code) {
      apiUrl = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`
    }

    // Send to GA4 Measurement Protocol
    const startTime = Date.now()
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })

    const duration = Date.now() - startTime
    let responseData: any = {}

    // GA4 MP returns 204 No Content on success for regular endpoint
    // Or validation messages for debug endpoint
    if (response.status === 204) {
      responseData = {
        message: 'Event accepted by GA4',
      }
    } else if (response.ok) {
      try {
        responseData = await response.json()
      } catch {
        responseData = { message: 'Event sent successfully' }
      }
    } else {
      try {
        responseData = await response.json()
      } catch {
        responseData = { error: `HTTP ${response.status}: ${response.statusText}` }
      }
    }

    // Return success response
    return NextResponse.json({
      ok: response.ok || response.status === 204,
      data: responseData,
      sanitizedPayload: eventData,
      metadata: {
        endpoint: test_event_code ? 'debug' : 'production',
        responseTime: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error('GA4 API Error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: error.message || 'Internal server error',
        details: error.stack?.split('\n') || [],
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check configuration
export async function GET() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET

  return NextResponse.json({
    // Client-side (gtag.js) only needs Measurement ID
    clientConfigured: Boolean(measurementId),
    // Server-side (Measurement Protocol) needs both
    serverConfigured: Boolean(measurementId && apiSecret),
    // Overall configured if at least client is setup
    configured: Boolean(measurementId),
    measurementId: measurementId ? `${measurementId.slice(0, 5)}...` : null,
    supportedEvents: SUPPORTED_EVENTS,
  })
}
