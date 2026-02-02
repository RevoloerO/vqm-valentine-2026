# Valentine Nurse 2026 - Project Specification

## Project Overview
An interactive animated photo gallery celebrating a girlfriend's acceptance into a nursing program and Valentine's Day 2026. Features flip-card mechanics, smooth transitions, particle effects, and a heartfelt Bible verse conclusion.

**Project Name:** `vqm-valentine-nurse-2026`
**Repository:** `https://github.com/[username]/vqm-valentine-nurse-2026`
**Deployment:** GitHub Pages
**Live URL:** `[username].github.io/vqm-valentine-nurse-2026`

---

## Tech Stack (Identical to vqm-valentine)

### Core Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "vite": "^6.1.0",
  "fireworks-js": "^2.10.8",
  "gh-pages": "^6.3.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "@eslint/js": "^9.19.0",
  "eslint": "^9.19.0",
  "eslint-plugin-react": "^7.37.4",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.18",
  "globals": "^15.14.0"
}
```

### Build Configuration
- **Bundler:** Vite 6
- **Dev Server Port:** 1402
- **Base Path:** `/vqm-valentine-nurse-2026`
- **Build Output:** `/dist`

### Styling Approach
- CSS Custom Properties (variables) for theming
- Google Fonts: Sacramento (serif), Share Tech Mono, Nanum Gothic Coding
- Keyframe animations for transitions and effects
- Responsive design (mobile-first breakpoints)

---

## Project Structure

```
vqm-valentine-nurse-2026/
├── public/
│   └── (no assets in public - use src/assets)
├── src/
│   ├── assets/
│   │   ├── photos/
│   │   │   ├── photo-1.jpg
│   │   │   ├── photo-2.jpg
│   │   │   ├── photo-3.jpg
│   │   │   ├── ... (all user-provided photos)
│   │   │   └── nurse-badge.png
│   │   └── valentine.png
│   ├── components/
│   │   ├── PhotoCard.jsx
│   │   ├── FlipCard.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── BibleQuote.jsx
│   │   ├── ParticleEffect.jsx
│   │   └── ThemeProvider.jsx
│   ├── pages/
│   │   └── MainPage.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── PhotoCard.css
│   │   ├── FlipCard.css
│   │   ├── animations.css
│   │   ├── responsive.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Core Features & Components

### 1. **PhotoCard Component** (Flip Card Mechanic)
**File:** `src/components/PhotoCard.jsx`

**Functionality:**
- Display individual photo with hover state
- On click/hover: flip to reveal metadata
- Back side shows:
  - Date/memory description
  - Achievement badge (if nursing-related)
  - Interactive element (hover effect)

**Props:**
```javascript
{
  image: string,           // path to image
  title: string,           // photo title/date
  description: string,     // memory or achievement text
  badge?: string,         // "nurse" | "achievement" | null
  onClick: function,      // handle card interaction
  index: number          // for staggered animations
}
```

**Interactions:**
- Click to flip (3D card flip animation)
- Hover to brighten/scale slightly
- Auto-reset after 3 seconds if not interacted

---

### 2. **FlipCard Animation System**
**File:** `src/styles/animations.css`

**Keyframes Required:**
```css
@keyframes flipIn {}      /* 3D flip entrance */
@keyframes flipOut {}     /* 3D flip exit */
@keyframes fadeIn {}      /* Smooth fade entrance */
@keyframes pulse {}       /* Gentle pulse on hover */
@keyframes slideInLeft {} /* Staggered entrance from left */
@keyframes slideInRight {}/* Staggered entrance from right */
```

**Properties to Animate:**
- `transform: rotateY()` for flip
- `opacity` for fade
- `scale` for emphasis
- Transition timing: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)

---

### 3. **PhotoGallery Component** (Main Container)
**File:** `src/components/PhotoGallery.jsx`

**Functionality:**
- Grid layout of photo cards (responsive)
- Staggered animation on load
- Category filtering (optional: "All" / "Memories" / "Achievements")
- Scroll-to-reveal animations

**States:**
```javascript
{
  photos: Array,           // all photo data
  selectedCard: number,    // currently flipped card index
  filter: string,          // "all" | "memories" | "achievements"
  scrollProgress: number   // for parallax effects
}
```

**Grid Layout:**
- Desktop (1200px+): 3 columns
- Tablet (768px-1199px): 2 columns
- Mobile (< 768px): 1 column
- Responsive gap: clamp(20px, 4vw, 40px)

---

### 4. **BibleQuote Component** (Finale Section)
**File:** `src/components/BibleQuote.jsx`

**Functionality:**
- Display Bible verse about love (1 Corinthians 13:4-7 recommended)
- Appear after scrolling past photo gallery
- Animated text reveal (word-by-word or line-by-line)
- Final question: "Will you be my Valentine?"
- Two buttons: "Yes" → Fireworks | "No" → Playful response

