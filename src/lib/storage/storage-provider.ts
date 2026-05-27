import type { IInquiryService } from "./inquiry-service"
import { SQLiteInquiryService } from "./sqlite-storage"

let instance: IInquiryService | null = null

export function getInquiryService(): IInquiryService {
  if (instance) return instance

  const useSupabase = process.env.USE_SUPABASE === "true"
  if (useSupabase) {
    throw new Error(
      "Supabase adapter not yet implemented. Set USE_SUPABASE=false or remove it to use SQLite storage."
    )
  }

  instance = new SQLiteInquiryService()
  return instance
}

export function resetInquiryService(): void {
  instance = null
}
