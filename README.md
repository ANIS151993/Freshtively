# Freshtively

Freshtively is a full-stack web application for a homemade cultural food marketplace. It connects consumers, verified household cookers, delivery partners, and administrators through one role-based system.

**Creator and Copyright Holder:** Md Anisur Rahman Chowdhury

- LinkedIn: https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a
- GitHub: https://github.com/ANIS151993
- Google Scholar: https://scholar.google.com/citations?user=NQyywPoAAAAJ
- Portfolio: https://marcbd.site
- ResearchGate: https://researchgate.net/profile/Md-Anisur-Rahman-Chowdhury

Copyright (c) 2026 Md Anisur Rahman Chowdhury. All rights reserved.

## What Freshtively Does

Freshtively helps people discover and order homemade cultural food from local household cooks. The system is designed around the full order lifecycle:

1. A consumer searches for homemade food.
2. The consumer adds dishes to the cart and starts checkout.
3. A cooker accepts and prepares the order.
4. A delivery partner handles pickup and drop-off.
5. The consumer tracks order status.
6. Admin users monitor users, verification, orders, reviews, support, and platform data.

## Main User Roles

### Consumer

Consumers can browse public pages, sign up, discover dishes, manage cart items, start checkout, view orders, track order states, manage profile details, and submit support requests.

Key routes:

- `/consumer`
- `/consumer/discover`
- `/consumer/cart`
- `/consumer/checkout`
- `/consumer/orders`
- `/consumer/profile`
- `/consumer/support`

### Cooker

Cookers can register as household food sellers, complete verification workflows, manage menus, add dishes, review orders, update availability, review earnings placeholders, and manage support.

Key routes:

- `/cooker`
- `/cooker/menu`
- `/cooker/menu/new`
- `/cooker/orders`
- `/cooker/earnings`
- `/cooker/verification`
- `/cooker/profile`

### Delivery Partner

Delivery partners can register, manage delivery documents, accept delivery requests, view active deliveries, track pickup/drop-off states, review earnings placeholders, and manage support.

Key routes:

- `/delivery`
- `/delivery/requests`
- `/delivery/deliveries`
- `/delivery/map`
- `/delivery/documents`
- `/delivery/earnings`
- `/delivery/profile`

### Admin

Admins manage platform oversight. Admin pages include users, orders, dishes, payments, support, analytics, verification workflows, reviews, settings, and seed data.

Key routes:

- `/admin`
- `/admin/users`
- `/admin/orders`
- `/admin/dishes`
- `/admin/payments`
- `/admin/support`
- `/admin/analytics`
- `/admin/seed-data`

Admin access is controlled by:

```text
users/{uid}.role == "admin"
```

## Public Website Pages

The public website explains the platform before login:

- `/` - homepage
- `/discover` - public discovery preview
- `/about` - mission and story
- `/how-it-works` - order workflow
- `/safety` - verification and trust
- `/become-a-cooker` - cooker onboarding
- `/become-a-delivery-person` - delivery onboarding
- `/help` - help center
- `/contact` - contact UI
- `/founder` - creator profile for Md Anisur Rahman Chowdhury

## Technology Stack

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

## Project Structure

```text
src/
  app/          Router and application shell
  components/   Shared UI components, cards, forms, layout, auth guards
  config/       Firebase configuration
  contexts/     Auth and cart state
  data/         Mock/demo data
  layouts/      Public, auth, consumer, cooker, delivery, and admin layouts
  pages/        Route pages for every role
  services/     Firebase and domain service helpers
  styles/       Global CSS and design tokens
  types/        Shared TypeScript types
  utils/        Utility helpers
```

Other important files:

```text
firestore.rules       Cloud Firestore security rules
storage.rules         Firebase Storage security rules
firebase.json         Firebase rule deployment config
public/_redirects     Cloudflare Pages SPA redirect
.env.example          Environment variable template
docs/index.html       GitHub website documentation page
```

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

