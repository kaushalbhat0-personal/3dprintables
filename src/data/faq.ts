import type { FAQItem } from "@/types"

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What is the typical turnaround time for a print?",
    answer:
      "Standard orders are dispatched within 3–5 business days from design approval. Custom designs typically take 5–7 business days depending on complexity. Rush orders (24–48hr turnaround) are available on request — just ask when you inquire.",
    category: "process",
  },
  {
    id: "2",
    question: "Can I get a custom size or modification to an existing design?",
    answer:
      "Yes. We can resize, remix, or modify any existing design to your specifications. Send us your requirements — dimensions, reference images, or sketches — and we'll confirm feasibility before proceeding. Minor modifications are usually included at no extra cost.",
    category: "custom",
  },
  {
    id: "3",
    question: "What materials do you recommend for my project?",
    answer:
      "PLA+ for decorative pieces and prototypes — good strength, clean matte finish, easy to print. Matte PLA for display-grade items with minimal layer visibility. Silk PLA for a satin metallic sheen on premium pieces. Glow PLA for ambient/night-lit decor. We'll recommend the best material based on your specific use case during the quote.",
    category: "materials",
  },
  {
    id: "4",
    question: "How durable are 3D printed parts?",
    answer:
      "PLA-based prints are rigid and suitable for display, light handling, and decorative use. They are not designed for structural load-bearing, outdoor UV exposure, or high-temperature environments. For functional prototypes or mechanical parts, we evaluate the application and recommend appropriate materials and wall thickness.",
    category: "materials",
  },
  {
    id: "5",
    question: "Do you offer painting and post-processing?",
    answer:
      "Yes. Every print receives standard post-processing — support removal, sanding, and surface cleaning. We also offer premium finishing services including priming, sanding to higher grits, custom painting, metallic coating, and clear protective sealing. Ask for finishing options during your inquiry.",
    category: "custom",
  },
  {
    id: "6",
    question: "Can you handle bulk or wholesale orders?",
    answer:
      "Yes. We regularly produce batch orders for decor brands, resellers, and event organisers. Bulk pricing is available for quantities of 10 units or more. Lead times scale with order size — we'll provide a production schedule with your quote. Contact us for a bulk pricing proposal.",
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
    question: "Do you keep my design files private?",
    answer:
      "Absolutely. We treat every design as confidential property of the client. STL files, CAD data, and reference images are never shared, reused, or redistributed without explicit permission. We can sign NDAs for commercial projects upon request.",
    category: "process",
  },
  {
    id: "9",
    question: "How does the prototype iteration process work?",
    answer:
      "Share your concept → we model/prepare the file → first print for physical review → you provide feedback → we revise and reprint → final approval. Minor iterations (2–3 rounds) are typically included in the prototyping quote. Additional revisions are quoted separately.",
    category: "process",
  },
  {
    id: "10",
    question: "What information do you need to provide a quote?",
    answer:
      "The more detail, the better. Share: design file or reference images, approximate dimensions, preferred material, quantity needed, desired finish, and any deadline requirements. If you're unsure about any of these, just describe what you're trying to build — we'll guide you through the options.",
    category: "pricing",
  },
]
