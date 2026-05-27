"use client"

import { useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Star, Quote } from "lucide-react"
import {
  getTestimonialsAction,
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  toggleFeaturedTestimonialAction,
} from "@/actions/testimonials"
import type { Testimonial } from "@/lib/storage/testimonial-types"
import { cn } from "@/lib/utils"

const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "factory-admin"

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(s)}
          className={cn(
            "transition-colors",
            onChange ? "cursor-pointer hover:scale-110" : "cursor-default"
          )}
        >
          <Star
            className={cn(
              "w-4 h-4",
              s <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-600"
            )}
          />
        </button>
      ))}
    </div>
  )
}

export default function AdminTestimonialsPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError("")
    const result = await getTestimonialsAction()
    if (result.success) setTestimonials(result.data)
    else setError(result.error)
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPasswordError("")
      load()
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !current } : t))
    )
    const result = await toggleFeaturedTestimonialAction(id, !current)
    if (!result.success) load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return
    setDeleting(id)
    await deleteTestimonialAction(id)
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    setDeleting(null)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    const form = e.currentTarget
    const fd = new FormData(form)
    if (editing) fd.set("id", editing.id)
    const result = editing
      ? await updateTestimonialAction(fd)
      : await createTestimonialAction(fd)
    if (!result.success) {
      setError(result.error ?? "Failed to save")
      setSaving(false)
      return
    }
    setShowForm(false)
    setEditing(null)
    load()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-border p-8"
        >
          <h1 className="text-xl font-bold text-foreground mb-1 text-center">Admin Access</h1>
          <p className="text-sm text-muted text-center mb-6">Enter password to manage testimonials</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-11 px-4 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all mb-4"
            autoFocus
          />
          {passwordError && <p className="text-sm text-red-400 mb-4">{passwordError}</p>}
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
            <p className="text-sm text-muted mt-1">
              {testimonials.length} total ·{" "}
              {testimonials.filter((t) => t.featured).length} featured
            </p>
          </div>
          <button
            onClick={() => {
              setEditing(null)
              setShowForm(!showForm)
            }}
            className="h-10 px-4 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="mb-8 rounded-2xl bg-zinc-900/50 border border-border p-6 space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {editing ? "Edit Testimonial" : "New Testimonial"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="name"
                required
                defaultValue={editing?.name ?? ""}
                placeholder="Customer name *"
                className="h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <input
                name="role"
                defaultValue={editing?.role ?? ""}
                placeholder="Role (e.g. Founder)"
                className="h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <input
                name="company"
                defaultValue={editing?.company ?? ""}
                placeholder="Company (e.g. Acme Corp)"
                className="h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>
            <textarea
              name="content"
              required
              rows={3}
              defaultValue={editing?.content ?? ""}
              placeholder="Testimonial content *"
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-y"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Rating
                </label>
                <StarRating
                  rating={editing?.rating ?? 5}
                  onChange={(r) => {
                    const input = document.getElementById("rating-input") as HTMLInputElement
                    if (input) input.value = String(r)
                  }}
                />
                <input id="rating-input" name="rating" type="hidden" defaultValue={editing?.rating ?? 5} />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  defaultValue={editing?.imageUrl ?? ""}
                  placeholder="/images/avatar.jpg"
                  className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex items-end gap-4 pb-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editing?.featured ?? false}
                    className="w-4 h-4 rounded border-border bg-zinc-800 accent-primary"
                  />
                  <span className="text-sm text-foreground">Featured</span>
                </label>
              </div>
            </div>
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditing(null) }}
                className="h-10 px-5 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="h-10 px-5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm text-muted">Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={load} className="mt-4 h-10 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors">Try Again</button>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20">
            <Quote className="w-10 h-10 text-muted-foreground/30 mx-auto" />
            <p className="mt-4 text-sm text-muted-foreground">No testimonials yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-border">
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Featured</th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="text-right px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t.id} className="border-b border-border/50 hover:bg-zinc-900/30 transition-colors last:border-0">
                      <td className="px-5 py-4">
                        <p className="text-foreground font-medium">{t.name}</p>
                        {(t.role || t.company) && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {[t.role, t.company].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-[250px]">
                          &ldquo;{t.content}&rdquo;
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <StarRating rating={t.rating} />
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggleFeatured(t.id, t.featured)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border transition-colors",
                            t.featured
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-zinc-300"
                          )}
                        >
                          <Star className={cn("w-3 h-3", t.featured && "fill-amber-400")} />
                          {t.featured ? "Featured" : "Set Featured"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(t.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditing(t); setShowForm(true) }}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={deleting === t.id}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-2xl bg-zinc-900/50 border border-border p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      {(t.role || t.company) && (
                        <p className="text-xs text-muted-foreground">
                          {[t.role, t.company].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <StarRating rating={t.rating} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => handleToggleFeatured(t.id, t.featured)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border transition-colors",
                        t.featured
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-zinc-800 text-zinc-500 border-zinc-700"
                      )}
                    >
                      <Star className={cn("w-3 h-3", t.featured && "fill-amber-400")} />
                      {t.featured ? "Featured" : "Set Featured"}
                    </button>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditing(t); setShowForm(true) }} className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id} className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
