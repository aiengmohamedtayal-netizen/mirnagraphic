# Data Model: Premium 3D Hero

Since this feature primarily involves frontend 3D rendering and visual interactions, it does not rely on a backend database or persistent domain entities. However, the component relies on local state and asset models.

## Client State Models

### Hero3DState
Tracks the interactive state of the WebGL canvas.
- `scrollProgress` (Float, 0.0 - 1.0): Current scroll offset driving the box opening animation timeline.
- `mousePosition` (Vector2): Normalized mouse coordinates (`-1` to `1`) driving the parallax and tilt.
- `isLoaded` (Boolean): True when all 3D assets (textures, models) are fully loaded into GPU memory.

### DeviceCapabilities
Determines whether to show the 3D scene or the video fallback.
- `supportsWebGL2` (Boolean)
- `isMobileViewport` (Boolean)
- `prefersReducedMotion` (Boolean)

## 3D Asset Entities (GLTF/GLB Structure)

### CardboardBox Model
- **Root Node**: `BoxGroup`
  - **Children**: `Base`, `LidLeft`, `LidRight`, `LidFront`, `LidBack`
  - **Materials**: `CorrugatedCardboard_PBR` (Albedo, Normal, Roughness, Ambient Occlusion)
  - **Animations**: `OpenLidsAction`

### InnerProducts Model
- **Root Node**: `ProductsGroup`
  - **Materials**: Premium product textures
  - **Animations**: `EmergeAction`
