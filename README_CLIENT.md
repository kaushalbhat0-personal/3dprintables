# 3D Factory — Client Handover Guide

## Table of Contents

- [Login & Admin Access](#login--admin-access)
- [Product Management](#product-management)
- [Testimonial Management](#testimonial-management)
- [Inquiry Management](#inquiry-management)
- [Image & Media](#image--media)
- [Hosting & Domains](#hosting--domains)
- [Database](#database)
- [Tech Stack Overview](#tech-stack-overview)

---

## Login & Admin Access

### How to log in
1. Go to `https://3dfactory.in/login`
2. Click **Sign in with Google**
3. Use the Google account registered as the admin email

### First-time setup
- The first login creates your user account and assigns admin role automatically
- Only the email listed in `ADMIN_GOOGLE_EMAIL` gets admin privileges
- Other Google accounts can log in but will only see a regular profile (no admin access)

### Admin panel
- After login, visit `https://3dfactory.in/admin/products` to manage products
- The admin pages are automatically restricted — non-admin users are redirected

### Changing the admin email
- Update the `ADMIN_GOOGLE_EMAIL` environment variable in Vercel
- The next login from the new email will grant admin access

---

## Product Management

### Add a product
1. Go to **Admin → Products**
2. Fill in:
   - **Name** — product title (e.g., "Glow-in-the-dark Shiva")
   - **Slug** — URL-friendly name (auto-generated from name, but editable)
   - **Category** — select from: Spiritual Decor, Cosplay, Prototypes, Custom
   - **Description** — full product description (up to 5000 characters)
   - **Short Description** — one-line summary (up to 300 characters)
   - **Price Range** — display price (e.g., "₹999" or "Bulk Pricing")
   - **Material** — e.g., "PLA+", "Metal-infused PLA"
   - **Dimensions** — e.g., "12cm x 8cm x 10cm"
   - **Technologies** — comma-separated (e.g., "FDM, SLA")
   - **Featured Image** — main product image URL (use the upload tool)
   - **Gallery Images** — additional images (use the upload tool)
3. Toggle **Active** to publish the product on the public site
4. Toggle **Featured** to show it in the homepage carousel
5. Click **Create Product**

### Edit a product
- Navigate to **Admin → Products**
- Click the edit icon on any product
- Update fields as needed
- Click **Update Product**

### Delete a product
- Navigate to **Admin → Products**
- Click the delete icon
- Confirm deletion

### Product visibility
- **Active = ON**: Product appears in catalog, search, and direct links
- **Active = OFF**: Product is hidden from public but exists in the database
- **Featured = ON**: Product appears in the homepage carousel (only if also Active)

---

## Testimonial Management

### Add a testimonial
1. Go to **Admin → Testimonials**
2. Fill in:
   - **Name** — customer name
   - **Role / Company** — optional customer details
   - **Content** — testimonial text
   - **Rating** — 1–5 stars
   - **Image** — optional customer photo URL
   - **Featured** — show on homepage
3. Click **Create Testimonial**

### Featured testimonials
- Toggle **Featured** to show a testimonial on the homepage
- The homepage displays a rotating selection of featured testimonials

---

## Inquiry Management

### How customer inquiries work
- The contact form on the website opens a WhatsApp chat directly
- Inquiries are **not stored in the database** — they go straight to WhatsApp
- This is intentional: WhatsApp enables real-time conversation and faster quotes

### Admin inquiry dashboard
- The admin Inquiry dashboard exists for future use if you want to add form-to-DB persistence
- Currently it will show no records (since inquiries go to WhatsApp)

### To receive WhatsApp messages
- The WhatsApp number is configured in `src/lib/constants.ts`
- Current number: `+91 80079 00737`
- The contact form simply opens `wa.me/918007900737` with the user's message

---

## Image & Media

### Accepted image formats
| Format | Supported |
|--------|-----------|
| JPEG   | Yes       |
| PNG    | Yes       |
| WebP   | Yes       |
| AVIF   | Yes       |
| HEIC   | Yes (iPhone) |
| HEIF   | Yes       |

### Image size limit
- Maximum file size: **5 MB**
- Too-large files show: "File too large (max 5MB)" error
- Images are automatically compressed before upload

### Where images are stored
- All images are uploaded to **Cloudinary** (cloud-based image hosting)
- The upload goes through a secure signed flow — no public upload endpoint
- Folders are organized as: `3dfactory/products/{slug}/` and `3dfactory/testimonials/`

---

## Hosting & Domains

### Vercel (hosting)
- **Dashboard:** [vercel.com](https://vercel.com)
- The project is deployed from the connected Git repository
- Every push to the main branch triggers an automatic deployment
- Deployment logs and analytics are available in the Vercel dashboard

### Domain
- **Primary domain:** `3dfactory.in`
- DNS managed through the domain registrar
- The domain points to Vercel's nameservers

### Environment variables
All secrets are set in the Vercel project dashboard:
- Go to your Vercel project → **Settings** → **Environment Variables**
- These control database access, auth, and image uploads
- Never share these values publicly

---

## Database

### Turso (SQLite)
- The database is hosted on **Turso** — a distributed SQLite platform
- Data is stored in a LibSQL database (SQLite-compatible)

### Schema
The database has 6 tables:
| Table | Purpose |
|-------|---------|
| `users` | Google-authenticated users, admin flag |
| `products` | Product catalog items |
| `product_images` | Gallery images linked to products |
| `testimonials` | Customer reviews |
| `inquiries` | Contact form submissions (reserved) |
| `product_videos` | Video links associated with products |

### Migrations
- Database schema changes are managed through Drizzle migrations
- Migration files are in `src/db/migrations/`
- Run `npm run db:migrate` to apply pending migrations

---

## Tech Stack Overview

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (React 19) |
| Styling | Tailwind CSS v4 |
| Auth | Auth.js v5 with Google OAuth |
| Database | Turso (SQLite via LibSQL) |
| ORM | Drizzle ORM |
| Images | Cloudinary |
| Fonts | Geist (Google Fonts) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel |
| Domain | 3dfactory.in |
