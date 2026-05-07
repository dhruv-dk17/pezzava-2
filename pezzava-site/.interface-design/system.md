# Design System: Pezzava Artisanal

> **Query**: "Artisanal Premium Fashion Editorial with 3D Motion" | **Brand**: Pezzava | **Generated**: 2026-05-06

## 01. Foundation

### Concept: "The Rhythmic Loom"
The design is inspired by the rhythmic motion of a hand-block printer and the tactile nature of Jaipur cotton. Interactions should feel fluid and intentional, like fabric unfolding.

### Color Palette

#### Primary: Deep Indigo (Neel)
| Stop | Hex | Preview |
| :--- | :--- | :--- |
| **50** | `#E0E7FF` | ![#E0E7FF](https://via.placeholder.com/80x30/E0E7FF/E0E7FF?text=+) |
| **500** | `#1E293B` | ![#1E293B](https://via.placeholder.com/80x30/1E293B/1E293B?text=+) |
| **900** | `#0F172A` | ![#0F172A](https://via.placeholder.com/80x30/0F172A/0F172A?text=+) |

#### Secondary: Terracotta & Sand
| Stop | Hex | Preview |
| :--- | :--- | :--- |
| **Terracotta** | `#C2410C` | ![#C2410C](https://via.placeholder.com/80x30/C2410C/C2410C?text=+) |
| **Parchment** | `#FDFBF7` | ![#FDFBF7](https://via.placeholder.com/80x30/FDFBF7/FDFBF7?text=+) |
| **Charcoal** | `#18181B` | ![#18181B](https://via.placeholder.com/80x30/18181B/18181B?text=+) |

### Typography

- **Header**: `Playfair Display` (Serif) - Elegant, traditional, premium.
- **Subheader**: `Outfit` (Sans-Serif) - Modern, clean, high-end.
- **Body**: `Inter` (Sans-Serif) - Highly readable.

### Motion Principles

- **Scroll**: Lenis Smooth Scrolling (Damping: 0.1, Lerp: 0.1).
- **Reveal**: Staggered Y-axis translation (20px) with `0.85, 0, 0.15, 1` easing (Ease-in-out-expo).
- **3D**: Subtle floating/swaying motion for product cards using `@react-three/fiber`.

## 02. Components

### Editorial Card
- **Background**: Glassmorphism (White/10% + Blur: 12px)
- **Border**: Subtle 1px (Parchment/20%)
- **Interaction**: On hover, the image scales slightly (1.05) and the 3D overlay activates.

### Pattern Mesh Background
- A subtle SVG pattern overlay representing traditional block prints, moving slowly on the X-axis as the user scrolls.

## 03. 3D Integration
- **Hero**: A 3D "Fabric Wave" that reacts to the mouse position.
- **Product Listings**: Instead of flat images, some items will have a "3D Preview" mode where a high-fidelity model rotates on hover.
