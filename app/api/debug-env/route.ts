import { NextResponse } from 'next/server'

/**
 * Debug endpoint to check environment variables
 * IMPORTANT: Delete this file after debugging for security!
 */
export async function GET() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET

  return NextResponse.json({
    // Show if env vars exist (but not their full values for security)
    envVarsStatus: {
      NEXT_PUBLIC_GA4_MEASUREMENT_ID: measurementId ? '✅ SET' : '❌ NOT SET',
      GA4_API_SECRET: apiSecret ? '✅ SET' : '❌ NOT SET',
    },
    
    // Show preview for verification (first 5 chars only)
    preview: {
      measurementId: measurementId ? measurementId.slice(0, 5) + '...' : 'N/A',
      apiSecretLength: apiSecret ? `${apiSecret.length} chars` : 'N/A',
    },
    
    // Configuration status (same as /api/ga4/send endpoint)
    configStatus: {
      clientConfigured: Boolean(measurementId),
      serverConfigured: Boolean(measurementId && apiSecret),
      configured: Boolean(measurementId),
    },
    
    // Environment info
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL ? 'true' : 'false',
      VERCEL_ENV: process.env.VERCEL_ENV || 'N/A',
    },
    
    // Helpful message
    message: !measurementId 
      ? '⚠️ Environment variables not loaded. Did you redeploy after adding them?'
      : '✅ Environment variables are loaded correctly!',
  })
}
