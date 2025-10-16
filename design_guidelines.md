# BALOCH KING LECTURE HUB 👑 - Design Guidelines

## Design Approach

**Approach:** Custom Dark Theme with 3D Glowing Effects
- Utility-focused educational platform with striking visual elements
- Black background theme with vibrant 3D glowing borders
- Inspired by radium/neon lighting aesthetics with modern Material Design principles
- Focus on visual hierarchy through glowing effects and contrast

## Core Design Elements

### A. Color Palette

**Background System:**
- Primary Background: 0 0% 0% (Pure black)
- Card Background: 0 0% 8% (Dark gray for subtle elevation)
- Input/Form Background: 0 0% 12%

**3D Glowing Border Colors (Radium Effect):**
- Physics: 210 100% 60% (Electric Blue)
- Chemistry: 330 100% 60% (Magenta Pink)
- Botany: 120 100% 50% (Vivid Green)
- Zoology: 30 100% 55% (Orange Gold)
- Multi-color Animation: Rotating gradient through 280 100% 65% → 180 100% 60% → 60 100% 55% → 330 100% 60%

**Accent Colors:**
- Primary CTA: 210 100% 60% (Matching electric blue)
- Success/Play: 120 70% 50%
- Admin Elements: 0 0% 60% (Gray - hidden in plain sight)
- Telegram Blue: 195 100% 50%

**Text Colors:**
- Primary Text: 0 0% 95% (Near white)
- Secondary Text: 0 0% 70%
- Muted Text: 0 0% 50%

### B. Typography

**Font Families:**
- Headings: 'Inter', sans-serif (700-900 weights for strong presence)
- Body: 'Inter', sans-serif (400-600 weights)
- All fonts via Google Fonts CDN

**Type Scale:**
- Hero Title "BALOCH KING LECTURE HUB 👑": text-5xl md:text-7xl, font-black, letter-spacing tight
- Section Headings: text-3xl md:text-4xl, font-bold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base, font-normal
- Small Text/Meta: text-sm, font-medium

### C. Layout System

**Spacing Primitives:**
- Primary spacing units: 4, 8, 12, 16, 24, 32 (p-4, p-8, p-12, etc.)
- Section spacing: py-16 md:py-24
- Card padding: p-6 md:p-8
- Component gaps: gap-4, gap-6, gap-8

**Container Widths:**
- Max width: max-w-7xl mx-auto
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Topic lists: max-w-4xl mx-auto

**Responsive Breakpoints:**
- Mobile: base (< 768px)
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)

### D. Component Library

**Landing Page:**
- Full viewport hero with centered title "BALOCH KING LECTURE HUB 👑"
- Crown emoji integrated in title
- Subtle tagline below in muted text
- Single prominent CTA button to subjects
- Pure black background, no images
- Minimal, regal aesthetic

**Subject Cards (Primary Feature):**
- Dark card background (0 0% 8%)
- 3D Glowing Animated Border Implementation:
  - 4px border with animated gradient
  - Continuous rotation animation (10s duration)
  - Box shadow with matching color (0 0 30px, 0 0 60px for depth)
  - Glow intensity increases on hover
  - Each subject has unique color scheme
- Card content: Subject name, lecture count badge, description, CTA button
- Hover state: Subtle lift (translateY -4px), intensified glow

**Topic/Lecture Cards:**
- Same 3D glowing border treatment as subject cards
- Smaller scale effects (2px border, lighter shadows)
- Lecture metadata: date, duration in muted text
- "Watch Lecture" button with gradient background

**Video Player Container:**
- Full-width embedded player
- Black background container
- Video title above player (large, bold)
- URL completely hidden from DOM/console
- Controls integrated within iframe
- Back navigation button only

**Admin Button (Stealth Design):**
- Appears as normal gray text (0 0% 60%)
- No visual distinction from regular text
- Fixed bottom-right position
- Touch/press detection: 5-second hold activates
- Progress indicator only visible during hold
- Regular users see static text

**Form Components:**
- Dark inputs (0 0% 12% background)
- Light text (0 0% 95%)
- Focused state: Electric blue border (210 100% 60%)
- Select dropdowns with custom dark styling
- Date/time pickers with dark theme

**Telegram Verification Screen:**
- Centered card on black background
- Telegram blue CTA button (195 100% 50%)
- Step-by-step verification flow
- "Join Channel" → "I've Joined" progression
- Subtle success state after verification

**Admin Panel:**
- Password protection (lamborghini.18#?)
- Dark theme matching main site
- Section cards without glowing borders (subdued)
- Lecture management form with all input fields
- Password change interface
- Logout and navigation options

### E. 3D Glowing Border Animation Details

**CSS Implementation Approach:**
```
Animated gradient border using:
- Linear gradient at specific angle
- Multiple color stops
- CSS animation rotating gradient angle
- Box-shadow layers for depth:
  - Inner glow: blur 20px
  - Mid glow: blur 40px
  - Outer glow: blur 60px
- Transform on hover: scale(1.02) translateY(-4px)
- Transition: all 0.3s ease
```

**Animation Timing:**
- Gradient rotation: 10s linear infinite
- Hover lift: 0.3s ease
- Glow intensity: 0.5s ease

### F. Special Features

**Video URL Security:**
- Never display URL in player interface
- No view-source accessibility
- Encoded/proxied playback only

**Universal Video Support:**
- YouTube embeds
- Vimeo embeds
- Direct MP4/WebM
- HLS streams (.m3u8)
- PHP-encoded URLs
- All rendered within site iframe/video element

**Lecture Organization:**
- Subject → Topic → Lecture hierarchy
- Auto-categorization on lecture add
- Scrollable lecture lists within topics
- Empty states with helpful messaging

## Images

This educational platform does not require images. The visual impact comes from:
- 3D glowing border animations
- Bold typography with crown emoji
- Black background with neon accents
- Subject-specific color schemes

No hero images, icons from Heroicons for UI elements only (play, back, settings icons).