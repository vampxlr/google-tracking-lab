/**
 * GA4 Client-Side Tracking Helper Functions
 * Uses gtag.js for browser-based event tracking
 */

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer?: any[]
  }
}

export class GA4Client {
  private measurementId: string
  private initialized: boolean = false

  constructor(measurementId: string) {
    this.measurementId = measurementId
  }

  /**
   * Initialize gtag.js
   * Call this in your layout.tsx or _app.tsx
   */
  initialize(): void {
    if (this.initialized || typeof window === "undefined") return

    // Load gtag.js script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    // Configure gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer?.push(arguments)
    }

    window.gtag("js", new Date())
    window.gtag("config", this.measurementId)

    this.initialized = true
    console.log(`GA4 initialized with Measurement ID: ${this.measurementId}`)
  }

  /**
   * Track a GA4 event
   * @param eventName - The name of the event (e.g., 'purchase', 'add_to_cart')
   * @param parameters - Event parameters (optional)
   */
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.initialized) {
      console.warn("GA4 not initialized. Call initialize() first.")
      return
    }

    if (window.gtag) {
      window.gtag("event", eventName, parameters)
      console.log(`GA4 Event: ${eventName}`, parameters)
    }
  }

  /**
   * Track a page view
   * GA4 automatically tracks page views, but you can call this manually
   * @param pagePath - The path of the page (e.g., '/products')
   * @param pageTitle - The title of the page
   */
  trackPageView(pagePath?: string, pageTitle?: string): void {
    if (!this.initialized) return

    const pageConfig: Record<string, string> = {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title,
    }

    if (window.gtag) {
      window.gtag("config", this.measurementId, pageConfig)
      console.log("GA4 Page View:", pageConfig)
    }
  }

  /**
   * Set user properties
   * User properties are attributes that describe the user
   * @param properties - User properties to set
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.initialized) return

    if (window.gtag) {
      window.gtag("set", "user_properties", properties)
      console.log("GA4 User Properties:", properties)
    }
  }

  /**
   * Set user ID for cross-device tracking
   * @param userId - Unique identifier for the user
   */
  setUserId(userId: string): void {
    if (!this.initialized) return

    if (window.gtag) {
      window.gtag("config", this.measurementId, {
        user_id: userId,
      })
      console.log("GA4 User ID set:", userId)
    }
  }

  /**
   * Disable ad personalization
   * Use this when users opt out of personalized ads
   */
  disableAdPersonalization(): void {
    if (!this.initialized) return

    if (window.gtag) {
      window.gtag("config", this.measurementId, {
        allow_ad_personalization_signals: false,
      })
      console.log("GA4 Ad Personalization disabled")
    }
  }

  /**
   * Track an e-commerce purchase
   * @param transaction - Transaction details
   */
  trackPurchase(transaction: {
    transaction_id: string
    value: number
    currency: string
    items: any[]
    coupon?: string
    tax?: number
    shipping?: number
  }): void {
    this.trackEvent("purchase", {
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
   * Track adding item to cart
   * @param item - The item being added
   */
  trackAddToCart(item: any): void {
    this.trackEvent("add_to_cart", {
      items: [item],
      currency: item.currency || "USD",
      value: item.price * item.quantity,
    })
  }

  /**
   * Track begin checkout
   * @param items - Items in the cart
   * @param totalValue - Total value of the cart
   */
  trackBeginCheckout(items: any[], totalValue: number, currency: string = "USD"): void {
    this.trackEvent("begin_checkout", {
      items,
      value: totalValue,
      currency,
    })
  }
}

// Create a singleton instance
let ga4ClientInstance: GA4Client | null = null

export function getGA4Client(measurementId?: string): GA4Client {
  if (!ga4ClientInstance && measurementId) {
    ga4ClientInstance = new GA4Client(measurementId)
  }
  return ga4ClientInstance!
}
