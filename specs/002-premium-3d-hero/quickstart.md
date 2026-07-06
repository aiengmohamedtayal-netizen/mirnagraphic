# Quickstart Validation Guide: Premium 3D Hero

This guide provides steps to run and validate the 3D Hero implementation locally.

## Prerequisites

- Node.js >= 20
- Dummy 3D assets placed in `public/models/hero-box.glb`
- Dummy fallback video placed in `public/videos/hero-fallback.mp4`

## Setup & Run

1. **Install new dependencies**:
   ```bash
   npm install three @react-three/fiber @react-three/drei framer-motion-3d
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Navigate to the landing page**:
   Open `http://localhost:3000` in your browser.

## Validation Scenarios

### Scenario 1: Desktop 3D Experience (High-End)
- **Action**: Open the page on a desktop browser.
- **Expected**: You should see the interactive WebGL canvas. Moving the mouse should tilt the box. Scrolling down should trigger the box opening animation.

### Scenario 2: Mobile Fallback
- **Action**: Open Chrome DevTools, toggle Device Toolbar to a mobile device (e.g., iPhone 14), and refresh the page.
- **Expected**: The WebGL canvas should not render. Instead, the looping `hero-fallback.mp4` video should play automatically inline.

### Scenario 3: Accessibility & Reduced Motion
- **Action**: In your OS settings, enable "Reduce Motion" (e.g., Windows: Accessibility > Visual effects > Animation effects -> Off. macOS: Accessibility > Display > Reduce motion). Refresh the page.
- **Expected**: The video fallback should pause on the poster image, and the 3D scene should either not render or freeze its animations. Screen readers should be able to read the hero title and CTA without focusing on the canvas.
