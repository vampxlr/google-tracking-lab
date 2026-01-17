"use client"

import { PageContent } from "@/components/page-content"
import { 
  Server, 
  ShoppingCart,
  Phone,
  Mail,
  Code,
  CheckCircle2,
  Database,
  Upload
} from "lucide-react"

export default function MPOfflineEventsPage() {
  return (
    <PageContent
      title="Offline Events"
      description="Track conversions that happen outside your website - in-store purchases, phone orders, email conversions, and CRM data."
      status="Stable"
    >
      
      {/* What are Offline Events */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
                <Server className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                What are Offline Events?
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              Offline events are conversions that happen <span className="text-[#FF6D00] font-semibold">outside your website</span> - 
              in physical stores, over the phone, via email, or through other channels. 
              Measurement Protocol lets you connect these to your online marketing.
            </p>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4285F4]/10 group-hover:bg-[#4285F4]/20 transition-colors">
                    <ShoppingCart className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  <span className="font-mono font-semibold text-[#4285F4]">In-Store Purchases</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Customer visits website, then buys in physical store
                </p>
              </div>
              
              <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#34A853]/10 group-hover:bg-[#34A853]/20 transition-colors">
                    <Phone className="h-5 w-5 text-[#34A853]" />
                  </div>
                  <span className="font-mono font-semibold text-[#34A853]">Phone Orders</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Customer calls to place order after seeing online ad
                </p>
              </div>
              
              <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#ff006e]/10 group-hover:bg-[#ff006e]/20 transition-colors">
                    <Mail className="h-5 w-5 text-[#ff006e]" />
                  </div>
                  <span className="font-mono font-semibold text-[#ff006e]">Email Conversions</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Customer converts via email after website visit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Sending Offline Events
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Step 1: Capture Client ID</h3>
              <p className="text-sm text-[#8b949e] mb-4">
                When user visits your website, capture their GA4 Client ID and store it with their user record:
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`// Get Client ID from GA4 cookie
const clientId = document.cookie
  .split('; ')
  .find(row => row.startsWith('_ga='))
  ?.split('=')[1]
  .split('.').slice(-2).join('.');

// Store with user record (email, phone, etc.)
await saveUserData({
  email: 'user@example.com',
  ga4_client_id: clientId
});`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Step 2: Send Event When Conversion Happens</h3>
              <p className="text-sm text-[#8b949e] mb-4">
                When offline conversion occurs, send event to GA4 with stored Client ID:
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`// When in-store purchase happens
const userData = await getUserByEmail('user@example.com');

const eventData = {
  client_id: userData.ga4_client_id,
  events: [{
    name: 'purchase',
    params: {
      transaction_id: 'STORE_' + orderId,
      value: 149.99,
      currency: 'USD',
      // Mark as offline conversion
      conversion_source: 'in_store',
      items: [...]
    }
  }]
};

await sendToGA4(eventData);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-6 w-6 text-[#4285F4]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Common Use Cases
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <h3 className="font-mono font-semibold text-[#4285F4] mb-3">CRM Integration</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Sync conversions from your CRM (Salesforce, HubSpot) to GA4
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Deal closed events</li>
                <li>• Lead quality events</li>
                <li>• Customer lifetime value updates</li>
              </ul>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <h3 className="font-mono font-semibold text-[#34A853] mb-3">POS Integration</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Send in-store transactions from your Point of Sale system
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Store purchases</li>
                <li>• Loyalty program signups</li>
                <li>• Product returns</li>
              </ul>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <h3 className="font-mono font-semibold text-[#ff006e] mb-3">Call Tracking</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Track phone conversions from call tracking software
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Phone orders</li>
                <li>• Appointment bookings</li>
                <li>• Quote requests</li>
              </ul>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <h3 className="font-mono font-semibold text-[#FF6D00] mb-3">Subscription Events</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Send subscription lifecycle events from your billing system
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Subscription renewals</li>
                <li>• Upgrades/downgrades</li>
                <li>• Cancellations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Best Practices
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#4285F4]" />
                <span className="font-mono font-semibold text-[#4285F4]">Match Users Carefully</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Use email, phone, or loyalty ID to match online/offline users accurately
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <span className="font-mono font-semibold text-[#34A853]">Send Within 24 Hours</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                For best attribution, send offline events within 24 hours
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
                <span className="font-mono font-semibold text-[#ff006e]">Add Custom Parameters</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Include conversion_source, store_location, sales_rep, etc.
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
                <span className="font-mono font-semibold text-[#FF6D00]">Test Before Production</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Use test_event_code to verify events in GA4 DebugView
              </p>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
