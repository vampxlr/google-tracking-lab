"use client"

import { PageContent } from "@/components/page-content"
import { EventPlayground } from "@/components/event-playground"
import { 
  ShoppingCart, 
  Globe, 
  Search, 
  LogIn, 
  ArrowRight,
  BookOpen,
  Heart,
  Code,
  Share2,
  Activity,
  Sparkles
} from "lucide-react"

export default function StandardEventsPage() {
  const standardEvents = [
    {
      name: "page_view",
      icon: <Globe className="h-4 w-4 text-blue-500" />,
      description: "User views a page",
      fixedPayload: {
        page_location: typeof window !== 'undefined' ? window.location.href : "https://example.com/page",
        page_title: typeof document !== 'undefined' ? document.title : "Test Page",
        page_referrer: typeof document !== 'undefined' ? document.referrer : ""
      }
    },
    {
      name: "session_start",
      icon: <Code className="h-4 w-4 text-green-500" />,
      description: "New session begins",
      fixedPayload: {
        engagement_time_msec: 100
      }
    },
    {
      name: "first_visit",
      icon: <Share2 className="h-4 w-4 text-purple-500" />,
      description: "First time visitor",
      fixedPayload: {}
    },
    {
      name: "user_engagement",
      icon: <Heart className="h-4 w-4 text-red-500" />,
      description: "User engages with content",
      fixedPayload: {
        engagement_time_msec: 5500,
        session_id: "session_12345"
      }
    },
    {
      name: "search",
      icon: <Search className="h-4 w-4 text-orange-500" />,
      description: "User searches on site",
      fixedPayload: {
        search_term: "blue widgets",
        engagement_time_msec: 2000
      }
    },
    {
      name: "generate_lead",
      icon: <Code className="h-4 w-4 text-cyan-500" />,
      description: "Lead generation event",
      fixedPayload: {
        currency: "USD",
        value: 50.00,
        lead_type: "form_submission",
        form_id: "contact_form"
      }
    },
    {
      name: "sign_up",
      icon: <LogIn className="h-4 w-4 text-pink-500" />,
      description: "User creates account",
      fixedPayload: {
        method: "email",
        value: 100,
        currency: "USD"
      }
    },
    {
      name: "login",
      icon: <LogIn className="h-4 w-4 text-yellow-500" />,
      description: "User logs in",
      fixedPayload: {
        method: "Google"
      }
    },
    {
      name: "add_to_cart",
      icon: <ShoppingCart className="h-4 w-4 text-indigo-500" />,
      description: "Item added to cart",
      fixedPayload: {
        currency: "USD",
        value: 99.99,
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            price: 99.99,
            quantity: 1
          }
        ]
      }
    },
    {
      name: "begin_checkout",
      icon: <ArrowRight className="h-4 w-4 text-teal-500" />,
      description: "Checkout process starts",
      fixedPayload: {
        currency: "USD",
        value: 99.99,
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            price: 99.99,
            quantity: 1
          }
        ]
      }
    },
    {
      name: "purchase",
      icon: <ShoppingCart className="h-4 w-4 text-emerald-500" />,
      description: "Purchase completed",
      fixedPayload: {
        transaction_id: "T_123456789",
        value: 149.99,
        currency: "USD",
        tax: 12.00,
        shipping: 5.00,
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            price: 99.99,
            quantity: 1
          }
        ]
      }
    },
    {
      name: "view_item",
      icon: <BookOpen className="h-4 w-4 text-sky-500" />,
      description: "Product page view",
      fixedPayload: {
        currency: "USD",
        value: 99.99,
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            price: 99.99,
            quantity: 1
          }
        ]
      }
    },
    {
      name: "view_item_list",
      icon: <ShoppingCart className="h-4 w-4 text-rose-500" />,
      description: "Product list view",
      fixedPayload: {
        item_list_id: "category_123",
        item_list_name: "Widgets",
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            item_list_id: "category_123",
            item_list_name: "Widgets",
            index: 0,
            price: 99.99,
            quantity: 1
          },
          {
            item_id: "124",
            item_name: "Red Widget",
            item_category: "Widgets",
            item_list_id: "category_123",
            item_list_name: "Widgets",
            index: 1,
            price: 89.99,
            quantity: 1
          }
        ]
      }
    },
    {
      name: "select_item",
      icon: <BookOpen className="h-4 w-4 text-amber-500" />,
      description: "Item selected from list",
      fixedPayload: {
        item_list_id: "category_123",
        item_list_name: "Widgets",
        items: [
          {
            item_id: "123",
            item_name: "Blue Widget",
            item_category: "Widgets",
            item_list_id: "category_123",
            item_list_name: "Widgets",
            index: 0,
            price: 99.99,
            quantity: 1
          }
        ]
      }
    }
  ]

  return (
    <PageContent
      title="GA4 Standard Events"
      description="Google Analytics 4 provides a set of standard events for common user interactions. Test each event to see its structure and parameters."
      status="Stable"
    >
      
      {/* Interactive Playground */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <EventPlayground
          title="Standard Events Testing"
          description="Test all GA4 standard events with real-time feedback"
          events={standardEvents}
          showModeToggle={false}
          showLogs={true}
          sendToGA4={true}
        />
      </div>

      {/* Event Categories */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-[#FF6D00] to-[#4285F4] rounded-full"></div>
          <h2 className="font-mono text-2xl font-bold text-[#e8f4f8]">
            Event Categories
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-[#4285F4] to-transparent rounded-full"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-[#4285F4]" />
              </div>
              <h4 className="font-mono text-xl font-semibold text-[#4285F4]">Engagement</h4>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">User interaction events</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#4285F4]">page_view</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#4285F4]">search</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#4285F4]">scroll</span>
              </div>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#34A853]/10 border border-[#34A853]/30 group-hover:scale-110 transition-transform">
                <ShoppingCart className="h-6 w-6 text-[#34A853]" />
              </div>
              <h4 className="font-mono text-xl font-semibold text-[#34A853]">E-Commerce</h4>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">Shopping & transaction events</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#34A853]">add_to_cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#34A853]">purchase</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#34A853]">begin_checkout</span>
              </div>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#ff006e]/10 border border-[#ff006e]/30 group-hover:scale-110 transition-transform">
                <LogIn className="h-6 w-6 text-[#ff006e]" />
              </div>
              <h4 className="font-mono text-xl font-semibold text-[#ff006e]">User Actions</h4>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">Account & session events</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#ff006e]">sign_up</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#ff006e]">login</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#ff006e]">logout</span>
              </div>
            </div>
          </div>

          <div className="border-animated glass-strong rounded-2xl p-6 hover-glow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-[#FF6D00]" />
              </div>
              <h4 className="font-mono text-xl font-semibold text-[#FF6D00]">System Events</h4>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">Automatic GA4 events</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#FF6D00]">session_start</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#FF6D00]">first_visit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6D00] font-mono">›</span>
                <span className="text-sm font-mono text-[#FF6D00]">user_engagement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageContent>
  )
}
