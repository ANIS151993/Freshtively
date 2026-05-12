---
name: Artisanal Hearth
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  display-lg:
    fontFamily: outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The visual identity of this design system centers on the intersection of cultural heritage and modern convenience. It is designed to evoke the feeling of a neighbor’s kitchen—warm, inviting, and safe—while maintaining the precision and reliability of a premium delivery service. 

The aesthetic direction is **Modern-Tactile**. It avoids the clinical coldness of traditional tech platforms by utilizing organic curves, sun-drenched color accents, and soft, diffused shadows that suggest physical depth. The brand essence is rooted in authenticity; every interface element should feel like a curated invitation into a cultural culinary experience. This is achieved through generous whitespace, high-quality photography, and a color palette that mirrors fresh ingredients and natural earth tones.

## Colors

This design system utilizes a palette inspired by the earth and the garden. 

- **Primary (Fresh Emerald):** Used for "action" states, success indicators, and branding elements that emphasize freshness and safety.
- **Secondary (Saffron):** A warm, appetizing hue used for highlights, ratings, and elements that need to draw attention without the urgency of a warning.
- **Accent (Clay Terracotta):** Reserved for high-energy interactions, price points, and "Add to Cart" actions, mimicking the vibrant color of spices and traditional cookware.
- **Backgrounds:** The interface avoids pure white (#FFFFFF) in favor of **Light Cream** and **Off-white**. This reduces eye strain and provides a "paper-like" warmth that feels more homemade than digital.

## Typography

The chosen typeface, **Outfit**, provides a perfect balance between geometric professionalism and friendly approachability. Its wide apertures and rounded terminals echo the soft corner radius of the UI components.

For the hierarchy, **Display** and **Headline** styles use a tighter letter-spacing and heavier weight to ground the page. **Body** text is set with generous line heights to ensure legibility when reading ingredient lists or chef bios. **Labels** are slightly tracked out and use a semi-bold weight to remain distinct even at smaller sizes.

## Layout & Spacing

The design system employs a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile devices. 

A strict 8px spacing scale governs all internal padding and margins. To maintain the "premium" feel, the system leans toward larger spacing values (24px+) between distinct content blocks. 
- **Desktop:** 40px side margins with 24px gutters.
- **Tablet:** 24px side margins with 16px gutters.
- **Mobile:** 16px side margins with 12px gutters.

Content containers should never exceed 1280px to maintain optimal line lengths for readability.

## Elevation & Depth

To achieve a modern yet trustworthy feel, this design system uses **Ambient Shadows** rather than harsh outlines. Elevation is used to denote interactivity and information hierarchy.

- **Level 0 (Flat):** Used for the main background (Light Cream).
- **Level 1 (Subtle):** Low-opacity, wide-spread shadow used for stationary cards and input fields.
- **Level 2 (Active):** Slightly deeper shadow with a small vertical offset, used for hover states and active navigation elements.
- **Level 3 (Overlay):** High-diffusion, soft shadow used for modals and floating action buttons, ensuring they feel "lifted" above the cultural content.

Depth is further enhanced with **Tonal Layers**, where a slightly darker neutral shade is used to group related items (e.g., a filter sidebar on a search page).

## Shapes

The shape language is defined by significant **roundedness (16px/1rem)** to reinforce the friendly and community-based brand essence. Sharp corners are avoided entirely as they feel too corporate or aggressive for a food-based platform.

- **Small Components (Buttons, Chips):** 0.5rem (8px) radius.
- **Medium Components (Input fields, standard cards):** 1rem (16px) radius.
- **Large Components (Hero sections, bottom sheets):** 1.5rem (24px) radius.
- **Full Round:** Used exclusively for search bars and notification badges to create a "pill" effect.

## Components

### Buttons
Primary buttons utilize a soft gradient of the Fresh Emerald palette. They feature a subtle "lift" micro-interaction on hover (moving -2px vertically) and a slight scale-down (0.98x) on click to provide tactile feedback.

### Cards
Cards are the primary vehicle for food items and chef profiles. They feature a 1px soft neutral border combined with Level 1 elevation. Images within cards should always have a top-rounded radius matching the container, emphasizing the "fresh" photography.

### Input Fields
Forms utilize the Off-white background with a subtle inset shadow to appear "etched" into the interface. Focus states transition the border color to Primary Emerald with a soft glow effect.

### Chips & Tags
Used for dietary restrictions (e.g., "Vegan," "Gluten-Free") and cultural categories. These use low-saturation versions of the brand colors with high-contrast text to ensure accessibility while remaining visually secondary to the main food imagery.

### Micro-interactions
Interactive icons (like the "Favorite" heart or "Add to Cart" plus) should utilize elastic transitions, feeling "squishy" and responsive to the touch, reinforcing the homemade, human feel of the platform.