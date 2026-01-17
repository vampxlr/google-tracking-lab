"use client"

import { PageContent } from "@/components/page-content"
import { 
  Shield, 
  CheckCircle2,
  AlertTriangle,
  Zap,
  Code,
  Activity,
  Lock,
  TrendingUp
} from "lucide-react"

export default function MPBestPracticesPage() {
  return (
    <PageContent
      title="Best Practices"
      description="Follow these best practices for reliable, accurate, and production-ready server-side tracking with Measurement Protocol."
      status="Stable"
    >
      
      {/* Security */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#EA4335]/10 border border-[#EA4335]/30 pulse-glow">
              <Lock className="h-6 w-6 text-[#EA4335]" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Security & Privacy
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#EA4335]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#EA4335]" />
                <span className="font-mono font-semibold text-[#EA4335]">Secure API Secret</span>
              </div>
              <p className="text-sm text-[#8b949e] mb-2">
                Never expose your API secret in client-side code or public repositories
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Store in environment variables</li>
                <li>• Use secrets management (AWS Secrets, etc.)</li>
                <li>• Never commit to Git</li>
              </ul>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
                <span className="font-mono font-semibold text-[#FF6D00]">Respect User Privacy</span>
              </div>
              <p className="text-sm text-[#8b949e] mb-2">
                Only send events for users who have consented to tracking
              </p>
              <ul className="space-y-1 text-xs text-[#8b949e]">
                <li>• Check consent status before sending</li>
                <li>• Support opt-out requests</li>
                <li>• Follow GDPR/CCPA guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Performance & Reliability
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-[#FBBC04]" />
              <h3 className="font-mono text-xl font-semibold text-[#FBBC04]">Rate Limiting</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">
              Respect Google's rate limits to avoid throttling
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Max <span className="font-mono text-[#e8f4f8]">60,000 events/second</span> per property</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Implement exponential backoff for retries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Queue events if rate limit hit</span>
              </li>
            </ul>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-[#4285F4]" />
              <h3 className="font-mono text-xl font-semibold text-[#4285F4]">Batch Events</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">
              Send multiple events in a single request for efficiency
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Max <span className="font-mono text-[#e8f4f8]">25 events</span> per request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Reduces HTTP overhead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Better for high-volume scenarios</span>
              </li>
            </ul>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-mono text-xl font-semibold text-[#34A853]">Error Handling</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">
              Implement proper error handling and logging
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Log failed events for debugging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Retry on network failures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Monitor error rates</span>
              </li>
            </ul>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-[#ff006e]" />
              <h3 className="font-mono text-xl font-semibold text-[#ff006e]">Async Processing</h3>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">
              Don't block user requests waiting for GA4 response
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Send events asynchronously</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Use message queues (SQS, RabbitMQ)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6D00] mt-0.5">•</span>
                <span className="text-[#8b949e]">Process in background workers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="border-animated glass-strong rounded-2xl p-8 hover-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 pulse-glow">
              <TrendingUp className="h-6 w-6 text-[#4285F4]" />
            </div>
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Data Quality
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass hover-lift rounded-xl p-5 border border-[#4285F4]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#4285F4]" />
                <span className="font-mono font-semibold text-[#4285F4]">Validate Event Data</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Validate parameters before sending to prevent bad data
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#34A853]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#34A853]" />
                <span className="font-mono font-semibold text-[#34A853]">Use Consistent Naming</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Follow snake_case convention for all custom parameters
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#ff006e]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#ff006e]" />
                <span className="font-mono font-semibold text-[#ff006e]">Include Timestamps</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Add timestamp_micros for accurate event timing
              </p>
            </div>

            <div className="glass hover-lift rounded-xl p-5 border border-[#FF6D00]/20">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6D00]" />
                <span className="font-mono font-semibold text-[#FF6D00]">Test with Debug Mode</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Use test_event_code to verify events in DebugView
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="glass-strong rounded-2xl p-8 border border-[#FF6D00]/20">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-[#FF6D00]" />
            <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
              Production-Ready Example
            </h2>
          </div>

          <div className="code-block">
            <pre className="text-sm font-mono text-[#FF6D00] overflow-x-auto">
{`class GA4Client {
  constructor(measurementId, apiSecret) {
    this.measurementId = measurementId;
    this.apiSecret = apiSecret;
    this.queue = [];
  }

  async sendEvent(clientId, eventName, params) {
    try {
      // Validate input
      if (!clientId || !eventName) {
        throw new Error('Missing required fields');
      }

      const eventData = {
        client_id: clientId,
        events: [{
          name: eventName,
          params: {
            ...params,
            timestamp_micros: Date.now() * 1000
          }
        }]
      };

      const url = \`https://www.google-analytics.com/mp/collect?\` +
        \`measurement_id=\${this.measurementId}&api_secret=\${this.apiSecret}\`;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(eventData),
        timeout: 5000 // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(\`GA4 API error: \${response.status}\`);
      }

      return { success: true };
    } catch (error) {
      // Log error for monitoring
      console.error('GA4 event failed:', error);
      
      // Queue for retry
      this.queue.push({ clientId, eventName, params });
      
      return { success: false, error: error.message };
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
        <div className="glass-strong rounded-2xl p-6 border border-[#FBBC04]/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-[#FBBC04] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono font-bold text-[#FBBC04] mb-3">Important Reminders</h3>
              <div className="space-y-2 text-sm text-[#8b949e]">
                <p>• Measurement Protocol has no SLA - events may be delayed or dropped</p>
                <p>• Events sent &gt;72 hours after occurrence may not be processed</p>
                <p>• Debug mode events don't affect your production data</p>
                <p>• Monitor your quota usage in GA4 admin to avoid throttling</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
