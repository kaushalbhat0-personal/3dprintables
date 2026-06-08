# Recovery Guide

Procedures for recovering from data loss, authentication issues, deployment failures, and other incidents.

---

## Table of Contents

- [Database Backup & Restore (Turso)](#database-backup--restore-turso)
- [Cloudinary Image Recovery](#cloudinary-image-recovery)
- [Vercel Rollback](#vercel-rollback)
- [Authentication Recovery](#authentication-recovery)
- [Full Disaster Recovery](#full-disaster-recovery)

---

## Database Backup & Restore (Turso)

### Automated backup (no built-in feature)

Turso does not have an automated backup UI. You must manually dump the database.

**Schedule a weekly reminder** to run this command:

```bash
turso db shell <database-name> .dump > backup-$(date +%Y%m%d).sql
```

Store the backup file in a safe location (Google Drive, Dropbox, or a private GitHub repo).

### Download a backup

Via Turso CLI:

```bash
turso db shell <database-name> .dump > 3dfactory-backup-2025-01-01.sql
```

This produces a complete SQL dump that can recreate all tables and data.

### Restore from backup

1. Create a new Turso database:

```bash
turso db create 3dfactory-restore
```

2. Get the new database URL and token:

```bash
turso db show 3dfactory-restore --url
turso db tokens create 3dfactory-restore
```

3. Restore the backup:

```bash
turso db shell 3dfactory-restore < backup-2025-01-01.sql
```

4. Update `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in Vercel environment variables to point to the new database.

5. Redeploy the application in Vercel (or it will auto-deploy after the env var change).

### Point-in-time recovery

Turso does not currently support point-in-time recovery. Use regular backups (see above).

### Verify backup integrity

```bash
# Check that the backup file is valid SQL
head -20 backup-2025-01-01.sql
# Should start with CREATE TABLE statements

# Check file size (should be non-zero)
ls -lh backup-2025-01-01.sql
```

---

## Cloudinary Image Recovery

### If images are deleted or corrupted

1. **Check the Cloudinary Recycle Bin:**
   - Log in to [Cloudinary Console](https://console.cloudinary.com)
   - Go to **Media Library** → **Trash**
   - Deleted images remain in the trash for 90 days
   - Select images and click **Restore**

2. **Re-upload from local backups:**
   - If you have local copies of product images, re-upload through the admin panel
   - Go to **Admin → Products → Edit** → upload images again

3. **Check upload history:**
   - Cloudinary Dashboard → **Media Library** → search by folder name
   - Images are organized under `3dfactory/products/{slug}/`

### Image URL structure

Images are served from Cloudinary via:

```
https://res.cloudinary.com/{cloud-name}/image/upload/f_auto,q_auto/{version}/{folder}/{filename}
```

- `f_auto,q_auto` — automatic format and quality optimization
- If you need to restore URLs, you can reconstruct them from the public ID stored in the database

### Recovering from a deleted Cloudinary account

1. Contact Cloudinary support immediately
2. If the account is within 30 days of deletion, it can be restored
3. If restoration is not possible:
   - All product images will need to be re-uploaded
   - The database stores image URLs — those will 404
   - Update each product's `featured_image` and `gallery_images` fields with new URLs

---

## Vercel Rollback

### Rollback to a previous deployment

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Deployments**
4. Find the deployment you want to restore
5. Click the **...** (more) menu on that deployment
6. Select **Promote to Production**

This instantly reverts the live site to the selected deployment.

### Rollback via Git (preferred)

1. Find the commit hash of the version you want to restore:

```bash
git log --oneline
```

2. Create a revert branch:

```bash
git revert --no-commit <bad-commit-hash>..HEAD
git commit -m "Revert to stable version"
git push origin main
```

3. Vercel automatically deploys the reverted code.

### Rollback environment variables

If a deployment failure was caused by incorrect environment variables:

1. Go to **Vercel → Project → Settings → Environment Variables**
2. Edit or remove the incorrect variable
3. Trigger a new deployment:
   - Go to **Deployments**
   - Click **Redeploy** on the last successful deployment
   - The new deployment uses the corrected environment variables

### Handling a broken build on main branch

If the latest push broke the build:

1. In Vercel, go to **Deployments**
2. Find the last successful deployment (marked with a green checkmark)
3. Click **...** → **Promote to Production**
4. This keeps the live site running while you fix the code
5. Fix the issue locally, push a fix, and let Vercel deploy normally

---

## Authentication Recovery

### Google OAuth stops working

1. Check the AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in Vercel environment variables
2. Verify in [Google Cloud Console](https://console.cloud.google.com):
   - Go to **APIs & Services** → **Credentials**
   - Ensure the OAuth client ID is active
   - Check that the redirect URI is correct:
     - `https://3dfactory.in/api/auth/callback/google`
   - Verify the OAuth consent screen is in **Testing** or **Production** mode
   - If in **Testing** mode, ensure your admin email is added as a test user
3. If credentials were revoked, generate new ones and update environment variables

### No one can log in

If login fails for everyone:

1. Check `AUTH_SECRET` — if changed, all existing sessions are invalidated
2. Check `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are correct
3. Check `AUTH_URL` is set to `https://3dfactory.in`
4. Try logging in from an incognito/private window
5. Check Vercel function logs for errors:
   - **Vercel → Project → Logs** → search for "auth" or "NextAuth"

### Admin access lost

If you can log in but don't have admin privileges:

1. Update `ADMIN_GOOGLE_EMAIL` in Vercel environment variables
2. The environment variable should be the exact email you use to sign in
3. Log out and log back in
4. Check Vercel logs to confirm the email is being read correctly

### Emergency: Grant admin via database

If nothing else works, you can manually set admin role:

1. Connect to the Turso database:

```bash
turso db shell <database-name>
```

2. Find your user:

```sql
SELECT id, email, role FROM users WHERE email = 'your-email@example.com';
```

3. Update role to admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

4. Log out and log back in.

---

## Full Disaster Recovery

### Scenario: Everything is lost (database + images + deployment)

1. **Restore Vercel deployment:**
   - Go to Vercel → Deployments
   - Find any past deployment and promote to production
   - The site will come back with whatever data was available at that time

2. **Restore database:**
   - If you have a SQL backup (see [Database Backup](#database-backup--restore-turso)):
     - Create a new Turso database
     - Restore the backup into it
     - Update Vercel env vars with the new database URL and token
   - If you have NO backup:
     - You start with an empty database
     - You'll need to re-enter all products and testimonials through the admin panel

3. **Recover images:**
   - Check Cloudinary trash (90-day retention)
   - Restore deleted images
   - If Cloudinary account was also lost:
     - Re-upload product images through the admin panel
     - You'll need the original image files

4. **Verify functionality:**
   - Test login with Google OAuth
   - Verify admin access
   - Check that product pages load
   - Verify homepage carousel and testimonials

### Emergency contact numbers

| Service | Contact |
|---------|---------|
| Vercel Support | https://vercel.com/support |
| Turso Support | https://turso.tech/support |
| Cloudinary Support | https://cloudinary.com/support |
| Google Cloud Support | https://cloud.google.com/support |

---

## Checklist: Before Launch

- [ ] Database backup saved to external storage
- [ ] `.env.example` is up to date
- [ ] ADMIN_GOOGLE_EMAIL points to a valid email you control
- [ ] All environment variables are set in Vercel
- [ ] Google OAuth redirect URI matches production domain
- [ ] Test login/logout flow
- [ ] Test admin access
- [ ] Create a test product and verify it appears on the live site
- [ ] Verify Cloudinary uploads work from the admin panel
- [ ] Check that `/robots.txt` and `/sitemap.xml` are accessible
- [ ] Verify custom domain SSL is active (no certificate warnings)
- [ ] Weekly backup reminder is set up
