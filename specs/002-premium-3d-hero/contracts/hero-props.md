# Hero Component Contract

This document defines the React component props contract for the main Hero component that encapsulates the 3D scene and its fallback.

## `<Hero />`

The main export intended to replace the existing hero section on the landing page.

```typescript
interface HeroProps {
  /**
   * Title text overlaid on the hero section.
   * Rendered as an <h1> tag for SEO.
   */
  title: string;
  
  /**
   * Subtitle text providing further context.
   */
  subtitle: string;
  
  /**
   * Label for the primary Call To Action button.
   */
  ctaLabel: string;
  
  /**
   * URL for the primary Call To Action button.
   */
  ctaHref: string;
  
  /**
   * Forces the fallback video mode regardless of device capabilities.
   * Useful for testing or specific route overrides.
   * @default false
   */
  forceFallback?: boolean;
}
```

## Internal Context (Scene3D)

The internal 3D scene expects standard `@react-three/fiber` canvas constraints but does not expose external props beyond the fallback toggle in the main container.
