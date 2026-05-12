# Freshtively

> A role-based homemade cultural food marketplace system built with React, TypeScript, Firebase, and Cloudflare Pages.

[![React](https://img.shields.io/badge/React-UI-149eca)](#technology-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-Type_Safe-3178c6)](#technology-stack)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-ffca28)](#firebase-system)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deploy-f38020)](#cloudflare-pages-deployment)
[![Owner](https://img.shields.io/badge/Owner-Md_Anisur_Rahman_Chowdhury-087a52)](#creator-and-ownership)

Freshtively is not only a food ordering interface. It is a complete marketplace system that connects four operational roles:

- Consumers who discover and order homemade cultural food.
- Cookers who register verified home kitchens and manage dishes.
- Delivery partners who handle pickup and drop-off workflows.
- Admins who monitor users, verification, orders, support, and platform activity.

The system is designed for Firebase Authentication, Cloud Firestore, Firebase Storage, Cloudflare Pages hosting, and a public documentation website.

## Explore The System

Use this section like a control panel.

| I want to... | Go here |
| --- | --- |
| Understand the product idea | [System Purpose](#system-purpose) |
| See every user role | [Role-Based System](#role-based-system) |
| Follow the food order lifecycle | [Marketplace Workflow](#marketplace-workflow) |
| Review the app routes | [Route Map](#route-map) |
| Run the app locally | [Local Development](#local-development) |
| Connect Firebase | [Firebase System](#firebase-system) |
| Deploy to Cloudflare Pages | [Cloudflare Pages Deployment](#cloudflare-pages-deployment) |
| See the creator profile | [Creator And Ownership](#creator-and-ownership) |

## System Purpose

Freshtively is built around one core idea:

> Make homemade cultural food easier to discover, order, prepare, deliver, and manage through a trusted digital marketplace.

The system supports:

- Public discovery pages for visitors.
- Signup and login with Firebase Authentication.
- Role selection for consumer, cooker, and delivery accounts.
- Consumer shopping, cart, checkout, order, and profile flows.
- Cooker onboarding, menu, order, verification, earnings, and support flows.
- Delivery request, active delivery, document, earnings, and support flows.
- Admin monitoring for users, orders, verification, dishes, payments, support, analytics, and seed data.
- Firebase security rules for Firestore and Storage.
- Cloudflare Pages deployment with SPA routing support.
- GitHub documentation through `docs/index.html`.

## Marketplace Workflow

```text
Public visitor
  -> explores Freshtively
  -> chooses a role
  -> creates an account
  -> enters role dashboard

Consumer
  -> discovers dishes
  -> adds food to cart
  -> reviews checkout
  -> places order flow
  -> tracks order status

Cooker
  -> verifies kitchen profile
  -> creates menu items
  -> receives order request
  -> accepts and prepares food
  -> coordinates handoff

Delivery partner
  -> verifies documents
  -> accepts delivery request
  -> picks up order
  -> completes drop-off

Admin
  -> reviews users
  -> monitors orders
  -> checks verification
  -> manages support and platform data
```

## Role-Based System

<details open>
<summary><strong>Consumer Experience</strong></summary>

Consumers use Freshtively to find homemade cultural food nearby.

Core capabilities:

- Browse public pages before login.
- Create a consumer account.
- Discover dishes and cookers.
- Add dishes to cart.
- Review checkout screens.
- Track orders.
- Manage profile, notifications, favorites, support, addresses, payment placeholders, and dietary preferences.

Main routes:

```text
/consumer
/consumer/discover
/consumer/cart
/consumer/checkout
/consumer/orders
/consumer/profile
/consumer/support
```

</details>

<details open>
<summary><strong>Cooker Experience</strong></summary>

Cookers use Freshtively to operate a home kitchen marketplace profile.

Core capabilities:

- Create a cooker account.
- Complete kitchen and document verification placeholders.
- Manage profile and availability.
- Add and edit dishes.
- Manage active and historical orders.
- Review ratings, earnings placeholders, support, and payout placeholders.

Main routes:

```text
/cooker
/cooker/menu
/cooker/menu/new
/cooker/orders
/cooker/earnings
/cooker/verification
/cooker/profile
```

</details>

<details open>
<summary><strong>Delivery Partner Experience</strong></summary>

Delivery partners use Freshtively to move orders from home kitchens to consumers.

Core capabilities:

- Create a delivery account.
- Complete vehicle and document verification placeholders.
- Review nearby delivery requests.
- Track active pickup and drop-off states.
- Manage profile, ratings, earnings placeholders, support, and document records.

Main routes:

```text
/delivery
/delivery/requests
/delivery/deliveries
/delivery/map
/delivery/documents
/delivery/earnings
/delivery/profile
```

</details>

<details open>
<summary><strong>Admin Experience</strong></summary>

Admins manage platform oversight and system quality.

Core capabilities:

- View platform dashboard.
- Manage consumers, cookers, and delivery users.
- Review cooker and delivery verification.
- Monitor orders, dishes, reviews, support, payments, refunds, analytics, and settings.
- Seed demo data for testing.

Main routes:

```text
/admin
/admin/users
/admin/orders
/admin/dishes
/admin/payments
/admin/support
/admin/analytics
/admin/seed-data
```

Admin access depends on the Firestore user document:

```text
users/{uid}.role == "admin"
```

</details>

## Public Website

The public site introduces the platform before login.

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Main product entry point |
| Discover | `/discover` | Public discovery preview |
| About | `/about` | Mission and product story |
| How it works | `/how-it-works` | Food order workflow |
| Safety | `/safety` | Trust, verification, and support |
| Become a cooker | `/become-a-cooker` | Cooker onboarding message |
| Become a delivery partner | `/become-a-delivery-person` | Delivery partner onboarding message |
| Help | `/help` | Support and FAQ |
| Contact | `/contact` | Contact form placeholder |
| Founder | `/founder` | Creator profile for Md Anisur Rahman Chowdhury |

## Route Map

```text
/                          Public home
/discover                  Public discovery preview
/about                     About Freshtively
/how-it-works              Marketplace workflow
/safety                    Safety and trust
/founder                   Creator profile
/login                     Login
/role-selection            Choose account type
/signup/:role              Create account by role

/consumer/*                Consumer application
/cooker/*                  Cooker application
/delivery/*                Delivery partner application
/admin/*                   Admin application
```

## System Architecture

```text
React + Vite + TypeScript
  -> React Router route tree
  -> Layouts by access area
  -> Role-protected route guards
  -> Context providers for auth and cart
  -> Service layer for Firebase operations
  -> Firestore documents and Storage uploads
  -> Firebase security rules
  -> Cloudflare Pages static deployment
```

## Project Structure

```text
src/
  app/          Router and application shell
  components/   Shared UI, cards, forms, layout, modals, auth guards
  config/       Firebase app configuration
  contexts/     Auth and cart state
  data/         Mock and demo records
  layouts/      Public, auth, consumer, cooker, delivery, admin shells
  pages/        Route pages for every system role
  services/     Auth, users, dishes, orders, storage, notifications
  styles/       Global styles and design tokens
  types/        Shared TypeScript domain types
  utils/        Utility helpers
```

Important root files:

```text
README.md            Main project documentation
docs/index.html      GitHub website documentation page
firebase.json        Firebase rules deployment config
firestore.rules      Cloud Firestore security rules
storage.rules        Firebase Storage security rules
public/_redirects    Cloudflare Pages SPA redirect
.env.example         Environment variable template
package.json         Scripts and dependencies
vite.config.ts       Vite build configuration
tailwind.config.ts   Tailwind design configuration
```

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| File uploads | Firebase Storage |
| Analytics | Firebase Analytics |
| Hosting | Cloudflare Pages |
| Documentation | GitHub README and `docs/index.html` |

## Local Development

<details open>
<summary><strong>Run Freshtively locally</strong></summary>

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

Preview the production build:

```bash
npm run preview
```

</details>

## Firebase System

Freshtively uses Firebase as the application backend.

### Required Firebase Services

- Firebase Authentication
- Email/password sign-in
- Cloud Firestore
- Firebase Storage
- Firebase Analytics

### Environment Variables

Add these values to `.env.local` for local development and to Cloudflare Pages for production.

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=freshtively.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=freshtively
VITE_FIREBASE_STORAGE_BUCKET=freshtively.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=365665740130
VITE_FIREBASE_APP_ID=1:365665740130:web:948f42eff31f318e28f83b
VITE_FIREBASE_MEASUREMENT_ID=G-9P2T5CTP5Z
```

Never commit `.env.local`, service account files, private keys, tokens, or passwords.

### Rules Files

```text
firestore.rules
storage.rules
```

Deploy rules:

```bash
firebase login
firebase use freshtively
firebase deploy --only firestore:rules,storage
```

## Cloudflare Pages Deployment

Use these Cloudflare Pages settings:

| Setting | Value |
| --- | --- |
| Repository | `ANIS151993/Freshtively` |
| Branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | Repository root |

The app includes this SPA redirect in `public/_redirects`:

```text
/* /index.html 200
```

This makes direct links and browser refresh work for React Router pages.

Target custom domain:

```text
freshtively.marcbd.site
```

## GitHub Website Documentation

This repository includes a standalone GitHub website page:

```text
docs/index.html
```

To publish it with GitHub Pages:

1. Open the GitHub repository settings.
2. Go to Pages.
3. Select source branch `main`.
4. Select folder `/docs`.
5. Save and wait for GitHub Pages to publish.

## Current Production Status

| Area | Status |
| --- | --- |
| Public website | Implemented |
| Auth screens | Implemented |
| Role dashboards | Implemented |
| Firebase config | Implemented through environment variables |
| Firestore rules | Included |
| Storage rules | Included |
| Consumer cart and checkout UI | Implemented |
| Cooker menu/order UI | Implemented |
| Delivery workflow UI | Implemented |
| Admin dashboard UI | Implemented |
| Payment processor | Placeholder |
| Maps | Placeholder |
| Mobile app store links | Placeholder |
| Seed data | Admin-only testing tool |

## Design System

The visual design source is stored in:

```text
stitch_freshtively_ui_ux_design_system/
```

It includes screen references, UI direction, brand logo concepts, dashboard patterns, onboarding pages, discovery pages, safety pages, and admin screens used to shape the React implementation.

## Creator And Ownership

**Md Anisur Rahman Chowdhury** is the creator, owner, and copyright holder of Freshtively.

Professional profiles:

- LinkedIn: https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a
- GitHub: https://github.com/ANIS151993
- Google Scholar: https://scholar.google.com/citations?user=NQyywPoAAAAJ
- Portfolio: https://marcbd.site
- ResearchGate: https://researchgate.net/profile/Md-Anisur-Rahman-Chowdhury

## License And Copyright

This project, source code, documentation, design implementation, system concept, and related Freshtively materials are owned by Md Anisur Rahman Chowdhury unless a separate written license says otherwise.

Copyright (c) 2026 Md Anisur Rahman Chowdhury. All rights reserved.
