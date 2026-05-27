"use client"

/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from "react"
import { X, Upload, Loader2 } from "lucide-react"
import {
  createProductAction,
  updateProductAction,
} from "@/actions/products"
import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import { PRODUCT_CATEGORIES } from "@/types"
import type { Product } from "@/types"

interface ProductFormModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const isEdit = !!product
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [featuredImage, setFeaturedImage] = useState(product?.featuredImage ?? "")
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.galleryImages ?? [])
  const [videos, setVideos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const featuredInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set("featuredImage", featuredImage)
    galleryImages.forEach((url) => formData.append("galleryImages[]", url))

    const galleryStr = JSON.stringify(galleryImages)
    formData.set("galleryImages", galleryStr)

    const videoStr = JSON.stringify(videos.filter(Boolean))
    formData.set("videos", videoStr)

    if (isEdit) {
      formData.set("id", product!.id)
    }

    const result = isEdit
      ? await updateProductAction(formData)
      : await createProductAction(formData)

    if (!result.success) {
      setError(result.error ?? "Failed to save product")
      setSaving(false)
      return
    }

    onClose()
  }

  const handleNameChange = (name: string) => {
    const slugInput = document.getElementById("slug") as HTMLInputElement
    if (slugInput && !slugInput.dataset.manuallyEdited) {
      slugInput.value = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }
  }

  const handleSlugEdit = () => {
    const slugInput = document.getElementById("slug") as HTMLInputElement
    if (slugInput) slugInput.dataset.manuallyEdited = "true"
  }

  const uploadFile = async (file: File, target: "featured" | "gallery") => {
    setUploading(true)
    setError("")

    try {
      const url = await uploadToCloudinary(file)

      if (target === "featured") {
        setFeaturedImage(url)
      } else {
        setGalleryImages((prev) => [...prev, url])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleFeaturedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file, "featured")
    e.target.value = ""
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      for (const file of Array.from(files)) {
        uploadFile(file, "gallery")
      }
    }
    e.target.value = ""
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-zinc-900 border border-border shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEdit
                ? `Editing "${product!.title}"`
                : "Create a new product listing"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Name + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={product?.title ?? ""}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="Golden Hanuman Statue"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Slug *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40 pointer-events-none">
                  /
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  defaultValue={product?.slug ?? ""}
                  onFocus={handleSlugEdit}
                  className="w-full h-10 pl-7 pr-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="golden-hanuman-statue"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product?.description ?? ""}
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-y"
              placeholder="Detailed product description..."
            />
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="shortDescription" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Short Description
            </label>
            <input
              id="shortDescription"
              name="shortDescription"
              type="text"
              defaultValue={product?.shortDescription ?? ""}
              className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              placeholder="Premium metallic-finish meditation statue"
            />
          </div>

          {/* Category + Price + Material */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={product?.category ?? "custom"}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="priceRange" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Price Range
              </label>
              <input
                id="priceRange"
                name="priceRange"
                type="text"
                defaultValue={product?.priceRange ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder='₹799 or "Custom Quote"'
              />
            </div>
            <div>
              <label htmlFor="material" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Material
              </label>
              <input
                id="material"
                name="material"
                type="text"
                defaultValue={product?.material ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="PLA+, Metallic Finish"
              />
            </div>
          </div>

          {/* Dimensions + Print Time + Finish Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="dimensions" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Dimensions
              </label>
              <input
                id="dimensions"
                name="dimensions"
                type="text"
                defaultValue={product?.dimensions ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="18cm × 12cm × 25cm"
              />
            </div>
            <div>
              <label htmlFor="printTime" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Print Time
              </label>
              <input
                id="printTime"
                name="printTime"
                type="text"
                defaultValue={product?.printTime ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="~12 hours"
              />
            </div>
            <div>
              <label htmlFor="finishType" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Finish Type
              </label>
              <input
                id="finishType"
                name="finishType"
                type="text"
                defaultValue={product?.finishType ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="Metallic Coating"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label htmlFor="technologies" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Technologies (comma-separated)
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              defaultValue={product?.technologies?.join(", ") ?? ""}
              className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              placeholder="FDM Printing, Surface Finishing"
            />
            <p className="text-[11px] text-muted-foreground/50 mt-1">
              Separate multiple values with commas
            </p>
          </div>

          {/* Production Type + Min Order Qty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productionType" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Production Type
              </label>
              <select
                id="productionType"
                name="productionType"
                defaultValue={product?.productionType ?? "single"}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              >
                <option value="single">Single Unit</option>
                <option value="prototype">Prototype</option>
                <option value="batch">Batch Production</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label htmlFor="minimumOrderQuantity" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Min Order Quantity
              </label>
              <input
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                type="text"
                defaultValue={product?.minimumOrderQuantity ?? ""}
                className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="10 units"
              />
            </div>
          </div>

          {/* Featured Image Upload */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Featured Image
            </label>
            <input
              ref={featuredInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFeaturedUpload}
            />
            {featuredImage ? (
              <div className="relative inline-block">
                <div className="w-28 h-28 rounded-xl bg-zinc-800 overflow-hidden border border-border">
                  <img
                    src={featuredImage}
                    alt="Featured preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFeaturedImage("")}
                  className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => featuredInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center justify-center gap-2 w-full h-20 rounded-xl border-2 border-dashed border-border bg-zinc-950 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                <span className="text-sm">
                  {uploading ? "Uploading..." : "Upload Featured Image"}
                </span>
              </button>
            )}
          </div>

          {/* Gallery Images Upload */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Gallery Images
            </label>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryUpload}
            />
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mb-3">
                {galleryImages.map((url, i) => (
                  <div key={`${url}-${i}`} className="relative group">
                    <div className="aspect-square rounded-xl bg-zinc-800 overflow-hidden border border-border">
                      <img
                        src={url}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center justify-center gap-2 w-full h-14 rounded-xl border-2 border-dashed border-border bg-zinc-950 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span className="text-sm">
                {uploading ? "Uploading..." : "Upload Gallery Images"}
              </span>
            </button>
          </div>

          {/* Product Videos */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Product Videos (Cloudinary URLs)
            </label>
            <div className="space-y-2">
              {videos.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const next = [...videos]
                      next[i] = e.target.value
                      setVideos(next)
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setVideos((prev) => prev.filter((_, j) => j !== i))}
                    className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-zinc-800 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setVideos((prev) => [...prev, ""])}
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border-2 border-dashed border-border bg-zinc-950 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm"
              >
                <Upload className="w-4 h-4" />
                Add Video URL
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 h-10 px-3.5 rounded-xl bg-zinc-950 border border-border cursor-pointer hover:bg-zinc-900 transition-colors">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={product?.featured ?? false}
                className="w-4 h-4 rounded border-border bg-zinc-800 accent-primary"
              />
              <span className="text-sm text-foreground">Featured</span>
            </label>
            <label className="flex items-center gap-3 h-10 px-3.5 rounded-xl bg-zinc-950 border border-border cursor-pointer hover:bg-zinc-900 transition-colors">
              <input
                type="checkbox"
                name="supportsBulkOrders"
                defaultChecked={product?.supportsBulkOrders ?? false}
                className="w-4 h-4 rounded border-border bg-zinc-800 accent-primary"
              />
              <span className="text-sm text-foreground">Supports Bulk Orders</span>
            </label>
            <label className="flex items-center gap-3 h-10 px-3.5 rounded-xl bg-zinc-950 border border-border cursor-pointer hover:bg-zinc-900 transition-colors">
              <input
                type="checkbox"
                name="customizable"
                defaultChecked={product?.customizable ?? false}
                className="w-4 h-4 rounded border-border bg-zinc-800 accent-primary"
              />
              <span className="text-sm text-foreground">Customizable</span>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="h-10 px-5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50 inline-flex items-center gap-2"
            >
              {(saving || uploading) && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {isEdit ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
