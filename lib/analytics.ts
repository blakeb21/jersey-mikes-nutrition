import posthog from "posthog-js"

// ---------------------------------------------------------------------------
// Event definitions
// Add new events here as the product grows — keep names snake_case and
// group them by feature area so they're easy to filter in PostHog.
// ---------------------------------------------------------------------------

export type AnalyticsEvent =
  // Menu browsing
  | { event: "category_viewed";     properties: { category: string } }
  | { event: "item_viewed";         properties: { item_id: string; item_name: string; item_number: string; category: string } }
  // Item configuration
  | { event: "size_changed";        properties: { item_id: string; size: string } }
  | { event: "bread_changed";       properties: { item_id: string; bread: string } }
  | { event: "mikes_way_toggled";   properties: { item_id: string; component: string; enabled: boolean } }
  | { event: "extra_toggled";       properties: { item_id: string; extra_id: string; extra_name: string; added: boolean } }
  // Meal actions
  | { event: "item_added_to_meal";  properties: { item_id: string; item_name: string; size: string; bread: string; calories: number } }
  | { event: "meal_item_removed";   properties: { item_id: string } }
  | { event: "meal_cleared";        properties: { item_count: number; total_calories: number } }
  | { event: "meal_viewed";         properties: { item_count: number; total_calories: number } }

export function capture<E extends AnalyticsEvent>(
  event: E["event"],
  properties: Extract<AnalyticsEvent, { event: E["event"] }>["properties"]
): void {
  if (typeof window === "undefined") return
  posthog.capture(event, properties)
}
