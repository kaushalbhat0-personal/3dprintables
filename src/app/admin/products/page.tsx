"use client"

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, startTransition, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Star, Package, ArrowUp, ArrowDown } from "lucide-react"
import {
  getProductsAction,
  deleteProductAction,
  toggleFeaturedAction,
  moveProductAction,
} from "@/actions/products"
import type { Product } from "@/types"
import { PRODUCT_CATEGORIES } from "@/types"
import { optimizeImage } from "@/lib/cloudinary-utils"

const ProductFormModal = dynamic(() => import("./ProductFormModal").then((m) => ({ default: m.ProductFormModal })), {
  ssr: false,
})

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

function CategoryBadge({ category }: { category: string }) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.value === category)
  return (
    <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
      {cat?.label ?? category}
    </span>
  )
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadProducts = async () => {
    startTransition(() => { setLoading(true); setError("") })
    const result = await getProductsAction()
    startTransition(() => {
      if (result.success) {
        setProducts(result.data)
      } else {
        setError(result.error)
      }
      setLoading(false)
    })
  }

  useEffect(() => { loadProducts() }, [])

  const refresh = useCallback(() => {
    router.refresh()
    loadProducts()
  }, [router])

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const product = products.find((p) => p.id === id)
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
    )
    const result = await toggleFeaturedAction(id, !current, product?.slug)
    if (!result.success) {
      loadProducts()
    }
    refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    const product = products.find((p) => p.id === id)
    setDeleting(id)
    const result = await deleteProductAction(id, product?.slug)
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      refresh()
    } else {
      alert(result.error ?? "Failed to delete")
    }
    setDeleting(null)
  }

  const handleMove = async (id: string, direction: "up" | "down") => {
    const result = await moveProductAction(id, direction)
    if (result.success) {
      refresh()
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingProduct(null)
    refresh()
  }

  const featuredCount = useMemo(() => products.filter((p) => p.featured).length, [products])

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted mt-1">
              {products.length} total ·{" "}
              {featuredCount} featured
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadProducts}
              className="h-11 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 active:scale-[0.97] transition-all duration-150 border border-border select-none"
            >
              Refresh
            </button>
            <button
              onClick={handleCreate}
              className="h-11 px-4 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.97] transition-all duration-150 inline-flex items-center gap-2 select-none"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Add Product</span>
              <span className="xs:hidden">Add</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm text-muted">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-4 h-10 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-10 h-10 text-muted-foreground/30 mx-auto" />
            <p className="mt-4 text-sm text-muted-foreground">
              No products yet.
            </p>
            <button
              onClick={handleCreate}
              className="mt-4 h-10 px-4 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Product
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-right px-5 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-border/50 hover:bg-surface/30 transition-colors last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.featuredImage && (
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                              <img
                                src={optimizeImage(product.featuredImage, 120)}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-foreground font-medium">
                              {product.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              /{product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <CategoryBadge category={product.category} />
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        {product.priceRange || "\u2014"}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            handleToggleFeatured(product.id, !!product.featured)
                          }
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border transition-colors ${
                            product.featured
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-zinc-300"
                          }`}
                        >
                          <Star
                            className={`w-3 h-3 ${
                              product.featured ? "fill-amber-400" : ""
                            }`}
                          />
                          {product.featured ? "Featured" : "Set Featured"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleMove(product.id, "up")}
                            disabled={index === 0}
                            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                            title="Move up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMove(product.id, "down")}
                            disabled={index === products.length - 1}
                            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                            title="Move down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 active:scale-90 transition-all duration-200 disabled:opacity-50"
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
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-surface border border-border p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {product.featuredImage && (
                      <div className="w-14 h-14 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0">
                        <img
                          src={optimizeImage(product.featuredImage, 120)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        /{product.slug}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <CategoryBadge category={product.category} />
                        {product.priceRange && (
                          <span className="text-xs text-muted-foreground">
                            {product.priceRange}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(product.createdAt)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMove(product.id, "up")}
                        disabled={index === 0}
                        className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200 border border-border/50 disabled:opacity-30 disabled:pointer-events-none"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(product.id, "down")}
                        disabled={index === products.length - 1}
                        className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200 border border-border/50 disabled:opacity-30 disabled:pointer-events-none"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleFeatured(product.id, !!product.featured)
                        }
                        className={`h-11 w-11 inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${
                          product.featured
                            ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-zinc-800 border border-border/50"
                        }`}
                        title={
                          product.featured
                            ? "Remove featured"
                            : "Set as featured"
                        }
                      >
                        <Star
                          className={`w-4 h-4 ${
                            product.featured ? "fill-amber-400" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200 border border-border/50"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 active:scale-90 transition-all duration-200 border border-border/50 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
