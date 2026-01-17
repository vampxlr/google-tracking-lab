/**
 * GA4 Measurement Protocol v2 (Server-Side) Helper Functions
 * For sending events from your server to Google Analytics
 */

export interface MPServerEvent {
  name: string
  params: Record<string, any>
}

export interface MPServerRequest {
  client_id: string
  user_id?: string
  events: MPServerEvent[]
  timestamp_micros?: number
  non_personalized_ads?: boolean
  user_properties?: Record<string, any>
}

export class GA4Server {
  private measurementId: string
  private apiSecret: string

  constructor(measurementId: string, apiSecret: string) {
    this.measurementId = measurementId
    this.apiSecret = apiSecret
  }

  /**
   * Send events to GA4 Measurement Protocol v2
   * @param request - The Measurement Protocol request payload
   */
  async sendEvents(request: MPServerRequest): Promise<any> {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const data = await response.text()

      if (response.ok) {
        console.log("GA4 Server Event Sent:", request.events)
        return { success: true, status: response.status, data }
      } else {
        console.error("GA4 Server Event Failed:", response.status, data)
        return { success: false, status: response.status, data, error: data }
      }
    } catch (error) {
      console.error("GA4 Server Event Error:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  /**
   * Send a single event
   * @param clientId - Unique client identifier
   * @param eventName - Name of the event
   * @param parameters - Event parameters
   */
  async sendEvent(
    clientId: string,
    eventName: string,
    parameters?: Record<string, any>
  ): Promise<any> {
    return this.sendEvents({
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: parameters || {},
        },
      ],
    })
  }

  /**
   * Generate a unique client ID (if not provided by client)
   * Client ID should be the same as what's used on the client-side
   * Format: 14-digit number + timestamp
   */
  generateClientId(): string {
    return `${Math.floor(Math.random() * 1e14)}.${Date.now()}`
  }

  /**
   * Get current timestamp in microseconds (required for server-side events)
   */
  getTimestampMicros(): number {
    return Date.now() * 1000
  }

  /**
   * Send a purchase event from server
   * @param clientId - The client ID from the client-side
   * @param transaction - Transaction details
   */
  async sendPurchase(
    clientId: string,
    transaction: {
      transaction_id: string
      value: number
      currency: string
      items: any[]
      coupon?: string
      tax?: number
      shipping?: number
    }
  ): Promise<any> {
    return this.sendEvent(clientId, "purchase", {
      transaction_id: transaction.transaction_id,
      value: transaction.value,
      currency: transaction.currency,
      items: transaction.items,
      coupon: transaction.coupon,
      tax: transaction.tax,
      shipping: transaction.shipping,
    })
  }

  /**
   * Send multiple events in a single request (batching)
   * @param clientId - The client ID
   * @param events - Array of events to send
   */
  async sendBatch(
    clientId: string,
    events: Array<{ name: string; params: Record<string, any> }>
  ): Promise<any> {
    return this.sendEvents({
      client_id: clientId,
      events,
      timestamp_micros: this.getTimestampMicros(),
    })
  }

  /**
   * Send offline conversion event
   * Useful for tracking offline events like in-store purchases
   * @param clientId - The client ID associated with the user
   * @param eventName - Name of the offline event
   * @param parameters - Event parameters
   */
  async sendOfflineEvent(
    clientId: string,
    eventName: string,
    parameters?: Record<string, any>
  ): Promise<any> {
    return this.sendEvents({
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: {
            ...parameters,
            send_time: this.getTimestampMicros(),
          },
        },
      ],
      timestamp_micros: this.getTimestampMicros(),
    })
  }
}

/**
 * Validate event parameters before sending
 * Ensures required parameters are present and valid
 */
export function validateEventParameters(eventName: string, params: Record<string, any>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check for reserved parameter names
  const reservedParams = [
    "debug_mode",
    "engagement_time_msec",
    "firebase_conversion",
    "firebase_event_origin",
    "session_id",
    "session_number",
  ]

  Object.keys(params).forEach((key) => {
    if (reservedParams.includes(key)) {
      errors.push(`Parameter "${key}" is reserved and should not be set manually`)
    }
  })

  // Validate currency format (if present)
  if (params.currency && !/^[A-Z]{3}$/.test(params.currency)) {
    errors.push(`Currency must be a 3-letter ISO code (e.g., "USD")`)
  }

  // Validate value (if present)
  if (params.value !== undefined && typeof params.value !== "number") {
    errors.push(`Value must be a number`)
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
