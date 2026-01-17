/**
 * Environment variables
 * Add these to your .env.local file
 */

export const env = {
  // GA4 Client-side
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",

  // GA4 Server-side
  GA4_API_SECRET: process.env.GA4_API_SECRET || "",

  // Optional: Debug mode
  NEXT_PUBLIC_GA4_DEBUG: process.env.NEXT_PUBLIC_GA4_DEBUG === "true",

  // Optional: Google Cloud (for advanced features)
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID || "",
  GOOGLE_ANALYTICS_PROPERTY_ID: process.env.GOOGLE_ANALYTICS_PROPERTY_ID || "",
} as const

/**
 * Validate required environment variables
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  if (!env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    missing.push("NEXT_PUBLIC_GA4_MEASUREMENT_ID")
  }

  if (!env.GA4_API_SECRET) {
    missing.push("GA4_API_SECRET")
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
