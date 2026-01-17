"use client"

import { PageContent } from "@/components/page-content"
import { 
  Server, 
  Shield, 
  Zap, 
  CheckCircle2, 
  XCircle,
  Code,
  Key,
  ArrowRight,
  Globe,
  Activity,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

export default function MPGettingStartedPage() {
  return (
    <PageContent
      title="Measurement Protocol"
      description="Server-side event tracking for GA4 that bypasses browser restrictions and ensures reliable data delivery."
      status="Stable"
    >
      
      {/* Hero Section */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#ff006e]/10 border border-[#ff006e]/30 pulse-glow">
                <Server className="h-6 w-6 text-[#ff006e]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                What is Measurement Protocol?
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              Measurement Protocol is a <span className="text-[#FF6D00] font-semibold">server-side API</span> that 
              allows you to send events directly from your backend to Google Analytics, independent of the browser.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass hover-glow rounded-xl p-5 border border-[#34A853]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#34A853]/10 group-hover:bg-[#34A853]/20 transition-colors">
                    <Shield className="h-5 w-5 text-[#34A853] icon-spin-hover" />
                  </div>
                  <span className="font-mono font-semibold text-[#34A853]">Bypasses Blockers</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Server-side tracking completely bypasses ad blockers, ITP, and browser privacy features
                </p>
              </div>
              
              <div className="glass hover-glow rounded-xl p-5 border border-[#4285F4]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4285F4]/10 group-hover:bg-[#4285F4]/20 transition-colors">
                    <Zap className="h-5 w-5 text-[#4285F4] icon-spin-hover" />
                  </div>
                  <span className="font-mono font-semibold text-[#4285F4]">Reliable Delivery</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  100% guaranteed event delivery - no missing conversions due to client-side issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browser vs Server-Side */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Browser vs Server-Side Tracking
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Browser-Side Issues */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#EA4335]/20 to-[#FBBC04]/20 border border-[#EA4335]/30">
                <Globe className="h-6 w-6 text-[#EA4335]" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-bold text-[#EA4335] mb-2">
                  Browser-Side (gtag.js)
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  CLIENT-SIDE
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Ad Blockers</p>
                  <p className="text-xs text-[#8b949e]">30-40% of events blocked by browser extensions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Safari ITP</p>
                  <p className="text-xs text-[#8b949e]">Cookies deleted after 7 days, tracking breaks</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Network Issues</p>
                  <p className="text-xs text-[#8b949e]">Events lost if user closes browser or loses connection</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">GDPR/Privacy</p>
                  <p className="text-xs text-[#8b949e]">Consent banners reduce tracking coverage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Server-Side Benefits */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#34A853]/20 to-[#4285F4]/20 border border-[#34A853]/30">
                <Server className="h-6 w-6 text-[#34A853]" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-bold text-[#34A853] mb-2">
                  Server-Side (MP)
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  SERVER-SIDE
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">No Blockers</p>
                  <p className="text-xs text-[#8b949e]">100% of events delivered, no browser interference</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Reliable Cookies</p>
                  <p className="text-xs text-[#8b949e]">Server controls cookies, not affected by ITP</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Guaranteed Delivery</p>
                  <p className="text-xs text-[#8b949e]">Events sent from server, no dependency on browser</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#e8f4f8] mb-1">Offline Events</p>
                  <p className="text-xs text-[#8b949e]">Track in-store purchases, CRM data, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              How It Works
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30">
                  <span className="font-mono text-sm font-bold text-[#FF6D00]">1</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Event Occurs on Your Server</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                User completes a purchase, signs up, or triggers any server-side action
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30">
                  <span className="font-mono text-sm font-bold text-[#4285F4]">2</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Prepare Event Payload</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Format event data according to GA4 Measurement Protocol specification
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#34A853]/10 border border-[#34A853]/30">
                  <span className="font-mono text-sm font-bold text-[#34A853]">3</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Send HTTP POST Request</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Send event to <span className="font-mono text-[#4285F4]">www.google-analytics.com/mp/collect</span>
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#ff006e]/10 border border-[#ff006e]/30">
                  <span className="font-mono text-sm font-bold text-[#ff006e]">4</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Google Receives & Processes</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                GA4 receives event, updates reports, and feeds data to Smart Bidding
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Example */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Basic Example
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
          <p className="text-sm text-[#8b949e] mb-4">
            Sending a purchase event from your Node.js server:
          </p>
          <div className="code-block">
            <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`const fetch = require('node-fetch');

const measurementId = 'G-XXXXXXXXXX';
const apiSecret = 'your_api_secret_here';
const clientId = 'user_client_id_from_browser';

const eventData = {
  client_id: clientId,
  events: [{
    name: 'purchase',
    params: {
      transaction_id: 'T_12345',
      value: 99.99,
      currency: 'USD',
      items: [{
        item_id: 'SKU_12345',
        item_name: 'Blue Widget',
        price: 99.99,
        quantity: 1
      }]
    }
  }]
};

const response = await fetch(
  \`https://www.google-analytics.com/mp/collect?measurement_id=\${measurementId}&api_secret=\${apiSecret}\`,
  {
    method: 'POST',
    body: JSON.stringify(eventData)
  }
);

console.log('Event sent:', response.status);`}
            </pre>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
        <div className="glass-strong rounded-2xl p-8 border border-[#FBBC04]/20">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="h-6 w-6 text-[#FBBC04]" />
            <h2 className="font-mono text-2xl font-bold text-[#FBBC04]">
              Requirements
            </h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <div className="flex items-center gap-2 mb-3">
                <Key className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Measurement ID</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Your GA4 property ID (starts with <span className="font-mono text-[#4285F4]">G-</span>)
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-[#34A853]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">API Secret</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Generate in <span className="font-mono text-[#4285F4]">Admin → Data Streams → Measurement Protocol API secrets</span>
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-[#ff006e]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Client ID</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                User's unique ID from browser cookie or generate server-side
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-2 mb-3">
                <Server className="h-5 w-5 text-[#FF6D00]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Server Access</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Ability to make HTTP POST requests from your backend
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[500ms]">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Next Steps
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/measurement-protocol/server-events">
              <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#4285F4] mb-1">Server-Side Events</h3>
                  <p className="text-xs text-[#8b949e]">
                    Learn all event types
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#4285F4] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/measurement-protocol/deduplication">
              <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#34A853] mb-1">Deduplication</h3>
                  <p className="text-xs text-[#8b949e]">
                    Avoid duplicate events
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#34A853] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/measurement-protocol/offline-events">
              <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#ff006e] mb-1">Offline Events</h3>
                  <p className="text-xs text-[#8b949e]">
                    Track offline conversions
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#ff006e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/playground">
              <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#FF6D00] mb-1">Test in Playground</h3>
                  <p className="text-xs text-[#8b949e]">
                    Send test events now
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#FF6D00] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
