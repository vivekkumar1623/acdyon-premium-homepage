# Engineering Decisions & Technical Rationale

## 1. Product Direction & Concept

When building a homepage for a developer-oriented infrastructure tool, the default trap is creating a generic marketing landing page with vanity charts, placeholder metrics, or vague copy like *"Next-Gen AI Platform"*.

Instead, I focused on a concrete, high-friction problem in data engineering: **resilience in web data extraction pipelines**.

**PulseGuard** is designed as a drop-in egress proxy gateway that addresses two main failure modes:
1. **Upstream Bot & WAF Fingerprinting**: Modern anti-bot engines (Akamai, Cloudflare) inspect TLS ClientHello handshakes (JA4/JA3 signatures) and HTTP/2 stream settings. Default HTTP clients (Python requests/httpx, Go net/http, standard cURL) broadcast fixed, easily blacklisted automation signatures.
2. **Downstream Silent DOM Schema Drift**: When target websites push frontend deployments that rename or hash CSS class names, scrapers often still receive a `200 OK` status, but the selectors return `null` values—silently corrupting downstream databases.

### Core Homepage Features:
- **Interactive Resilience Sandbox**: A hands-on terminal sandbox where evaluators can toggle PulseGuard on and off across realistic target scenarios (LinkedIn job listings, e-commerce catalog drift, SEC EDGAR burst rate limits). It shows live wire traces, JA4 handshake profiles, AST mutation diffs, and recovered JSON payloads.
- **Drop-in Integration Tabbed Window**: Copyable code snippets for cURL, Python (`httpx`), Node.js (`Playwright`), and Go (`net/http`) showing how easily developers can route existing scrapers through the proxy.
- **Developer HUD (Easter Egg)**: An interactive command palette / terminal emulator accessible via `⌘K` / `Ctrl+K` or the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`).

---

## 2. Frontend Architecture & Design Decisions

### Bespoke Vanilla CSS Design System
Rather than pulling in heavy utility frameworks or runtime CSS-in-JS libraries, I implemented a dedicated CSS token architecture in `src/index.css`:
- **CSS Custom Properties (Tokens)**: Structured design tokens for colors, surfaces, borders, glow effects, typography scales, and transitions.
- **Lightweight Grid & Layout Utilities**: Flexbox and CSS Grid layout primitives optimized for responsive breakpoints down to 390px (mobile) up to 1440px (large screens).
- **Dark Mode Terminal Palette**: Designed specifically with high-contrast surfaces (`#07090e`, `#0d121c`, `#111827`) and distinct accent colors (cyan for primary actions, emerald for healthy states, amber for warnings, rose for blocked requests).
- **Reduced Motion Support**: Included `@media (prefers-reduced-motion: reduce)` rules for accessibility.

### Component Structure
```
src/
├── components/
│   ├── Navbar.jsx              # Fixed blurred header with status badge & quick actions
│   ├── Hero.jsx                # Value proposition, copyable CLI command, and feature cards
│   ├── InteractivePlayground.jsx# Sandbox with simulated live traces & DOM AST diffs
│   ├── Architecture.jsx        # Deep dive into TLS randomization & AST healing
│   ├── CodeIntegration.jsx     # Multi-language drop-in code snippets
│   ├── ComparisonSpecs.jsx     # Architectural matrix & protocol benchmarks
│   ├── EasterEggModal.jsx      # Interactive command terminal HUD
│   └── Footer.jsx              # Navigation and status indicators
├── data/
│   └── mockScenarios.js        # Scenario datasets, wire traces, and code snippets
├── index.css                   # Custom design system and layout rules
└── App.jsx                     # Root application container & global key listeners
```

---

## 3. Trade-offs & Scope Management

1. **Client-Side Simulation vs. Live Proxy Streaming**:
   - *Decision*: The interactive playground runs deterministic synthetic traces directly in the client state.
   - *Rationale*: Routing live proxy requests to external third-party targets during a challenge review risks network rate limits, transient external outages, and ToS friction. The simulated state guarantees a zero-latency, reliable interactive experience for the evaluator.

2. **Focused Single Theme (Dark Terminal Canvas)**:
   - *Decision*: Focused entirely on a polished dark developer theme rather than splitting attention between dark and light modes.
   - *Rationale*: Terminal and proxy infrastructure tools are almost universally used in dark environments. Focusing on one theme ensured contrast ratios, syntax styling, and glowing borders were tuned without visual compromises.

---

## 4. Future Roadmap (If Given 1 Week)

1. **WebAssembly Edge Proxy Daemon**: Build a lightweight in-browser WASM/Rust worker allowing users to test real-time JA4 client-hello spoofing and selector extraction against arbitrary public endpoints.
2. **Visual DOM Inspector**: An interactive AST tree visualizer where users can see how broken CSS selectors are mapped to semantic fallback nodes step-by-step.
3. **Configuration Export Engine**: A visual builder that exports custom PulseGuard proxy configurations directly to Docker Compose, Kubernetes ConfigMaps, or Helm charts.
