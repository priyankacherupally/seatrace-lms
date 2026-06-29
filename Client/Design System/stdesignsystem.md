# Design System

---

## Typography

**Font Family:** Nunito

### Headings

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Headline Large | 32px / 44px | Semibold (600) | -0.25px |
| Headline Medium | 28px / 38px | Semibold (600) | -0.25px |
| Headline Small | 24px / 33px | Semibold (600) | -0.25px |

### Titles

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Title Large | 24px / 33px | Regular (400) | -0.25px |
| Title Medium | 20px / 27px | Medium (500) | -0.25px |
| Title Small | 18px / 25px | Semibold (600) | -0.25px |

### Labels

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Label Large | 14px / 19px | Medium (500) | -0.25px |
| Label Medium | 12px / 16px | Medium (500) | -0.25px |
| Label Small | 11px / 15px | Medium (500) | -0.25px |

### Body

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Body Large | 16px / 22px | Regular (400) | -0.25px |
| Body Medium | 14px / 19px | Regular (400) | -0.25px |
| Body Small | 12px / 16px | Regular (400) | -0.25px |
| Body Small Semibold | 12px / 16px | Semibold (600) | -0.25px |

### Display / KPI

| Token | Size |
|---|---|
| Welcome | 48px |
| KPI 1 | 64px |
| KPI 2 | 56px |

---

## Color Styles

**Primary:** #5189F3

### Brand Colors

| Step | Hex |
|---|---|
| 5 | #F8FAFF |
| 10 | #E4EEFF |
| 20 | #B8D0FD |
| 30 | #A3C1FB |
| 40 | #70A0FB |
| 50 ★ | #5189F3 |
| 60 | #3F78E2 |
| 70 | #326DDD |
| 80 | #155BE1 |
| 90 | #074ED4 |

### Neutrals

| Step | Hex |
|---|---|
| 1 | #FFFFFF |
| 5 | #F8F8FC |
| 10 | #EBF0F4 |
| 20 | #DFE2E6 |
| 30 | #DADCDF |
| 40 | #BFC1C4 |
| 50 | #A7AAAD |
| 60 | #969799 |
| 70 | #828385 |
| 80 | #5E5E60 |
| 90 | #3B3B3C |
| 100 | #111111 |

### Semantic Colors

| Category | Step | Hex |
|---|---|---|
| Link | 10–60 | #E9EEFF → #3160ED |
| Warning | 10–60 | #FFE9E9 → #E60026 |
| Success | 10–60 | #E9FFEC → #408F3D |
| Surface | — | #F9F9FA |

---

## Border Radius (Shape)

| Token | Value | Usage |
|---|---|---|
| Radius 0 | 0px | Tables, banners |
| Radius Small | 4px | Buttons XS/S, tags, badges |
| Radius Medium | 8px | Buttons M/L, inputs, cards |
| Radius Large | 16px | Modals, panels, large cards |

---

## Spacing & Grid

**Base unit:** 8px

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| xs | 4px | Icon gaps, tight inline spacing |
| sm | 8px | Between related elements |
| md | 16px | Section padding, card padding |
| lg | 24px | Between components |
| xl | 32px | Section gaps |
| 2xl | 48px | Page section spacing |
| 3xl | 64px | Hero / major layout gaps |

### Grid

| Property | Value |
|---|---|
| Columns | 12 |
| Gutter (mobile) | 8px |
| Gutter (desktop) | 16px |
| Margin (mobile) | 16px |
| Margin (desktop) | 48px |
| Max content width | 1920px |

---

## Shadows / Elevation

| Level | Token | CSS Value | Usage |
|---|---|---|---|
| 1 | shadow-sm | 0 1px 3px rgba(0,0,0,0.08) | Cards, list items |
| 2 | shadow-md | 0 4px 12px rgba(0,0,0,0.12) | Dropdowns, popovers |
| 3 | shadow-lg | 0 8px 24px rgba(0,0,0,0.16) | Modals, drawers |
| 4 | shadow-xl | 0 16px 40px rgba(0,0,0,0.20) | Full-page overlays |

