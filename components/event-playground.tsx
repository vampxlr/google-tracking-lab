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
  Server
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
  const [mode, setMode] = React.useState<"broken" | "fixed">("broken")
  const [logs, setLogs] = React.useState<LogEntry[]>([])
  const [isSending, setIsSending] = React.useState(false)
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
    
    try {
      const response = await fetch('/api/ga4/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: eventName,
          parameters: payload,
          mode: mode
        }),
      })

      const duration = performance.now() - startTime
      const data = await response.json()

      return {
        success: response.ok,
        status: response.status,
        body: data,
        duration,
        url: '/api/ga4/send'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: performance.now() - startTime
      }
    }
  }

  const sendEvent = async (event: typeof events[0]) => {
    setIsSending(true)
    const timestamp = new Date().toLocaleTimeString()
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const payload = mode === "broken" ? event.brokenPayload : event.fixedPayload
    
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
        success: mode === "fixed" && serverResult?.success,
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

  const copyPayload = (payload: any) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
    toast.success('Payload copied to clipboard')
  }

  return (
    <div className="space-y-6">
      
      {/* Main Playground Card */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-6">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-blue-600/10 border border-blue-500/30 p-2">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-mono text-lg font-bold text-gray-200">{title}</h3>
            {sendToGA4 && (
              <Badge variant="default" className="font-mono text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        {/* Mode Toggle */}
        {showModeToggle && (
          <div className="rounded-lg border border-gray-700 bg-gray-950 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-medium text-gray-200">Event Mode</span>
              <Badge 
                variant={mode === "fixed" ? "default" : "outline"}
                className="font-mono"
              >
                {mode === "broken" ? "Broken" : "Fixed"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === "broken" ? "outline" : "default"}
                onClick={() => setMode("broken")}
                className="w-full font-mono text-xs"
                size="sm"
                disabled={isSending}
              >
                Broken
              </Button>
              <Button
                variant={mode === "fixed" ? "default" : "outline"}
                onClick={() => setMode("fixed")}
                className="w-full font-mono text-xs"
                size="sm"
                disabled={isSending}
              >
                Fixed
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {mode === "broken" 
                ? "Events sent with missing or incorrect data" 
                : "Events sent with proper structure and required fields"}
            </p>
          </div>
        )}

        {/* Event Buttons */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-medium text-gray-200">Test Events</h4>
            <Badge variant="outline" className="font-mono text-xs">
              {events.length} scenarios
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => sendEvent(event)}
                disabled={isSending}
                className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-left transition-all hover:border-blue-500/50 hover:bg-blue-600/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2 mb-2">
                  {event.icon || <Activity className="h-4 w-4 text-blue-500" />}
                  <span className="font-mono text-sm font-semibold text-gray-200">
                    {event.name}
                  </span>
                </div>
                {event.description && (
                  <p className="text-xs text-gray-400">
                    {event.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Logs */}
      {showLogs && logs.length > 0 && (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50">
          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-500" />
              <h4 className="font-mono text-sm font-medium text-blue-500">Event History</h4>
              <Badge variant="outline" className="font-mono text-xs">
                {logs.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="h-7 gap-1 font-mono text-xs"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </Button>
          </div>
          
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef} data-scroll-area-viewport>
            <div className="space-y-3">
              {logs.map((log) => (
                <div 
                  key={log.id}
                  className={`rounded-lg border p-4 ${
                    log.success 
                      ? 'border-green-500/20' 
                      : 'border-red-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {log.success ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-mono text-sm font-semibold text-gray-200">
                        {log.event}
                      </span>
                      <Badge 
                        variant={log.type === "server" ? "default" : "outline"}
                        className="font-mono text-xs"
                      >
                        {log.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="rounded bg-gray-950 p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Server className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-mono text-blue-500">Server-Side</span>
                        <Badge variant="outline" className="text-xs font-mono ml-auto">
                          {log.duration?.toFixed(0)}ms
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-xs font-mono text-blue-500 hover:text-green-500 transition-colors">
                      View Payload ▼
                    </summary>
                    <div className="mt-2 relative">
                      <button
                        onClick={() => copyPayload(log.payload)}
                        className="absolute top-2 right-2 rounded bg-gray-950 hover:bg-gray-800 transition-colors p-1"
                      >
                        <Copy className="h-3 w-3 text-gray-400" />
                      </button>
                      <pre className="text-xs font-mono text-green-500 bg-gray-950 rounded p-3 pr-10 overflow-x-auto max-h-48">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

    </div>
  )
}
