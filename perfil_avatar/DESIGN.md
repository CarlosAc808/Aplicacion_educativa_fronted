---
name: QuestVerse
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8ea'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#f0ebfe'
  surface-container-high: '#eae6f8'
  surface-container-highest: '#e4e0f3'
  on-surface: '#1b1a27'
  on-surface-variant: '#474556'
  inverse-surface: '#302f3d'
  inverse-on-surface: '#f3eeff'
  outline: '#787588'
  outline-variant: '#c9c4d9'
  surface-tint: '#5a35f4'
  primary: '#4200dd'
  on-primary: '#ffffff'
  primary-container: '#5b36f5'
  on-primary-container: '#dcd5ff'
  inverse-primary: '#c8bfff'
  secondary: '#006874'
  on-secondary: '#ffffff'
  secondary-container: '#56eaff'
  on-secondary-container: '#006773'
  tertiary: '#6a3d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#8c5100'
  on-tertiary-container: '#ffd1a8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8bfff'
  on-primary-fixed: '#190064'
  on-primary-fixed-variant: '#4100db'
  secondary-fixed: '#97f0ff'
  secondary-fixed-dim: '#3dd9ed'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#ffdcbe'
  tertiary-fixed-dim: '#ffb870'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#fcf8ff'
  on-background: '#1b1a27'
  surface-variant: '#e4e0f3'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '800'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter-xs: 0.25rem
  gutter-sm: 0.5rem
  gutter-md: 1rem
  gutter-lg: 1.5rem
  gutter-xl: 2rem
  margin-mobile: 1rem
  margin-tablet: 1.5rem
  card-padding-sm: 0.75rem
  card-padding-md: 1.25rem
  card-padding-lg: 1.75rem
  touch-target-min: 3rem
---

## Brand & Style

This design system targets tweens aged 9 to 11—a critical developmental cohort that firmly rejects preschool aesthetic tropes (primary-block colors, chunky blob shapes, condescending cartoon visuals) in favor of visual autonomy, game-inspired agency, and sharp, dynamic styling akin to modern mobile games and creator platforms.

The design movement blends **Tactile Playful Neo-Digital** with **High-Energy Geometric Structuring**. It avoids babyish skeuomorphism, opting instead for crisp vector geometry, energetic micro-depth, luminous accent strokes, and rich saturation anchored over a spotless, high-contrast light foundation.

### Core Tenets
- **Empowered & Adventurous:** The UI conveys exploration, agency, and intellectual confidence. Interactions feel snappy, confident, and rewarding.
- **Game-Native Tactility:** Interactive components feature subtle physical feedback—chunky bottom-edge borders (2.5D push-state depth), kinetic spring physics, and vibrant glowing progress states.
- **Modular Color Coding:** Distinct subject worlds (Science, Math, Literature) boast ownable color identities that take over accent cards, badges, and path nodes without destabilizing the neutral shell.

## Colors

The color palette is calibrated for high-energy focus on light backdrops. Rather than flat, muddy tones, colors are saturated and crisp, achieving WCAG AA contrast against clean whites and light slate containers.

### Core Palette
- **Primary (Electric Violet / Deep Indigo - `#5B36F5`):** Serves as the navigational spine, app identity, quest hubs, and level-up milestones.
- **Secondary (Vibrant Cyan / Science Teal - `#00C2D6`):** Dedicated to STEM/Science missions, discovery streams, and energy boosts.
- **Tertiary (Warm Amber / Math Blaze - `#FF9800`):** Powers Math challenges, XP streaks, timer alerts, and daily multiplier tokens.
- **Subject Accent (Emerald / Lore Green - `#10B981`):** Represents Literature, Language Arts, and story completion tracks.
- **Neutral (Midnight Slate - `#1A1926`):** The primary text and structural ink color, avoiding pure `#000000` to prevent harsh visual fatigue while preserving bold clarity.

### Functional Roles & Canvas
- **App Background:** `#F7F8FD` (Subtle cool-tinted paper background).
- **Surface Container:** `#FFFFFF` (High-contrast card and module background).
- **Surface Low:** `#EFF2F9` (Recessed wells, inactive progress rails, and badge bases).
- **Tactile Edge / Shade Tint:** Every key button and actionable card utilizes a 20% darker shade of its primary fill color for its bottom-edge 3D push border.

## Typography

**Plus Jakarta Sans** is the unified font family across display, body, and UI labels. Its geometric underpinnings provide high digital legibility, while its open apertures, rounded counters, and friendly character terminals keep screens approachable without regressing into toddler-oriented rounded novelties.

