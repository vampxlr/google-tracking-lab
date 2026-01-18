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
  Server,
  Eye,
  Edit,
  Send
} from "lucide-react"

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
  const [logs, setLogs] = React.useState<LogEntry[]>([])
  const [isSending, setIsSending] = React.useState(false)
  const [selectedEventName, setSelectedEventName] = React.useState<string>("")
  const [editableJson, setEditableJson] = React.useState<string>("")
  const [jsonError, setJsonError] = React.useState<string>("")
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

  // Handle event button click - just populate JSON editor
  const handleEventClick = (event: typeof events[0]) => {
    const payload = event.fixedPayload || {}
    setSelectedEventName(event.name)
    setEditableJson(JSON.stringify(payload, null, 2))
    setJsonError("")
    setRequestDetails(null)
    setResponseDetails(null)
  }

  // Validate and parse JSON
  const validateJson = (): any | null => {
    try {
      const parsed = JSON.parse(editableJson)
      setJsonError("")
      return parsed
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON")
      return null
    }
  }

  const sendToClient = async (eventName: string, payload: any, eventId: string) => {
    const startTime = performance.now()
    
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', eventName, payload)
        const duration = performance.now() - startTime
        return {
          success: true,
          duration,
          payload: { eventName, ...payload }
        }
      } else {
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
      mode: "fixed"
    }

    try {
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

  // Send the edited JSON
  const handleSendRequest = async () => {
    const payload = validateJson()
    if (!payload) {
      toast.error('Invalid JSON', {
        description: jsonError,
      })
      return
    }

    if (!selectedEventName) {
      toast.error('No event selected', {
        description: 'Please select an event first',
      })
      return
    }

    setIsSending(true)
    const timestamp = new Date().toLocaleTimeString()
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      let clientResult: any = null
      let serverResult: any = null
      
      // Send to Client-side
      clientResult = await sendToClient(selectedEventName, payload, eventId)
      
      // Send to Server-side
      if (sendToGA4) {
        serverResult = await sendToServer(selectedEventName, payload)
      }
      
      // Create log entry
      const newLog: LogEntry = {
        id: eventId,
        timestamp,
        event: selectedEventName,
        type: "server",
        payload,
        success: serverResult?.success || false,
        duration: serverResult?.duration,
        response: serverResult?.body
      }
      
      setLogs(prev => [...prev, newLog])
      
      // Show success/error toast
      if (serverResult?.success || clientResult?.success) {
        toast.success(`${selectedEventName} Event Sent Successfully`, {
          description: `Sent to Client & Server • ${Math.round(serverResult?.duration || clientResult?.duration)}ms`,
        })
      } else {
        toast.error(`${selectedEventName} Event Failed`, {
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

  const clearEditor = () => {
    setEditableJson("")
    setSelectedEventName("")
    setJsonError("")
    setRequestDetails(null)
    setResponseDetails(null)
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
                onClick={() => handleEventClick(event)}
                disabled={isSending}
                className={`rounded-lg border p-4 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedEventName === event.name
                    ? 'border-[#FF6D00] bg-[#FF6D00]/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-[#FF6D00]/50 hover:bg-[#FF6D00]/5'
                }`}
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

      {/* JSON Builder (Editable) */}
      {selectedEventName && (
        <div className="rounded-xl border border-[#4285F4]/20 bg-gray-900/50">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-[#4285F4]" />
                <h4 className="font-mono text-sm font-medium text-[#4285F4]">JSON Builder</h4>
                <Badge variant="outline" className="font-mono text-xs border-[#FF6D00]/30 text-[#FF6D00]">
                  {selectedEventName}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.parse(editableJson || "{}"))}
                  className="h-7 gap-1 font-mono text-xs"
                  disabled={!!jsonError || !editableJson}
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearEditor}
                  className="h-7 gap-1 font-mono text-xs"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-[#8b949e]">
              Edit the JSON below to customize the event parameters. Click "Send Request" when ready.
            </p>
            
            <div className="relative">
              <textarea
                value={editableJson}
                onChange={(e) => {
                  setEditableJson(e.target.value)
                  setJsonError("")
                }}
                onBlur={validateJson}
                className={`w-full font-mono text-xs bg-gray-950 rounded-lg p-4 border resize-y min-h-[200px] ${
                  jsonError 
                    ? 'border-[#EA4335]/50 text-[#EA4335] focus:border-[#EA4335] focus:ring-[#EA4335]/20' 
                    : 'border-[#34A853]/20 text-[#34A853] focus:border-[#34A853] focus:ring-[#34A853]/20'
                } focus:outline-none focus:ring-2`}
                placeholder='{\n  "key": "value"\n}'
                spellCheck={false}
              />
              {jsonError && (
                <div className="mt-2 flex items-start gap-2 text-xs text-[#EA4335]">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{jsonError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleSendRequest}
                disabled={isSending || !!jsonError || !editableJson}
                className="bg-[#FF6D00]/20 text-[#FF6D00] border-[#FF6D00]/50 hover:bg-[#FF6D00]/30 font-mono text-sm"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : 'Send Request'}
              </Button>
              {isSending && (
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#FF6D00] border-t-transparent"></div>
                  <span>Sending event...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Network Inspector */}
      {(requestDetails || responseDetails) && (
        <div className="rounded-xl border border-[#4285F4]/20 bg-gray-900/50">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#4285F4]" />
              <h4 className="font-mono text-sm font-medium text-[#4285F4]">Network Inspector</h4>
            </div>
          </div>

          <Tabs defaultValue="request" className="w-full">
            <div className="border-b border-gray-800 px-4">
              <TabsList className="bg-transparent h-auto p-0 space-x-4">
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
                    <pre className="text-xs font-mono text-[#8b949e] bg-gray-950 rounded-lg p-3 border border-gray-700 break-all whitespace-pre-wrap">
                      {JSON.stringify(requestDetails.headers, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="font-mono text-xs font-medium text-[#e8f4f8] mb-2">Body</div>
                    <pre className="text-xs font-mono text-[#34A853] bg-gray-950 rounded-lg p-3 border border-[#34A853]/20 break-all whitespace-pre-wrap">
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
                    <pre className={`text-xs font-mono bg-gray-950 rounded-lg p-3 border break-all whitespace-pre-wrap ${
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
                      <pre className="text-xs font-mono text-[#34A853] bg-gray-950 rounded p-3 pr-10 border border-[#34A853]/20 break-all whitespace-pre-wrap">
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
                        <pre className={`text-xs font-mono bg-gray-950 rounded p-3 pr-10 border break-all whitespace-pre-wrap ${
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
