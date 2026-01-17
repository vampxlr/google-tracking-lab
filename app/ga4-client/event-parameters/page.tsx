"use client"

import { PageContent } from "@/components/page-content"
import { 
  Tag, 
  ShoppingCart, 
  Layers, 
  Code,
  CheckCircle2,
  Info,
  Sparkles,
  Activity
} from "lucide-react"

export default function EventParametersPage() {
  return (
    <PageContent
      title="Event Parameters"
      description="Event parameters provide additional context about user interactions. Understanding parameters is key to accurate tracking and analysis."
      status="Stable"
    >
      
      {/* Standard Parameters */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Standard Parameters
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-mono text-xl font-semibold text-[#34A853]">currency</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              3-letter ISO 4217 currency code (e.g., USD, EUR, GBP)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`gtag('event', 'purchase', {
  currency: 'USD',
  value: 99.99
})`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-[#4285F4]" />
              <h3 className="font-mono text-xl font-semibold text-[#4285F4]">value</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Numeric value associated with the event (revenue, score, etc.)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`gtag('event', 'purchase', {
  value: 99.99,
  currency: 'USD'
})`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-[#ff006e]" />
              <h3 className="font-mono text-xl font-semibold text-[#ff006e]">items</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Array of items (required for e-commerce events)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#4285F4] overflow-x-auto">
{`gtag('event', 'purchase', {
  items: [{
    item_id: '123',
    item_name: 'Blue Widget',
    price: 99.99,
    quantity: 1
  }]
})`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-[#FF6D00]" />
              <h3 className="font-mono text-xl font-semibold text-[#FF6D00]">transaction_id</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Unique transaction identifier for deduplication
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`gtag('event', 'purchase', {
  transaction_id: 'T_123456789'
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Item Parameters */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#34A853]/10 border border-[#34A853]/30 pulse-glow">
              <ShoppingCart className="h-6 w-6 text-[#34A853]" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Item Parameters (E-Commerce)
            </h2>
          </div>

          <p className="text-sm text-[#8b949e] mb-6">
            Item parameters describe individual products in e-commerce events.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass hover-lift rounded-xl p-4 border border-[#4285F4]/20">
              <h4 className="font-mono text-sm font-semibold text-[#4285F4] mb-2">item_id</h4>
              <p className="text-xs text-[#8b949e]">Unique product identifier (SKU)</p>
            </div>

            <div className="glass hover-lift rounded-xl p-4 border border-[#34A853]/20">
              <h4 className="font-mono text-sm font-semibold text-[#34A853] mb-2">item_name</h4>
              <p className="text-xs text-[#8b949e]">Product name (required)</p>
            </div>

            <div className="glass hover-lift rounded-xl p-4 border border-[#ff006e]/20">
              <h4 className="font-mono text-sm font-semibold text-[#ff006e] mb-2">item_category</h4>
              <p className="text-xs text-[#8b949e]">Product category</p>
            </div>

            <div className="glass hover-lift rounded-xl p-4 border border-[#FF6D00]/20">
              <h4 className="font-mono text-sm font-semibold text-[#FF6D00] mb-2">price</h4>
              <p className="text-xs text-[#8b949e]">Price per unit (numeric)</p>
            </div>

            <div className="glass hover-lift rounded-xl p-4 border border-[#4285F4]/20">
              <h4 className="font-mono text-sm font-semibold text-[#4285F4] mb-2">quantity</h4>
              <p className="text-xs text-[#8b949e]">Number of units</p>
            </div>

            <div className="glass hover-lift rounded-xl p-4 border border-[#EA4335]/20">
              <h4 className="font-mono text-sm font-semibold text-[#EA4335] mb-2">item_brand</h4>
              <p className="text-xs text-[#8b949e]">Product brand</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Properties */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#ff006e]/10 border border-[#ff006e]/30 pulse-glow">
              <Layers className="h-6 w-6 text-[#ff006e]" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              User Properties
            </h2>
          </div>

          <p className="text-sm text-[#8b949e] mb-6">
            User properties are attributes that describe the user, not individual events.
          </p>

          <div className="code-block">
            <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`// Set user properties
gtag('set', 'user_properties', {
  account_type: 'free',
  customer_tier: 'gold',
  signup_method: 'email',
  total_purchases: 15
})

// Set user ID for cross-device tracking
gtag('config', 'G-XXXXXXXXXX', {
  user_id: 'user_12345'
})`}
            </pre>
          </div>
        </div>
      </div>

      {/* Custom Parameters */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 pulse-glow">
              <Code className="h-6 w-6 text-[#4285F4]" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Custom Parameters
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-mono font-semibold text-[#e8f4f8] mb-3">Adding Custom Parameters</h4>
              <p className="text-sm text-[#8b949e] mb-4">
                You can add up to 25 custom parameters per event. Use descriptive names.
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`gtag('event', 'custom_button_click', {
  button_name: 'Submit',
  button_location: 'form',
  button_color: 'blue',
  user_role: 'admin',
  a_b_test_group: 'variant_B'
})`}
                </pre>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-[#4285F4]/30">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono font-semibold text-[#4285F4] mb-3">Best Practices</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6D00] mt-0.5">•</span>
                      <span className="text-sm text-[#8b949e]">Use descriptive parameter names</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6D00] mt-0.5">•</span>
                      <span className="text-sm text-[#8b949e]">Use snake_case for consistency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6D00] mt-0.5">•</span>
                      <span className="text-sm text-[#8b949e]">Document custom parameters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6D00] mt-0.5">•</span>
                      <span className="text-sm text-[#8b949e]">Register in GA4 interface</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#FF6D00] animate-pulse" />
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Quick Reference
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FF6D00]/20">
                  <th className="font-mono text-left text-[#e8f4f8] py-3 px-3">Parameter</th>
                  <th className="font-mono text-left text-[#e8f4f8] py-3 px-3">Type</th>
                  <th className="font-mono text-left text-[#e8f4f8] py-3 px-3">Required</th>
                  <th className="font-mono text-left text-[#e8f4f8] py-3 px-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#FF6D00]/10">
                  <td className="font-mono text-[#34A853] py-3 px-3">currency</td>
                  <td className="text-[#8b949e] py-3 px-3">string (3 chars)</td>
                  <td className="text-[#34A853] py-3 px-3">No</td>
                  <td className="text-[#8b949e] py-3 px-3">ISO 4217 currency code</td>
                </tr>
                <tr className="border-b border-[#FF6D00]/10">
                  <td className="font-mono text-[#4285F4] py-3 px-3">value</td>
                  <td className="text-[#8b949e] py-3 px-3">number</td>
                  <td className="text-[#34A853] py-3 px-3">No</td>
                  <td className="text-[#8b949e] py-3 px-3">Event value (revenue, score)</td>
                </tr>
                <tr className="border-b border-[#FF6D00]/10">
                  <td className="font-mono text-[#ff006e] py-3 px-3">items</td>
                  <td className="text-[#8b949e] py-3 px-3">array</td>
                  <td className="text-[#EA4335] py-3 px-3">Yes</td>
                  <td className="text-[#8b949e] py-3 px-3">Array of item objects</td>
                </tr>
                <tr className="border-b border-[#FF6D00]/10">
                  <td className="font-mono text-[#FF6D00] py-3 px-3">transaction_id</td>
                  <td className="text-[#8b949e] py-3 px-3">string</td>
                  <td className="text-[#34A853] py-3 px-3">No</td>
                  <td className="text-[#8b949e] py-3 px-3">Unique transaction ID</td>
                </tr>
                <tr>
                  <td className="font-mono text-[#4285F4] py-3 px-3">custom_*</td>
                  <td className="text-[#8b949e] py-3 px-3">varies</td>
                  <td className="text-[#34A853] py-3 px-3">No</td>
                  <td className="text-[#8b949e] py-3 px-3">Any custom parameter (max 25)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
