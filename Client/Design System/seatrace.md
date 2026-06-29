# Seatrace Design System

---

## 1. Typography

**Font Family:** Nunito (Google Fonts)

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
| Body Medium Regular | 12px / 16px | Regular (400) | -0.25px |
| Body Medium Semibold | 12px / 16px | Semibold (600) | -0.25px |
| Body Small | 14px / 19px | Regular (400) | -0.25px |

### Display / KPI

| Token | Size |
|---|---|
| Welcome | 48px |
| KPI Size 1 | 64px |
| KPI Size 2 | 56px |

---

## 2. Color Styles

### Primary Color

| Token | Hex |
|---|---|
| Primary | `#4060FF` |

### Brand Colors (Blue Scale)

| Step | Hex |
|---|---|
| Brand / 5 | `#EEF1FF` |
| Brand / 10 | `#D4DAFF` |
| Brand / 20 | `#A9B5FF` |
| Brand / 30 | `#7D8FFF` |
| Brand / 40 | `#526AFF` |
| Brand / 60 (Primary) | `#4060FF` |
| Brand / 70 | `#2B4BCC` |
| Brand / 80 | `#1C3699` |
| Brand / 90 | `#0D2166` |

### Neutrals (Gray Scale)

| Step | Hex |
|---|---|
| Neutral / 1 | `#FFFFFF` |
| Neutral / 5 | `#F7F8FA` |
| Neutral / 10 | `#EAECF0` |
| Neutral / 20 | `#D5D9E0` |
| Neutral / 30 | `#B0B7C3` |
| Neutral / 40 | `#8A94A6` |
| Neutral / 50 | `#6B7280` |
| Neutral / 60 | `#4B5263` |
| Neutral / 70 | `#374151` |
| Neutral / 80 | `#1F2937` |
| Neutral / 90 | `#111827` |
| Neutral / 100 | `#000000` |

### Link Colors (Blue Scale)

| Step | Hex |
|---|---|
| Link / 10 | `#EEF1FF` |
| Link / 20 | `#A9B5FF` |
| Link / 30 | `#7D8FFF` |
| Link / 40 | `#526AFF` |
| Link / 50 | `#4060FF` |
| Link / 60 | `#2B4BCC` |

### Warning Colors (Red Scale)

| Step | Hex |
|---|---|
| Warning / 10 | `#FFF0F0` |
| Warning / 20 | `#FFCCCC` |
| Warning / 30 | `#FF9999` |
| Warning / 40 | `#FF6666` |
| Warning / 50 (Default) | `#FF3333` |
| Warning / 60 | `#CC0000` |

### Success Colors (Green Scale)

| Step | Hex |
|---|---|
| Success / 10 | `#EDFFF5` |
| Success / 20 | `#AADEC0` |
| Success / 30 | `#6DC494` |
| Success / 40 | `#3DAA6A` |
| Success / 50 (Default) | `#1E8A4A` |
| Success / 60 | `#0F6B35` |

### Background / Surface

| Token | Hex |
|---|---|
| Background / Surface | `#F7F8FA` |

---

## 3. Effects (Shadows)

| Token | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|
| Shadow None | 0 | 0 | 0 | 0 | `#000000` 100% |
| Shadow Soft | 0 | 0 | 8 | 0 | `#000000` 0% |
| Shadow Elevated | 6 | 6 | 3 | 0 | `#1BBFF2` 6% |

---

## 4. Border Radius (Shape)

| Token | Value |
|---|---|
| Border Radius - 0 | `0px` |
| Border Radius - 4 (Small) | `4px` |
| Border Radius - 10 (Medium) | `10px` |
| Border Radius - 16 (Large) | `16px` |

---

## 5. Layouts / Breakpoints

| Breakpoint | Device |
|---|---|
| Mobile | Up to ~767px |
| Tablet (TAB) | 768px – 1199px |
| Desktop | 1200px and above |

---

## 6. Button Component

### Variants

| Variant | Description |
|---|---|
| Primary | Filled blue background (`#4060FF`), white text |
| Secondary | White background, blue border (`#4060FF`), blue text |
| Tertiary | No background, no border, blue text only |

### Sizes

| Size | Height | Font | Padding (H) |
|---|---|---|---|
| XS | 24px | 11px / Label Small | 8px |
| S | 28px | 12px / Label Medium | 10px |
| M | 32px | 14px / Label Large | 12px |
| L | 40px | 14px / Label Large | 16px |

### States

| State | Primary | Secondary | Tertiary |
|---|---|---|---|
| Default | `#4060FF` fill, white text | White fill, `#4060FF` border + text | No fill/border, `#4060FF` text |
| Hover | Slightly lighter blue fill | Blue border intensifies | Text underline or opacity change |
| While Pressing | Darker blue fill (`#2B4BCC`) | Darker border + text | Pressed opacity |
| Disabled | Washed-out blue (`#A9B5FF`), low-opacity text | Light gray border + low-opacity text | Low-opacity text |

### Structure
Buttons include a **leading icon (chevron-left)** and **trailing icon (chevron-right)** — used for dropdown/split button patterns.

---

## 7. CSS Custom Properties Reference

```css
:root {
  /* Font */
  --font-family: 'Nunito', sans-serif;

  /* Primary */
  --color-primary: #4060FF;

  /* Brand Scale */
  --color-brand-5:  #EEF1FF;
  --color-brand-10: #D4DAFF;
  --color-brand-20: #A9B5FF;
  --color-brand-30: #7D8FFF;
  --color-brand-40: #526AFF;
  --color-brand-60: #4060FF;
  --color-brand-70: #2B4BCC;
  --color-brand-80: #1C3699;
  --color-brand-90: #0D2166;

  /* Neutrals */
  --color-neutral-1:   #FFFFFF;
  --color-neutral-5:   #F7F8FA;
  --color-neutral-10:  #EAECF0;
  --color-neutral-20:  #D5D9E0;
  --color-neutral-30:  #B0B7C3;
  --color-neutral-40:  #8A94A6;
  --color-neutral-50:  #6B7280;
  --color-neutral-60:  #4B5263;
  --color-neutral-70:  #374151;
  --color-neutral-80:  #1F2937;
  --color-neutral-90:  #111827;
  --color-neutral-100: #000000;

  /* Warning */
  --color-warning-10: #FFF0F0;
  --color-warning-50: #FF3333;
  --color-warning-60: #CC0000;

  /* Success */
  --color-success-10: #EDFFF5;
  --color-success-50: #1E8A4A;
  --color-success-60: #0F6B35;

  /* Surface */
  --color-surface: #F7F8FA;

  /* Border Radius */
  --radius-0:  0px;
  --radius-sm: 4px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* Typography Scale */
  --text-headline-lg:   32px;
  --text-headline-md:   28px;
  --text-headline-sm:   24px;
  --text-title-lg:      24px;
  --text-title-md:      20px;
  --text-title-sm:      18px;
  --text-label-lg:      14px;
  --text-label-md:      12px;
  --text-label-sm:      11px;
  --text-body-lg:       16px;
  --text-body-md:       12px;
  --text-body-sm:       14px;
  --text-welcome:       48px;
  --text-kpi-1:         64px;
  --text-kpi-2:         56px;
  --letter-spacing-default: -0.25px;
}
```
