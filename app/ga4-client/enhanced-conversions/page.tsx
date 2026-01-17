"use client"

import { PageContent } from "@/components/page-content"
import { 
  Shield, 
  Hash, 
  Lock, 
  CheckCircle2,
  Info,
  Code,
  Zap,
  Target
} from "lucide-react"

export default function EnhancedConversionsPage() {
  return (
    <PageContent
      title="Enhanced Conversions"
      description="Enhanced Conversions improve ad personalization and measurement by sending hashed user data to Google Analytics while maintaining privacy."
      status="Stable"
    >
      
      {/* What are Enhanced Conversions */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 pulse-glow">
                <Shield className="h-6 w-6 text-[#4285F4]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                What are Enhanced Conversions?
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              Enhanced Conversions allow you to send first-party user data (email, phone, address) 
              to Google Analytics in a <span className="text-[#FF6D00] font-semibold">privacy-safe, hashed format</span>. This improves:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#34A853]/10 group-hover:bg-[#34A853]/20 transition-colors">
                    <Target className="h-5 w-5 text-[#34A853]" />
                  </div>
                  <span className="font-mono font-semibold text-[#34A853]">Ad Personalization</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Better ad targeting with user data
                </p>
              </div>
              
              <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4285F4]/10 group-hover:bg-[#4285F4]/20 transition-colors">
                    <Zap className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  <span className="font-mono font-semibold text-[#4285F4]">Attribution</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Improved conversion attribution
                </p>
              </div>
              
              <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#ff006e]/10 group-hover:bg-[#ff006e]/20 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
                  </div>
                  <span className="font-mono font-semibold text-[#ff006e]">ROAS Optimization</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Better ad spend optimization
                </p>
              </div>
              
              <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
                    <Shield className="h-5 w-5 text-[#FF6D00]" />
                  </div>
                  <span className="font-mono font-semibold text-[#FF6D00]">Privacy-First</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Hashed data protects user privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Data Types */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Supported Data Types
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#4285F4]" />
              <h3 className="font-mono text-xl font-semibold text-[#4285F4]">Email</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              User email address (hashed with SHA-256)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`enhanced_conversions: {
  email: "user@example.com"
}`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-mono text-xl font-semibold text-[#34A853]">Phone</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              User phone number (hashed with SHA-256)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`enhanced_conversions: {
  phone: "+15551234567"
}`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#ff006e]" />
              <h3 className="font-mono text-xl font-semibold text-[#ff006e]">Address</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              User postal/zip code (hashed with SHA-256)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#4285F4] overflow-x-auto">
{`enhanced_conversions: {
  address: {
    postal_code: "90210"
  }
}`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#FF6D00]" />
              <h3 className="font-mono text-xl font-semibold text-[#FF6D00]">Name</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              User first/last name (hashed with SHA-256)
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`enhanced_conversions: {
  first_name: "John",
  last_name: "Doe"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Implementation
            </h2>
          </div>

          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Step 1: Configure in GA4</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Enable Enhanced Conversions in your GA4 property:
              </p>
              <div className="text-sm text-[#8b949e] space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">1.</span>
                  <span>Go to <span className="font-mono text-[#4285F4]">Admin → Data Streams</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">2.</span>
                  <span>Click on your Web Data Stream</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">3.</span>
                  <span>Scroll to <span className="font-mono text-[#4285F4]">Enhanced Conversions</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">4.</span>
                  <span>Click <span className="font-mono text-[#4285F4]">Enable Enhanced Conversions</span></span>
                </div>
              </div>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Step 2: Add to Event</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                Add enhanced_conversions object to your event payload:
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'USD',
  enhanced_conversions: {
    email: 'user@example.com',
    phone: '+15551234567',
    address: {
      postal_code: '90210',
      first_name: 'John'
    }
  }
})`}
                </pre>
              </div>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <h3 className="font-mono font-semibold text-[#e8f4f8] mb-3">Server-Side Implementation</h3>
              <p className="text-sm text-[#8b949e] mb-3">
                For Measurement Protocol, add the same structure:
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#4285F4] overflow-x-auto">
{`{
  "client_id": "123.4567890",
  "events": [{
    "name": "purchase",
    "params": {
      "transaction_id": "T_12345",
      "value": 99.99,
      "currency": "USD",
      "enhanced_conversions": {
        "email": "user@example.com",
        "phone": "+15551234567"
      }
    }
  }]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-6 border border-[#4285F4]/30">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-[#4285F4] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono font-bold text-[#4285F4] mb-3">Privacy & Hashing</h3>
              <div className="text-sm text-[#8b949e] space-y-2">
                <p>
                  Google automatically hashes your data with SHA-256 before storage. You should send 
                  <span className="font-mono text-[#4285F4]"> plain text</span> - GA4 handles the hashing.
                </p>
                <p>
                  Only send data you have explicit consent to use. Enhanced Conversions require 
                  proper consent management.
                </p>
                <p>
                  Hashing is one-way - you cannot reverse the hash to get original data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
