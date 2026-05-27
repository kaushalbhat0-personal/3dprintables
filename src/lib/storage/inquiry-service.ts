import type {
  Inquiry,
  CreateInquiryInput,
  UpdateStatusInput,
  InquiryResult,
} from "./types"

export interface IInquiryService {
  createInquiry(input: CreateInquiryInput): Promise<InquiryResult<Inquiry>>
  getInquiries(): Promise<InquiryResult<Inquiry[]>>
  getInquiryById(id: string): Promise<InquiryResult<Inquiry>>
  updateInquiryStatus(input: UpdateStatusInput): Promise<InquiryResult<Inquiry>>
}
