# Freshtively

Freshtively is a React, Vite, TypeScript, Tailwind CSS, and Firebase app for a homemade cultural food delivery marketplace. It supports public pages, Firebase Authentication, role-based dashboards, Firestore data workflows, Firebase Storage uploads, and an admin/developer panel.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Analytics
- Cloudflare Pages

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## Environment Variables

Configure these in `.env.local` for local development and in Cloudflare Pages project settings for production:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=freshtively.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=freshtively
VITE_FIREBASE_STORAGE_BUCKET=freshtively.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=365665740130
VITE_FIREBASE_APP_ID=1:365665740130:web:948f42eff31f318e28f83b
VITE_FIREBASE_MEASUREMENT_ID=G-9P2T5CTP5Z
```

Do not commit `.env.local` or any other real environment file.

## Firebase Setup

In Firebase Console:

1. Enable Authentication.
2. Enable email/password sign-in.
3. Create Cloud Firestore.
4. Create Firebase Storage.
5. Add the web app config values to environment variables.

The app reads Firebase config from [src/config/firebase.ts](/home/engra/Freshtively/src/config/firebase.ts).

## Firebase Rules

Firestore rules are in:

```bash
firestore.rules
```

Storage rules are in:

```bash
storage.rules
```

`firebase.json` is configured to reference both rule files.

Deploy rules with Firebase CLI:

```bash
firebase login
firebase use freshtively
firebase deploy --only firestore:rules,storage
```

## Cloudflare Pages Deployment

Cloudflare Pages settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root

The SPA redirect file is already present:

```bash
public/_redirects
```

Its content:

```text
/* /index.html 200
```

This ensures React Router routes work on refresh and direct links.

## Cloudflare Environment Variables

In Cloudflare Pages:

1. Open the project.
2. Go to Settings.
3. Open Environment variables.
4. Add every `VITE_FIREBASE_*` variable listed above.
5. Redeploy after saving variables.

## Custom Domain

Target domain:

```text
freshtively.marcbd.site
```

In Cloudflare Pages:

1. Open Custom domains.
2. Add `freshtively.marcbd.site`.
3. Follow Cloudflare DNS instructions.
4. Confirm the Pages deployment serves the app over HTTPS.

## Project Structure

```text
src/
  app/
  components/
  config/
  contexts/
  layouts/
  pages/
  services/
  styles/
  types/
```

## Roles

- `consumer`
- `cooker`
- `delivery`
- `admin`

Admin access is controlled by:

```text
users/{uid}.role == "admin"
```

## Production Notes

- Payment is currently placeholder UI.
- Map features are currently placeholder UI.
- Seed data is admin-only and should be removed or disabled before production launch.
- Firebase frontend config is not a server secret, but values must still be managed through environment variables.
- Run `npm run build` before every deployment.
