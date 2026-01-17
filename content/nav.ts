import { 
  FileText, 
  Globe, 
  Server, 
  Tag, 
  Layers, 
  Target, 
  Bug, 
  ShoppingCart,
  Zap,
  Settings,
  Activity
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: any
  group: string
  description?: string
}

export const navItems: NavItem[] = [
  // Overview
  {
    title: "Overview",
    href: "/",
    icon: FileText,
    group: "Getting Started",
    description: "Welcome to Google Tracking Lab"
  },
  {
    title: "Setup Guide",
    href: "/setup",
    icon: Settings,
    group: "Getting Started",
    description: "Step-by-step setup instructions"
  },

  // GA4 Client-Side
  {
    title: "Getting Started",
    href: "/ga4-client/getting-started",
    icon: Globe,
    group: "GA4 Client-Side",
    description: "GA4 fundamentals and setup"
  },
  {
    title: "Standard Events",
    href: "/ga4-client/standard-events",
    icon: Activity,
    group: "GA4 Client-Side",
    description: "All GA4 standard events"
  },
  {
    title: "Event Parameters",
    href: "/ga4-client/event-parameters",
    icon: Tag,
    group: "GA4 Client-Side",
    description: "Understanding event parameters"
  },
  {
    title: "Enhanced Conversions",
    href: "/ga4-client/enhanced-conversions",
    icon: Zap,
    group: "GA4 Client-Side",
    description: "User data hashing for better attribution"
  },
  {
    title: "Cross-Domain Tracking",
    href: "/ga4-client/cross-domain",
    icon: Layers,
    group: "GA4 Client-Side",
    description: "Track across multiple domains"
  },
  {
    title: "User-ID vs Client-ID",
    href: "/ga4-client/user-id-client-id",
    icon: Target,
    group: "GA4 Client-Side",
    description: "User identification methods"
  },

  // Measurement Protocol
  {
    title: "Getting Started",
    href: "/measurement-protocol/getting-started",
    icon: Server,
    group: "Measurement Protocol",
    description: "Server-side tracking basics"
  },
  {
    title: "Server-Side Events",
    href: "/measurement-protocol/server-events",
    icon: Activity,
    group: "Measurement Protocol",
    description: "Sending events from server"
  },
  {
    title: "Offline Events",
    href: "/measurement-protocol/offline-events",
    icon: Layers,
    group: "Measurement Protocol",
    description: "Track offline conversions"
  },
  {
    title: "Deduplication",
    href: "/measurement-protocol/deduplication",
    icon: Zap,
    group: "Measurement Protocol",
    description: "Avoid duplicate events"
  },
  {
    title: "Best Practices",
    href: "/measurement-protocol/best-practices",
    icon: Settings,
    group: "Measurement Protocol",
    description: "Server-side tracking guidelines"
  },

  // Google Tag Manager
  {
    title: "Fundamentals",
    href: "/gtm/fundamentals",
    icon: Tag,
    group: "Google Tag Manager",
    description: "GTM basics and setup"
  },
  {
    title: "Tags",
    href: "/gtm/tags",
    icon: Activity,
    group: "Google Tag Manager",
    description: "Understanding GTM tags"
  },
  {
    title: "Triggers",
    href: "/gtm/triggers",
    icon: Zap,
    group: "Google Tag Manager",
    description: "When tags fire"
  },
  {
    title: "Variables",
    href: "/gtm/variables",
    icon: Tag,
    group: "Google Tag Manager",
    description: "Dynamic values in GTM"
  },
  {
    title: "Data Layer",
    href: "/gtm/data-layer",
    icon: Layers,
    group: "Google Tag Manager",
    description: "Data layer fundamentals"
  },
  {
    title: "Workspaces & Versions",
    href: "/gtm/workspaces",
    icon: Settings,
    group: "Google Tag Manager",
    description: "Managing GTM workspaces"
  },

  // Attribution
  {
    title: "Models Overview",
    href: "/attribution/models",
    icon: Target,
    group: "Attribution",
    description: "Google attribution models"
  },
  {
    title: "Settings Configuration",
    href: "/attribution/settings",
    icon: Settings,
    group: "Attribution",
    description: "Configure attribution settings"
  },
  {
    title: "Cross-Platform Attribution",
    href: "/attribution/cross-platform",
    icon: Layers,
    group: "Attribution",
    description: "Track across devices"
  },

  // Meta vs Google Comparison
  {
    title: "Attribution Windows",
    href: "/comparison/attribution-windows",
    icon: Target,
    group: "Meta vs Google",
    description: "Compare attribution timeframes"
  },
  {
    title: "Touchpoint Tracking",
    href: "/comparison/touchpoint-tracking",
    icon: Layers,
    group: "Meta vs Google",
    description: "How each platform tracks"
  },
  {
    title: "Data-Driven vs ML Models",
    href: "/comparison/data-driven-vs-ml",
    icon: Activity,
    group: "Meta vs Google",
    description: "Attribution algorithms"
  },
  {
    title: "Offline Tracking",
    href: "/comparison/offline-tracking",
    icon: Server,
    group: "Meta vs Google",
    description: "Offline event tracking"
  },
  {
    title: "Deduplication",
    href: "/comparison/deduplication",
    icon: Zap,
    group: "Meta vs Google",
    description: "Duplicate event handling"
  },
  {
    title: "Privacy & Ad Blockers",
    href: "/comparison/privacy-adblockers",
    icon: Bug,
    group: "Meta vs Google",
    description: "Privacy impact on tracking"
  },
  {
    title: "Testing Comparison",
    href: "/comparison/testing",
    icon: Settings,
    group: "Meta vs Google",
    description: "Debug tools comparison"
  },

  // Testing & Debugging
  {
    title: "Client-Side Debugging",
    href: "/testing/client-debugging",
    icon: Globe,
    group: "Testing & Debugging",
    description: "Debug browser events"
  },
  {
    title: "Server-Side Debugging",
    href: "/testing/server-debugging",
    icon: Server,
    group: "Testing & Debugging",
    description: "Debug server events"
  },
  {
    title: "Event Validation",
    href: "/testing/validation",
    icon: Activity,
    group: "Testing & Debugging",
    description: "Validate event structure"
  },
  {
    title: "Common Issues",
    href: "/testing/common-issues",
    icon: Bug,
    group: "Testing & Debugging",
    description: "Troubleshooting guide"
  },

  // E-Commerce
  {
    title: "Event Structure",
    href: "/ecommerce/event-structure",
    icon: ShoppingCart,
    group: "E-Commerce",
    description: "E-commerce event types"
  },
  {
    title: "Item Parameters",
    href: "/ecommerce/item-parameters",
    icon: Tag,
    group: "E-Commerce",
    description: "Product data structure"
  },
  {
    title: "Transaction Tracking",
    href: "/ecommerce/transaction-tracking",
    icon: Activity,
    group: "E-Commerce",
    description: "Track purchases and refunds"
  },
  {
    title: "Funnel Analysis",
    href: "/ecommerce/funnel-analysis",
    icon: Target,
    group: "E-Commerce",
    description: "Analyze shopping funnels"
  },

  // Advanced
  {
    title: "Custom Dimensions & Metrics",
    href: "/advanced/custom-dimensions",
    icon: Tag,
    group: "Advanced Features",
    description: "Create custom analytics"
  },
  {
    title: "Audiences",
    href: "/advanced/audiences",
    icon: Layers,
    group: "Advanced Features",
    description: "Create remarketing audiences"
  },
  {
    title: "BigQuery Export",
    href: "/advanced/bigquery",
    icon: Server,
    group: "Advanced Features",
    description: "Raw event data analysis"
  },
  {
    title: "Consent Mode v2",
    href: "/advanced/consent-mode",
    icon: Settings,
    group: "Advanced Features",
    description: "Privacy compliance tracking"
  },
  {
    title: "Google Ads Integration",
    href: "/advanced/google-ads-integration",
    icon: Activity,
    group: "Advanced Features",
    description: "Connect GA4 to Google Ads"
  },

  // Event Playground
  {
    title: "Event Playground",
    href: "/playground",
    icon: Zap,
    group: "Interactive Tools",
    description: "Test GA4 events live"
  },
]

export const navGroups = [
  "Getting Started",
  "GA4 Client-Side",
  "Measurement Protocol",
  "Google Tag Manager",
  "Attribution",
  "Meta vs Google",
  "Testing & Debugging",
  "E-Commerce",
  "Advanced Features",
  "Interactive Tools",
] as const
