'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Server, 
  AlertTriangle,
  Copy,
  Code,
  Clock,
  Zap,
  Bug,
  Info,
  ChevronDown,
  ChevronUp,
  X,
  Shuffle,
  Terminal,
  Activity
} from 'lucide-react'

// GA4 Standard Events
const SUPPORTED_EVENTS = [
  'page_view',
  'search',
  'sign_up',
  'login',
  'add_to_cart',
  'view_item',
  'begin_checkout',
  'purchase',
  'generate_lead',
  'view_item_list',
  'add_to_wishlist',
  'remove_from_cart',
  'select_item',
  'view_cart',
  'add_payment_info',
  'add_shipping_info',
  'refund',
]

interface ApiResponse {
  ok: boolean
  data?: any
  sanitizedPayload?: any
  error?: string
  metadata?: any
  validationErrors?: ValidationError[]
}

interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning' | 'info'
  suggestion?: string
}

interface RequestDetails {
  url: string
  method: string
  headers: Record<string, string>
  body: any
  timestamp: string
}

interface ResponseDetails {
  status: number
  statusText: string
  headers: Record<string, string>
  body: any
  responseTime: number
  timestamp: string
}

export default function PlaygroundPage() {
  const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  
  const [isConfigured, setIsConfigured] = React.useState(false)
  const [mode, setMode] = React.useState<'broken' | 'fixed' | 'test'>('broken')
  const [testEventCode, setTestEventCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastResponse, setLastResponse] = React.useState<ApiResponse | null>(null)
  const [lastTestTime, setLastTestTime] = React.useState<string | null>(null)
  const [eventId, setEventId] = React.useState('')
  const [eventName, setEventName] = React.useState('page_view')
  
  // Event parameters (GA4-specific)
  const [eventParams, setEventParams] = React.useState({
    page_location: '',
    page_title: '',
    page_referrer: '',
    currency: '',
    value: '',
    transaction_id: '',
    items: '',
    search_term: '',
    method: '',
    engagement_time_msec: '',
  })

  // User properties (optional in GA4)
  const [userProperties, setUserProperties] = React.useState({
    user_id: '',
    custom_user_property: '',
  })

  // Request/Response tracking
  const [requestDetails, setRequestDetails] = React.useState<RequestDetails | null>(null)
  const [responseDetails, setResponseDetails] = React.useState<ResponseDetails | null>(null)
  const [validationErrors, setValidationErrors] = React.useState<ValidationError[]>([])

  // UI state
  const [previewExpanded, setPreviewExpanded] = React.useState(true)
  const [requestExpanded, setRequestExpanded] = React.useState(true)
  const [responseExpanded, setResponseExpanded] = React.useState(true)
  const [debugExpanded, setDebugExpanded] = React.useState(true)
  const [previewJson, setPreviewJson] = React.useState('')

  const checkConfiguration = React.useCallback(async () => {
    try {
      const response = await fetch('/api/ga4/send')
      const data = await response.json()
      setIsConfigured(data.configured)
    } catch (error) {
      setIsConfigured(false)
    }
  }, [])

  const validateForm = useCallback(() => {
    const errors: ValidationError[] = []

    // Validate event name
    if (!SUPPORTED_EVENTS.includes(eventName)) {
      errors.push({
        field: 'event_name',
        message: `Invalid event_name "${eventName}". Expected one of the standard GA4 events`,
        severity: 'error',
        suggestion: 'Select a valid event from the dropdown above',
      })
    }

    // Validate event ID format (should be UUID or unique string)
    if (eventId && eventId.length < 8) {
      errors.push({
        field: 'event_id',
        message: 'event_id should be at least 8 characters long for reliable deduplication',
        severity: 'warning',
        suggestion: 'Use a longer unique identifier (UUID recommended)',
      })
    }

    // Validate event-specific parameters
    if (eventName === 'purchase') {
      if (!eventParams.currency) {
        errors.push({
          field: 'currency',
          message: 'currency is required for purchase events',
          severity: 'error',
          suggestion: 'Add a currency code (e.g., USD, EUR)',
        })
      }
      if (!eventParams.value) {
        errors.push({
          field: 'value',
          message: 'value is required for purchase events',
          severity: 'error',
          suggestion: 'Add the purchase value (e.g., 99.99)',
        })
      }
      if (!eventParams.transaction_id) {
        errors.push({
          field: 'transaction_id',
          message: 'transaction_id is required for purchase events',
          severity: 'error',
          suggestion: 'Add a unique transaction ID',
        })
      }
    }

    if (eventName === 'search' && !eventParams.search_term) {
      errors.push({
        field: 'search_term',
        message: 'search_term is recommended for search events',
        severity: 'warning',
        suggestion: 'Add the search query string',
      })
    }

    // Warn about broken mode
    if (mode === 'broken') {
      errors.push({
        field: 'mode',
        message: 'Broken mode sends malformed data to demonstrate validation failures',
        severity: 'info',
        suggestion: 'Switch to Fixed mode for proper implementation',
      })
    }

    // Validate test event code when in test mode
    if (mode === 'test' && !testEventCode) {
      errors.push({
        field: 'test_event_code',
        message: 'Test event code is recommended in Test mode for DebugView',
        severity: 'warning',
        suggestion: 'Add a test event code to see events in GA4 DebugView',
      })
    }

    setValidationErrors(errors)
  }, [eventName, eventParams, eventId, mode, testEventCode])

  const buildRequestBody = React.useCallback(() => {
    const body: any = {
      event_name: eventName,
      mode,
    }

    if (eventId) {
      body.event_id = eventId
    }

    // Add test_event_code when in test mode
    if (mode === 'test' && testEventCode) {
      body.test_event_code = testEventCode
    }

    // Add user properties if user_id is filled
    if (userProperties.user_id) {
      body.user_id = userProperties.user_id
    }

    // Add event parameters
    const parameters: any = {}
    Object.keys(eventParams).forEach(key => {
      const value = eventParams[key as keyof typeof eventParams]
      if (value) {
        // Convert numeric fields
        if (key === 'value' || key === 'engagement_time_msec') {
          parameters[key] = parseFloat(value) || 0
        } else if (key === 'items') {
          try {
            parameters[key] = JSON.parse(value)
          } catch {
            parameters[key] = value
          }
        } else {
          parameters[key] = value
        }
      }
    })

    if (Object.keys(parameters).length > 0) {
      body.parameters = parameters
    }

    return body
  }, [eventName, mode, eventId, testEventCode, userProperties, eventParams])

  const sendTestEvent = async () => {
    setIsLoading(true)
    setLastResponse(null)
    setRequestDetails(null)
    setResponseDetails(null)

    const startTime = Date.now()

    try {
      const requestBody = buildRequestBody()
      
      const requestDetails: RequestDetails = {
        url: '/api/ga4/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
        timestamp: new Date().toLocaleString(),
      }

      const response = await fetch('/api/ga4/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseTime = Date.now() - startTime
      const data: ApiResponse = await response.json()

      const responseDetails: ResponseDetails = {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'content-type': response.headers.get('content-type') || 'application/json',
        },
        body: data,
        responseTime,
        timestamp: new Date().toLocaleString(),
      }

      setRequestDetails(requestDetails)
      setResponseDetails(responseDetails)
      setLastResponse(data)
      setLastTestTime(new Date().toLocaleTimeString())

      if (data.ok) {
        toast.success('GA4 Event Sent Successfully', {
          description: `Event "${eventName}" accepted by GA4 Measurement Protocol`,
        })
      } else {
        toast.error('Failed to Send Event', {
          description: data.error || 'Unknown error',
        })
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      const errorResponse: ApiResponse = {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }

      const responseDetails: ResponseDetails = {
        status: 0,
        statusText: 'Network Error',
        headers: {},
        body: errorResponse,
        responseTime,
        timestamp: new Date().toLocaleString(),
      }

      setResponseDetails(responseDetails)
      setLastResponse(errorResponse)

      toast.error('Failed to Send Event', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearResponse = () => {
    setLastResponse(null)
    setLastTestTime(null)
    setRequestDetails(null)
    setResponseDetails(null)
    toast.info('Response cleared')
  }

  // Random data generation
  const generateRandomEventId = () => {
    if (mode === 'fixed' || mode === 'test') {
      // Generate valid UUID
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    } else {
      // Broken mode: short invalid IDs
      const brokenIds = ['123', 'evt', '', 'null', 'undefined']
      return brokenIds[Math.floor(Math.random() * brokenIds.length)]
    }
  }

  const generateRandomEventParams = () => {
    if (mode === 'fixed' || mode === 'test') {
      const currencies = ['USD', 'EUR', 'GBP', 'CAD']
      return {
        page_location: `${SITE_URL}/products/item-${Math.floor(Math.random() * 1000)}`,
        page_title: 'Product Page',
        page_referrer: `${SITE_URL}/search`,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        value: (Math.random() * 1000 + 10).toFixed(2),
        transaction_id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        items: JSON.stringify([{
          item_id: `item_${Math.floor(Math.random() * 1000)}`,
          item_name: 'Product Name',
          price: 99.99,
          quantity: 1
        }]),
        search_term: 'blue widgets',
        method: 'Google',
        engagement_time_msec: '1500',
      }
    } else {
      // Broken mode: malformed data
      const brokenData: any = {}
      const issues = [
        () => ({ ...brokenData, currency: 'INVALID_CURR' }),
        () => ({ ...brokenData, value: 'not-a-number' }),
        () => ({ ...brokenData, items: 'not-json' }),
        () => ({ ...brokenData, page_location: '' }),
        () => ({ ...brokenData }),
      ]
      const randomIssue = issues[Math.floor(Math.random() * issues.length)]
      return randomIssue()
    }
  }

  const handleGenerateEventId = () => {
    setEventId(generateRandomEventId())
    toast.success('Event ID generated', {
      description: mode === 'broken' ? 'Invalid ID for testing' : 'Valid UUID generated',
    })
  }

  const handleGenerateEventParams = () => {
    const newParams = generateRandomEventParams()
    setEventParams({
      page_location: newParams.page_location || '',
      page_title: newParams.page_title || '',
      page_referrer: newParams.page_referrer || '',
      currency: newParams.currency || '',
      value: newParams.value || '',
      transaction_id: newParams.transaction_id || '',
      items: newParams.items || '',
      search_term: newParams.search_term || '',
      method: newParams.method || '',
      engagement_time_msec: newParams.engagement_time_msec || '',
    })
    toast.success('Event parameters filled', {
      description: mode === 'broken' ? 'Invalid data generated for testing' : 'Valid parameters generated',
    })
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const updatePreview = useCallback(() => {
    const requestBody = buildRequestBody()
    const transformedPayload: any = {
      client_id: `${Date.now()}.${Math.random().toString().slice(2, 11)}`,
      events: [{
        name: requestBody.event_name,
        params: {
          ...requestBody.parameters,
          engagement_time_msec: requestBody.parameters?.engagement_time_msec || 100,
        }
      }],
      timestamp_micros: Date.now() * 1000,
    }

    if (requestBody.user_id) {
      transformedPayload.user_id = requestBody.user_id
    }

    setPreviewJson(JSON.stringify(transformedPayload, null, 2))
  }, [buildRequestBody])

  // Check configuration on mount
  React.useEffect(() => {
    checkConfiguration()
    updatePreview()
  }, [checkConfiguration, updatePreview])

  // Validate form in real-time
  React.useEffect(() => {
    validateForm()
  }, [validateForm])

  // Update JSON preview in real-time
  React.useEffect(() => {
    updatePreview()
  }, [updatePreview])

  return (
    <div className="container max-w-6xl py-8 px-4 md:px-6">
      
      {/* Hero Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/30 pulse-glow">
            <Terminal className="h-6 w-6 text-[#FF6D00]" />
          </div>
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-shimmer">GA4 Test Lab</h1>
        </div>
        <p className="text-base text-[#8b949e] leading-relaxed">
          Test Google Analytics 4 Measurement Protocol with comprehensive debugging and real-time validation
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Configuration Status Card */}
        <div className="glass-strong hover-border-glow rounded-xl p-6 border border-[#FF6D00]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${isConfigured ? 'bg-[#34A853]/10' : 'bg-[#EA4335]/10'} transition-colors`}>
                {isConfigured ? (
                  <CheckCircle2 className="h-5 w-5 text-[#34A853] icon-spin-hover" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-[#EA4335] icon-spin-hover" />
                )}
              </div>
              <div>
                <h3 className="font-mono font-semibold text-[#e8f4f8]">GA4 Configuration</h3>
                <p className="text-sm text-[#8b949e] mt-1">
                  {isConfigured
                    ? 'GA4 Measurement Protocol is properly configured and ready'
                    : 'GA4 is not configured. Please check your environment variables.'}
                </p>
              </div>
            </div>
            <Badge 
              variant={isConfigured ? 'default' : 'destructive'}
              className="font-mono"
            >
              {isConfigured ? 'READY' : 'NOT CONFIGURED'}
            </Badge>
          </div>

          {!isConfigured && (
            <div className="mt-4 glass rounded-lg p-3 border border-[#FBBC04]/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-[#FBBC04] mt-0.5" />
                <div className="text-sm">
                  <p className="font-mono font-medium text-[#FBBC04]">Configuration Required</p>
                  <p className="text-[#8b949e] mt-1">
                    Set the following environment variables in .env.local:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF6D00] font-mono">›</span>
                      <code className="font-mono text-xs text-[#FF6D00]">NEXT_PUBLIC_GA4_MEASUREMENT_ID</code>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF6D00] font-mono">›</span>
                      <code className="font-mono text-xs text-[#FF6D00]">GA4_API_SECRET</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mode Selection Card */}
        <div className="glass-strong hover-glow rounded-xl p-6 border border-[#FF6D00]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="mb-4">
            <h3 className="font-mono font-semibold flex items-center gap-2 text-[#e8f4f8] text-glow-hover">
              <Activity className="h-4 w-4 text-[#FF6D00]" />
              Event Mode
            </h3>
            <p className="text-sm text-[#8b949e] mt-1">
              Choose between broken (demonstrating issues), fixed (best practices), and test (GA4 DebugView) modes
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={mode === 'broken' ? 'destructive' : 'outline'}
              onClick={() => setMode('broken')}
              className="w-full font-mono"
              disabled={isLoading}
            >
              BROKEN
            </Button>
            <Button
              variant={mode === 'fixed' ? 'default' : 'outline'}
              onClick={() => setMode('fixed')}
              className="w-full font-mono"
              disabled={isLoading}
            >
              FIXED
            </Button>
            <Button
              variant={mode === 'test' ? 'secondary' : 'outline'}
              onClick={() => setMode('test')}
              className="w-full font-mono"
              disabled={isLoading}
            >
              TEST
            </Button>
          </div>
          <div className={`mt-4 glass rounded-lg p-3 border ${
            mode === 'broken'
              ? 'border-[#EA4335]/20'
              : mode === 'test'
              ? 'border-[#4285F4]/20'
              : 'border-[#34A853]/20'
          }`}>
            <div className="flex items-start gap-2">
              {mode === 'broken' ? (
                <AlertTriangle className="h-4 w-4 text-[#EA4335] mt-0.5" />
              ) : mode === 'test' ? (
                <Info className="h-4 w-4 text-[#4285F4] mt-0.5" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-[#34A853] mt-0.5" />
              )}
              <div className="text-sm">
                <p className={`font-mono font-medium ${
                  mode === 'broken' ? 'text-[#EA4335]'
                  : mode === 'test' ? 'text-[#4285F4]'
                  : 'text-[#34A853]'
                }`}>
                  {mode === 'broken' ? 'Broken Mode Warning' : mode === 'test' ? 'Test Mode Active' : 'Fixed Mode Active'}
                </p>
                <p className="text-[#8b949e] mt-1">
                  {mode === 'broken'
                    ? 'This mode sends malformed data to demonstrate validation failures. Use for testing error handling only.'
                    : mode === 'test'
                    ? 'This mode sends events to GA4 DebugView. Events will appear in real-time for testing.'
                    : 'This mode sends properly formatted events following GA4 best practices.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Configuration Card */}
        <div className="glass hover-lift rounded-xl p-6 border border-[#FF6D00]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="mb-4">
            <h3 className="font-mono font-semibold text-[#e8f4f8] text-glow-hover">Event Configuration</h3>
            <p className="text-sm text-[#8b949e] mt-1">
              Configure the event details to send to GA4
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-mono font-medium mb-1.5 block text-[#e8f4f8]">
                Event Name <span className="text-[#EA4335]">*</span>
              </label>
              <select
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-[#FF6D00]/20 rounded-md bg-[#0d1117] text-[#e8f4f8] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6D00] focus:border-[#FF6D00] font-mono"
              >
                {SUPPORTED_EVENTS.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
              <p className="text-xs text-[#8b949e] mt-1">
                Select from GA4's standard event types
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-mono font-medium text-[#e8f4f8]">
                  Event ID (Optional)
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateEventId}
                  disabled={isLoading}
                  className="h-7 gap-1 font-mono"
                >
                  <Shuffle className="h-3 w-3 icon-spin-hover" />
                  Generate
                </Button>
              </div>
              <Input
                type="text"
                placeholder="e.g., evt_1234567890"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                disabled={isLoading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#8b949e] mt-1">
                Unique ID for event deduplication. Leave blank for auto-generation.
              </p>
            </div>
          </div>
        </div>

        {/* Test Event Code Card - Only visible in Test mode */}
        {mode === 'test' && (
          <div className="glass hover-glow rounded-xl p-6 border border-[#4285F4]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4">
              <h3 className="font-mono font-semibold text-[#4285F4] text-glow-hover">Test Event Code</h3>
              <p className="text-sm text-[#8b949e] mt-1">
                Enter a test event code to see events in GA4 DebugView (optional but recommended)
              </p>
            </div>
            <div>
              <Input
                type="text"
                placeholder="e.g., test_12345"
                value={testEventCode}
                onChange={(e) => setTestEventCode(e.target.value)}
                disabled={isLoading}
                className="font-mono"
              />
              <p className="text-xs text-[#8b949e] mt-1">
                Optional. Get this from Admin → DebugView in GA4
              </p>
            </div>
          </div>
        )}

        {/* User Properties Card */}
        <div className="glass hover-lift rounded-xl p-6 border border-[#FF6D00]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[400ms]">
          <div className="mb-4">
            <h3 className="font-mono font-semibold text-[#e8f4f8] text-glow-hover">User Properties (Optional)</h3>
            <p className="text-sm text-[#8b949e] mt-1">
              Add user identifiers and custom properties
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">User ID</label>
              <Input
                type="text"
                placeholder="user_12345"
                value={userProperties.user_id}
                onChange={(e) => setUserProperties({ ...userProperties, user_id: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#8b949e] mt-1">Your internal user identifier</p>
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Custom Property</label>
              <Input
                type="text"
                placeholder="premium_user"
                value={userProperties.custom_user_property}
                onChange={(e) => setUserProperties({ ...userProperties, custom_user_property: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#8b949e] mt-1">Any custom user attribute</p>
            </div>
          </div>
        </div>

        {/* Event Parameters Card */}
        <div className="glass hover-lift rounded-xl p-6 border border-[#FF6D00]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-mono font-semibold text-[#e8f4f8] text-glow-hover">Event Parameters (Optional)</h3>
              <p className="text-sm text-[#8b949e] mt-1">
                Add event-specific parameters. Required fields vary by event type.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateEventParams}
              disabled={isLoading}
              className="h-8 gap-1 font-mono"
            >
              <Shuffle className="h-3 w-3 icon-spin-hover" />
              Fill Data
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Page Location</label>
              <Input
                type="text"
                placeholder="https://example.com/page"
                value={eventParams.page_location}
                onChange={(e) => setEventParams({ ...eventParams, page_location: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Page Title</label>
              <Input
                type="text"
                placeholder="Page Title"
                value={eventParams.page_title}
                onChange={(e) => setEventParams({ ...eventParams, page_title: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">
                Currency {eventName === 'purchase' && <span className="text-[#EA4335]">*</span>}
              </label>
              <Input
                type="text"
                placeholder="USD"
                value={eventParams.currency}
                onChange={(e) => setEventParams({ ...eventParams, currency: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">
                Value {eventName === 'purchase' && <span className="text-[#EA4335]">*</span>}
              </label>
              <Input
                type="number"
                placeholder="99.99"
                value={eventParams.value}
                onChange={(e) => setEventParams({ ...eventParams, value: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">
                Transaction ID {eventName === 'purchase' && <span className="text-[#EA4335]">*</span>}
              </label>
              <Input
                type="text"
                placeholder="T_12345"
                value={eventParams.transaction_id}
                onChange={(e) => setEventParams({ ...eventParams, transaction_id: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Search Term</label>
              <Input
                type="text"
                placeholder="blue widgets"
                value={eventParams.search_term}
                onChange={(e) => setEventParams({ ...eventParams, search_term: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Method</label>
              <Input
                type="text"
                placeholder="Google"
                value={eventParams.method}
                onChange={(e) => setEventParams({ ...eventParams, method: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Engagement Time (ms)</label>
              <Input
                type="number"
                placeholder="1500"
                value={eventParams.engagement_time_msec}
                onChange={(e) => setEventParams({ ...eventParams, engagement_time_msec: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-mono font-medium mb-1 block text-[#8b949e]">Items (JSON Array)</label>
              <Input
                type="text"
                placeholder='[{"item_id": "123", "item_name": "Widget", "price": 99.99}]'
                value={eventParams.items}
                onChange={(e) => setEventParams({ ...eventParams, items: e.target.value })}
                disabled={isLoading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#8b949e] mt-1">JSON array of item objects for e-commerce events</p>
            </div>
          </div>
        </div>

        {/* Real-time JSON Preview */}
        <div className="glass-strong hover-border-glow rounded-xl p-6 border border-[#4285F4]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[600ms]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-[#4285F4] icon-spin-hover" />
              <h3 className="font-mono font-semibold text-[#4285F4] text-glow-hover">Real-time JSON Preview</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewExpanded(!previewExpanded)}
              className="h-8 font-mono"
            >
              {previewExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          {previewExpanded && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(previewJson, 'Request JSON')}
                className="absolute top-2 right-2 h-8 gap-1 z-10 font-mono"
              >
                <Copy className="h-3 w-3" />
                Copy
              </Button>
              <ScrollArea className="h-64 rounded-md border border-[#FF6D00]/20 bg-[#0d1117] p-3">
                <pre className="text-xs font-mono text-[#FF6D00] whitespace-pre-wrap">
                  {previewJson}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className={`glass hover-glow rounded-xl p-6 border ${validationErrors.some(e => e.severity === 'error') ? 'border-[#EA4335]/20' : 'border-[#FBBC04]/20'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 icon-spin-hover" />
                <h3 className="font-mono font-semibold text-[#e8f4f8]">Validation Results</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDebugExpanded(!debugExpanded)}
                className="h-8 font-mono"
              >
                {debugExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            {debugExpanded && (
              <div className="space-y-3">
                {validationErrors.map((error, index) => (
                  <div
                    key={index}
                    className={`glass rounded-lg p-3 border ${
                      error.severity === 'error' ? 'border-[#EA4335]/20' :
                      error.severity === 'warning' ? 'border-[#FBBC04]/20' :
                      'border-[#4285F4]/20'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {error.severity === 'error' ? (
                        <X className="h-4 w-4 text-[#EA4335] mt-0.5 flex-shrink-0" />
                      ) : error.severity === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-[#FBBC04] mt-0.5 flex-shrink-0" />
                      ) : (
                        <Info className="h-4 w-4 text-[#4285F4] mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-medium text-[#e8f4f8]">{error.field}</span>
                          <Badge variant={error.severity === 'error' ? 'destructive' : error.severity === 'warning' ? 'default' : 'secondary'} className="text-xs font-mono">
                            {error.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#8b949e] mt-1">{error.message}</p>
                        {error.suggestion && (
                          <p className="text-xs text-[#8b949e] mt-1">
                            <span className="font-mono font-medium text-[#FF6D00]">Suggestion:</span> {error.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions Card */}
        <div className="border-gradient animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
          <div className="border-gradient-content glass-strong p-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <button
                onClick={sendTestEvent}
                disabled={!isConfigured || isLoading}
                className="button-neon rounded-xl px-8 py-4 flex items-center gap-3 w-full sm:w-auto group"
              >
                <Send className="h-5 w-5" />
                <span className="font-mono font-semibold">Send Test Event</span>
                {isLoading && <Activity className="h-4 w-4 animate-spin" />}
              </button>
              {lastTestTime && (
                <div className="flex items-center gap-2 text-sm text-[#8b949e] font-mono">
                  <Clock className="h-4 w-4 text-[#4285F4]" />
                  Last test: <span className="text-[#FF6D00]">{lastTestTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request/Response Display */}
        {(requestDetails || responseDetails) && (
          <div className="glass-strong hover-glow rounded-xl p-6 border border-[#FF6D00]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono font-semibold text-[#e8f4f8] text-glow-hover">Request & Response Details</h3>
              <Button
                onClick={clearResponse}
                variant="outline"
                size="sm"
                className="h-8 font-mono"
              >
                Clear
              </Button>
            </div>
            
            <Tabs defaultValue="request" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="request" className="font-mono">Request</TabsTrigger>
                <TabsTrigger value="response" className="font-mono">Response</TabsTrigger>
              </TabsList>
              
              <TabsContent value="request" className="mt-4">
                {requestDetails && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#8b949e] font-mono">Method:</span>{' '}
                        <Badge variant="outline" className="font-mono">{requestDetails.method}</Badge>
                      </div>
                      <div>
                        <span className="text-[#8b949e] font-mono">URL:</span>{' '}
                        <code className="text-xs bg-[#0d1117] text-[#FF6D00] px-1.5 py-0.5 rounded font-mono">{requestDetails.url}</code>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#8b949e] font-mono">Timestamp:</span>{' '}
                        <span className="text-xs text-[#4285F4] font-mono">{requestDetails.timestamp}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-mono font-medium text-[#e8f4f8]">Headers</h4>
                      </div>
                      <ScrollArea className="h-24 rounded-md border border-[#FF6D00]/20 bg-[#0d1117] p-3">
                        <pre className="text-xs font-mono text-[#FF6D00]">
                          {JSON.stringify(requestDetails.headers, null, 2)}
                        </pre>
                      </ScrollArea>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-mono font-medium text-[#e8f4f8]">Body</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(requestDetails.body, null, 2), 'Request Body')}
                          className="h-7 gap-1 font-mono"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                      </div>
                      <ScrollArea className="h-64 rounded-md border border-[#FF6D00]/20 bg-[#0d1117] p-3">
                        <pre className="text-xs font-mono text-[#FF6D00] whitespace-pre-wrap">
                          {JSON.stringify(requestDetails.body, null, 2)}
                        </pre>
                      </ScrollArea>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="response" className="mt-4">
                {responseDetails && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#8b949e] font-mono">Status:</span>{' '}
                        <Badge variant={responseDetails.status >= 200 && responseDetails.status < 300 ? 'default' : 'destructive'} className="font-mono">
                          {responseDetails.status} {responseDetails.statusText}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-[#8b949e] font-mono">Response Time:</span>{' '}
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-[#FBBC04]" />
                          <span className="text-[#FF6D00] font-mono">{responseDetails.responseTime}ms</span>
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#8b949e] font-mono">Timestamp:</span>{' '}
                        <span className="text-xs text-[#4285F4] font-mono">{responseDetails.timestamp}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-mono font-medium text-[#e8f4f8]">Headers</h4>
                      </div>
                      <ScrollArea className="h-24 rounded-md border border-[#FF6D00]/20 bg-[#0d1117] p-3">
                        <pre className="text-xs font-mono text-[#FF6D00]">
                          {JSON.stringify(responseDetails.headers, null, 2)}
                        </pre>
                      </ScrollArea>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-mono font-medium text-[#e8f4f8]">Body</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(responseDetails.body, null, 2), 'Response Body')}
                          className="h-7 gap-1 font-mono"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                      </div>
                      <ScrollArea className="h-64 rounded-md border border-[#FF6D00]/20 bg-[#0d1117] p-3">
                        <pre className="text-xs font-mono text-[#FF6D00] whitespace-pre-wrap">
                          {JSON.stringify(responseDetails.body, null, 2)}
                        </pre>
                      </ScrollArea>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Instructions Card */}
        <div className="glass hover-glow rounded-xl p-6 border border-[#4285F4]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[800ms]">
          <h3 className="font-mono font-semibold mb-4 flex items-center gap-2 text-[#4285F4] text-glow-hover">
            <ExternalLink className="h-4 w-4" />
            How to Verify in GA4
          </h3>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6D00]/20 border border-[#FF6D00]/30 text-[#FF6D00] flex items-center justify-center text-xs font-mono font-bold">
                1
              </span>
              <div>
                <p className="font-mono font-medium text-[#e8f4f8]">Open Google Analytics 4</p>
                <p className="text-[#8b949e]">
                  Go to{' '}
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4285F4] hover:text-[#FF6D00] underline transition-colors"
                  >
                    analytics.google.com
                  </a>{' '}
                  and select your property
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6D00]/20 border border-[#FF6D00]/30 text-[#FF6D00] flex items-center justify-center text-xs font-mono font-bold">
                2
              </span>
              <div>
                <p className="font-mono font-medium text-[#e8f4f8]">Navigate to DebugView</p>
                <p className="text-[#8b949e]">
                  In Test mode: Admin → DebugView to see events in real-time
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6D00]/20 border border-[#FF6D00]/30 text-[#FF6D00] flex items-center justify-center text-xs font-mono font-bold">
                3
              </span>
              <div>
                <p className="font-mono font-medium text-[#e8f4f8]">Send a Test Event</p>
                <p className="text-[#8b949e]">
                  Click the <span className="rounded bg-[#0d1117] text-[#FF6D00] px-1.5 py-0.5 font-mono">Send Test Event</span> button above
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6D00]/20 border border-[#FF6D00]/30 text-[#FF6D00] flex items-center justify-center text-xs font-mono font-bold">
                4
              </span>
              <div>
                <p className="font-mono font-medium text-[#e8f4f8]">Verify Event Received</p>
                <p className="text-[#8b949e]">
                  Look for your event (e.g., <span className="rounded bg-[#0d1117] text-[#FF6D00] px-1.5 py-0.5 font-mono">{eventName}</span>) in the event stream
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
