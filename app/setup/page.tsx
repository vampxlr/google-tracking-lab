"use client"

import { PageContent } from "@/components/page-content"
import { Button } from "@/components/ui/button"
import { 
  Key, 
  Globe, 
  Server, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  AlertTriangle,
  Info,
  Code,
  Settings,
  Layers,
  Search,
  Sparkles,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    alert(`${label} copied to clipboard!`)
  }

  return (
    <PageContent
      title="Setup Guide"
      description="Complete configuration guide to connect your Google Analytics 4 property and start tracking events."
      status="Stable"
    >
      
      {/* Important Notice */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="glass-strong rounded-2xl p-6 border border-[#FBBC04]/30 hover-border-glow">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#FBBC04]/10 border border-[#FBBC04]/30 mt-0.5">
              <Info className="h-5 w-5 text-[#FBBC04]" />
            </div>
            <div>
              <h4 className="font-mono font-semibold text-[#FBBC04] mb-2">Real Google Analytics Setup Required</h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                This project uses <span className="text-[#FF6D00] font-semibold">REAL Google Analytics</span>. 
                You must set up your own GA4 property to test events. All setup instructions are provided below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Create GA4 Property */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 pulse-glow">
              <span className="font-mono text-lg font-bold text-[#4285F4]">01</span>
            </div>
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Create GA4 Property</h3>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-[#4285F4] group-hover:scale-110 transition-transform" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Go to Google Analytics</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Navigate to <span className="font-mono text-[#4285F4]">analytics.google.com</span> and sign in with your Google account.
              </p>
              <Button 
                variant="outline" 
                className="gap-2 button-ghost-orange"
                asChild
              >
                <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Google Analytics
                </a>
              </Button>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <Code className="h-5 w-5 text-[#34A853] group-hover:scale-110 transition-transform" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Create a New Property</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Click <span className="font-mono text-[#4285F4]">Start measuring</span> or go to <span className="font-mono text-[#4285F4]">Admin → Create Property</span>.
              </p>
              <div className="space-y-2 text-sm text-[#8b949e]">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">1.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Account:</span> Select your Google Analytics account
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">2.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Property Name:</span> Enter a name (e.g., "My Website")
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">3.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Reporting Time Zone:</span> Select your timezone
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">4.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Currency:</span> Select your currency (e.g., "USD")
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-5 w-5 text-[#ff006e] group-hover:scale-110 transition-transform" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Create a Data Stream</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                After creating the property, you need to set up a data stream to start collecting data.
              </p>
              <div className="space-y-2 text-sm text-[#8b949e]">
                <div className="flex items-start gap-2">
                  <span className="text-[#ff006e] font-mono mt-0.5">1.</span>
                  <div>
                    Go to <span className="font-mono text-[#4285F4]">Admin → Data Streams</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff006e] font-mono mt-0.5">2.</span>
                  <div>
                    Click <span className="font-mono text-[#4285F4]">Add stream → Web</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff006e] font-mono mt-0.5">3.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Website URL:</span> Enter your URL (use <span className="font-mono text-[#4285F4]">localhost:3000</span> for testing)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff006e] font-mono mt-0.5">4.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Stream Name:</span> Enter a name (e.g., "Main Website")
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff006e] font-mono mt-0.5">5.</span>
                  <div>
                    Click <span className="font-mono text-[#4285F4]">Create stream</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Get Measurement ID */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#34A853]/10 border border-[#34A853]/30 pulse-glow">
              <span className="font-mono text-lg font-bold text-[#34A853]">02</span>
            </div>
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Get Measurement ID</h3>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <Key className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Locate Your Measurement ID</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-4">
                In your GA4 property, go to <span className="font-mono text-[#4285F4]">Admin → Data Streams</span> and click on your Web Data Stream.
              </p>
              <div className="code-block">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-[#e8f4f8]">Measurement ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg text-[#34A853]">G-XXXXXXXXXX</span>
                    <button
                      onClick={() => copyToClipboard("G-XXXXXXXXXX", "Format example")}
                      className="rounded hover:bg-[#FF6D00]/10 p-1 transition-colors"
                    >
                      <Copy className="h-4 w-4 text-[#8b949e] hover:text-[#FF6D00]" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#8b949e]">
                  Starts with <span className="font-mono text-[#4285F4]">"G-"</span> followed by 10 digits
                </p>
              </div>
            </div>
            
            <div className="glass rounded-xl p-5 border border-[#FBBC04]/20">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-[#FBBC04]" />
                <h4 className="font-mono font-semibold text-[#FBBC04]">Important Notes</h4>
              </div>
              <ul className="space-y-2 text-sm text-[#8b949e]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span>Copy the Measurement ID exactly as shown (including the <span className="font-mono text-[#4285F4]">G-</span> prefix)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span>Each data stream has its own unique Measurement ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6D00] mt-0.5">•</span>
                  <span>For testing, you can use any valid GA4 property (even a personal one)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Get API Secret */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#ff006e]/10 border border-[#ff006e]/30 pulse-glow">
              <span className="font-mono text-lg font-bold text-[#ff006e]">03</span>
            </div>
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Get API Secret</h3>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Create Measurement Protocol Secret</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Required for server-side event tracking via Measurement Protocol.
              </p>
              <div className="space-y-2 text-sm text-[#8b949e]">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">1.</span>
                  <div>
                    Go to <span className="font-mono text-[#4285F4]">Admin → Data Streams → Your Stream → Measurement Protocol API secrets</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">2.</span>
                  <div>
                    Click <span className="font-mono text-[#4285F4]">Create</span> (or <span className="font-mono text-[#4285F4]">Add secret</span>)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">3.</span>
                  <div>
                    <span className="font-mono text-[#e8f4f8]">Nickname:</span> Enter a name (e.g., "DevSecret", "Testing")
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">4.</span>
                  <div>
                    Click <span className="font-mono text-[#4285F4]">Create secret</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-5 border border-[#EA4335]/30 bg-[#EA4335]/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono font-semibold text-[#EA4335] mb-2">Copy Secret Immediately!</h4>
                  <p className="text-sm text-[#8b949e]">
                    The <span className="font-mono text-[#4285F4]">Secret value</span> is shown <strong className="text-[#e8f4f8]">ONLY ONCE</strong> after creation. 
                    You won't be able to view it again. Store it securely.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="code-block">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-[#e8f4f8]">API Secret Format</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg text-[#34A853]">a1b2c3d4e5f6g7h8i9j0</span>
                  <button
                    onClick={() => copyToClipboard("a1b2c3d4e5f6g7h8i9j0", "Format example")}
                    className="rounded hover:bg-[#FF6D00]/10 p-1 transition-colors"
                  >
                    <Copy className="h-4 w-4 text-[#8b949e] hover:text-[#FF6D00]" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#8b949e]">
                10+ character alphanumeric string (no prefix)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Configure Environment Variables */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
              <span className="font-mono text-lg font-bold text-[#FF6D00]">04</span>
            </div>
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Configure Environment Variables</h3>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <Code className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Create .env.local File</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Create a file named <span className="font-mono text-[#4285F4]">.env.local</span> in the project root directory.
              </p>
            </div>
            
            <div className="glass rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-5 w-5 text-[#34A853]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Add Your Credentials</h4>
              </div>
              <div className="code-block mb-3">
                <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`# GA4 Client-Side (for browser tracking)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# GA4 Server-Side (for Measurement Protocol)
GA4_API_SECRET=a1b2c3d4e5f6g7h8i9j0

# Optional: Enable debug mode
NEXT_PUBLIC_GA4_DEBUG=true`}
                </pre>
              </div>
              <button
                onClick={() => copyToClipboard(`NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX\nGA4_API_SECRET=a1b2c3d4e5f6g7h8i9j0`, ".env.local content")}
                className="button-ghost-orange rounded-lg px-4 py-2 text-sm font-mono flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </button>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Restart Dev Server</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                After creating <span className="font-mono text-[#4285F4]">.env.local</span>, restart your development server:
              </p>
              <div className="code-block">
                <pre className="text-sm font-mono text-[#4285F4]">npm run dev</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Verify Setup */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[500ms]">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 pulse-glow">
              <span className="font-mono text-lg font-bold text-[#4285F4]">05</span>
            </div>
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Verify Your Setup</h3>
          </div>
          
          <div className="space-y-6">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <Search className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Check Environment Variables</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-4">
                The project includes an environment validation function to check if your credentials are loaded correctly.
              </p>
              <div className="code-block">
                <p className="text-sm text-[#8b949e] mb-2">
                  In the browser console, you should see:
                </p>
                <pre className="text-sm font-mono text-[#34A853] overflow-x-auto">
{`Environment Validation:
✓ Measurement ID: G-XXXXXXXXXX
✓ API Secret: Set
✓ All required variables present`}
                </pre>
              </div>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Test Event Tracking</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Go to the <span className="font-mono text-[#4285F4]">Event Playground</span> and send a test event.
              </p>
              <Link href="/playground">
                <div className="button-neon rounded-lg px-5 py-3 flex items-center gap-3 justify-between cursor-pointer inline-flex">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="font-mono text-sm">Open Event Playground</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-[#4285F4]" />
                <h4 className="font-mono font-semibold text-[#e8f4f8]">Check GA4 DebugView</h4>
              </div>
              <p className="text-sm text-[#8b949e] mb-3">
                Enable DebugView in your GA4 property to see events in real-time.
              </p>
              <div className="space-y-2 text-sm text-[#8b949e]">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">1.</span>
                  <div>
                    Go to <span className="font-mono text-[#4285F4]">Admin → Data Streams → Your Stream</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">2.</span>
                  <div>
                    Click <span className="font-mono text-[#4285F4]">DebugView</span> in the right panel
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6D00] font-mono mt-0.5">3.</span>
                  <div>
                    Send events from the playground - they should appear in <span className="font-mono text-[#34A853]">~5-10 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[600ms]">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#FF6D00] animate-pulse" />
            <h3 className="font-mono text-2xl font-bold text-[#e8f4f8]">Quick Reference</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <h4 className="font-mono font-semibold text-[#4285F4] mb-2">Measurement ID</h4>
              <p className="text-xs text-[#8b949e] mb-2">Format: G-XXXXXXXXXX</p>
              <p className="text-xs text-[#8b949e]">
                Used for client-side tracking with gtag.js
              </p>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <h4 className="font-mono font-semibold text-[#34A853] mb-2">API Secret</h4>
              <p className="text-xs text-[#8b949e] mb-2">Format: alphanumeric string</p>
              <p className="text-xs text-[#8b949e]">
                Used for server-side tracking via Measurement Protocol
              </p>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <h4 className="font-mono font-semibold text-[#ff006e] mb-2">DebugView</h4>
              <p className="text-xs text-[#8b949e] mb-2">Real-time event inspection</p>
              <p className="text-xs text-[#8b949e]">
                See events appear in GA4 as you test
              </p>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <h4 className="font-mono font-semibold text-[#FF6D00] mb-2">Measurement Protocol</h4>
              <p className="text-xs text-[#8b949e] mb-2">Endpoint: /mp/collect</p>
              <p className="text-xs text-[#8b949e]">
                Server-side event delivery to GA4
              </p>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