## Environment Variables

Configure these in `.env.local` for local development and in Cloudflare Pages for production:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=freshtively.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=freshtively
VITE_FIREBASE_STORAGE_BUCKET=freshtively.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=365665740130
VITE_FIREBASE_APP_ID=1:365665740130:web:948f42eff31f318e28f83b
VITE_FIREBASE_MEASUREMENT_ID=G-9P2T5CTP5Z
```

Do not commit `.env.local`, Firebase private keys, service account files, tokens, or passwords.

## Firebase Setup

In Firebase Console:

1. Create or open the `freshtively` Firebase project.
2. Enable Firebase Authentication.
3. Enable email/password sign-in.
4. Create Cloud Firestore.
5. Create Firebase Storage.
6. Add the Firebase web app config values to environment variables.
7. Publish Firestore and Storage rules.

The app reads Firebase config from `src/config/firebase.ts`.

## Firebase Rules

Firestore rules are stored in:

```bash
firestore.rules
```

Storage rules are stored in:

```bash
storage.rules
```

Deploy rules with Firebase CLI:

```bash
firebase login
firebase use freshtively
firebase deploy --only firestore:rules,storage
```

## Cloudflare Pages Deployment

Cloudflare Pages settings:

- Repository: `ANIS151993/Freshtively`
- Branch: `main`
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root

The app includes `public/_redirects`:

```text
/* /index.html 200
```

This is required so React Router pages work after refresh or direct navigation.

## Cloudflare Environment Variables

In Cloudflare Pages:

1. Open the Freshtively Pages project.
2. Go to Settings.
3. Open Environment variables.
4. Add every `VITE_FIREBASE_*` variable.
5. Save.
6. Redeploy the latest production build.

## Custom Domain

Target domain:

```text
freshtively.marcbd.site
```

In Cloudflare Pages:

1. Open Custom domains.
2. Add `freshtively.marcbd.site`.
3. Follow Cloudflare DNS instructions.
4. Confirm HTTPS is active.

## How To Use The App

### Public Visitor

1. Open the homepage.
2. Read About, How it works, Safety, Help, and Contact pages.
3. Open Founder to see the creator profile.
4. Choose Login or Get started.

### New Consumer

1. Select the consumer role.
2. Create an account.
3. Browse the consumer dashboard.
4. Discover dishes.
5. Add dishes to cart.
6. Review checkout.
7. Track orders from the Orders area.

### New Cooker

1. Select the cooker role.
2. Create an account.
3. Complete profile and verification placeholders.
4. Add dishes in Menu.
5. Manage orders from the cooker dashboard.
6. Review earnings and support placeholders.

### New Delivery Partner

1. Select the delivery role.
2. Create an account.
3. Complete document and vehicle placeholders.
4. Review delivery requests.
5. Track active pickup and drop-off workflows.
6. Review earnings and support placeholders.

### Admin

1. Sign in with an account whose Firestore user document has role `admin`.
2. Open `/admin`.
3. Review users, cookers, delivery partners, verification, dishes, orders, support, payments, analytics, and seed data.

## Current Production Notes

- Payment is placeholder UI and is not connected to a live payment processor.
- Map features are placeholder UI.
- Mobile app download buttons are placeholders.
- Seed data is admin-only and should be disabled or removed before a real production launch.
- Firestore and Storage rules must be deployed before production testing.
- Firebase frontend config is not a server secret, but real environment files must not be committed.
- Run `npm run build` before deployment.

## Design System Source

The repository includes the Stitch UI/UX design references under:

```text
stitch_freshtively_ui_ux_design_system/
```

These files document the visual direction, screen concepts, and premium Freshtively interface patterns used to build the React app.

## License And Ownership

This project, its source code, documentation, design implementation, and system concept are owned by Md Anisur Rahman Chowdhury unless a separate written license says otherwise.

Copyright (c) 2026 Md Anisur Rahman Chowdhury. All rights reserved.
