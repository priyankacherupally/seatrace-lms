# Sea Project — Design System

> Single source of truth for the Sea Project's visual language. All values are derived directly from Figma reference screens and the existing project token structure.

---

## Table of Contents

1. [Typography](#1-typography)
2. [Color System](#2-color-system)
3. [Spacing](#3-spacing)
4. [Border Radius](#4-border-radius)
5. [Shadows & Elevation](#5-shadows--elevation)
6. [Button System](#6-button-system)
7. [Layout & Breakpoints](#7-layout--breakpoints)
8. [SCSS Tokens](#8-scss-tokens)
9. [Layout Patterns](#9-layout-patterns)
10. [Error & Edge Case Patterns](#10-error--edge-case-patterns)

---

## 1. Typography

**Font family:** Nunito  
**Default letter spacing:** `-0.25px` across all text styles  
**Word spacing:** `0` (normal)

```scss
$font-family-primary: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

### 1.1 Headline

| Style | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| Headline / Large | `32px` | `44px` | `600` — Semibold | `-0.25px` |
| Headline / Medium | `28px` | `38px` | `600` — Semibold | `-0.25px` |
| Headline / Small | `24px` | `33px` | `600` — Semibold | `-0.25px` |

**Usage:** Page titles, major section headers, modal titles.

---

### 1.2 Title

| Style | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| Title / Large | `24px` | `33px` | `400` — Regular | `-0.25px` |
| Title / Medium | `20px` | `27px` | `500` — Medium | `-0.25px` |
| Title / Small | `18px` | `25px` | `600` — Semibold | `-0.25px` |

**Usage:** Card titles, section headings, panel headers, navigation labels.

---

### 1.3 Label

| Style | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| Label / Large | `14px` | `19px` | `500` — Medium | `-0.25px` |
| Label / Medium | `12px` | `16px` | `500` — Medium | `-0.25px` |
| Label / Small | `11px` | `15px` | `500` — Medium | `-0.25px` |

**Usage:** Input labels, metadata, tags, badges, tight UI labels, button text (small sizes).

---

### 1.4 Body

| Style | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| Body / Large | `16px` | `22px` | `400` — Regular | `-0.25px` |
| Body / Medium | `14px` | `19px` | `400` — Regular | `-0.25px` |
| Body / Small | `12px` | `16px` | `400` — Regular | `-0.25px` |
| Body / Small Semibold | `12px` | `16px` | `600` — Semibold | `-0.25px` |

**Usage:** Paragraphs, descriptions, form field values, table content, activity feeds.

---

### 1.5 Display / KPI

| Style | Size | Weight | Usage |
|---|---|---|---|
| Display / Welcome | `48px` | `700` — Bold | Hero greeting, welcome screen headline |
| Display / KPI 1 | `64px` | `700` — Bold | Primary metric values on KPI cards |
| Display / KPI 2 | `56px` | `700` — Bold | Secondary metric values on KPI cards |

---

## 2. Color System

### 2.1 Primary — Blue

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#5B8AF0` | Default state: buttons, links, active indicators |
| `--color-primary-hover` | `#4A79DF` | Hover state on primary interactive elements |
| `--color-primary-pressed` | `#3A69CE` | Active / while-pressing state |
| `--color-primary-disabled` | `#AABFF5` | Disabled fill (primary buttons) |
| `--color-primary-subtle` | `#EEF3FD` | Light tint background, hover on secondary/tertiary |
| `--color-primary-deep` | `#4F46E5` | Strong emphasis, deep accent |

### 2.2 Semantic

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#10B981` | Positive status, success banners, green indicators |
| `--color-warning` | `#F59E0B` | Caution alerts, warning badges |
| `--color-danger` | `#EF4444` | Errors, destructive action confirmations |
| `--color-info` | `#0EA5E9` | Informational tooltips, info badges |

### 2.3 Text

| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#1A2340` | Main body text, headings |
| `--color-text-secondary` | `#5E6E8C` | Placeholder, helper text, supporting labels |
| `--color-text-disabled` | `#A8B8CC` | Disabled text on any surface |
| `--color-text-on-primary` | `#FFFFFF` | Text/icons on filled primary backgrounds |

### 2.4 Surface & Background

| Token | Value | Usage |
|---|---|---|
| `--bg-page` | `#F3F7FB` | Page/shell background |
| `--bg-surface` | `#FFFFFF` | Cards, panels, modals, inputs |
| `--bg-subtle` | `#EEF3FD` | Hover tint on secondary/tertiary elements |
| `--bg-base` | `#0F172A` | Dark shell (if dark mode / dark sidebar used) |

### 2.5 Border

| Token | Value | Usage |
|---|---|---|
| `--color-border` | `#C8D5E8` | Default borders, dividers, input outlines |
| `--color-border-focus` | `#5B8AF0` | Focus ring on inputs and interactive elements |

---

## 3. Spacing

Base unit: `4px`. All spacing values are multiples of `4`.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Tight gaps, icon padding |
| `--space-2` | `8px` | Inner component padding, icon-to-label gap |
| `--space-3` | `12px` | Small component padding |
| `--space-4` | `16px` | Standard padding, grid gaps |
| `--space-5` | `20px` | — |
| `--space-6` | `24px` | Section padding, card padding |
| `--space-8` | `32px` | Large section spacing |
| `--space-10` | `40px` | — |
| `--space-12` | `48px` | Page-level vertical rhythm |
| `--space-16` | `64px` | Hero spacing, display sections |

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | `4px` | Chips, small tags |
| `--radius-sm` | `6px` | Input fields, small badges |
| `--radius-md` | `8px` | Buttons, dropdowns |
| `--radius-lg` | `12px` | Cards, panels |
| `--radius-xl` | `16px` | Modals, large containers |
| `--radius-2xl` | `24px` | Feature cards |
| `--radius-full` | `9999px` | Pills, avatar rings, toggles |

---

## 5. Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(26, 35, 64, 0.06)` | Subtle lift, table rows |
| `--shadow-md` | `0 4px 12px rgba(26, 35, 64, 0.08)` | Cards, dropdowns, popovers |
| `--shadow-lg` | `0 8px 24px rgba(26, 35, 64, 0.12)` | Modals, drawers, floating panels |
| `--shadow-xl` | `0 16px 40px rgba(26, 35, 64, 0.16)` | Full-page overlays |

---

## 6. Button System

All buttons support three optional slots: **left icon**, **label text**, and **right icon**.  
Border radius on all sizes: `--radius-md` (`8px`).

---

### 6.1 Sizes

| Size | Height | Horizontal Padding | Gap (icon ↔ label) | Label Token | Icon Size |
|---|---|---|---|---|---|
| XS | `28px` | `10px` | `4px` | Label / Small | `14px` |
| S | `32px` | `12px` | `6px` | Label / Medium | `14px` |
| M | `36px` | `14px` | `6px` | Label / Large | `16px` |
| L | `44px` | `18px` | `8px` | Title / Small | `18px` |

---

### 6.2 Primary

Solid filled button. Use for the **single most important action** per view.

| State | Background | Text / Icon | Border |
|---|---|---|---|
| Default | `#5B8AF0` | `#FFFFFF` | — |
| Hover | `#4A79DF` | `#FFFFFF` | — |
| While Pressing | `#3A69CE` | `#FFFFFF` | — |
| Disabled | `#AABFF5` | `#FFFFFF` | — |

---

### 6.3 Secondary

Outlined button. Use for **supporting actions** alongside a Primary (e.g. Cancel, Back).

| State | Background | Text / Icon | Border |
|---|---|---|---|
| Default | `transparent` | `#5B8AF0` | `1.5px solid #5B8AF0` |
| Hover | `#EEF3FD` | `#5B8AF0` | `1.5px solid #5B8AF0` |
| While Pressing | `#DCE9FB` | `#4A79DF` | `1.5px solid #4A79DF` |
| Disabled | `transparent` | `#AABFF5` | `1.5px solid #C8D5E8` |

---

### 6.4 Tertiary

Text-only button. Use for **low-emphasis inline actions** (e.g. "View details", "Learn more").

| State | Background | Text / Icon | Border |
|---|---|---|---|
| Default | `transparent` | `#5B8AF0` | — |
| Hover | `#EEF3FD` | `#5B8AF0` | — |
| While Pressing | `#DCE9FB` | `#4A79DF` | — |
| Disabled | `transparent` | `#AABFF5` | — |

---

### 6.5 Button Rules

- Never place two Primary buttons side by side.
- Disabled buttons must not receive hover or focus styles.
- Icon-only buttons must include an `aria-label`.
- Maintain consistent padding — do not change horizontal padding per content width.

---

## 7. Layout & Breakpoints

| Name | Range | Horizontal Padding |
|---|---|---|
| Mobile | `≤ 768px` | `16px` |
| Tablet | `769px – 1024px` | `24px` |
| Desktop | `≥ 1025px` | `32px` |

### Grid

- **Mobile:** 4-column grid, `16px` gutters
- **Tablet:** 8-column grid, `20px` gutters
- **Desktop:** 12-column grid, `24px` gutters

---

## 8. SCSS Tokens

Paste into `src/styles/variables.scss`:

```scss
// Typography
$font-family-primary: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$letter-spacing-default: -0.25px;

// Primary
$color-primary:          #5B8AF0;
$color-primary-hover:    #4A79DF;
$color-primary-pressed:  #3A69CE;
$color-primary-disabled: #AABFF5;
$color-primary-subtle:   #EEF3FD;
$color-primary-deep:     #4F46E5;

// Semantic
$color-success: #10B981;
$color-warning: #F59E0B;
$color-danger:  #EF4444;
$color-info:    #0EA5E9;

// Text
$color-text-primary:    #1A2340;
$color-text-secondary:  #5E6E8C;
$color-text-disabled:   #A8B8CC;
$color-text-on-primary: #FFFFFF;

// Surface
$bg-page:    #F3F7FB;
$bg-surface: #FFFFFF;
$bg-subtle:  #EEF3FD;
$bg-base:    #0F172A;

// Border
$color-border:       #C8D5E8;
$color-border-focus: #5B8AF0;

// Radius
$radius-xs:   4px;
$radius-sm:   6px;
$radius-md:   8px;
$radius-lg:   12px;
$radius-xl:   16px;
$radius-2xl:  24px;
$radius-full: 9999px;

// Shadow
$shadow-sm: 0 1px 2px rgba(26, 35, 64, 0.06);
$shadow-md: 0 4px 12px rgba(26, 35, 64, 0.08);
$shadow-lg: 0 8px 24px rgba(26, 35, 64, 0.12);
$shadow-xl: 0 16px 40px rgba(26, 35, 64, 0.16);

// Spacing
$space-1:  4px;
$space-2:  8px;
$space-3:  12px;
$space-4:  16px;
$space-5:  20px;
$space-6:  24px;
$space-8:  32px;
$space-10: 40px;
$space-12: 48px;
$space-16: 64px;
```

---

## 9. Layout Patterns

These are the structural building blocks used to compose every page in the Sea Project. Each pattern answers three questions: **what it is**, **when to use it**, and **how it looks in code**.

---

### 9.1 App Shell

**What:** The fixed frame that wraps every authenticated page — topbar, sidebar, and scrollable content area.

**When to use:** Always. Every page inside the app sits inside the App Shell.

```
Topbar      ████████████████████████████████  56px tall, fixed
            ─────────────────────────────────
Sidebar │   Content area
 240px  │   padding: 24px, background: #F3F7FB
        │   max-width: 1280px
```

| Region | Value |
|---|---|
| Topbar height | `56px`, white bg, `1px` bottom border |
| Sidebar width | `240px` desktop · `64px` collapsed · hidden on mobile |
| Content padding | `24px` (desktop), `16px` (mobile) |
| Page background | `#F3F7FB` |
| Card surface | `#FFFFFF` |

```scss
// Quick example — copy this as your base layout
.layout { display: flex; flex-direction: column; height: 100vh; }
.layout__topbar  { height: 56px; background: #fff; border-bottom: 1px solid #C8D5E8; }
.layout__body    { display: flex; flex: 1; overflow: hidden; }
.layout__sidebar { width: 240px; background: #fff; border-right: 1px solid #C8D5E8; }
.layout__content { flex: 1; overflow-y: auto; padding: 24px; background: #F3F7FB; }
```

---

### 9.2 Dashboard / KPI Grid

**What:** A responsive grid for metric cards at the top of the dashboard, followed by a two-column area for charts and tables.

**When to use:** Main dashboard, analytics pages, any page that leads with numbers.

```
Desktop (≥1025px)   [ KPI 1 ] [ KPI 2 ] [ KPI 3 ] [ KPI 4 ]   ← 4 columns
                    [ Chart — wide          ] [ Feed / Table ]  ← 2 columns

Tablet (769–1024px) [ KPI 1 ] [ KPI 2 ]  /  [ KPI 3 ] [ KPI 4 ]   ← 2 columns
                    [ Chart ]  /  [ Feed ]                          ← 1 column

Mobile (≤768px)     [ KPI 1 ]  ← 1 column (all stacked)
```

```scss
// KPI row
.kpi-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);        // desktop
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px)  { grid-template-columns: 1fr; }
}

// Chart + table row below the KPIs
.content-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr;               // desktop
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
}
```

---

### 9.3 Card

**What:** The standard white surface that groups related content. Used for KPI metrics, charts, tables, and activity feeds.

**When to use:** Any time you need to visually separate a block of content from the page background.

```
┌─ Card ──────────────────────────────────────────┐
│  Card Title                      [Action button] │  ← header, separated by a divider
│ ─────────────────────────────────────────────── │
│  Content goes here                               │  ← body, padding 24px all sides
└─────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Border | `1px solid #C8D5E8` |
| Border radius | `12px` |
| Shadow | `0 4px 12px rgba(26,35,64,0.08)` |
| Padding | `24px` |

```scss
.card { background: #fff; border: 1px solid #C8D5E8; border-radius: 12px; box-shadow: 0 4px 12px rgba(26,35,64,0.08); padding: 24px; }
.card__header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #C8D5E8; }
```

---

### 9.4 Two-Column Form Layout

**What:** A settings-style layout where labels sit in a left column and inputs sit in the right.

**When to use:** Settings pages, profile pages, multi-field data entry forms.

```
Section Title
Short description of this group of fields
─────────────────────────────────────────────────
Full name          [ John Smith              ]
Email address      [ john@example.com        ]
Role               [ Plant Manager    ▾      ]
─────────────────────────────────────────────────
                               [Cancel] [Save]
```

- **Left column:** `280px` fixed label + helper text
- **Right column:** `flex: 1` input controls
- **Row gap:** `24px` between each field row
- **On mobile:** stacks to single column, label above input

---

### 9.5 Page Header

**What:** The consistent title block at the top of every content page.

**When to use:** Every page. Always the first element inside `.layout__content`.

```
← Back to list                         (optional, tertiary link)

Plant Overview                         (Headline / Large — 32px bold)
Live data for all monitored units      (Body / Medium — 14px, grey)
                                                    [ + Add Unit ]  (Primary button)
```

| Element | Style |
|---|---|
| Back link | Tertiary button, size S |
| Page title | `Headline / Large` · `32px / 600` |
| Subtitle | `Body / Medium` · `14px / 400` · `#5E6E8C` |
| Action button | Primary, size M, `flex-end` aligned |
| Bottom margin | `24px` before page content |

---

### 9.6 Stack & Cluster

**What:** Two micro-layout utilities for arranging items inside a component.

**Stack** = vertical, evenly spaced items.  
**Cluster** = horizontal, wrapping items (tags, chips, button rows).

```
Stack (vertical)        Cluster (horizontal, wraps)
  [Item A]              [Tag 1] [Tag 2] [Tag 3]
  [Item B]              [Tag 4] [Tag 5]
  [Item C]
```

| Variant | Gap | Example use |
|---|---|---|
| `.stack--tight` | `8px` | Icon + label, stacked form fields |
| `.stack` (default) | `16px` | Card sections, list items |
| `.stack--loose` | `24px` | Page sections |
| `.cluster` | `8px` | Filter chips, tag groups, button rows |

```scss
.stack         { display: flex; flex-direction: column; gap: 16px; }
.stack--tight  { gap: 8px; }
.stack--loose  { gap: 24px; }
.cluster       { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
```

---

## 10. Error & Edge Case Patterns

Every screen has states beyond the happy path. These patterns define what the UI shows when something goes wrong, is empty, or is loading. Each one follows the same rule: **be clear, be specific, give the user a next step**.

---

### 10.1 Inline Form Validation

**What:** An error message that appears directly below an invalid field.

**When:** Triggered on field blur or when the user hits Submit.

**Example — invalid email field:**
```
Email address *
┌────────────────────────────────┐
│ hello@                         │  ← red border: 1.5px solid #EF4444
└────────────────────────────────┘  ← background tint: #FFF5F5
⚠  Please enter a valid email address.   ← 11px, #EF4444, margin-top 4px
```

**3 rules:**
1. One message per field — never stack multiple errors.
2. Clear the error the moment the value becomes valid (don't wait for re-submit).
3. Never rely on color alone — always include the ⚠ icon for accessibility.

---

### 10.2 Toast Notifications

**What:** A small pop-up in the bottom-right corner confirming an action just completed.

**When:** After save, delete, copy, or any background operation finishing.

**4 variants — one per outcome:**

| Variant | Left border | When to use |
|---|---|---|
| ✓ Success | `#10B981` green | Record saved, file uploaded, action completed |
| ✗ Error | `#EF4444` red | Action failed, server error |
| ⚠ Warning | `#F59E0B` amber | Saved with caveats, approaching a limit |
| ℹ Info | `#0EA5E9` blue | Background task started, non-critical update |

**Anatomy:**
```
┌──────────────────────────────────┐
│ ✓  Changes saved                 │  ← title: 14px / 600
│    Your profile has been updated │  ← body: 12px / 400, grey
└──────────────────────────────────┘
  width: 320px · shadow-lg · radius-md
  position: bottom-right, 24px from edge
```

**Dismiss timing:** Success and Info auto-dismiss after `4 seconds`. Error and Warning stay until manually closed.

---

### 10.3 Page Banner Alert

**What:** A full-width bar pinned below the topbar for important conditions the user must see before working.

**When:** Session expiry warning, maintenance notice, missing required setup, permission issue.

**Example:**
```
 ⚠  Your session expires in 5 minutes. Save your work.  [Renew session]  ✕
```

| Variant | Background | Text | Border |
|---|---|---|---|
| Error | `#FEF2F2` | `#B91C1C` | `1px solid #FECACA` |
| Warning | `#FFFBEB` | `#92400E` | `1px solid #FDE68A` |
| Success | `#F0FDF4` | `#065F46` | `1px solid #A7F3D0` |
| Info | `#EFF6FF` | `#1E40AF` | `1px solid #BFDBFE` |

Height: `48px` single-line · auto for multi-line · `border-radius: 6px` · placed directly below the topbar.

---

### 10.4 Empty State

**What:** A centered message shown when a list, table, or feed has no data.

**When:** First-time use (no data created yet), search with no results, or a filter returning nothing.

**Template:**
```
         [  Icon — 64px  ]

      No results found           ← Title/Small · 18px · 600
  Try a different search term    ← Body/Medium · 14px · grey
  or clear your filters.

         [Clear filters]         ← Secondary button, size M
```

**Pick the right copy for each scenario:**

| Scenario | Icon | Title | Button |
|---|---|---|---|
| Search returned nothing | 🔍 | "No results found" | "Clear search" (Secondary) |
| No records exist yet | 📋 | "Nothing here yet" | "Create your first record" (Primary) |
| Filtered to zero | 🎚 | "No matching records" | "Reset filters" (Secondary) |
| No access | 🔒 | "Access restricted" | "Request access" (Secondary) |

---

### 10.5 Loading States

**What:** Visual placeholders while data is being fetched.

**Two tools — choose based on what you know:**

| Tool | Use when | Example |
|---|---|---|
| **Skeleton** | You know the shape of the content (cards, lists, tables) | A grey shimmer rectangle the same size as the card that will load |
| **Spinner** | Shape is unknown, or it's a short in-progress action | Button spinner while a form is submitting |

**Skeleton — how it works:**
```scss
// A shimmering grey placeholder
.skeleton {
  background: linear-gradient(90deg, #E8EDF5 25%, #F3F7FB 50%, #E8EDF5 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 6px;
}
@keyframes shimmer {
  from { background-position: -400px 0; }
  to   { background-position:  400px 0; }
}
```

**Spinner sizes:** `16px` inside a button · `32px` for a section · `48px` for a full page.

**Never** show a skeleton and a spinner for the same content area at the same time.

---

### 10.6 Network / Server Error

**What:** A full-page message when a critical API call fails and the page cannot be rendered.

**When:** 500 errors, network timeouts, failed initial data fetch.

```
            [  Error icon — 80px  ]

        Something went wrong          ← Headline/Small · 24px · 600
   We couldn't load this page.        ← Body/Large · 16px · grey
   Check your connection and try again.

           [  Try again  ]            ← Primary button
         [Go to Dashboard]            ← Tertiary button
```

Always give two options: **retry** the failed action, and a **safe exit** back to a working page.

---

### 10.7 Destructive Action Confirmation

**What:** A modal that appears before any irreversible action to make sure the user meant to do it.

**When:** Deleting a record, archiving data, revoking access, clearing all items.

```
┌────────────────────────────────────┐
│  Delete this plant record?         │  ← Title/Small · 18px
│                                    │
│  This will permanently remove      │  ← Body/Medium · 14px · grey
│  all data and cannot be undone.    │
│                                    │
│           [Cancel]  [Delete]       │  ← Secondary · Danger (red)
└────────────────────────────────────┘
  width: 400px · radius: 16px · overlay: rgba(26,35,64,0.48)
```

**3 rules:**
1. **Cancel is always on the left.** The safe option comes first.
2. **The confirm button is red** (`#EF4444`), never the primary blue.
3. **Escape key = Cancel.** Clicking outside the modal also cancels.

---

### 10.8 Disabled vs Read-Only

**What:** Two distinct states for controls that cannot be edited — they mean different things and look slightly different.

| | Disabled | Read-only |
|---|---|---|
| **Meaning** | Cannot interact with this right now | Data is shown for reference only |
| **Background** | `#F3F7FB` | `#F3F7FB` |
| **Text color** | `#A8B8CC` (faded) | `#1A2340` (full strength) |
| **Border** | `#C8D5E8` (default) | `#C8D5E8` (default) |
| **Cursor** | `not-allowed` | `default` |
| **Example** | A "Save" button before the form is valid | A field showing a system-generated ID |

**Rule:** If a control is disabled for a non-obvious reason, always show a tooltip explaining why.
