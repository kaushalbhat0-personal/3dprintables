import type { IInquiryService } from "./inquiry-service"
import type {
  Inquiry,
  CreateInquiryInput,
  UpdateStatusInput,
  InquiryResult,
} from "./types"
import {
  createInquiryQuery,
  getInquiriesQuery,
  getInquiryByIdQuery,
  updateInquiryStatusQuery,
} from "@/db/queries/inquiries"

export class SQLiteInquiryService implements IInquiryService {
  async createInquiry(
    input: CreateInquiryInput
  ): Promise<InquiryResult<Inquiry>> {
    return createInquiryQuery(input)
  }

  async getInquiries(): Promise<InquiryResult<Inquiry[]>> {
    return getInquiriesQuery()
  }

  async getInquiryById(id: string): Promise<InquiryResult<Inquiry>> {
    return getInquiryByIdQuery(id)
  }

  async updateInquiryStatus(
    input: UpdateStatusInput
  ): Promise<InquiryResult<Inquiry>> {
    return updateInquiryStatusQuery(input)
  }
}
