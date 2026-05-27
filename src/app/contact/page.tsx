import { generateMetadata } from "@/lib/seo"
import { ContactHero } from "@/components/contact/ContactHero"
import { Methods } from "@/components/contact/Methods"
import { InquiryForm } from "@/components/contact/InquiryForm"
import { ResponseExpectations } from "@/components/contact/ResponseExpectations"
import { ContactCTA } from "@/components/contact/ContactCTA"

export const metadata = generateMetadata({
  title: "Contact — Get a Quote or Start a Custom Project",
  description:
    "Have an idea? Contact 3D Factory via WhatsApp, email, or Instagram. Quick replies, custom quotes, pan-India delivery.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Methods />
      <InquiryForm />
      <ResponseExpectations />
      <ContactCTA />
      <div className="pb-24 md:pb-0" />
    </>
  )
}