**Content Structure:**
```javascript
{
  verse: string,          // full Bible verse text
  reference: string,      // "1 Corinthians 13:4-7"
  dedication: string,     // "For [Her Name], RN Class of 2026"
  finalMessage: string    // "Will you be my Valentine?"
}
```

**Styling:**
- Large serif font (Sacramento 3-4vw)
- Soft gradient background
- Text shadow for elegance
- Line-height: 1.8 for readability

---

### 5. **ParticleEffect Component** (Fireworks)
**File:** `src/components/ParticleEffect.jsx`

**Functionality:**
- Trigger on "Yes" button click
- Uses `fireworks-js` library (same as vqm-valentine)
- Customize colors to match theme (pink/red gradient)
- Auto-trigger celebratory message overlay

**Props:**
```javascript
{
  trigger: boolean,
  colors: Array<string>,  // hex colors for particles
  duration: number        // milliseconds to run
}
```

---

### 6. **Photo Data Structure**
**File:** `src/data/photoData.js`

**Format:**
```javascript
const photos = [
  {
    id: 1,
    image: '/src/assets/photos/photo-1.jpg',
    title: 'First Date - 2022',
    description: 'The day we met at the coffee shop',
    category: 'memories',
    date: '2022-03-15',
    badge: null
  },
  {
    id: 2,
    image: '/src/assets/photos/photo-2.jpg',
    title: 'Nursing School Acceptance',
    description: 'You got in! RN Class of 2026',
    category: 'achievements',
    date: '2025-12-01',
    badge: 'nurse'
  },
  // ... more photos
];

export default photos;
```

**Minimum Photos Required:** 6-12 for good gallery effect

---

## User Experience Flow

1. **Hero Section (Above Fold)**
   - Title: "Happy Valentine's Day 2026"
   - Subtitle: "[Her Name] - RN Class of 2026"
   - Subtle background animation (particles or gradient shift)
   - CTA: "Scroll to see our story"

2. **Photo Gallery (Main Content)**
   - Grid of flip cards loads with staggered animation
   - Each card flips on click
   - Cards reset after interaction
   - Smooth scroll parallax effect

3. **Achievement Highlight Section**
   - Dedicated area for nursing accomplishment
   - Nurse badge animation
   - Congratulatory text with animation

4. **Bible Verse Section**
   - Appears after gallery
   - Text reveals on scroll
   - Centered, elegant typography
   - Emotional climax

5. **Final CTA**
   - "Will you be my Valentine?" buttons
   - "Yes" → Fireworks + celebration message
   - "No" → Humorous response (shrinking button mechanic from vqm-valentine)

6. **Footer**
   - Love icons and closing message
   - Social links (if desired)

---

## Interactive Elements

### Flip Card Interaction
- **Trigger:** Click or hover (configurable)
- **Animation:** 3D flip (CSS transform rotateY)
- **Duration:** 600ms
- **Auto-reset:** 3 seconds if no new interaction

### Scroll-Triggered Animations
- Cards fade in/slide as viewport enters
- Use Intersection Observer API for performance
- Stagger delay: 100ms per card

### Hover States
- Scale: 1.05
- Box shadow: elevation increase
- Brightness: +10%
- Transition: 300ms ease-out

### Button Interactions
- "Yes" button: Trigger fireworks, show celebration overlay
- "No" button: Shrink button (push user toward "Yes")
- Both: Smooth feedback animations

---

## Responsive Design Strategy

### Breakpoints
```css
/* Mobile First */
@media (max-width: 599px) {
  /* 1 column grid, 8vw font sizes */
}

@media (min-width: 600px) and (max-width: 768px) {
  /* 2 column grid, scale adjustments */
}

@media (min-width: 769px) and (max-width: 1200px) {
  /* 2-3 column grid, medium font sizes */
}

@media (min-width: 1201px) {
  /* 3 column grid, full-size fonts */
}
```

### Mobile Optimizations
- Touch-friendly flip interaction (larger hit area)
- Vertical stack layout for narrow viewports
- Reduced animation complexity on low-end devices
- Font scaling with `clamp()` function

---

## Color Scheme & Theming

### Default Valentine Theme
```css
:root {
  --color-background: #ffe6e6;      /* Light pink */
  --color-primary: #ff99cc;         /* Pink primary */
  --color-accent: #ff3366;          /* Red accent */
  --color-text: #990033;            /* Dark red text */
  --color-border: #cc3366;          /* Border */
  --color-success: #00aa00;         /* Nurse achievement green */
  --color-badge-bg: #fff0f5;        /* Very light pink for badges */
}
```

### Optional Theme Variants
- Elegant Gold (for mature aesthetic)
- Nurse Blue (incorporating medical colors)
- Dark Mode (alternative theme)

