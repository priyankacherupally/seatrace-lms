# Seatrace Design System

---

## Table of Contents

1. [Typography](#typography)
2. [Color Styles](#color-styles)
3. [Border Radius (Shape)](#border-radius-shape)
4. [Buttons](#buttons)

---

## Typography

**Font Family:** Nunito

### Headings

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Headline / Large / Primary | 32 / 44 | Semibold (600) | -0.25px |
| Headline / Medium / Primary | 28 / 38 | Semibold (600) | -0.25px |
| Headline / Small / Primary | 24 / 33 | Semibold (600) | -0.25px |

### Titles

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Title / Large / Primary | 24 / 33 | Regular (400) | -0.25px |
| Title / Medium / Primary | 20 / 27 | Medium (500) | -0.25px |
| Title / Small / Primary | 18 / 25 | Semibold (600) | -0.25px |

### Labels

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Label / Large / Primary | 14 / 19 | Medium (500) | -0.25px |
| Label / Medium / Primary | 12 / 16 | Medium (500) | -0.25px |
| Label / Small / Primary | 11 / 15 | Medium (500) | -0.25px |

### Body

| Token | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|
| Body / Large | 16 / 22 | Regular (400) | -0.25px |
| Body / Medium (Regular) | 14 / 19 | Regular (400) | -0.25px |
| Body / Medium (Semibold) | 12 / 16 | Semibold (600) | -0.25px |
| Body / Small | 12 / 16 | Regular (400) | -0.25px |

### Special Sizes

| Usage | Size |
|---|---|
| Welcome / Page Title | 48px |
| KPI Value — Large | 64px |
| KPI Value — Medium | 56px |

---

## Color Styles

### Primary Color

| Step | Hex |
|---|---|
| 50 | `#5189F3` |

### Brand Colors

| Step | Hex |
|---|---|
| 5 | `#F8FAFF` |
| 10 | `#E4EEFF` |
| 20 | `#B8D0FD` |
| 30 | `#A3C1FB` |
| 40 | `#70A0FB` |
| **50** | **`#5189F3`** |
| 60 | `#3F78E2` |
| 70 | `#326DDD` |
| 80 | `#155BE1` |
| 90 | `#074ED4` |

### Neutrals

| Step | Hex |
|---|---|
| 1 | `#FFFFFF` |
| 5 | `#F8FAFC` |
| 10 | `#EBF0F4` |
| 20 | `#DFE2E6` |
| 30 | `#DADCDF` |
| 40 | `#BFC1C4` |
| 50 | `#A7AAAD` |
| 60 | `#969799` |
| 70 | `#828385` |
| 80 | `#5E5E60` |
| 90 | `#3B3B3C` |
| 100 | `#111111` |

### Link Colors

| Step | Hex |
|---|---|
| 10 | `#E9EEFF` |
| 20 | `#C6D3FA` |
| 30 | `#A2B7F6` |
| 40 | `#7C9AF4` |
| 50 | `#6286F1` |
| 60 | `#3160ED` |

### Warning Colors

| Step | Hex |
|---|---|
| 10 | `#FFE9E9` |
| 20 | `#F9C8C8` |
| 30 | `#F5A3A3` |
| 40 | `#EF6B6B` |
| 50 | `#E82727` |
| 60 | `#E60026` |

### Success Colors

| Step | Hex |
|---|---|
| 10 | `#E9FFEC` |
| 20 | `#ABDAA9` |
| 30 | `#81C87E` |
| 40 | `#65BC62` |
| 50 | `#4DAC4A` |
| 60 | `#408F3D` |

### Background / Surface

| Token | Hex |
|---|---|
| Background / Surface | `#F9F9FA` |

---

## Border Radius (Shape)

| Token | Value | Usage |
|---|---|---|
| Border Radius — 0 | `0px` | Sharp / no rounding |
| Border Radius — 4 | `4px` | Small radius (chips, tags) |
| Border Radius — 8 | `8px` | Medium radius (cards, inputs) |
| Border Radius — 16 | `16px` | Large radius (modals, panels) |

---

## Buttons

**Font:** Nunito  
**Available states:** Default · Hover · While Pressing · Disabled

### Sizes

| Size | Label |
|---|---|
| XS | Extra Small |
| S | Small |
| M | Medium |
| L | Large |

### Variants

#### Primary

Filled with **Brand 50** (`#5189F3`), white label text.

| State | Background | Border | Text |
|---|---|---|---|
| Default | `#5189F3` | — | `#FFFFFF` |
| Hover | `#70A0FB` | — | `#FFFFFF` |
| Pressing | `#326DDD` | — | `#FFFFFF` |
| Disabled | `#B8D0FD` | — | `#FFFFFF` (50% opacity) |

#### Secondary

Outlined with **Brand 50** border, transparent background.

| State | Background | Border | Text |
|---|---|---|---|
| Default | Transparent | `#5189F3` | `#5189F3` |
| Hover | `#E4EEFF` | `#5189F3` | `#5189F3` |
| Pressing | `#B8D0FD` | `#326DDD` | `#326DDD` |
| Disabled | Transparent | `#B8D0FD` | `#B8D0FD` |

#### Tertiary

Text-only, no border or background.

| State | Background | Border | Text |
|---|---|---|---|
| Default | Transparent | — | `#5189F3` |
| Hover | `#E4EEFF` | — | `#5189F3` |
| Pressing | `#B8D0FD` | — | `#326DDD` |
| Disabled | Transparent | — | `#B8D0FD` |

### Button Size Tokens

| Size | Height | Padding (H) | Font Size | Border Radius |
|---|---|---|---|---|
| XS | 24px | 8px | 11px | 4px |
| S | 28px | 10px | 12px | 4px |
| M | 32px | 12px | 14px | 4px |
| L | 40px | 16px | 16px | 4px |

> Buttons support optional leading and trailing icons.

---

## MUI (Material UI) Integration

**Library:** [@mui/material](https://mui.com/material-ui/)  
**Version:** v6+ (React 17 / 18 / 19 compatible)

### Installation

#### Step 1 — Core packages

```bash
npm install @mui/material @emotion/react @emotion/styled
```

| Package | Role |
|---|---|
| `@mui/material` | All MUI components, hooks, and theme engine |
| `@emotion/react` | CSS-in-JS runtime required by MUI |
| `@emotion/styled` | Styled-component API used internally by MUI |

#### Step 2 — Icons (optional)

```bash
npm install @mui/icons-material
```

Provides 2,000+ Material Design SVG icons as React components.  
Usage: `import HomeIcon from '@mui/icons-material/Home'`

#### Step 3 — Nunito Font

```bash
# via npm
npm install @fontsource/nunito
```

Then import in your entry file:

```ts
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
```

Or use Google Fonts in your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

#### Step 4 — Peer Dependencies

MUI requires React to already be installed:

```bash
npm install react react-dom
```

| Package | Required Version |
|---|---|
| `react` | `^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0` |

#### React 18 and below — version fix

```bash
npm install react-is@18.3.1
```

Add to `package.json`:

```json
{
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

> **Why:** MUI v6 uses `react-is@19` internally. A version mismatch causes runtime errors in prop-type checks on React 17/18 projects.

#### Alternative: styled-components engine

```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```

> **Note:** styled-components is **not** compatible with SSR (Next.js). Use Emotion for server-rendered projects.

#### Full install (everything at once)

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/nunito
```

---

### Seatrace Theme — `createTheme`

Map all design tokens from this system into a single MUI theme object:

```tsx
import { createTheme } from '@mui/material/styles';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';

const seatraceTheme = createTheme({

  // ── PALETTE ──────────────────────────────────────────
  palette: {
    primary: {
      light:   '#70A0FB',  // Brand 40
      main:    '#5189F3',  // Brand 50 — primary color
      dark:    '#326DDD',  // Brand 70
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:    '#6286F1',  // Link 50
      dark:    '#3160ED',  // Link 60
      contrastText: '#FFFFFF',
    },
    error: {
      light:   '#F5A3A3',  // Warning 30
      main:    '#E82727',  // Warning 50
      dark:    '#E60026',  // Warning 60
    },
    success: {
      light:   '#81C87E',  // Success 30
      main:    '#4DAC4A',  // Success 50
      dark:    '#408F3D',  // Success 60
    },
    text: {
      primary:   '#111111',  // Neutral 100
      secondary: '#5E5E60',  // Neutral 80
      disabled:  '#A7AAAD',  // Neutral 50
    },
    divider: '#DFE2E6',       // Neutral 20
    background: {
      default: '#F9F9FA',     // Surface
      paper:   '#FFFFFF',     // Neutral 1
    },
  },

  // ── TYPOGRAPHY ───────────────────────────────────────
  typography: {
    fontFamily: '"Nunito", sans-serif',
    letterSpacing: '-0.25px',

    // Headline Large
    h1: { fontSize: '2rem',     fontWeight: 600, lineHeight: '44px', letterSpacing: '-0.25px' },
    // Headline Medium
    h2: { fontSize: '1.75rem',  fontWeight: 600, lineHeight: '38px', letterSpacing: '-0.25px' },
    // Headline Small
    h3: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: '33px', letterSpacing: '-0.25px' },
    // Title Large
    h4: { fontSize: '1.5rem',   fontWeight: 400, lineHeight: '33px', letterSpacing: '-0.25px' },
    // Title Medium
    h5: { fontSize: '1.25rem',  fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.25px' },
    // Title Small
    h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: '25px', letterSpacing: '-0.25px' },

    // Body Large
    body1: { fontSize: '1rem',   fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.25px' },
    // Body Medium Regular
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: '19px', letterSpacing: '-0.25px' },

    // Label Large
    subtitle1: { fontSize: '0.875rem', fontWeight: 500, lineHeight: '19px', letterSpacing: '-0.25px' },
    // Label Medium
    subtitle2: { fontSize: '0.75rem',  fontWeight: 500, lineHeight: '16px', letterSpacing: '-0.25px' },

    // Label Small
    caption: { fontSize: '0.6875rem', fontWeight: 500, lineHeight: '15px', letterSpacing: '-0.25px' },

    // Body Small
    overline: { fontSize: '0.75rem', fontWeight: 400, lineHeight: '16px', letterSpacing: '-0.25px' },

    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '-0.1px' },
  },

  // ── SHAPE (Border Radius) ─────────────────────────────
  shape: {
    borderRadius: 4, // default — Border Radius-4
  },

  // ── SPACING ──────────────────────────────────────────
  spacing: 4, // 1 unit = 4px  →  spacing(1)=4px, spacing(2)=8px, spacing(4)=16px

  // ── COMPONENT OVERRIDES ───────────────────────────────
  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '-0.1px',
        },
        // Size overrides
        sizeSmall:  { height: 28, padding: '0 10px', fontSize: '0.75rem'  },
        sizeMedium: { height: 32, padding: '0 12px', fontSize: '0.875rem' },
        sizeLarge:  { height: 40, padding: '0 16px', fontSize: '1rem'     },

        // Variant: contained = Primary button
        contained: {
          boxShadow: 'none',
          '&:hover':  { boxShadow: 'none', backgroundColor: '#70A0FB' },
          '&:active': { backgroundColor: '#326DDD' },
        },
        // Variant: outlined = Secondary button
        outlined: {
          borderColor: '#5189F3',
          '&:hover':  { backgroundColor: '#E4EEFF', borderColor: '#5189F3' },
          '&:active': { backgroundColor: '#B8D0FD', borderColor: '#326DDD', color: '#326DDD' },
        },
        // Variant: text = Tertiary button
        text: {
          '&:hover':  { backgroundColor: '#E4EEFF' },
          '&:active': { backgroundColor: '#B8D0FD', color: '#326DDD' },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },

    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
      },
    },
  },
});

export default seatraceTheme;
```

---

### Applying the Theme

```tsx
// main.tsx / App.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import seatraceTheme from './seatraceTheme';

export default function App() {
  return (
    <ThemeProvider theme={seatraceTheme}>
      <CssBaseline />
      {/* your app */}
    </ThemeProvider>
  );
}
```

---

### MUI Color System

MUI ships 22 pre-built color palettes from Material Design. Import any color directly:

```ts
import { red, blue, purple } from '@mui/material/colors';
const value = red[500]; // '#f44336'
```

Each palette has **10 standard shades** (50 → 900) plus **4 accent shades** (A100, A200, A400, A700). The **500** shade is the primary hue.

#### All 22 Palettes

| Group | Palettes |
|---|---|
| **Reds / Pinks** | `red` · `pink` |
| **Purples** | `purple` · `deepPurple` |
| **Blues** | `indigo` · `blue` · `lightBlue` · `cyan` |
| **Greens** | `teal` · `green` · `lightGreen` · `lime` |
| **Yellows / Oranges** | `yellow` · `amber` · `orange` · `deepOrange` |
| **Neutrals** | `brown` · `grey` · `blueGrey` |

#### Shade Steps per Palette

| Step | Lightness |
|---|---|
| `50` | Lightest tint |
| `100` – `400` | Light to mid tones |
| `500` | Primary hue |
| `600` – `900` | Dark tones |
| `A100`, `A200` | Accent / saturated tints |
| `A400`, `A700` | Accent / saturated darks |

---

### Palette API

#### Standard Palette Keys

| Key | Purpose | Sub-keys |
|---|---|---|
| `primary` | Main brand actions | `main` · `light` · `dark` · `contrastText` |
| `secondary` | Secondary actions | `main` · `light` · `dark` · `contrastText` |
| `error` | Destructive / error states | `main` · `light` · `dark` · `contrastText` |
| `warning` | Caution states | `main` · `light` · `dark` · `contrastText` |
| `info` | Neutral information | `main` · `light` · `dark` · `contrastText` |
| `success` | Positive / success states | `main` · `light` · `dark` · `contrastText` |
| `text` | Text rendering | `primary` · `secondary` · `disabled` |
| `background` | Surface colours | `default` · `paper` |
| `divider` | Separator lines | _(single value)_ |
| `action` | Interactive states | `active` · `hover` · `selected` · `disabled` · `disabledBackground` · `focus` |

#### Auto-Calculation

Only `main` is required — MUI computes `light`, `dark`, and `contrastText` automatically:

```ts
const theme = createTheme({
  palette: {
    primary: { main: '#5189F3' }, // light, dark, contrastText auto-generated
  },
});
```

Control the calculation:

```ts
const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,      // WCAG AA — default is 3
    tonalOffset: 0.2,            // shift for light/dark — or { light: 0.1, dark: 0.4 }
  },
});
```

#### Dark Mode / Color Schemes (v6+)

```ts
const theme = createTheme({
  colorSchemes: {
    light: { palette: { primary: { main: '#5189F3' } } },
    dark:  { palette: { primary: { main: '#B8D0FD' } } },
  },
});
```

#### Custom Palette Colors

```ts
// Option A — manual tokens
const theme = createTheme({
  palette: {
    ocean: { main: '#0077B6', light: '#00B4D8', dark: '#03045E', contrastText: '#fff' },
  },
});

// Option B — augmentColor (auto-calculates light/dark)
let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    ocean: theme.palette.augmentColor({ color: { main: '#0077B6' }, name: 'ocean' }),
  },
});
```

#### Palette Utility Functions

```ts
import { alpha, getContrastRatio } from '@mui/material/styles';

alpha('#5189F3', 0.5)                       // rgba(81, 137, 243, 0.5)
getContrastRatio('#5189F3', '#fff')          // e.g. 3.2 — check WCAG compliance
```

---

### Typography Customization

MUI exposes **13 built-in variants**: `h1` `h2` `h3` `h4` `h5` `h6` `subtitle1` `subtitle2` `body1` `body2` `button` `caption` `overline`

```ts
const theme = createTheme({
  typography: {
    fontFamily: '"Nunito", sans-serif',
    fontSize: 14,          // base font size (px) — default 14
    htmlFontSize: 16,      // <html> font size (px) — default 16

    h1: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.25px' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none' },

    // Custom variant
    display1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.5px' },
  },
});
```

#### Responsive Font Sizes

```ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme); // auto-scales h1–h6 across breakpoints
```

---

### Spacing System

MUI default spacing unit = **8px**. `theme.spacing(n)` returns `n × 8px`.

```ts
// Custom unit (Seatrace uses 4px)
const theme = createTheme({ spacing: 4 });
// theme.spacing(1) → '4px'
// theme.spacing(4) → '16px'

// Function-based
const theme = createTheme({ spacing: (factor) => `${0.25 * factor}rem` });

// Array-based
const theme = createTheme({ spacing: [0, 4, 8, 16, 32, 64] });

// Multi-argument shorthand
theme.spacing(1, 2)      // '4px 8px'
theme.spacing(1, 'auto') // '4px auto'
```

---

### Component Customization Methods

#### 1 — Default Props

Change prop defaults globally for any component:

```ts
const theme = createTheme({
  components: {
    MuiButton:    { defaultProps: { disableElevation: true } },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiButtonBase:{ defaultProps: { disableRipple: true } },
  },
});
```

#### 2 — Style Overrides (slot-based)

Override CSS for specific slots (use `root` for the outermost element):

```ts
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root:          { borderRadius: 4, fontWeight: 600 },
        containedPrimary: { boxShadow: 'none', '&:hover': { backgroundColor: '#70A0FB' } },
        outlined:      { borderColor: '#5189F3' },
      },
    },
  },
});
```

#### 3 — Conditional Variants

Apply styles when specific prop combinations are active:

```ts
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            { props: { variant: 'dashed' }, style: { border: '2px dashed #5189F3' } },
            { props: { variant: 'contained', color: 'primary' }, style: { boxShadow: 'none' } },
          ],
        },
      },
    },
  },
});
```

#### 4 — Global Theme Variables

Change a theme variable that cascades to all components automatically:

```ts
const theme = createTheme({
  typography: { button: { fontSize: '0.875rem' } },
  shape:      { borderRadius: 8 },
  spacing:    4,
});
```

---

### Token → MUI Mapping Reference

| Seatrace Token | MUI Theme Path |
|---|---|
| Brand 50 `#5189F3` | `palette.primary.main` |
| Brand 40 `#70A0FB` | `palette.primary.light` |
| Brand 70 `#326DDD` | `palette.primary.dark` |
| Warning 50 `#E82727` | `palette.error.main` |
| Success 50 `#4DAC4A` | `palette.success.main` |
| Neutral 100 `#111111` | `palette.text.primary` |
| Neutral 80 `#5E5E60` | `palette.text.secondary` |
| Neutral 20 `#DFE2E6` | `palette.divider` |
| Surface `#F9F9FA` | `palette.background.default` |
| Border Radius 0 | `shape.borderRadius: 0` |
| Border Radius 4 | `shape.borderRadius: 4` (default) |
| Border Radius 8 | applied per-component in `components` |
| Border Radius 16 | `MuiDialog.paper.borderRadius: 16` |
| Headline Large | `typography.h1` |
| Title Medium | `typography.h5` |
| Label Large | `typography.subtitle1` |
| Body Large | `typography.body1` |
| Button font | `typography.button` |

---

### Available MUI Components

Full component list from [mui.com/material-ui/all-components](https://mui.com/material-ui/all-components/).

#### Inputs

| Component | Description |
|---|---|
| Autocomplete | Combo box with free-form text and suggestions |
| Button | Triggered actions — contained, outlined, text variants |
| Button Group | Group of related buttons |
| Checkbox | Binary selection control |
| Floating Action Button | Circular primary action button (FAB) |
| Number Field | Numeric input with increment/decrement |
| Radio Group | Single-selection from a list of options |
| Rating | Star-based rating input |
| Select | Dropdown selection input |
| Slider | Range or single value via drag |
| Switch | Toggle between two states |
| Text Field | Single/multi-line text input |
| Transfer List | Move items between two lists |
| Toggle Button | Exclusive or multi-select toggle group |

#### Data Display

| Component | Description |
|---|---|
| Avatar | User or entity image/initials |
| Badge | Small count or status indicator on an element |
| Chip | Compact element for tags, filters, or selections |
| Divider | Thin line separator between content |
| Icons | SVG icon wrapper component |
| Material Icons | Full icon library (requires `@mui/icons-material`) |
| List | Vertical list of items with optional actions |
| Table | Structured rows and columns of data |
| Tooltip | Informational label on hover/focus |
| Typography | Renders text with theme scale variants |

#### Feedback

| Component | Description |
|---|---|
| Alert | Inline message for success, warning, error, info |
| Backdrop | Dark overlay blocking background interaction |
| Dialog | Modal overlay for confirmations or forms |
| Progress | Circular or linear loading indicator |
| Skeleton | Placeholder while content is loading |
| Snackbar | Brief toast notification at screen edge |

#### Surfaces

| Component | Description |
|---|---|
| Accordion | Collapsible/expandable content panel |
| App Bar | Top-level navigation and branding bar |
| Card | Contained surface for grouped content |
| Paper | Base elevation surface (card foundation) |

#### Navigation

| Component | Description |
|---|---|
| Bottom Navigation | Mobile tab bar at the bottom of the screen |
| Breadcrumbs | Hierarchical location trail |
| Drawer | Side panel that slides in from an edge |
| Link | Styled anchor element using theme typography |
| Menu | Contextual dropdown list of actions |
| Menubar | Horizontal menu bar (lab) |
| Pagination | Page number controls |
| Speed Dial | Expandable FAB with action sub-buttons |
| Stepper | Step-by-step progress indicator |
| Tabs | Horizontal tab switcher |

#### Layout

| Component | Description |
|---|---|
| Box | Generic wrapper with `sx` prop support |
| Container | Responsive max-width content wrapper |
| Grid | 12-column responsive layout grid |
| Stack | One-dimensional flex layout helper |
| Image List | Responsive masonry/grid image collection |

#### Lab

| Component | Description |
|---|---|
| Masonry | Pinterest-style variable-height grid |
| Timeline | Vertical chronological event list |

#### Utils

| Component | Description |
|---|---|
| Click-Away Listener | Detects clicks outside a wrapped element |
| CSS Baseline | Global CSS reset + theme background apply |
| InitColorSchemeScript | Prevents flash of unstyled content on color-scheme init |
| Modal | Low-level accessible overlay primitive |
| No SSR | Defers rendering to client only |
| Popover | Anchored floating content panel |
| Popper | Low-level positioning primitive (Popper.js) |
| Portal | Renders children into a different DOM node |
| Textarea Autosize | Auto-growing textarea |
| Transitions | Fade, Slide, Grow, Zoom, Collapse animation helpers |
| useMediaQuery | Hook to read CSS breakpoints in JS |
