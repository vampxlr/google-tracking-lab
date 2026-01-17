"use client"

import { PageContent } from "@/components/page-content"
import { 
  Globe, 
  Link as LinkIcon, 
  ArrowRight, 
  Code,
  CheckCircle2,
  Info,
  Settings,
  XCircle,
  Shield
} from "lucide-react"

export default function CrossDomainPage() {
  return (
    <PageContent
      title="Cross-Domain Tracking"
      description="Track user behavior across multiple domains to see the complete user journey and maintain accurate attribution."
      status="Stable"
    >
      
      {/* Why Cross-Domain Tracking */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
                <Globe className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                Why Cross-Domain Tracking?
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              Users often navigate across multiple related domains during their journey. Without cross-domain tracking, 
              each domain appears as a <span className="text-[#EA4335] font-semibold">separate user</span>, breaking the attribution chain.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass hover-lift rounded-xl p-6 border border-[#EA4335]/20 group">
                <div className="mb-4 flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-[#EA4335]" />
                  <span className="font-mono font-semibold text-[#EA4335]">Without Cross-Domain</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">•</span>
                    <span className="text-sm text-[#8b949e]"><span className="font-mono text-[#e8f4f8]">example.com</span> = User A</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">•</span>
                    <span className="text-sm text-[#8b949e]"><span className="font-mono text-[#e8f4f8]">shop.example.com</span> = User B (different)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">•</span>
                    <span className="text-sm text-[#8b949e]">Broken attribution chain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EA4335] mt-0.5">•</span>
                    <span className="text-sm text-[#8b949e]">Duplicated user counts</span>
                  </li>
                </ul>
              </div>

              <div className="glass hover-lift rounded-xl p-6 border border-[#34A853]/20 group">
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#34A853]" />
                  <span className="font-mono font-semibold text-[#34A853]">With Cross-Domain</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">✓</span>
                    <span className="text-sm text-[#8b949e]"><span className="font-mono text-[#e8f4f8]">example.com</span> = User A</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">✓</span>
                    <span className="text-sm text-[#8b949e]"><span className="font-mono text-[#e8f4f8]">shop.example.com</span> = User A (same user)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">✓</span>
                    <span className="text-sm text-[#8b949e]">Complete attribution chain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#34A853] mt-0.5">✓</span>
                    <span className="text-sm text-[#8b949e]">Accurate user counts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Methods */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Implementation Methods
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-[#4285F4]" />
              <h3 className="font-mono text-xl font-semibold text-[#e8f4f8]">Method 1: GA4 Interface Configuration</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Enable cross-domain tracking in GA4 admin interface:
            </p>
            <div className="space-y-2 text-sm text-[#8b949e]">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">1.</span>
                <div>Go to <span className="font-mono text-[#4285F4]">Admin → Data Streams → Your Stream</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">2.</span>
                <div>Find <span className="font-mono text-[#4285F4]">Configure Google Tag</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">3.</span>
                <div>Under <span className="font-mono text-[#4285F4]">More Settings</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">4.</span>
                <div>Find <span className="font-mono text-[#4285F4]">Set up cross-domain tracking</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">5.</span>
                <div>Add all related domains</div>
              </div>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-mono text-xl font-semibold text-[#e8f4f8]">Method 2: Automatic Linker</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Configure gtag to handle linker automatically:
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`// Configure linker settings
gtag('config', 'G-XXXXXXXXXX', {
  linker: {
    domains: ['example.com', 'shop.example.com', 'blog.example.com'],
    decorate_forms: true,
    accept_incoming: true
  }
})`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <LinkIcon className="h-6 w-6 text-[#ff006e]" />
              <h3 className="font-mono text-xl font-semibold text-[#e8f4f8]">Method 3: Manual Query Parameters</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Append linker parameter to URLs manually:
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#4285F4] overflow-x-auto">
{`<!-- Link from example.com to shop.example.com -->
<a href="https://shop.example.com/page?_gl=1.0">
  Shop Now
</a>

<!-- Link from shop.example.com to example.com -->
<a href="https://example.com/home?_gl=1.0">
  Home
</a>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 hover-border-glow">
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
                <span className="font-mono font-semibold text-[#4285F4]">List All Domains</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Add every domain in your ecosystem, not just primary
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <span className="font-mono font-semibold text-[#34A853]">Test Linking</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Verify sessions are tracked across domains in GA4 DebugView
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
                <span className="font-mono font-semibold text-[#ff006e]">Use HTTPS</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Linker only works on HTTPS for security
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
                <span className="font-mono font-semibold text-[#FF6D00]">Consistent Cookie Domain</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Ensure cookies are shared across domains
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-6 border border-[#FBBC04]/30">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-[#FBBC04] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono font-bold text-[#FBBC04] mb-3">Limitations</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span className="text-sm text-[#8b949e]">
                    Cross-domain tracking requires <span className="font-mono text-[#4285F4]">HTTPS</span> on all domains
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span className="text-sm text-[#8b949e]">
                    Third-party cookie blocking (Safari ITP, Firefox ETP) can interfere
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span className="text-sm text-[#8b949e]">
                    Users who opt out of cookies won't be tracked across domains
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span className="text-sm text-[#8b949e]">
                    Linker parameters may be removed by some URL shorteners
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
