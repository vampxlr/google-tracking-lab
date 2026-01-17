"use client"

import { PageContent } from "@/components/page-content"
import { 
  Zap, 
  CheckCircle2,
  XCircle,
  Code,
  Shield,
  AlertCircle,
  Activity
} from "lucide-react"

export default function MPDeduplicationPage() {
  return (
    <PageContent
      title="Event Deduplication"
      description="Prevent duplicate events from affecting your analytics data when using both client-side and server-side tracking."
      status="Stable"
    >
      
      {/* The Problem */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#EA4335]/10 border border-[#EA4335]/30 pulse-glow">
                <AlertCircle className="h-6 w-6 text-[#EA4335]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                The Duplication Problem
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              When sending the same event from both <span className="text-[#4285F4] font-semibold">gtag.js (client-side)</span> and 
              <span className="text-[#ff006e] font-semibold"> Measurement Protocol (server-side)</span>, 
              Google counts it <span className="text-[#EA4335] font-semibold">twice</span> unless you use event deduplication.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass hover-lift rounded-xl p-6 border border-[#EA4335]/20 group">
                <div className="mb-4 flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-[#EA4335]" />
                  <span className="font-mono font-semibold text-[#EA4335]">Without Deduplication</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">1.</span>
                    <span className="text-sm text-[#8b949e]">Browser sends <span className="font-mono text-[#e8f4f8]">purchase</span> event</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">2.</span>
                    <span className="text-sm text-[#8b949e]">Server sends <span className="font-mono text-[#e8f4f8]">purchase</span> event</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">3.</span>
                    <span className="text-sm text-[#8b949e]">GA4 counts <span className="font-mono text-[#EA4335]">2 purchases</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">4.</span>
                    <span className="text-sm text-[#8b949e]">Inflated conversion metrics</span>
                  </li>
                </ul>
              </div>

              <div className="glass hover-lift rounded-xl p-6 border border-[#34A853]/20 group">
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#34A853]" />
                  <span className="font-mono font-semibold text-[#34A853]">With Deduplication</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">1.</span>
                    <span className="text-sm text-[#8b949e]">Browser sends with <span className="font-mono text-[#e8f4f8]">event_id</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">2.</span>
                    <span className="text-sm text-[#8b949e]">Server sends with <span className="font-mono text-[#e8f4f8]">same event_id</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">3.</span>
                    <span className="text-sm text-[#8b949e]">GA4 counts <span className="font-mono text-[#34A853]">1 purchase</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">4.</span>
                    <span className="text-sm text-[#8b949e]">Accurate conversion data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            How Event Deduplication Works
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>
        
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30">
                  <span className="font-mono text-sm font-bold text-[#FF6D00]">1</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Generate Unique Event ID</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Create a unique identifier for the event (UUID, transaction ID, or timestamp-based)
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30">
                  <span className="font-mono text-sm font-bold text-[#4285F4]">2</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Send from Client with Event ID</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Include the event_id parameter when sending from gtag.js
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#34A853]/10 border border-[#34A853]/30">
                  <span className="font-mono text-sm font-bold text-[#34A853]">3</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Send from Server with Same Event ID</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                Use the exact same event_id when sending from Measurement Protocol
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#ff006e]/10 border border-[#ff006e]/30">
                  <span className="font-mono text-sm font-bold text-[#ff006e]">4</span>
                </div>
                <h4 className="font-mono font-semibold text-[#e8f4f8]">GA4 Deduplicates Automatically</h4>
              </div>
              <p className="text-sm text-[#8b949e]">
                GA4 recognizes the duplicate event_id and counts it only once (within 24 hours)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Implementation Examples
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Client-Side (gtag.js)</h3>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`// Generate unique event ID
const eventId = 'purchase_' + Date.now() + '_' + Math.random().toString(36);

// Send from browser
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'USD',
  // Include event_id for deduplication
  event_id: eventId,
  items: [...]
});

// Store event_id to send to server
// (e.g., in form data, API request, etc.)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Server-Side (Measurement Protocol)</h3>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`// Receive event_id from client
const eventId = req.body.event_id;

// Send from server with SAME event_id
const eventData = {
  client_id: '1234567890.1234567890',
  events: [{
    name: 'purchase',
    params: {
      transaction_id: 'T_12345',
      value: 99.99,
      currency: 'USD',
      // Use the SAME event_id
      event_id: eventId,
      items: [...]
    }
  }]
};

await fetch(mpUrl, {
  method: 'POST',
  body: JSON.stringify(eventData)
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Best Practices
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#4285F4]" />
                <span className="font-mono font-semibold text-[#4285F4]">Use Transaction IDs</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                For purchases, use your internal transaction ID as the event_id
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <span className="font-mono font-semibold text-[#34A853]">24-Hour Window</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                GA4 deduplicates within 24 hours of the first event
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
                <span className="font-mono font-semibold text-[#ff006e]">Consistent IDs</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Ensure event_id is identical between client and server
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
                <span className="font-mono font-semibold text-[#FF6D00]">Test Thoroughly</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Verify deduplication in GA4 DebugView before production
              </p>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
