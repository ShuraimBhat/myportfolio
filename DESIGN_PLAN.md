# Design Implementation Plan: Swiss Editorial Portfolio

Reference: [Juan Mora Romero](https://www.juanmoraromero.com/)  
Chosen Variant: **Variant D (Interaction & State Model)** integrated into an architectural editorial layout.

## 1. Design Overview
- **Aesthetic Direction:** Swiss International Typographic Style meets digital architectural engineering.
- **Theme:** Pure light mode (no dark mode). Warm paper background (`#f9fafb`), rich neutral black ink (`#171717`), hairline 1px grid borders (`#e5e5e5`).
- **Typography:** Bold Grotesk statement display with tight tracking (`tracking-[-0.035em]`, `leading-[1.05]`) paired with technical monospace (`Geist Mono`).
- **Interactivity:** Hands-on VRRP Failover State Machine and Micro-Simulator with real-time fault injection and ARP propagation logs.

## 2. Component Structure
- `components/Navbar.tsx`: Minimalist monogram `s.sb`, numbered section links with `.link-sweep`, live status dot.
- `components/Hero.tsx`: Statement of Practice with angled directional arrow and 3-column metadata footer.
- `components/Projects.tsx`: High-craft case studies with metrics badges and architectural detail modal.
- `components/ArchitectureLab.tsx`: Interactive VRRP failover simulator (Variant D) + Transit Topology matrix.
- `components/Experience.tsx`: 3-column timeline of on-site deployments and firmware test engineering.
- `components/SkillsMatrix.tsx`: 4-column capability taxonomy.
- `components/CertificationsEducation.tsx`: Academic B.E. foundation and verified Cisco credentials.
- `components/Contact.tsx`: Direct mail and message dispatch.
- `components/Footer.tsx`: Minimalist telemetry status and back-to-top.

## 3. Accessibility Checklist (WCAG AA)
- [x] Text contrast exceeds 4.5:1 on all surfaces.
- [x] Visible 1.5px focus rings with 2px offset on interactive elements.
- [x] Semantic HTML tags (`<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`).
- [x] Zero hydration mismatches or layout shifts.
- [x] 0 ESLint errors and 0 warnings.
