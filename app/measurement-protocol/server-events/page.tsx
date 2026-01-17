"use client"

import { PageContent } from "@/components/page-content"
import { 
  Server, 
  Code, 
  CheckCircle2,
  ArrowRight,
  Activity,
  ShoppingCart,
  Zap,
  Target
} from "lucide-react"
import Link from "next/link"

export default function MPServerEventsPage() {
  return (
    <PageContent
      title="Server-Side Events"
      description="Send events directly from your server to Google Analytics using Measurement Protocol v2 API."
      status="Stable"
    >
      
      {/* Event Types */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Server-Side Event Types
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-[#4285F4]" />
              </div>
              <h3 className="font-mono text-xl font-bold text-[#4285F4]">Standard Events</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              All GA4 standard events can be sent server-side with the same structure.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#4285F4] mt-0.5" />
                <span className="text-sm text-[#8b949e]">page_view, session_start</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#4285F4] mt-0.5" />
                <span className="text-sm text-[#8b949e]">purchase, add_to_cart</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#4285F4] mt-0.5" />
                <span className="text-sm text-[#8b949e]">sign_up, login</span>
              </div>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <h3 className="font-mono text-xl font-bold text-[#FF6D00]">Custom Events</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Create custom events for your specific business logic and workflows.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FF6D00] mt-0.5" />
                <span className="text-sm text-[#8b949e]">Subscription renewals</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FF6D00] mt-0.5" />
                <span className="text-sm text-[#8b949e]">API usage events</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FF6D00] mt-0.5" />
                <span className="text-sm text-[#8b949e]">Backend workflows</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Purchase Event */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="h-6 w-6 text-[#34A853]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Purchase Event Example
            </h2>
          </div>
          
          <p className="text-sm text-[#8b949e] mb-4">
            Send a purchase event from your server after payment confirmation:
          </p>
          
          <div className="code-block">
            <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`const fetch = require('node-fetch');

const measurementId = 'G-XXXXXXXXXX';
const apiSecret = 'your_api_secret';
const clientId = '1234567890.1234567890'; // From user's cookie

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
);`}
            </pre>
          </div>
        </div>
      </div>

      {/* Event Structure */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-[#4285F4]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Event Payload Structure
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <h3 className="font-mono font-semibold text-[#4285F4] mb-3">Required Fields</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">client_id</span>
                    <p className="text-xs text-[#8b949e]">User's unique identifier</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">events[]</span>
                    <p className="text-xs text-[#8b949e]">Array of event objects</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">name</span>
                    <p className="text-xs text-[#8b949e]">Event name</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <h3 className="font-mono font-semibold text-[#34A853] mb-3">Optional Fields</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">user_id</span>
                    <p className="text-xs text-[#8b949e]">Logged-in user ID</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">timestamp_micros</span>
                    <p className="text-xs text-[#8b949e]">Event timestamp</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono">•</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">user_properties</span>
                    <p className="text-xs text-[#8b949e]">Custom user attributes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Related Topics
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/measurement-protocol/deduplication">
              <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#4285F4] mb-1">Deduplication</h3>
                  <p className="text-xs text-[#8b949e]">Prevent duplicate events</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#4285F4] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/measurement-protocol/offline-events">
              <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#34A853] mb-1">Offline Events</h3>
                  <p className="text-xs text-[#8b949e]">Track offline conversions</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#34A853] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/measurement-protocol/best-practices">
              <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#FF6D00] mb-1">Best Practices</h3>
                  <p className="text-xs text-[#8b949e]">Production tips</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#FF6D00] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/playground">
              <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#ff006e] mb-1">Event Playground</h3>
                  <p className="text-xs text-[#8b949e]">Test events live</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#ff006e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
