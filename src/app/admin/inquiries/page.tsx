"use client"

import { useState, useCallback, useMemo } from "react"
import {
  getInquiriesAction,
  updateInquiryStatusAction,
} from "@/actions/inquiries"
import type { Inquiry, InquiryStatus } from "@/lib/storage"
import {
  INQUIRY_STATUS_LABELS,
  INQUIRY_STATUS_COLORS,
} from "@/lib/storage"
import { cn } from "@/lib/utils"
import { ChevronDown, Clock, Search, ArrowUpDown } from "lucide-react"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "factory-admin"

const statusOptions: InquiryStatus[] = ["new", "contacted", "quoted", "completed"]

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full border",
        INQUIRY_STATUS_COLORS[status]
      )}
    >
      {INQUIRY_STATUS_LABELS[status]}
    </span>
  )
}

function StatusSelect({
  current,
  onChange,
}: {
  current: InquiryStatus
  onChange: (status: InquiryStatus) => void
}) {
  return (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => onChange(e.target.value as InquiryStatus)}
        className="appearance-none w-full h-9 px-3 pr-8 text-xs font-medium rounded-lg bg-zinc-800 border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 cursor-pointer"
      >
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {INQUIRY_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>
  )
}

export default function AdminInquiriesPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const loadInquiries = useCallback(async () => {
    setLoading(true)
    setError("")
    const result = await getInquiriesAction()
    if (result.success && result.data) {
      setInquiries(result.data)
    } else {
      setError(result.error ?? "Failed to load inquiries")
    }
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPasswordError("")
      loadInquiries()
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    )
    const formData = new FormData()
    formData.set("id", id)
    formData.set("status", status)
    const result = await updateInquiryStatusAction(formData)
    if (!result.success) {
      loadInquiries()
    }
  }

  const allCategories = useMemo(() => {
    const cats = new Set(inquiries.map((i) => i.category))
    return Array.from(cats)
  }, [inquiries])

  const filtered = useMemo(() => {
    let result = [...inquiries]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.phone.toLowerCase().includes(q) ||
          i.product.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((i) => i.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((i) => i.category === categoryFilter)
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [inquiries, searchQuery, statusFilter, categoryFilter, sortOrder])

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-border p-8"
        >
          <h1 className="text-xl font-bold text-foreground mb-1 text-center">
            Admin Access
          </h1>
          <p className="text-sm text-muted text-center mb-6">
            Enter password to view inquiries
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-11 px-4 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all mb-4"
            autoFocus
          />
          {passwordError && (
            <p className="text-sm text-red-400 mb-4">{passwordError}</p>
          )}
          <button
            type="submit"
            className="w-full h-11 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inquiries</h1>
            <p className="text-sm text-muted mt-1">
              {inquiries.length} total{filtered.length !== inquiries.length && ` · ${filtered.length} shown`}
              {inquiries.filter((i) => i.status === "new").length > 0 && (
                <span className="text-muted-foreground">
                  {" · "}
                  <span className="text-blue-400 font-medium">
                    {inquiries.filter((i) => i.status === "new").length} new
                  </span>
                </span>
              )}
            </p>
          </div>
          <button
            onClick={loadInquiries}
            className="h-10 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors border border-border"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, or product..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InquiryStatus | "all")}
            className="h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            <option value="all">All Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{INQUIRY_STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            <option value="all">All Categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder((o) => o === "newest" ? "oldest" : "newest")}
            className={cn(
              "h-10 px-4 text-sm font-medium rounded-xl border transition-colors inline-flex items-center gap-2",
              "bg-zinc-950 text-muted-foreground hover:text-foreground hover:border-primary/50"
            )}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm text-muted">Loading inquiries...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={loadInquiries}
              className="mt-4 h-10 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-10 h-10 text-muted-foreground/30 mx-auto" />
            <p className="mt-4 text-sm text-muted-foreground">
              {inquiries.length === 0
                ? "No inquiries yet."
                : "No inquiries match your filters."}
            </p>
            {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") && (
              <button
                onClick={() => { setSearchQuery(""); setStatusFilter("all"); setCategoryFilter("all") }}
                className="mt-2 text-xs text-primary hover:text-primary-hover"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-border">
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Qty</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq) => (
                    <tr key={inq.id} className="border-b border-border/50 hover:bg-zinc-900/30 transition-colors last:border-0">
                      <td className="px-5 py-4">
                        <p className="text-foreground font-medium">{inq.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{inq.email}</p>
                        <p className="text-xs text-muted-foreground">{inq.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-foreground">{inq.product}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{inq.category}</p>
                        {inq.message && (
                          <p className="text-xs text-muted-foreground/60 mt-1 max-w-[200px] truncate">
                            &ldquo;{inq.message}&rdquo;
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-foreground">{inq.quantity}</td>
                      <td className="px-5 py-4">
                        <StatusSelect current={inq.status} onChange={(s) => handleStatusChange(inq.id, s)} />
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(inq.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((inq) => (
                <div key={inq.id} className="rounded-2xl bg-zinc-900/50 border border-border p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{inq.name}</p>
                      <p className="text-xs text-muted-foreground">{inq.email} · {inq.phone}</p>
                    </div>
                    <StatusBadge status={inq.status} />
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><span className="text-foreground font-medium">{inq.product}</span> — {inq.quantity} unit{inq.quantity !== 1 ? "s" : ""}</p>
                    <p>{inq.category}</p>
                    {inq.preferredSize && <p>Size: {inq.preferredSize}</p>}
                    {inq.customizable && <p>Needs customization</p>}
                    {inq.message && <p className="mt-2 text-muted-foreground/60 italic">&ldquo;{inq.message}&rdquo;</p>}
                    <p className="mt-2 text-[11px] text-muted-foreground/40">{formatDate(inq.createdAt)}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <StatusSelect current={inq.status} onChange={(s) => handleStatusChange(inq.id, s)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