---

## Buttons

### Variants

| Variant | Description |
|---|---|
| Primary | Filled blue background, white label — highest emphasis |
| Secondary | Outlined with blue border and label — medium emphasis |
| Tertiary | No background or border, blue label only — lowest emphasis |

### Sizes

| Size | Usage |
|---|---|
| XS | Compact / inline actions |
| S | Small controls |
| M | Default button size |
| L | Prominent call-to-action |

### States

| State | Description |
|---|---|
| Default | Resting appearance |
| Hover | Slightly darker fill / border on mouse-over |
| While Pressing | Darkest fill / border on active press |
| Disable | Muted / low-opacity; non-interactive |

---

## Form Components

### Input

| State | Description |
|---|---|
| Default | Neutral border #DFE2E6, white bg |
| Focus | Blue border #5189F3, subtle shadow |
| Filled | Same as default with content |
| Error | Red border #E82727, error message below |
| Disabled | Gray bg #EBF0F4, no interaction |

**Sizes:** SM (32px height) · MD (40px height) · LG (48px height)

### Select / Dropdown

Same states as Input. Chevron icon on right. Options list has hover (#F8FAFF) and selected (#E4EEFF) states.

### Checkbox

| State | Visual |
|---|---|
| Unchecked | Empty square, border #BFC1C4 |
| Checked | Filled blue #5189F3, white checkmark |
| Indeterminate | Filled blue, dash icon |
| Disabled | Gray fill, no interaction |

### Radio

Same pattern as Checkbox but circular. Single selection only.

### Toggle / Switch

| State | Visual |
|---|---|
| Off | Gray track #BFC1C4, white thumb |
| On | Blue track #5189F3, white thumb |
| Disabled | Muted, no interaction |

### Form Layout Rules

- Label above input, 4px gap
- Helper text below input, #969799, 12px
- Error text below input, #E82727, 12px
- Required fields marked with * in #E82727
- Group related fields with 16px gap, sections with 32px gap

---

## Navigation Components

### Top Navigation

- Height: 56px
- Background: #FFFFFF
- Border-bottom: 1px #DFE2E6
- Logo left, links center or right
- Active link: #5189F3, border-bottom 2px

### Sidebar Navigation

- Width: 220px (expanded) / 64px (collapsed)
- Background: #FFFFFF
- Active item: bg #E4EEFF, left border 2px #5189F3
- Nested items indented 12px

### Breadcrumb

- Separator: / or › in #A7AAAD
- Current page: #111111, not clickable
- Parent pages: #5189F3, clickable

### Tabs

- Active tab: border-bottom 2px #5189F3, text #5189F3
- Inactive: text #828385
- Hover: text #3F78E2

### Pagination

- Current page: filled #5189F3, white text
- Other pages: border #DFE2E6, text #111111
- Disabled: #EBF0F4

---

## Data Display

### Table

- Header: bg #F8F8FC, text #5E5E60, font-weight 600
- Row hover: bg #F8FAFF
- Border: 1px #DFE2E6 horizontal only
- Row height: 48px (default), 40px (compact), 56px (comfortable)
- Sortable column: shows arrow icon on hover

### Card

- Background: #FFFFFF
- Border: 1px #DFE2E6
- Border-radius: 8px
- Padding: 20px 24px
- Shadow: shadow-sm
- Header divider: 1px #EBF0F4

### Badge

| Variant | Background | Text |
|---|---|---|
| Default | #EBF0F4 | #5E5E60 |
| Primary | #E4EEFF | #5189F3 |
| Success | #E9FFEC | #408F3D |
| Warning | #FFE9E9 | #E82727 |

Border-radius: 4px · Padding: 2px 8px · Font: 11px Medium

### Tag

Similar to Badge but with optional close (×) button. Border: 1px solid matching color.

### Avatar

- Sizes: 24px / 32px / 40px / 48px / 64px
- Shape: circle (users) or square r-8 (brands)
- Fallback: initials on #E4EEFF background, #5189F3 text

### Tooltip

- Background: #111111
- Text: #FFFFFF, 12px
- Border-radius: 4px
- Max-width: 240px
- Arrow pointer toward trigger

### Empty State

- Illustration (neutral, centered)
- Title: Title Medium, #111111
- Description: Body Medium, #969799
- Optional CTA button below

---

## Feedback Components

### Alert

| Type | Border-left | Background | Icon color |
|---|---|---|---|
| Info | #5189F3 | #E4EEFF | #5189F3 |
| Success | #4DAC4A | #E9FFEC | #4DAC4A |
| Warning | #E82727 | #FFE9E9 | #E82727 |
| Error | #E60026 | #FFE9E9 | #E60026 |

Border-radius: 8px · Padding: 12px 16px

### Toast / Snackbar

- Position: top-center or bottom-right
- Max-width: 360px
- Same type colors as Alert
- Auto-dismiss: 4 seconds
- Border-radius: 8px

### Modal

- Overlay: rgba(0,0,0,0.45)
- Container: white, r-16, shadow-lg
- Width: 480px (default) / 640px (large)
- Header: Title Medium, border-bottom 1px #EBF0F4
- Footer: right-aligned buttons, 16px gap

### Loader / Spinner

- Color: #5189F3
- Sizes: 16px / 24px / 40px
- Page-level: centered, with overlay

---

## Icons

- **Style:** Outline (default) · Filled (active/selected state)
- **Sizes:** 16px · 20px · 24px · 32px
- **Color:** Inherits text color; semantic icons use semantic colors
- **Grid:** Icons designed on 24px grid with 2px padding
- **Stroke:** 1.5px (16–20px), 1.5px (24–32px)
- **Format:** SVG, optimised, no embedded colors (use currentColor)

---

## Motion & Animation

### Duration

| Token | Value | Usage |
|---|---|---|
| fast | 150ms | Hover states, small toggles |
| normal | 250ms | Dropdowns, tooltips, modals |
| slow | 400ms | Page transitions, large panels |

### Easing

| Token | Curve | Usage |
|---|---|---|
| ease-out | cubic-bezier(0,0,0.2,1) | Elements entering the screen |
| ease-in | cubic-bezier(0.4,0,1,1) | Elements leaving the screen |
| ease-in-out | cubic-bezier(0.4,0,0.2,1) | Elements moving on screen |

### Principles

- No bounce or spring on data-heavy interfaces
- Subtle fade + translate (8px) for enter/exit
- Loading skeletons instead of spinners for content areas
- Avoid animation for users who prefer reduced motion

---

## Logo Guidelines

### Variants

| Variant | Usage |
|---|---|
| Full (logo + wordmark) | Primary usage — headers, covers, presentations |
| Icon only | App icons, favicons, social avatars |
| Monochrome dark | On light backgrounds |
| Monochrome light | On dark / colored backgrounds |

### Clear Space

Minimum clear space = height of the logo mark on all sides. Never crowd the logo.

### Minimum Size

- Full logo: 120px wide minimum (print: 30mm)
- Icon only: 24px minimum (print: 8mm)

### Do / Don't

| Do | Don't |
|---|---|
| Use on white or brand blue backgrounds | Stretch or distort |
| Use approved color variants | Change colors |
| Maintain clear space | Place on busy backgrounds |
| Use vector files (SVG/PDF) | Use low-res raster files |

---

## Imagery Style

- **Tone:** Clean, professional, human — real people in real work contexts
- **Color grading:** Slight cool shift, consistent with brand blues
- **Avoid:** Stock-looking poses, excessive filters, dark or low-contrast images
- **Aspect ratios:** 16:9 (banners), 1:1 (social), 4:3 (editorial)
- **File format:** WebP for web, JPEG 80% quality, PNG for transparency

---

## Illustration Style

- **Style:** Flat / minimal line illustration
- **Palette:** Brand blues + neutrals only; accent with success green or warning red for semantic meaning
- **Line weight:** 1.5px strokes on 24px grid
- **Usage:** Empty states, onboarding, error pages
- **Format:** SVG (scalable), exported with currentColor where possible

---

## Motion — Video Guidelines

### Brand Video

- **Intro:** Logo animation — fade in + scale from 0.9 to 1.0, 400ms ease-out
- **Outro:** Logo hold 2s, fade out 400ms
- **Lower thirds:** Nunito Semibold 18px white, bg #5189F3 at 90% opacity
- **Captions:** Nunito Regular 14px, white text, semi-transparent dark bg
- **Transitions:** Cross-dissolve or simple cut — no wipes or spins

### Motion Palette for Video

| Element | Color | Note |
|---|---|---|
| Title cards | #111111 bg, white text | Full bleed |
| Brand overlays | #5189F3 at 80% | Section transitions |
| Data highlights | #5189F3 | Animate in with ease-out |
| Background | #F9F9FA or #FFFFFF | Light, clean |

---

## Social Media Templates

### Platform Sizes

| Platform | Format | Size (px) | Ratio |
|---|---|---|---|
| Instagram Feed | Square | 1080 × 1080 | 1:1 |
| Instagram Feed | Landscape | 1080 × 566 | 1.91:1 |
| Instagram Story / Reel | Vertical | 1080 × 1920 | 9:16 |
| LinkedIn Post | Landscape | 1200 × 627 | 1.91:1 |
| LinkedIn Story | Vertical | 1080 × 1920 | 9:16 |
| Twitter / X | Card | 1200 × 675 | 16:9 |
| YouTube Thumbnail | Landscape | 1280 × 720 | 16:9 |
| Facebook Post | Landscape | 1200 × 630 | 1.91:1 |

### Template Layout Rules

- Safe zone: 80px inset from all edges for key content
- Logo: always bottom-right or top-left, min 80px wide
- Max 2 type sizes per post (headline + body)
- CTA text: Title Small, #FFFFFF on #5189F3 pill button

---

## Copywriting Guidelines

### Tone of Voice

| Dimension | Description |
|---|---|
| Clear | Plain language, no jargon, front-load key info |
| Confident | Direct statements, avoid "maybe", "might", "sort of" |
| Human | Conversational, not robotic — contractions are fine |
| Helpful | Lead with benefit, not feature |

### Writing Rules

- **Headlines:** Sentence case, max 8 words, lead with a verb or number
- **Body:** Max 2–3 sentences per paragraph, active voice
- **CTAs:** Verb + noun format — "Download report", "Start free trial", "View dashboard"
- **Error messages:** Say what happened + what to do next — never just "Error"
- **Microcopy:** Labels, tooltips, placeholders should be instructive, not decorative

### Do / Don't

| Do | Don't |
|---|---|
| "Save changes" | "Click here to save your changes" |
| "3 items selected" | "You have selected 3 items" |
| "Something went wrong. Try again." | "Error 500" |
| "Free 14-day trial" | "Try it for free for 14 days" |

---

## Brand Voice

### Personality Pillars

| Pillar | What it means | In practice |
|---|---|---|
| Clear | We make complex simple | Short sentences, plain words, visual hierarchy |
| Intelligent | We know our domain | Precise language, data-backed, no fluff |
| Approachable | We're a team, not a platform | "You", "we", conversational CTAs |
| Reliable | We show up consistently | Same tone, same spelling, same format everywhere |

### Vocabulary

| Use | Avoid |
|---|---|
| Dashboard | Control panel |
| Data | Information (when referring to metrics) |
| Connect | Integrate (in user-facing copy) |
| View / See | Click here |
| Issue | Problem / Bug (in UI) |

---

## Usage Guidelines

- Use **Primary** for the single most important action per screen (e.g. Save, Submit).
- Use **Secondary** for supporting actions that need visibility (e.g. Cancel, Export).
- Use **Tertiary** for low-emphasis or repeated actions (e.g. links, inline edits).
- Never place two Primary buttons side-by-side at the same hierarchy level.
- Disabled buttons must retain their shape and size — only opacity or color changes.
- Maintain 8px spacing base across all layouts.
- Always use semantic colors (success green, warning red) — never use raw hex for status.
- Logo must appear on every external-facing collateral and social post.