### Typographic Hierarchy
- **Game Titles & Milestones (`headline-xl`, `headline-lg`):** Extra-bold weight with tight letter tracking for high-impact module banners, quest unlocks, and celebration popups.
- **Card Headers & Stats (`headline-md`, `title-lg`, `title-md`):** Bold weights that anchor challenge cards and interactive prompt scenarios.
- **Narrative & Explanation (`body-lg`, `body-md`):** Medium weights (500) that balance scanning clarity with deep reading comprehension across diverse reading fluencies.
- **Gamer Badges, Level Pills, and Meters (`label-lg`, `label-md`, `label-sm`):** Bold and extra-bold weights with uppercase styling for XP indicators, countdown timers, and streak badges.

## Layout & Spacing

Layouts are constructed on a flexible 4px/8px modular rhythm designed for mobile-first thumb zones, fast tactile tapping, and fluid scrolling.

### Form-Factor Adaptations
- **Mobile (<640px):** Single-column stacked layouts utilizing `margin-mobile` (16px) margins. Path-based progression maps curve vertically with fixed 48px minimum touch targets to accommodate varying dexterity. Bottom navigation dock houses primary adventure hubs.
- **Tablet (640px - 1024px):** 2-column or split-pane view (left: interactive learning canvas, right: quest checklist / character companion feedback) with `margin-tablet` (24px) gutters.
- **Touch Targets:** Any interactive button, choice token, or path point must sustain a minimum bounding box of 48px × 48px (`touch-target-min`).

## Elevation & Depth

Visual hierarchy uses physical, 2.5D game cartography rather than diffuse blur-only drop shadows. Cards and buttons possess defined structural layers that compress on contact.

### Elevation Levels
- **Ground (Level 0):** The app canvas (`#F7F8FD`).
- **Surface Flat (Level 1):** Inactive quest cards and progress wells. Styled with a crisp 1.5px border (`#E4E7F2`) and 0px elevation.
- **Raised Interactive (Level 2):** Primary cards, interactive lesson options, and badges. Features a 1px border combined with a directional 4px vertical tactile shelf (`box-shadow: 0 4px 0 #E2E6F3`).
- **Floating Accent / Primary Action (Level 3):** Call-to-action buttons and floating status bars. Constructed with an integrated solid offset: `box-shadow: 0 4px 0 [Color-Darkened-20%]`, which drops to `0 0 0` with a 4px transform translation when pressed.
- **Overlays & Reward Popups (Level 4):** Semi-transparent neutral backdrop (`rgba(26, 25, 38, 0.6)`) with high-contrast centered modal cards elevated with a glowing radial aura matching the earned reward's color tint.

## Shapes

The shape system employs balanced, modern rounded geometry that feels dynamic and friendly without morphing into amorphous fluid shapes.

- **Tokens & Small Pills:** Fully rounded (`rounded-full` / 9999px) for XP tallies, streak counters, and subject tags.
- **Standard Cards & Modals:** 16px radius (`rounded-lg`), delivering crisp containment for multi-part quiz modules and quest paths.
- **Key Action Controls:** 12px to 16px radius, matching the inner curvature of their containing parent cards.

## Components

### Buttons & Action Triggers
- **Primary 3D Push Button:** Solid fill (Violet, Cyan, Amber, or Green) with a 4px solid bottom shelf in a matching deeper shade. Upper face holds high-contrast white bold typography. Active state translates the element 4px downward and removes the bottom shelf for an instant physical click response.
- **Ghost Action / Secondary:** High-contrast white surface with 2px stroke matching the current subject theme, housing a muted 2px bottom shadow.

### Chips & Pill Badges
- **Stat & Level Chips:** Fully rounded compact containers with a light tinted background (12% opacity of subject color), holding a bold icon (fire streak, star, lightning bolt) paired with uppercase `label-md` numerical copy.
- **Status Pills:** Crisp, solid 2px outline variants designating subject tracks (e.g., "MATH QUEST", "SCIENCE LAB").

### Quest Cards & Module Nodes
- **Adventure Path Nodes:** Circular or hexagonal floating nodes along a vertical serpentine trail. Completed nodes display vivid color fills with a checkmark; the current active node pulses with a subtle color ring; locked nodes remain muted slate with a subtle padlock glyph.
- **Challenge Cards:** Crisp white surface with rounded 16px corners, highlighted with a 4px colored accent strip across the top border denoting the subject domain.

### Glowing Progress Bars & Energy Tracks
- **Track Rail:** Recessed neutral well (`#EFF2F9`) with inner inset shadow.
- **Fill Bar:** Vivid gradient fill (e.g., `#00C2D6` to `#5B36F5`) with a pill terminus, capped with a luminous accent line along the top edge for a crystalline energy container aesthetic.

### Selection Controls & Quiz Inputs
- **Multiple Choice Tokens:** Raised Level 2 rounded rectangles. Neutral state features `#FFFFFF` surface with `#E4E7F2` border. Tapping transitions the card into high-contrast primary selection with an animated checkmark indicator.
- **Checkboxes & Radios:** 24px wide, chunky geometric forms with 6px rounded corners, utilizing thick 3px white checkmarks when selected.