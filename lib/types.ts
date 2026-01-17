// GA4 Event Types
export interface GA4Event {
  name: string
  parameters?: Record<string, any>
  event_id?: string
  timestamp?: number
}

// GA4 User Properties
export interface GA4UserProperties {
  [key: string]: string | number | boolean
}

// GA4 Item (for e-commerce events)
export interface GA4Item {
  item_id: string
  item_name: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

// GA4 Standard Event Names
export const GA4EventNames = {
  PAGE_VIEW: "page_view",
  SESSION_START: "session_start",
  USER_ENGAGEMENT: "user_engagement",
  FIRST_VISIT: "first_visit",
  CONVERSION: "conversion",
  PURCHASE: "purchase",
  ADD_TO_CART: "add_to_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  SEARCH: "search",
  GENERATE_LEAD: "generate_lead",
  SIGN_UP: "sign_up",
  LOGIN: "login",
  VIEW_ITEM: "view_item",
  VIEW_ITEM_LIST: "view_item_list",
  SELECT_ITEM: "select_item",
  ADD_PAYMENT_INFO: "add_payment_info",
  REFUND: "refund",
} as const

export type GA4EventName = typeof GA4EventNames[keyof typeof GA4EventNames]

// Measurement Protocol Event Payload
export interface MPEvent {
  name: string
  params: Record<string, any>
}

// Measurement Protocol Request
export interface MPRequest {
  client_id: string
  user_id?: string
  events: MPEvent[]
  timestamp_micros?: number
  non_personalized_ads?: boolean
  user_properties?: Record<string, any>
}
