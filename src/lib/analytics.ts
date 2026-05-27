type EventName =
  | "view_product"
  | "open_gallery"
  | "click_inquiry"
  | "click_whatsapp"
  | "click_category_filter"
  | "view_service_page"
  | "submit_inquiry"
  | "scroll_depth"

type EventProperties = Record<string, string | number | boolean>

const logEvent = (name: EventName, props?: EventProperties) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, props ?? {})
  }
}

const trackers = {
  productView(productId: string, productTitle: string) {
    logEvent("view_product", { productId, productTitle })
  },
  galleryOpen(productId: string) {
    logEvent("open_gallery", { productId })
  },
  inquiryClick(productId?: string) {
    logEvent("click_inquiry", { productId: productId ?? "unknown" })
  },
  whatsappClick(location: string) {
    logEvent("click_whatsapp", { location })
  },
  categoryFilter(category: string) {
    logEvent("click_category_filter", { category })
  },
  servicePageView(service: string) {
    logEvent("view_service_page", { service })
  },
  inquirySubmit(productName: string) {
    logEvent("submit_inquiry", { productName })
  },
  scrollDepth(depth: number) {
    logEvent("scroll_depth", { depth })
  },
}

export { logEvent, trackers }
export type { EventName, EventProperties }
