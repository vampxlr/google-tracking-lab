"use client"

import { PageContent } from "@/components/page-content"
import { 
  Target, 
  Server, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Code,
  Activity,
  Shield,
  Sparkles
} from "lucide-react"
import Link from "next/link"

export default function OverviewPage() {
  return (
    <PageContent
      title="Google Tracking Lab"
      description="Master Google Analytics 4 & Measurement Protocol to build accurate, privacy-compliant tracking systems for maximum conversion optimization."
      status="Stable"
    >
      
      {/* Hero Section with Animated Border */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-gradient">
          <div className="border-gradient-content glass-strong p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
                <Activity className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-shimmer">
                Why Accurate Tracking Matters
              </h2>
            </div>
            
            <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
              In today&apos;s privacy-first world, traditional browser-based tracking is becoming unreliable. 
              Safari&apos;s ITP, Firefox&apos;s ETP, and other browser restrictions are blocking up to 
              <span className="font-semibold text-[#ff006e] text-glow-hover"> 40-50% of events</span>, causing:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass hover-glow rounded-xl p-5 border border-red-500/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <AlertCircle className="h-5 w-5 text-red-400 icon-spin-hover" />
                  </div>
                  <span className="font-mono font-semibold text-red-400">Inaccurate Attribution</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Can&apos;t tell which campaigns are actually driving conversions, leading to wasted budget
                </p>
              </div>
              
              <div className="glass hover-glow rounded-xl p-5 border border-red-500/20 group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <AlertCircle className="h-5 w-5 text-red-400 icon-spin-hover" />
                  </div>
                  <span className="font-mono font-semibold text-red-400">Poor Optimization</span>
                </div>
                <p className="text-sm text-[#8b949e]">
                  Google&apos;s Smart Bidding can&apos;t optimize without accurate conversion data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="glass-strong rounded-2xl p-8 md:p-10 border border-[#FF6D00]/20 hover-border-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
              <Shield className="h-6 w-6 text-[#FF6D00]" />
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#FF6D00]">
              The Solution: Server-Side Tracking
            </h2>
          </div>
          
          <p className="mb-6 text-base md:text-lg text-[#8b949e] leading-relaxed">
            By implementing both gtag.js (client-side) and Measurement Protocol (server-side), 
            you can recover lost events and build a robust tracking system that&apos;s 
            future-proof against privacy restrictions.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="mb-3 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-[#FF6D00] icon-spin-hover" />
                </div>
                <span className="font-mono font-semibold text-[#FF6D00]">95%+ Capture</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Recover lost events from browser restrictions
              </p>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="mb-3 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-[#FF6D00] icon-spin-hover" />
                </div>
                <span className="font-mono font-semibold text-[#FF6D00]">Accurate Data</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Know exactly which campaigns drive conversions
              </p>
            </div>
            
            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20 group">
              <div className="mb-3 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF6D00]/10 group-hover:bg-[#FF6D00]/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-[#FF6D00] icon-spin-hover" />
                </div>
                <span className="font-mono font-semibold text-[#FF6D00]">Better ROAS</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Optimize campaigns with complete data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e8f4f8]">
            Core Concepts
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* gtag.js / GA4 */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#4285F4]/20 to-[#FF6D00]/20 border border-[#4285F4]/30 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-[#4285F4]" />
              </div>
              <div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#4285F4] mb-2">
                  gtag.js / GA4
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  CLIENT-SIDE
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">
              JavaScript code snippet that tracks user actions directly from the browser and sends them to Google Analytics servers.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Fires when users visit your website</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Tracks page_view, add_to_cart, purchase</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-mono mt-0.5">⚠</span>
                <span className="text-sm text-[#8b949e]">Blocked by ad blockers & ITP</span>
              </div>
            </div>
          </div>

          {/* Measurement Protocol */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#ff006e]/20 to-[#4285F4]/20 border border-[#ff006e]/30 group-hover:scale-110 transition-transform">
                <Server className="h-6 w-6 text-[#ff006e]" />
              </div>
              <div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#ff006e] mb-2">
                  Measurement Protocol
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  SERVER-SIDE
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">
              Server-side API that sends events directly from your backend to Google, independent of browser restrictions.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Bypasses ad blockers completely</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Reliable & consistent delivery</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">✓</span>
                <span className="text-sm text-[#8b949e]">Tracks offline events too</span>
              </div>
            </div>
          </div>

          {/* Enhanced Conversions */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6D00]/20 to-[#ff006e]/20 border border-[#FF6D00]/30 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#FF6D00] mb-2">
                  Enhanced Conversions
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  ATTRIBUTION
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">
              Send hashed user data (email, phone) to improve conversion attribution and match rates.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">SHA-256 hashed PII</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Better cross-device tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Improved match quality</span>
              </div>
            </div>
          </div>

          {/* Smart Bidding */}
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#ff006e]/20 to-[#FF6D00]/20 border border-[#4285F4]/30 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-[#4285F4]" />
              </div>
              <div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#4285F4] mb-2">
                  Smart Bidding
                </h3>
                <span className="text-xs font-mono text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                  PERFORMANCE
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">
              Google&apos;s AI uses complete tracking data to optimize bids and maximize return on ad spend.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Target high-intent audiences</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">Optimize bids in real-time</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D00] font-mono mt-0.5">›</span>
                <span className="text-sm text-[#8b949e]">2-5x better ROAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 md:p-10 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#FF6D00] animate-pulse" />
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e8f4f8]">
              Ready to Start?
            </h2>
          </div>
          
          <p className="mb-8 text-base text-[#8b949e]">
            This is an open-source project designed for learning and practice. Connect your own 
            GA4 Property and API Secret to experiment with real tracking data.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/setup">
              <div className="button-neon rounded-xl px-6 py-4 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5" />
                  <span className="font-mono text-sm md:text-base">Get Started</span>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <a href="https://github.com/yourusername/google-tracking-lab" target="_blank" rel="noopener noreferrer">
              <div className="glass hover-glow rounded-xl px-6 py-4 flex items-center justify-between border border-[#4285F4]/30 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-[#4285F4]" />
                  <span className="font-mono text-sm md:text-base text-[#4285F4]">View on GitHub</span>
                </div>
                <ArrowRight className="h-5 w-5 text-[#4285F4] group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-[#4285F4]/5 border border-[#4285F4]/20">
            <p className="text-sm text-[#8b949e]">
              <span className="text-[#4285F4] font-mono">💡 Note:</span> This guide is designed for developers, marketers, and business owners 
              who want to build a solid foundation in Google Analytics 4 tracking concepts.
            </p>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
