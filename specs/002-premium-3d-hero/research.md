# Research Findings: Premium 3D Hero

## Framework Choice

- **Decision**: Use `@react-three/fiber` (R3F) and `@react-three/drei`.
- **Rationale**: The project is already built on React 19 and Next.js 16. R3F provides a declarative, component-based approach to Three.js that perfectly integrates with the existing tech stack. `drei` provides pre-built helpers for HDR lighting (`Environment`), scroll controls (`ScrollControls`), and performance management.
- **Alternatives considered**: Raw `three.js` (too imperative, harder to integrate cleanly with React lifecycle), Babylon.js (too heavy, requires stepping out of the React ecosystem).

## Scroll Animations

- **Decision**: Use `ScrollControls` from `@react-three/drei` and `framer-motion-3d` or `useScroll`.
- **Rationale**: R3F's `ScrollControls` ties the scroll position directly to the WebGL canvas timeline, making it simple to interpolate the box opening animation smoothly based on standard page scroll.

## Performance Optimization

- **Decision**: Implement `<PerformanceMonitor>` to adapt resolution automatically, bake static shadows, and use instanced meshes for particles.
- **Rationale**: Hitting 60 FPS on desktop requires optimizing draw calls and fragment shaders. Pre-baking the box textures (PBR) and dynamically scaling `dpr` (Device Pixel Ratio) keeps the framerate high.

## Device Fallback Strategy

- **Decision**: Sniff device capabilities and screen size on mount; render the R3F `<Canvas>` only on desktop/high-performance contexts. Otherwise, render a native HTML5 `<video>` element with `autoPlay muted playsInline loop`.
- **Rationale**: WebGL on low-end mobile devices drains battery and can cause jank, failing the premium credibility goal. A highly optimized H.264/WebM video loop under 3MB ensures instant loading and smooth playback everywhere.

## Accessibility (SEO & A11y)

- **Decision**: Wrap the `<Canvas>` with `aria-hidden="true"` and position the semantic HTML (`<h1>`, `<p>`, `<a>`) visually over or alongside the canvas. Check `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable animations or show only the poster image.
- **Rationale**: WebGL is a black box to screen readers and search bots. Keeping the standard DOM untouched guarantees zero SEO/A11y regression.
