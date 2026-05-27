"use client"

import { useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Star, EyeOff, Eye, Package } from "lucide-react"
import {
  getProductsAction,
  deleteProductAction,
  toggleFeaturedAction,
} from "@/actions/products"
import { ProductFormModal } from "./ProductFormModal"
import type { Product } from "@/types"
import { PRODUCT_CATEGORIES } from "@/types"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "factory-admin"

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
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError("")
    const result = await getProductsAction()
    if (result.success) {
      setProducts(result.data)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPasswordError("")
      loadProducts()
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
    )
    const result = await toggleFeaturedAction(id, !current)
    if (!result.success) {
      loadProducts()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeleting(id)
    const result = await deleteProductAction(id)
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } else {
      alert(result.error ?? "Failed to delete")
    }
    setDeleting(null)
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
    loadProducts()
  }

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
            Enter password to manage products
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted mt-1">
              {products.length} total ·{" "}
              {products.filter((p) => p.featured).length} featured
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadProducts}
              className="h-10 px-4 text-sm font-medium rounded-xl bg-zinc-800 text-foreground hover:bg-zinc-700 transition-colors border border-border"
            >
              Refresh
            </button>
            <button
              onClick={handleCreate}
              className="h-10 px-4 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
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
                  <tr className="bg-zinc-900/80 border-b border-border">
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
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border/50 hover:bg-zinc-900/30 transition-colors last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.featuredImage && (
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                              <img
                                src={product.featuredImage}
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
                        {product.priceRange || "—"}
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
                            onClick={() => handleEdit(product)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
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
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-zinc-900/50 border border-border p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {product.featuredImage && (
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                        <img
                          src={product.featuredImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        /{product.slug}
                      </p>
                    </div>
                    <CategoryBadge category={product.category} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{product.priceRange || "—"}</span>
                      <span>{formatDate(product.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          handleToggleFeatured(product.id, !!product.featured)
                        }
                        className={`h-8 w-8 inline-flex items-center justify-center rounded-lg transition-colors ${
                          product.featured
                            ? "text-amber-400 hover:bg-amber-500/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-zinc-800"
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
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
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