---

## Performance Considerations

1. **Image Optimization**
   - Compress JPGs to 80-85% quality
   - Resize to max 1200px width
   - Use srcset for responsive images
   - Lazy load below-fold images

2. **Animation Performance**
   - Use CSS transforms (not width/height changes)
   - Use `will-change` sparingly on animated elements
   - Debounce scroll events (Intersection Observer preferred)
   - Limit particle count in fireworks effect

3. **Bundle Size**
   - Tree-shake unused CSS
   - Code-split components if >50KB
   - Minify and compress

---

## Deployment

### GitHub Pages Setup
```json
{
  "homepage": "https://[username].github.io/vqm-valentine-nurse-2026",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Deploy Command
```bash
npm run deploy
```

---

## Asset Requirements

### Images Needed
1. **Photo Collection** (6-12 high-quality JPGs)
   - Dimensions: 1200x1200px or 1200x800px
   - Format: JPG (optimized)
   - Quality: 85% compression
   - Locations: `src/assets/photos/`

2. **Nurse Badge/Certificate** (optional PNG)
   - Size: 400x400px
   - Transparency: PNG with alpha
   - Location: `src/assets/nurse-badge.png`

3. **Favicon** (already defined, can reuse from vqm-valentine)
   - Location: `src/assets/valentine.png`

### Fonts (CDN Imported)
- Sacramento (serif, decorative)
- Google Fonts API (same as vqm-valentine)

---

## Key Differences from vqm-valentine

| Aspect | vqm-valentine | valentine-nurse-2026 |
|--------|---------------|----------------------|
| Main Feature | Interactive proposal | Photo gallery showcase |
| Interactions | Button mechanics | Flip cards + scroll |
| Visual Focus | Text/animation | Photo-centric |
| Animation Type | Particle effects | Card flips + parallax |
| Content | Single question | Story/narrative flow |
| Theme | Playful | Celebratory + emotional |

---

## Implementation Timeline

**Phase 1: Setup** (1-2 hours)
- Initialize Vite project with React config
- Install dependencies
- Set up folder structure and CSS variables

**Phase 2: Components** (3-4 hours)
- Build PhotoCard component with flip animation
- Build PhotoGallery with responsive grid
- Build BibleQuote component

**Phase 3: Integration** (2-3 hours)
- Connect photo data
- Implement scroll animations (Intersection Observer)
- Add ParticleEffect component

**Phase 4: Polish** (2-3 hours)
- Responsive design testing
- Animation tweaks and timing
- Performance optimization
- Mobile testing

**Phase 5: Deployment** (30 minutes)
- Build production bundle
- Deploy to GitHub Pages
- Test live URL

---

## Success Criteria

✅ Photo cards flip smoothly on interaction (no jank)
✅ Gallery is fully responsive (mobile, tablet, desktop)
✅ Animations trigger properly on scroll
✅ Bible verse displays elegantly with proper typography
✅ Fireworks trigger correctly on "Yes" button
✅ Page loads in < 2 seconds on 4G
✅ All images optimized and compressed
✅ Zero console errors or warnings
✅ Accessibility: WCAG AA standard
✅ Deployment successful to GitHub Pages

---

## File Reference Map

| Component | File | Dependencies |
|-----------|------|--------------|
| PhotoCard | `src/components/PhotoCard.jsx` | React, CSS |
| FlipCard Animation | `src/styles/animations.css` | CSS3 |
| PhotoGallery | `src/components/PhotoGallery.jsx` | React, Intersection Observer |
| BibleQuote | `src/components/BibleQuote.jsx` | React |
| ParticleEffect | `src/components/ParticleEffect.jsx` | fireworks-js |
| Main Page | `src/pages/MainPage.jsx` | All above components |
| App Root | `src/App.jsx` | MainPage |

---

## Notes for Code Agent

- **Code style:** Follow ESLint React rules from vqm-valentine
- **Component size:** Keep < 300 lines per file (split as needed)
- **State management:** Use only `useState` and `useRef` (no Context/Redux)
- **CSS:** Use CSS variables consistently, avoid inline styles
- **Accessibility:** Include alt text on images, semantic HTML, ARIA labels where needed
- **Git commits:** Atomic commits per feature/component

---

## Contact & Customization

**Before starting, user must provide:**
1. List of 6-12 high-quality photos (or instructions to gather them)
2. Her name (for personalization)
3. Bible verse preference (or use 1 Corinthians 13:4-7)
4. Preferred color theme (or use default Valentine pink)
5. Nursing program details (school name, graduation year if known)

---

**Project Status:** Ready for implementation
**Estimated Build Time:** 12-16 hours for experienced React developer
**Difficulty Level:** Intermediate (animations + responsive design)
