"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Trash2, 
  Copy,
  CheckCircle2,
  AlertCircle,
  Activity,
  Code,
  Clock,
  Globe,
  Server,
  Zap,
  Eye
} from "lucide-react"
import { env } from "@/lib/env"

interface LogEntry {
  id: string
  timestamp: string
  event: string
  type: "client" | "server"
  payload?: any
  success?: boolean
  duration?: number
  response?: any
}

interface RequestDetails {
  url: string
  method: string
  headers: Record<string, string>
  body: any
}

interface ResponseDetails {
  status: number
  statusText: string
  duration: number
  body: any
}

interface EventPlaygroundProps {
  title?: string
  description?: string
  events?: Array<{
    name: string
    icon?: React.ReactNode
    brokenPayload?: any
    fixedPayload?: any
    description?: string
  }>
  showModeToggle?: boolean
  showLogs?: boolean
  sendToGA4?: boolean
}

export function EventPlayground({
  title = "GA4 Event Playground",
  description = "Test GA4 events with real-time feedback",
  events = [],
  showModeToggle = false,
  showLogs = true,
  sendToGA4 = true,
}: EventPlaygroundProps) {
  // Initialize mode to "fixed" if not showing mode toggle or if no broken payloads exist
  const hasbrokenPayloads = events.some(e => e.brokenPayload)
  const initialMode = (!showModeToggle || !hasbrokenPayloads) ? "fixed" : "broken"
  
  const [mode, setMode] = React.useState<"broken" | "fixed">(initialMode)
  const [logs, setLogs] = React.useState<LogEntry[]>([])
  const [isSending, setIsSending] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<typeof events[0] | null>(null)
  const [requestDetails, setRequestDetails] = React.useState<RequestDetails | null>(null)
  const [responseDetails, setResponseDetails] = React.useState<ResponseDetails | null>(null)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new log is added
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-scroll-area-viewport]')
      if (scrollContainer) {
        const element = scrollContainer as HTMLElement
        element.scrollTop = element.scrollHeight
      }
    }
  }, [logs])

  // Get current payload for selected event
  const getCurrentPayload = () => {
    if (!selectedEvent) return null
    const payload = mode === "broken" && selectedEvent.brokenPayload 
      ? selectedEvent.brokenPayload 
      : selectedEvent.fixedPayload
    return payload
  }

  const sendToClient = async (eventName: string, payload: any, eventId: string) => {
    const startTime = performance.now()
    
    try {
      // Check if gtag is available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', eventName, payload)
        
        const duration = performance.now() - startTime
        
        return {
          success: true,
          duration,
          payload: { eventName, ...payload }
        }
      } else {
        // gtag not loaded - simulate
        const duration = performance.now() - startTime + Math.random() * 100
        return {
          success: true,
          duration,
          payload: { eventName, ...payload },
          simulated: true
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: performance.now() - startTime
      }
    }
  }

  const sendToServer = async (eventName: string, payload: any) => {
    const startTime = performance.now()
    
    const requestBody = {
      event_name: eventName,
      parameters: payload,
      mode: mode
    }

    try {
      // Set request details
      setRequestDetails({
        url: '/api/ga4/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody
      })

      const response = await fetch('/api/ga4/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const duration = performance.now() - startTime
      const data = await response.json()

      // Set response details
      setResponseDetails({
        status: response.status,
        statusText: response.ok ? 'OK' : 'Error',
        duration,
        body: data
      })

      return {
        success: response.ok,
        status: response.status,
        body: data,
        duration,
        url: '/api/ga4/send'
      }
    } catch (error) {
      const duration = performance.now() - startTime
      const errorBody = {
        error: error instanceof Error ? error.message : 'Unknown error'
      }

      setResponseDetails({
        status: 0,
        statusText: 'Network Error',
        duration,
        body: errorBody
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration
      }
    }
  }

  const sendEvent = async (event: typeof events[0]) => {
    setIsSending(true)
    setSelectedEvent(event)
    setRequestDetails(null)
    setResponseDetails(null)
    
    const timestamp = new Date().toLocaleTimeString()
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const payload = mode === "broken" && event.brokenPayload 
      ? event.brokenPayload 
      : event.fixedPayload
    
    try {
      let clientResult: any = null
      let serverResult: any = null
      
      // Send to Client-side
      clientResult = await sendToClient(event.name, payload, eventId)
      
      // Send to Server-side
      if (sendToGA4) {
        serverResult = await sendToServer(event.name, payload)
      }
      
      // Create log entry
      const newLog: LogEntry = {
        id: eventId,
        timestamp,
        event: event.name,
        type: "server",
        payload,
        success: serverResult?.success || false,
        duration: serverResult?.duration,
        response: serverResult?.body
      }
      
      setLogs(prev => [...prev, newLog])
      
      // Show success/error toast
      if (serverResult?.success || clientResult?.success) {
        toast.success(`${event.name} Event Sent Successfully`, {
          description: `Sent to Client & Server • ${Math.round(serverResult?.duration || clientResult?.duration)}ms`,
        })
      } else {
        toast.error(`${event.name} Event Failed`, {
          description: serverResult?.error || clientResult?.error || 'Unknown error',
        })
      }
      
    } catch (error) {
      toast.error('Failed to send event', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsSending(false)
    }
  }

  const clearLogs = () => {
    setLogs([])
    toast.info('Logs cleared')
  }

  const copyToClipboard = (content: any) => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2))
    toast.success('Copied to clipboard')
  }

  return (
    <div className="space-y-6">
      
      {/* Main Playground Card */}
      <div className="rounded-xl border border-[#FF6D00]/20 bg-gray-900/50 p-6 space-y-6">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 p-2 pulse-glow">
              <Activity className="h-5 w-5 text-[#FF6D00]" />
            </div>
            <h3 className="font-mono text-lg font-bold text-[#e8f4f8]">{title}</h3>
            {sendToGA4 && (
              <Badge variant="default" className="font-mono text-xs bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#8b949e]">{description}</p>
        </div>

        {/* Mode Toggle */}
        {showModeToggle && (
          <div className="rounded-lg border border-[#4285F4]/20 bg-gray-950 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-medium text-[#e8f4f8]">Event Mode</span>
              <Badge 
                variant="outline"
                className={`font-mono ${
                  mode === "fixed" 
                    ? "bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30" 
                    : "bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30"
                }`}
              >
                {mode === "broken" ? "Broken" : "Fixed"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === "broken" ? "default" : "outline"}
                onClick={() => setMode("broken")}
                className={`w-full font-mono text-xs ${
                  mode === "broken" 
                    ? "bg-[#EA4335]/20 text-[#EA4335] border-[#EA4335]/50 hover:bg-[#EA4335]/30" 
                    : ""
                }`}
                size="sm"
                disabled={isSending}
              >
                Broken
              </Button>
              <Button
                variant={mode === "fixed" ? "default" : "outline"}
                onClick={() => setMode("fixed")}
                className={`w-full font-mono text-xs ${
                  mode === "fixed" 
                    ? "bg-[#34A853]/20 text-[#34A853] border-[#34A853]/50 hover:bg-[#34A853]/30" 
                    : ""
                }`}
                size="sm"
                disabled={isSending}
              >
                Fixed
              </Button>
            </div>
            <p className="text-xs text-[#8b949e] mt-2">
              {mode === "broken" 
                ? "Events sent with missing or incorrect data" 
                : "Events sent with proper structure and required fields"}
            </p>
          </div>
        )}

        {/* Event Buttons */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-medium text-[#e8f4f8]">Test Events</h4>
            <Badge variant="outline" className="font-mono text-xs border-[#FF6D00]/30 text-[#FF6D00]">
              {events.length} scenarios
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => sendEvent(event)}
                disabled={isSending}
                className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-left transition-all hover:border-[#FF6D00]/50 hover:bg-[#FF6D00]/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2 mb-2">
                  {event.icon || <Activity className="h-4 w-4 text-[#4285F4]" />}
                  <span className="font-mono text-sm font-semibold text-[#e8f4f8]">
                    {event.name}
                  </span>
                </div>
                {event.description && (
                  <p className="text-xs text-[#8b949e]">
                    {event.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Network Inspector */}
      {(requestDetails || responseDetails || selectedEvent) && (
        <div className="rounded-xl border border-[#4285F4]/20 bg-gray-900/50">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#4285F4]" />
              <h4 className="font-mono text-sm font-medium text-[#4285F4]">Network Inspector</h4>
            </div>
          </div>

          <Tabs defaultValue="json" className="w-full">
            <div className="border-b border-gray-800 px-4">
              <TabsList className="bg-transparent h-auto p-0 space-x-4">
                <TabsTrigger 
                  value="json" 
                  className="font-mono text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#FF6D00] rounded-none bg-transparent"
                >
                  Live JSON Build
                </TabsTrigger>
                <TabsTrigger 
                  value="request" 
                  className="font-mono text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#FF6D00] rounded-none bg-transparent"
                >
                  Request
                </TabsTrigger>
                <TabsTrigger 
                  value="response" 
                  className="font-mono text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#FF6D00] rounded-none bg-transparent"
                >
                  Response
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Live JSON Build */}
            <TabsContent value="json" className="p-4 m-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#8b949e]">
                    Current Event: <span className="text-[#FF6D00]">{selectedEvent?.name || 'None'}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(getCurrentPayload())}
                    className="h-7 gap-1 font-mono text-xs"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
                <div className="relative">
                  <pre className="text-xs font-mono text-[#34A853] bg-gray-950 rounded-lg p-4 overflow-x-auto border border-[#34A853]/20">
                    {JSON.stringify(getCurrentPayload(), null, 2)}
                  </pre>
                </div>
                {selectedEvent && (
                  <div className="text-xs text-[#8b949e] space-y-1">
                    <p>Mode: <span className={mode === "fixed" ? "text-[#34A853]" : "text-[#EA4335]"}>{mode}</span></p>
                    <p>This payload will be sent to GA4 Measurement Protocol</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Request Details */}
            <TabsContent value="request" className="p-4 m-0">
              {requestDetails ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-medium text-[#e8f4f8]">Request Details</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(requestDetails)}
                        className="h-7 gap-1 font-mono text-xs"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-[#8b949e] w-16">URL:</span>
                        <span className="font-mono text-[#4285F4]">{requestDetails.url}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#8b949e] w-16">Method:</span>
                        <span className="font-mono text-[#FF6D00]">{requestDetails.method}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-xs font-medium text-[#e8f4f8] mb-2">Headers</div>
                    <pre className="text-xs font-mono text-[#8b949e] bg-gray-950 rounded-lg p-3 overflow-x-auto border border-gray-700">
                      {JSON.stringify(requestDetails.headers, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="font-mono text-xs font-medium text-[#e8f4f8] mb-2">Body</div>
                    <pre className="text-xs font-mono text-[#34A853] bg-gray-950 rounded-lg p-3 overflow-x-auto border border-[#34A853]/20">
                      {JSON.stringify(requestDetails.body, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-[#8b949e] text-sm">
                  Send an event to see request details
                </div>
              )}
            </TabsContent>

            {/* Response Details */}
            <TabsContent value="response" className="p-4 m-0">
              {responseDetails ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-medium text-[#e8f4f8]">Response Details</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(responseDetails)}
                        className="h-7 gap-1 font-mono text-xs"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-[#8b949e] w-16">Status:</span>
                        <span className={`font-mono ${
                          responseDetails.status >= 200 && responseDetails.status < 300 
                            ? 'text-[#34A853]' 
                            : 'text-[#EA4335]'
                        }`}>
                          {responseDetails.status} {responseDetails.statusText}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#8b949e] w-16">Duration:</span>
                        <span className="font-mono text-[#FF6D00]">{responseDetails.duration.toFixed(0)}ms</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-xs font-medium text-[#e8f4f8] mb-2">Response Body</div>
                    <pre className={`text-xs font-mono bg-gray-950 rounded-lg p-3 overflow-x-auto border ${
                      responseDetails.status >= 200 && responseDetails.status < 300
                        ? 'text-[#34A853] border-[#34A853]/20'
                        : 'text-[#EA4335] border-[#EA4335]/20'
                    }`}>
                      {JSON.stringify(responseDetails.body, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-[#8b949e] text-sm">
                  Send an event to see response details
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Event History */}
      {showLogs && logs.length > 0 && (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50">
          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-[#4285F4]" />
              <h4 className="font-mono text-sm font-medium text-[#4285F4]">Event History</h4>
              <Badge variant="outline" className="font-mono text-xs border-[#4285F4]/30 text-[#4285F4]">
                {logs.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="h-7 gap-1 font-mono text-xs hover:text-[#EA4335]"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </Button>
          </div>
          
          <ScrollArea className="p-4" ref={scrollAreaRef}>
            <div className="space-y-3">
              {logs.map((log) => (
                <div 
                  key={log.id}
                  className={`rounded-lg border p-4 ${
                    log.success 
                      ? 'border-[#34A853]/20 bg-[#34A853]/5' 
                      : 'border-[#EA4335]/20 bg-[#EA4335]/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {log.success ? (
                        <CheckCircle2 className="h-4 w-4 text-[#34A853]" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-[#EA4335]" />
                      )}
                      <span className="font-mono text-sm font-semibold text-[#e8f4f8]">
                        {log.event}
                      </span>
                      <Badge 
                        variant="outline"
                        className="font-mono text-xs border-[#FF6D00]/30 text-[#FF6D00]"
                      >
                        {log.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#8b949e] font-mono">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="rounded bg-gray-950 p-2 border border-[#4285F4]/20">
                      <div className="flex items-center gap-1 mb-1">
                        <Server className="h-3 w-3 text-[#4285F4]" />
                        <span className="text-xs font-mono text-[#4285F4]">Server-Side</span>
                        <Badge variant="outline" className="text-xs font-mono ml-auto border-[#FF6D00]/30 text-[#FF6D00]">
                          {log.duration?.toFixed(0)}ms
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-xs font-mono text-[#4285F4] hover:text-[#FF6D00] transition-colors">
                      View Payload ▼
                    </summary>
                    <div className="mt-2 relative">
                      <button
                        onClick={() => copyToClipboard(log.payload)}
                        className="absolute top-2 right-2 rounded bg-gray-950 hover:bg-gray-800 transition-colors p-1 border border-gray-700"
                      >
                        <Copy className="h-3 w-3 text-[#8b949e]" />
                      </button>
                      <pre className="text-xs font-mono text-[#34A853] bg-gray-950 rounded p-3 pr-10 break-all whitespace-pre-wrap border border-[#34A853]/20">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  </details>
                  
                  {log.response && (
                    <details className="group mt-2">
                      <summary className="cursor-pointer text-xs font-mono text-[#4285F4] hover:text-[#FF6D00] transition-colors">
                        View Response ▼
                      </summary>
                      <div className="mt-2 relative">
                        <button
                          onClick={() => copyToClipboard(log.response)}
                          className="absolute top-2 right-2 rounded bg-gray-950 hover:bg-gray-800 transition-colors p-1 border border-gray-700"
                        >
                          <Copy className="h-3 w-3 text-[#8b949e]" />
                        </button>
                        <pre className={`text-xs font-mono bg-gray-950 rounded p-3 pr-10 break-all whitespace-pre-wrap border ${
                          log.success 
                            ? 'text-[#34A853] border-[#34A853]/20' 
                            : 'text-[#EA4335] border-[#EA4335]/20'
                        }`}>
                          {JSON.stringify(log.response, null, 2)}
                        </pre>
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

    </div>
  )
}
