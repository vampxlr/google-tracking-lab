'use client'

import * as React from 'react'
import { CheckCircle2, Circle, ExternalLink, ArrowRight, Globe, Server, Zap } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface SetupStatus {
  configured: boolean
  measurementId?: string
}

export function SetupStatusPanel() {
  const [status, setStatus] = React.useState<SetupStatus>({ configured: false })
  const [isLoading, setIsLoading] = React.useState(true)
  const [testsRun, setTestsRun] = React.useState(false)

  React.useEffect(() => {
    const checkSetup = async () => {
      try {
        const response = await fetch('/api/ga4/send')
        const data = await response.json()
        setStatus(data)
        
        // Check if tests have been run (from localStorage)
        const lastTest = localStorage.getItem('last_ga4_test_time')
        setTestsRun(!!lastTest)
      } catch (error) {
        console.error('Failed to check setup:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSetup()
  }, [])

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completed = 0
    let total = 3

    if (status.configured) completed += 2 // GA4 is worth 2 points (client + server)
    if (testsRun) completed += 1

    return Math.round((completed / total) * 100)
  }

  const completion = calculateCompletion()
  const hasGtagJS = typeof window !== 'undefined' && status.configured
  const hasMeasurementProtocol = status.configured

  if (isLoading) {
    return (
      <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20 animate-pulse">
        <div className="h-8 bg-[#FF6D00]/10 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-[#FF6D00]/10 rounded"></div>
          <div className="h-12 bg-[#FF6D00]/10 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8 border border-[#FF6D00]/20 hover-border-glow animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-mono text-xl md:text-2xl font-bold text-[#e8f4f8]">
            Setup Status
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-3xl font-bold text-[#FF6D00]">
              {completion}%
            </span>
            <span className="text-sm text-[#8b949e]">Complete</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden border border-[#FF6D00]/20">
          <div 
            className="h-full bg-gradient-to-r from-[#FF6D00] to-[#4285F4] transition-all duration-1000 ease-out"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Status Items */}
      <div className="space-y-3 mb-6">
        {/* gtag.js (Client-Side) */}
        <div className="glass hover-lift rounded-xl p-4 border border-[#4285F4]/20 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${hasGtagJS ? 'bg-[#34A853]/10' : 'bg-[#8b949e]/10'} transition-colors`}>
                <Globe className={`h-5 w-5 ${hasGtagJS ? 'text-[#34A853]' : 'text-[#8b949e]'}`} />
              </div>
              <div>
                <p className="font-mono text-sm font-semibold text-[#e8f4f8]">
                  gtag.js (Client-Side)
                </p>
                <p className="text-xs text-[#8b949e]">Browser-based tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasGtagJS ? (
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
              ) : (
                <Circle className="h-5 w-5 text-[#8b949e]" />
              )}
              <Badge 
                variant={hasGtagJS ? 'default' : 'outline'}
                className={`font-mono text-xs ${hasGtagJS ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30' : 'text-[#8b949e]'}`}
              >
                {hasGtagJS ? 'READY' : 'NOT CONFIGURED'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Measurement Protocol (Server-Side) */}
        <div className="glass hover-lift rounded-xl p-4 border border-[#ff006e]/20 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${hasMeasurementProtocol ? 'bg-[#34A853]/10' : 'bg-[#8b949e]/10'} transition-colors`}>
                <Server className={`h-5 w-5 ${hasMeasurementProtocol ? 'text-[#34A853]' : 'text-[#8b949e]'}`} />
              </div>
              <div>
                <p className="font-mono text-sm font-semibold text-[#e8f4f8]">
                  Measurement Protocol
                </p>
                <p className="text-xs text-[#8b949e]">Server-side tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasMeasurementProtocol ? (
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
              ) : (
                <Circle className="h-5 w-5 text-[#8b949e]" />
              )}
              <Badge 
                variant={hasMeasurementProtocol ? 'default' : 'outline'}
                className={`font-mono text-xs ${hasMeasurementProtocol ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30' : 'text-[#8b949e]'}`}
              >
                {hasMeasurementProtocol ? 'READY' : 'NOT CONFIGURED'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tests */}
        <div className="glass hover-lift rounded-xl p-4 border border-[#FBBC04]/20 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${testsRun ? 'bg-[#34A853]/10' : 'bg-[#FBBC04]/10'} transition-colors`}>
                <Zap className={`h-5 w-5 ${testsRun ? 'text-[#34A853]' : 'text-[#FBBC04]'}`} />
              </div>
              <div>
                <p className="font-mono text-sm font-semibold text-[#e8f4f8]">
                  Event Tests
                </p>
                <p className="text-xs text-[#8b949e]">Test event playground</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {testsRun ? (
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
              ) : (
                <Circle className="h-5 w-5 text-[#FBBC04]" />
              )}
              <Badge 
                variant={testsRun ? 'default' : 'outline'}
                className={`font-mono text-xs ${testsRun ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30' : 'bg-[#FBBC04]/20 text-[#FBBC04] border-[#FBBC04]/30'}`}
              >
                {testsRun ? 'COMPLETE' : 'PENDING'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-[#FF6D00]/20 pt-6">
        <h4 className="font-mono text-sm font-semibold text-[#8b949e] mb-3 uppercase tracking-wide">
          Quick Actions
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/setup">
            <button className="w-full button-ghost-orange rounded-xl px-4 py-3 flex items-center justify-between group">
              <span className="font-mono text-sm font-semibold">Setup Guide</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>
          
          <Link href="/playground">
            <button className="w-full button-neon rounded-xl px-4 py-3 flex items-center justify-between group">
              <span className="font-mono text-sm font-semibold">Test Events</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* Next Step */}
      {!status.configured && (
        <div className="mt-6 glass rounded-xl p-4 border border-[#4285F4]/20">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-sm font-semibold text-[#4285F4] mb-1">
                Next: Configure GA4 Credentials
              </p>
              <p className="text-xs text-[#8b949e]">
                Add your GA4 Measurement ID and API Secret to get started
              </p>
            </div>
          </div>
        </div>
      )}

      {status.configured && !testsRun && (
        <div className="mt-6 glass rounded-xl p-4 border border-[#FF6D00]/20">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-[#FF6D00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-sm font-semibold text-[#FF6D00] mb-1">
                Next: Run Test Events
              </p>
              <p className="text-xs text-[#8b949e]">
                Visit the playground to test your tracking setup
              </p>
            </div>
          </div>
        </div>
      )}

      {status.configured && testsRun && (
        <div className="mt-6 glass rounded-xl p-4 border border-[#34A853]/20">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-sm font-semibold text-[#34A853] mb-1">
                Setup Complete! 🎉
              </p>
              <p className="text-xs text-[#8b949e]">
                Your tracking lab is ready. Explore the documentation to learn more.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
