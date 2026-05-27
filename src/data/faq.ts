import type { FAQItem } from "@/types"

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What is the typical turnaround time for a custom print?",
    answer:
      "Standard orders are dispatched within 3–5 business days from design approval. Custom designs typically take 5–7 business days depending on complexity. Rush orders (24–48hr turnaround) are available on request — just ask when you inquire.",
    category: "process",
  },
  {
    id: "2",
    question: "Can I get a custom size or modification to an existing design?",
    answer:
      "Absolutely. We can resize, remix, or modify any existing design to your exact specifications. Send us your requirements — dimensions, reference images, or rough sketches — and we'll confirm what's possible before proceeding. Minor modifications are usually included at no extra cost.",
    category: "custom",
  },
  {
    id: "3",
    question: "What material should I choose for my project?",
    answer:
      "PLA+ for decor and gifts — good strength, clean matte finish, reliable. Matte PLA for display-grade pieces with minimal layer visibility. Silk PLA for a satin metallic sheen on premium gifts. Glow PLA for ambient night-lit decor. We'll recommend the best material for your specific project during the quote.",
    category: "materials",
  },
  {
    id: "4",
    question: "How durable are 3D printed creations?",
    answer:
      "PLA-based prints are rigid and suitable for display, light handling, and decorative use. They are not designed for structural load-bearing, outdoor UV exposure, or high-temperature environments. For functional prototypes or mechanical parts, we evaluate the application and recommend appropriate materials and wall thickness.",
    category: "materials",
  },
  {
    id: "5",
    question: "Do you offer painting and finishing services?",
    answer:
      "Yes. Every creation receives standard post-processing — support removal, sanding, and surface cleaning. We also offer premium finishing including priming, sanding to higher grits, custom painting, metallic coating, and clear protective sealing. Ask about finishing options when you inquire.",
    category: "custom",
  },
  {
    id: "6",
    question: "Can you handle bulk or wholesale orders?",
    answer:
      "Yes. We regularly produce batch orders for decor brands, resellers, and event organisers. Volume pricing is available for quantities of 10 units or more. Lead times scale with order size — we'll provide a schedule with your quote. Contact us for a volume pricing proposal.",
    category: "pricing",
  },
  {
    id: "7",
    question: "What are my shipping options and costs?",
    answer:
      "We ship to all major cities and towns across India via trusted courier partners. Shipping is free on orders above ₹999. Standard delivery takes 3–7 business days depending on location. Expedited shipping is available at additional cost. International shipping — inquire for availability.",
    category: "shipping",
  },
  {
    id: "8",
    question: "Do you keep my design private?",
    answer:
      "Absolutely. We treat every design as confidential property of the client. STL files, CAD data, and reference images are never shared, reused, or redistributed without explicit permission. We can sign NDAs for commercial projects upon request.",
    category: "process",
  },
  {
    id: "9",
    question: "How does the design iteration process work?",
    answer:
      "Share your concept → we model and prepare the file → first print for physical review → you provide feedback → we revise and reprint → final approval. Minor iterations (2–3 rounds) are typically included in the initial quote. Additional revisions are quoted separately.",
    category: "process",
  },
  {
    id: "10",
    question: "What do you need from me to provide a quote?",
    answer:
      "The more detail, the better. Share your design file or reference images, approximate dimensions, preferred material, quantity, desired finish, and any deadline. If you're unsure about any of these, just describe what you're trying to create — we'll guide you through the options.",
    category: "pricing",
  },
]
