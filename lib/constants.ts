/**
 * Constants for Google Analytics 4
 */

export const GA4_STANDARD_EVENTS = [
  "page_view",
  "session_start",
  "user_engagement",
  "first_visit",
  "conversion",
  "purchase",
  "add_to_cart",
  "remove_from_cart",
  "begin_checkout",
  "add_payment_info",
  "search",
  "generate_lead",
  "sign_up",
  "login",
  "view_item",
  "view_item_list",
  "select_item",
  "view_promotion",
  "select_promotion",
  "refund",
] as const

export const GA4_STANDARD_PARAMETERS = [
  "currency",
  "value",
  "items",
  "affiliation",
  "coupon",
  "description",
  "discount",
  "event_id",
  "list_id",
  "list_name",
  "list_position",
  "location_id",
  "shipping",
  "tax",
  "transaction_id",
] as const

export const GA4_ITEM_PARAMETERS = [
  "item_id",
  "item_name",
  "affiliation",
  "coupon",
  "currency",
  "discount",
  "index",
  "item_brand",
  "item_category",
  "item_category2",
  "item_category3",
  "item_category4",
  "item_category5",
  "item_list_id",
  "item_list_name",
  "item_variant",
  "location_id",
  "price",
  "quantity",
] as const

export const GA4_USER_PROPERTIES = [
  "age",
  "country",
  "coupon_code",
  "currency",
  "customer_tier",
  "favorite_brand",
  "gender",
  "interests",
  "language",
  "logged_in",
  "marketing_opt_in",
  "payment_method",
  "shipping_tier",
  "signup_method",
  "subscription_plan",
  "username",
] as const

export const GA4_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "MXN",
  "BRL",
] as const

export const MAX_EVENTS_PER_REQUEST = 25
export const MAX_ITEMS_PER_EVENT = 27
export const MAX_CUSTOM_PARAMETERS = 25
