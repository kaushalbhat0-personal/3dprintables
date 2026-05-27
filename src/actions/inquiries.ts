"use server"

import { revalidatePath } from "next/cache"
import { CreateInquirySchema, UpdateInquiryStatusSchema } from "@/lib/validation/inquiry"
import { getInquiryService } from "@/lib/storage/server"
import type { InquiryResult, Inquiry } from "@/lib/storage"

function parseZodIssues(error: { message: string }): string {
  try {
    const issues = JSON.parse(error.message) as { message: string }[]
    return issues.map((e) => e.message).join("; ")
  } catch {
    return "Validation failed"
  }
}

export async function createInquiryAction(
  formData: FormData
): Promise<InquiryResult<Inquiry>> {
  const rawAttachments = formData.get("attachments") as string | null
  let attachments: string[] = []
  if (rawAttachments) {
    try { const p = JSON.parse(rawAttachments); attachments = Array.isArray(p) ? p : [] } catch { attachments = [] }
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    product: formData.get("product") as string,
    category: formData.get("category") as string,
    quantity: Number(formData.get("quantity")),
    preferredSize: (formData.get("preferredSize") as string) ?? "",
    customizable: formData.get("customizable") === "true",
    message: (formData.get("message") as string) ?? "",
    sourcePage: formData.get("sourcePage") as string,
    attachments,
  }

  const parsed = CreateInquirySchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      error: parseZodIssues(parsed.error),
    }
  }

  const service = getInquiryService()
  return service.createInquiry(parsed.data)
}

export async function getInquiriesAction(): Promise<InquiryResult<Inquiry[]>> {
  const service = getInquiryService()
  return service.getInquiries()
}

export async function updateInquiryStatusAction(
  formData: FormData
): Promise<InquiryResult<Inquiry>> {
  const raw = {
    id: formData.get("id") as string,
    status: formData.get("status") as string,
  }

  const parsed = UpdateInquiryStatusSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      error: parseZodIssues(parsed.error),
    }
  }

  const service = getInquiryService()
  const result = await service.updateInquiryStatus(parsed.data)
  if (result.success) {
    revalidatePath("/admin/inquiries")
  }
  return result
}
