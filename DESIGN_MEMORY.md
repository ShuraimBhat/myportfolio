# Design Memory: Swiss Editorial Design System

## Palette
- `--color-bg`: `#f9fafb` (soft warm paper)
- `--color-ink`: `#171717` (deep charcoal black)
- `--color-muted`: `#737373` (neutral gray)
- `--color-line`: `#e5e5e5` (1px delicate hairline border)
- `--color-accent`: `#059669` (emerald status pip)

## Typography
- **Headlines:** Inter Bold / `--font-sans`, `-0.035em` tracking, `1.08` line height.
- **UI & Navigation:** Inter SemiBold, `12px` - `14px`, uppercase tracking for section eyebrows.
- **Telemetry & Trace:** Geist Mono / `--font-geist-mono`, `11px` - `12px`.

## Interaction Patterns
- **Hover Sweep:** Continuous line animation underneath links (`.link-sweep`).
- **Pills:** Rounded-full badges for actions, rounded-lg for cards.
- **State Machine:** Interactive toggle between active states with sub-0.3ms live logging.
