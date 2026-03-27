# Design System: Innovation Without Frontiers

## 1. Overview & Creative North Star

### Creative North Star: "The Obsidian Architect"
This design system is a radical departure from the soft, rounded "consumer-web" aesthetic. It is built for a cypherpunk innovation lab where precision meets subversion. We define this as **The Obsidian Architect**—a visual language that is sharp, high-contrast, and intellectually rigorous.

The system breaks the "template" look by using intentional asymmetry and a rigid 0px radius policy. We do not use "cards" in the traditional sense; we use data-containers that feel like terminal viewports. Expect overlapping elements where monospaced metadata bleeds over high-fidelity 3D renders, and a typographic scale that values technical density over whitespace-heavy "minimalism." This is a high-performance environment for those who build beyond frontiers.

---

## 2. Colors

The palette is rooted in the void. We use absolute blacks and deep navies to allow the electric teals and neon secondaries to "burn" through the screen with CRT-like intensity.

*   **Primary (`#8ff5ff` / `#00eefc`):** Electric Cyan. Used for high-priority data readouts and primary actions. It represents the "light" of innovation.
*   **Secondary (`#9492ff` / `#320aff`):** Cosmic Blue. Used for secondary depth and links.
*   **Tertiary (`#f3ffca` / `#beee00`):** Neon Lime. Reserved for disruptive accents, success states, and "system-ready" indicators.
*   **Surface Hierarchy:** We utilize `surface_container_lowest` (#000000) for the main environment and `surface_container` (#0f1b23) for nested technical modules.

### The "No-Line" Rule
Sectioning is never achieved with a 1px solid border. Instead, boundaries are defined by shifts in background saturation (e.g., a `surface_container_low` module sitting on a `surface` background). If a visual break is required, use a subtle 10% opacity gradient or a scan-line texture change.

### The "Glass & Gradient" Rule
Floating modules must use **Glassmorphism**. Apply `surface_variant` with 40-60% opacity and a heavy `backdrop-blur`. To add "soul," apply a linear gradient from `primary` to `primary_dim` on interactive elements to mimic the glow of a physical terminal hardware button.

---

## 3. Typography

The typography strategy is a collision between high-tech geometric structures and clean, functional legibility.

*   **Headings (Space Grotesk):** Our headline font is a geometric sans-serif that feels engineered. Large scales (`display-lg` at 3.5rem) should be set with tight letter-spacing (-2%) to create an authoritative, editorial impact.
*   **Body (Inter):** We use Inter for high-density information. It provides the "clean" technical feel required for long-form research papers or code documentation.
*   **Labels (Space Grotesk Monospaced):** All metadata, timestamps, and "data readouts" utilize the label scale. This reinforces the "terminal" aesthetic.

The hierarchy conveys identity by using extreme scale shifts—pairing a `display-lg` headline with a `label-sm` metadata tag immediately creates a "pro-tool" editorial feel.

---

## 4. Elevation & Depth

We reject the "drop shadow." In the void of a cypherpunk interface, light comes from the elements themselves, not an external source.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface-container-highest` panel provides a "lifted" feel simply through its relative brightness against the `background`.
*   **Ambient Glows:** When a floating effect is necessary, use a "Glow" instead of a shadow. Use the `primary` or `secondary` color at 5% opacity with a 40px–80px blur. This makes the component look like it is emitting light onto the obsidian surface below.
*   **The "Ghost Border" Fallback:** For input fields or containers requiring definition, use a "Ghost Border": the `outline_variant` token at 15% opacity. It must feel like a faint grid line on a blueprint, not a box.
*   **Sharp Edges:** All `borderRadius` tokens are strictly **0px**. Sharp corners suggest precision and architectural integrity.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background, `on_primary` text. 0px corners. Hover state: add a subtle "glitch" shift or a `primary_dim` outer glow.
*   **Secondary:** Ghost-style. `outline` border at 20% opacity. On hover, the border opacity jumps to 100% with a `primary` text color.

### Technical Cards
*   **Construction:** No borders. Use `surface_container_low` with a `backdrop-filter: blur(12px)`. 
*   **Detailing:** Top-right corner should feature a monospaced "UID" or "Status" label in `label-sm`.

### Input Fields
*   **Styling:** Underline-only or subtle `surface_container_high` fill. No rounded corners. 
*   **Focus State:** The underline transforms into a `primary` electric cyan glow with a subtle "scan-line" animation inside the field.

### Data Lists
*   **Rule:** Forbid divider lines. Use `spacing-4` (0.9rem) vertical gaps. Alternate background tones between `surface_container_low` and `surface_container_lowest` for row differentiation.

### Terminal Tooltips
*   **Style:** High-contrast `primary_container` background with `on_primary_container` (dark) text. Use `spaceGrotesk` at `label-sm` for a "code snippet" feel.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use intentional asymmetry. Align a headline to the far left and the body text to the center-right to create editorial tension.
*   **DO** use "Scan Lines." Apply a repeating linear-gradient overlay (1px line, 3px gap) at 3% opacity over the entire UI to ground the terminal theme.
*   **DO** treat imagery as data. Overlay code snippets or coordinate grids on top of 3D renders.

### Don't:
*   **DON'T** use a single border-radius above 0px. Softness is the enemy of this system.
*   **DON'T** use standard grey shadows. If an element needs to pop, let it glow or shift its surface tone.
*   **DON'T** use generic icons. Use high-fidelity, thin-stroke technical glyphs that match the `outline` token weight.
*   **DON'T** use "Standard" padding. Use the Spacing Scale to create either extreme density or extreme "void" (whitespace).