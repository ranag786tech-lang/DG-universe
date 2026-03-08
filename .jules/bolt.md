# Bolt's Performance Journal - DG-universe

## 2026-03-08 - Animation Bottlenecks in DigiD Central
**Learning:** High-frequency animation loops (60fps) that perform DOM queries (e.g., `querySelectorAll`) and trigger layout/reflow (e.g., updating `top`/`left`) significantly impact performance and can cause jank. CSS transitions on properties also being updated via JavaScript can cause visual jitter.

**Action:**
1. Cache DOM references outside the animation loop.
2. Use `transform: translate3d()` for positioning to leverage GPU acceleration and avoid layout thrashing.
3. Use data attributes to track state (like hover) and handle all scaling/transforms within the JS loop to maintain smooth transitions.
4. Avoid broad CSS transitions (e.g., `transition: 0.3s`) on elements being actively transformed by JS.
