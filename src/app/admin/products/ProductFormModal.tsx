"use client"

import { useState } from "react"
import { X } from "lucide-react"
import {
  createProductAction,
  updateProductAction,
} from "@/actions/products"
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
  const [previewImage, setPreviewImage] = useState(product?.featuredImage ?? "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-zinc-900 border border-border shadow-2xl">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Name + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="slug"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
            <label
              htmlFor="description"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
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
            <label
              htmlFor="shortDescription"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
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
              <label
                htmlFor="category"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="priceRange"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="material"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="dimensions"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="printTime"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="finishType"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
            <label
              htmlFor="technologies"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
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
              <label
                htmlFor="productionType"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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
              <label
                htmlFor="minimumOrderQuantity"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
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

          {/* Featured Image */}
          <div>
            <label
              htmlFor="featuredImage"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Featured Image URL
            </label>
            <input
              id="featuredImage"
              name="featuredImage"
              type="text"
              defaultValue={product?.featuredImage ?? ""}
              onChange={(e) => setPreviewImage(e.target.value)}
              className="w-full h-10 px-3.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              placeholder="/images/products/my-product.jpg"
            />
            {previewImage && (
              <div className="mt-2 w-20 h-20 rounded-lg bg-zinc-800 overflow-hidden border border-border">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label
              htmlFor="galleryImages"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Gallery Images (one URL per line)
            </label>
            <textarea
              id="galleryImages"
              name="galleryImages"
              rows={4}
              defaultValue={product?.galleryImages?.join("\n") ?? ""}
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-y font-mono text-xs"
              placeholder="/images/products/gallery-1.jpg&#10;/images/products/gallery-2.jpg"
            />
            <p className="text-[11px] text-muted-foreground/50 mt-1">
              One URL per line
            </p>
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
              disabled={saving}
              className="h-10 px-5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50 inline-flex items-center gap-2"
            >
              {saving && (
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
