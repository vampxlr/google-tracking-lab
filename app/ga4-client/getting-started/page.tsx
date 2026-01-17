"use client"

import { PageContent } from "@/components/page-content"
import { 
  Globe, 
  Code, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Zap,
  Settings,
  Target,
  Activity
} from "lucide-react"
import Link from "next/link"

export default function GA4GettingStartedPage() {
  return (
    <PageContent
      title="Getting Started with GA4"
      description="Google Analytics 4 uses event-based tracking with a redesigned data model focused on user-centric measurements."
      status="Stable"
    >
      
      {/* Header Cards */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#34A853]/20 to-[#FF6D00]/20 border border-[#34A853]/30 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-[#34A853]" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-bold text-[#34A853] mb-2">
                  Key Benefits
                </h3>
              </div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#34A853] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Event-based data model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#34A853] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Improved cross-platform tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#34A853] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Better privacy controls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#34A853] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">BigQuery export included</span>
              </li>
            </ul>
          </div>
          
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#4285F4]/20 to-[#ff006e]/20 border border-[#4285F4]/30 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-[#4285F4]" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-bold text-[#4285F4] mb-2">
                  New Features
                </h3>
              </div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Machine learning predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Advanced path analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Flexible event naming</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Enhanced user properties</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Installation with gtag.js
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#FF6D00]" />
              <h3 className="font-mono text-xl font-bold text-[#e8f4f8]">Add gtag.js to Your Website</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Add the gtag.js script to the <span className="font-mono text-[#4285F4]">&lt;head&gt;</span> section of your HTML:
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`<!-- Global site tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-[#4285F4]" />
              <h3 className="font-mono text-xl font-bold text-[#e8f4f8]">Using in Next.js</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              In Next.js, you can initialize GA4 in your layout.tsx:
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`// app/layout.tsx
import { useEffect } from 'react'
import Script from 'next/script'

export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize gtag
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <Script
          src={\`https://www.googletagmanager.com/gtag/js?id=\${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}\`}
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-[#ff006e]" />
              <h3 className="font-mono text-xl font-bold text-[#e8f4f8]">Configuration Options</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              You can pass configuration options when initializing GA4:
            </p>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#4285F4] overflow-x-auto">
{`gtag('config', 'G-XXXXXXXXXX', {
  send_page_view: false,        // Disable automatic page views
  page_title: 'Custom Title',   // Set default page title
  debug_mode: true,             // Enable debug mode
  cookie_expires: 63072000,    // Cookie expiration (2 years)
  cookie_domain: 'auto',         // Cookie domain
  cookie_flags: 'samesite=none;secure',
  anonymize_ip: true,            // Anonymize IP addresses
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Automatic Events */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Automatic Event Collection
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <p className="text-sm text-[#8b949e] mb-6">
          GA4 automatically collects certain events without any code changes:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[#34A853]/10 group-hover:bg-[#34A853]/20 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
              </div>
              <span className="font-mono font-semibold text-[#34A853]">page_view</span>
            </div>
            <p className="text-sm text-[#8b949e]">
              Sent automatically when user navigates to a new page. Includes page URL, title, and referrer.
            </p>
          </div>

          <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[#4285F4]/10 group-hover:bg-[#4285F4]/20 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-[#4285F4]" />
              </div>
              <span className="font-mono font-semibold text-[#4285F4]">session_start</span>
            </div>
            <p className="text-sm text-[#8b949e]">
              Fired when a new session begins. GA4 automatically detects session start based on user activity.
            </p>
          </div>

          <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[#ff006e]/10 group-hover:bg-[#ff006e]/20 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
              </div>
              <span className="font-mono font-semibold text-[#ff006e]">user_engagement</span>
            </div>
            <p className="text-sm text-[#8b949e]">
              Captures when user is actively engaged with your site (scrolls, clicks, etc.).
            </p>
          </div>

          <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
              </div>
              <span className="font-mono font-semibold text-[#FF6D00]">first_visit</span>
            </div>
            <p className="text-sm text-[#8b949e]">
              Sent when a new user visits your site for the first time.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Events */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Sending Custom Events
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <p className="text-sm text-[#8b949e] mb-6">
          Track user interactions with custom events using gtag:
        </p>

        <div className="space-y-6">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-[#FF6D00]" />
              <span className="font-mono font-semibold text-[#e8f4f8]">Basic Event:</span>
            </div>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`gtag('event', 'button_click', {
  button_name: 'Sign Up',
  button_location: 'header',
  page_section: 'hero'
})`}
              </pre>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-[#4285F4]" />
              <span className="font-mono font-semibold text-[#e8f4f8]">E-commerce Event:</span>
            </div>
            <div className="code-block">
              <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'USD',
  items: [{
    item_id: '123',
    item_name: 'Blue Widget',
    item_category: 'Widgets',
    price: 99.99,
    quantity: 1
  }]
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Next Steps
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/ga4-client/standard-events">
              <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#4285F4] mb-1">Standard Events</h3>
                  <p className="text-xs text-[#8b949e]">
                    Learn all GA4 standard events
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#4285F4] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/ga4-client/event-parameters">
              <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#34A853] mb-1">Event Parameters</h3>
                  <p className="text-xs text-[#8b949e]">
                    Understanding event parameters
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#34A853] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/playground">
              <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#ff006e] mb-1">Event Playground</h3>
                  <p className="text-xs text-[#8b949e]">
                    Test events interactively
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#ff006e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/measurement-protocol/getting-started">
              <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/30 flex items-center justify-between cursor-pointer group">
                <div>
                  <h3 className="font-mono font-semibold text-[#FF6D00] mb-1">Server-Side Tracking</h3>
                  <p className="text-xs text-[#8b949e]">
                    Measurement Protocol basics
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
