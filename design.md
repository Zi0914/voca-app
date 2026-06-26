## Mobile App Frame

Pluma must be designed as a mobile app prototype, not a desktop web page.

The app should always render inside a centered mobile frame on desktop preview.

### App Container

Use a fixed mobile-first container:

```css
.app-shell {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: #FFF8EF;
  position: relative;
  overflow-x: hidden;
}
```

On desktop screens, do not stretch the UI across the browser width. The app should stay centered like a phone screen.

The page background outside the app shell can remain warm cream, but all navigation, cards, and content must stay within the 430px mobile container.

### Mobile Width Rules

Design base width:
390px

Maximum app width:
430px

Minimum supported width:
320px

Do not create desktop layouts, multi-column layouts, or full-browser-width navigation.

## Top Bar

The main Add action should live in the top bar, not as a floating button at the bottom.

### Top Bar Layout

Top bar content:

Left:
**Pluma**

Right:
Circle plus icon + optional label **Add**

Recommended structure:

```text
Pluma                                      ⊕ Add
```

Rules:

* Top bar should be inside the mobile app container.
* Use 20px horizontal padding.
* Height: 56–64px.
* Keep the Add action aligned to the top right.
* Use a clear circle-plus icon for Add.
* Do not place the Add button as a floating button over the bottom navigation.

### Add Button

Use:

```text
⊕ Add
```

or icon-only on very small screens:

```text
⊕
```

Visual:

* Circle plus icon
* Peacock blue icon/text
* 44px minimum tap target
* No floating action button in the bottom right

## Bottom Navigation

Bottom navigation must be fixed inside the mobile app container only.

Tabs:

```text
Home | Nest | Repeat | Me
```

Rules:

* The bottom nav should not span the full desktop browser width.
* It should be positioned at the bottom of `.app-shell`.
* It should have 4 evenly spaced tabs.
* Do not include an Add button in the bottom navigation.
* Do not use a floating Add button near the bottom nav.
* Active tab should use peacock blue `#006D77`.
* Inactive tabs should use secondary gray `#6B777A`.

Recommended CSS:

```css
.bottom-nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  height: calc(72px + env(safe-area-inset-bottom));
  padding: 8px 20px calc(8px + env(safe-area-inset-bottom));
  background: rgba(255, 248, 239, 0.96);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(29, 43, 46, 0.08);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  z-index: 20;
}
```

Each tab:

* Icon size: 22–24px
* Label size: 11–12px
* Tap target: at least 44px
* Center icon and label vertically

## Page Content Spacing

Main page content should sit inside the mobile app container.

Recommended structure:

```css
.page {
  padding: 0 20px 96px;
}
```

Bottom padding must account for the bottom navigation so cards are not hidden behind it.

Spacing:

* Page padding: 20px
* Section gap: 24px
* Card gap: 16px
* Card padding: 20px
* Card radius: 24–28px

Do not center cards in a narrow column inside the mobile container. Cards should use the full available width inside page padding.

## Home Screen Layout

Home should follow this hierarchy:

1. Top bar: Pluma + Add
2. Greeting section
3. Starter card
4. Quick Add card
5. Repeat preview
6. Recent notes preview
7. Bottom navigation

### Home Greeting

Use:

```text
Hi Liz,
What English did you notice today?
```

Body:

```text
Save any word, phrase, or sentence you want to remember. Pluma will help you understand it in Chinese and practice it later.
```

### Starter Card

Use one starter card only.

Do not show empty placeholder cards.

Starter card content:

```text
Start with one thing

It can be something you just read, heard, or wanted to say.

Example: “I’m still working on it.”

Add your first note
```

## Explicit Layout Restrictions

Do not:

* Stretch navigation across the full browser width
* Place the Add button in the bottom right
* Use a desktop-centered narrow column that wastes mobile space
* Create a desktop web layout
* Add desktop sidebars
* Add multi-column sections
* Add placeholder empty cards
* Hide the top Add action

Do:

* Keep the whole app inside a centered max-width 430px mobile shell
* Put Add in the top-right header
* Keep bottom nav inside the mobile shell
* Use full-width cards within 20px page padding
* Make the design look like an iOS mobile app prototype

