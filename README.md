# Abdulaziz Valiyev — Portfolio

Personal portfolio website built with a bold editorial aesthetic.

## Tech Stack

- **React 18** — app shell, routing, state
- **Vue 3** — micro-frontend islands (cards, counters)
- **Tailwind CSS v4** — utility styling + CSS variables
- **GSAP 3 + ScrollTrigger** — scroll animations
- **Framer Motion** — entrance animations
- **Lenis** — smooth scroll
- **Vite 6 + TypeScript**

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── Nav/           # Magnetic navbar
│   ├── Hero/          # Full-screen hero
│   ├── Leadership/    # Editorial cards (Vue islands)
│   ├── Projects/      # Swipeable showcase (Vue islands)
│   ├── Stats/         # Kinetic counters (Vue islands)
│   └── Footer/        # Closing statement
├── hooks/
│   ├── useLenis.ts        # Smooth scroll + GSAP ticker
│   ├── useScrollTrigger.ts
│   └── useMountVue.ts     # Vue-in-React helper
└── styles/
    ├── globals.css        # CSS variables + resets
    └── animations.css     # Keyframe animations
```
