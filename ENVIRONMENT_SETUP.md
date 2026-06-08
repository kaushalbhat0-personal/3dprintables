# Environment Setup Guide

This guide covers setting up the 3D Factory project for local development and for production deployment on Vercel.

---

## Prerequisites

- **Node.js** >= 20.0.0 (use `nvm` to manage versions)
- **npm** (comes with Node.js)
- **Git**
- A **Turso** account (for the database)
- A **Cloudinary** account (for image hosting)
- A **Google Cloud Console** project (for OAuth login)
- A **Vercel** account (for deployment)

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd 3dprintables
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see [Environment Variables Reference](#environment-variables-reference) below).

### 4. Set up Turso database

```bash
# Install Turso CLI
curl -sSfL https://get.turso.tech/install.sh | sh

# Log in to Turso
turso auth login

# Create a new database (or use the existing one)
turso db create 3dfactory-production

# Get the database URL
turso db show 3dfactory-production --url

# Create an auth token
turso db tokens create 3dfactory-production
```

Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env.local`.

### 5. Run database migrations

```bash
npm run db:migrate
```

### 6. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (local dev)
   - `https://3dfactory.in/api/auth/callback/google` (production)
7. Copy the **Client ID** and **Client Secret** to your `.env.local`

### 7. Set up Cloudinary

1. Log in to [Cloudinary](https://cloudinary.com)
2. Go to **Dashboard**
3. Copy your **Cloud Name**, **API Key**, and **API Secret**
4. Add them to your `.env.local`

### 8. Generate an Auth secret

```bash
openssl rand -base64 32
```

Run this in your terminal. Copy the output to `AUTH_SECRET` in `.env.local`.

### 9. Set the admin email

Set `ADMIN_GOOGLE_EMAIL` to the Google email address that should have admin privileges.

### 10. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Vercel Production Setup

### 1. Deploy the project

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your repository
4. Vercel auto-detects Next.js — keep the default settings
5. Click **Deploy**

### 2. Configure environment variables

In the Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add all variables from the [reference table](#environment-variables-reference) below
3. Make sure to set them for **Production**, **Preview**, and **Development** environments as needed

### 3. Custom domain

1. In Vercel project → **Settings** → **Domains**
2. Add `3dfactory.in`
3. Follow Vercel's DNS configuration instructions for your domain registrar
4. Wait for DNS propagation (can take up to 48 hours)

### 4. Production deployment

- Every push to the main branch triggers an automatic deployment
- Preview deployments are created for pull requests
- You can also manually deploy from the Vercel dashboard

---

## Environment Variables Reference

| Variable | Required | Description | How to Get |
|----------|----------|-------------|-----------|
| `TURSO_DATABASE_URL` | Yes | Turso database connection URL | `turso db show <name> --url` |
| `TURSO_AUTH_TOKEN` | Yes | Turso database auth token | `turso db tokens create <name>` |
| `AUTH_SECRET` | Yes | NextAuth.js encryption secret | `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` | Yes | Google OAuth client ID | Google Cloud Console |
| `AUTH_GOOGLE_SECRET` | Yes | Google OAuth client secret | Google Cloud Console |
| `ADMIN_GOOGLE_EMAIL` | Yes | Email for admin account | Your email address |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret | Cloudinary Dashboard |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL | `https://3dfactory.in` |

---

## Database Management

### Apply migrations

```bash
npm run db:migrate
```

Generate a new migration after schema changes:

```bash
# First, edit src/db/schema.ts with your changes
# Then generate the migration
npm run db:generate

# Apply it
npm run db:migrate
```

### Open database studio

```bash
npm run db:studio
```

This opens a browser-based UI to view and edit database contents.

### Manual backup

```bash
turso db shell <database-name> .dump > backup-$(date +%Y%m%d).sql
```

---

## Common Tasks

### Update dependencies

```bash
npm update
```

### Run linter

```bash
npm run lint
```

### Production build test

```bash
npm run build
npm start   # serves the production build locally
```

### Change admin email

1. Update `ADMIN_GOOGLE_EMAIL` in Vercel environment variables
2. The next login from the new email will grant admin access
3. Existing sessions from the old email will still work until logout
