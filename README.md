# 🏛️ Rynia Studios — Interactive 3D Web Showcase
### *Immersive 3D Spatial Experience built with Three.js, GSAP, Lenis & Vite.*

<p align="center">
  <a href="https://ryniastudios.netlify.app"><img src="https://img.shields.io/badge/Live_Showcase-ryniastudios.netlify.app-000000?style=for-the-badge&logo=netlify&logoColor=00C7B7" alt="Live Site" /></a>
  <img src="https://img.shields.io/badge/Three.js-WebGL_3D-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-Animation_Engine-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-7C3AED?style=for-the-badge" alt="Lenis" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## 🌐 Overview

This repository houses the official interactive web showcase for **[Rynia Studios](https://ryniastudios.netlify.app)** — an independent software and systems engineering laboratory crafting ambient software, local-first mobile operating systems ([KALANLA](https://github.com/Rynia/KALANLA)), and high-performance WebGL viewports.

---

## ✨ Features & Architecture

* 🎮 **Real-time Three.js Canvas:** GPU-accelerated 3D meshes, custom shaders, and dynamic lighting.
* 📜 **Inertial Smooth Scrolling:** Powered by `@studio-freight/lenis` for buttery 60 FPS viewport transitions.
* 🎬 **Timeline Choreography:** Procedural camera movements and element transitions coordinated via `GSAP`.
* ⚡ **Zero-Lag Bundling:** Instant HMR and lightweight production builds powered by `Vite` and strict `TypeScript`.
* 📱 **Adaptive Viewports:** Seamless responsive scaling across mobile touchscreens and ultra-wide desktop displays.

---

## 🚀 Local Development Setup

To run the showcase locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Rynia/RyniaStudioSite.git
cd RyniaStudioSite/rynia-studios-site

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```bash
rynia-studios-site/
├── public/                 # 3D models, textures, audio, and static brand assets
├── src/
│   ├── components/         # Three.js scene canvas, UI overlays, and navigation
│   ├── styles/             # Titanium dark theme & responsive layout styles
│   ├── utils/              # Math helpers, camera lerp, and asset loaders
│   └── main.ts             # Animation loops, Lenis ticker, and scene initialization
├── index.html              # HTML5 entry with metadata and OpenGraph tags
├── package.json            # Dependencies and build scripts
└── vite.config.ts          # Vite build optimizations
```

---

## 📄 License & Attribution

* **License:** MIT © 2026 [Muharrem Özmen (@Rynia)](https://github.com/Rynia)
* **Maintained by:** [Rynia Studios](https://ryniastudios.netlify.app)
