export { SQLiteInquiryService } from "./sqlite-storage"
export { getInquiryService, resetInquiryService } from "./storage-provider"
export type { IInquiryService } from "./inquiry-service"
export type {
  Inquiry,
  InquiryStatus,
  CreateInquiryInput,
  UpdateStatusInput,
  InquiryResult,
} from "./types"
export {
  INQUIRY_STATUS_LABELS,
  INQUIRY_STATUS_COLORS,
} from "./types"
