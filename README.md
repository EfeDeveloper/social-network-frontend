# 🧑‍💻 Social Network App — Modern Social Media SPA

A modular, scalable, and maintainable social network Single Page Application (SPA) built with **Next.js 15 + React 19 + TypeScript + Zustand + Tailwind CSS**, following best practices of scalable architecture, maintainable code, and a high-quality user experience.

## 🗂️ Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture & Technical Decisions](#architecture--technical-decisions)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Best Practices & Conventions](#best-practices--conventions)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Social Network App** is a modern, modular SPA focused on enabling social media interactions: user authentication, profile management, posts, likes, notifications, and more. Built with Next.js and TypeScript, it leverages the latest UI/UX patterns and scalable frontend architecture.

---

## Tech Stack

- **Next.js 15.2.4 ⚡** — Modern React framework with App Router, SSR, SSG, routing, and API integration.
- **React 19 ⚛️** — The latest declarative UI library for building component-based UIs.
- **TypeScript 5.x 🔵** — Static typing for reliability and maintainability.
- **Zustand 🐻** — Simple and scalable state management for React.
- **Tailwind CSS 3.4 🌈** — Utility-first CSS framework for rapid, consistent styling.
- **Axios 🌐** — Promise-based HTTP client for API consumption.
- **Zod 🟩** — TypeScript-first schema validation for robust forms and data handling.
- **Radix UI 🧩** — Accessible, customizable UI primitives for React (accordion, dialog, popover, etc.).
- **Lucide React 🪶** — Icon library for modern React apps.
- **React Hook Form 📋** — Declarative, performant forms and validation.
- **Date-fns 📆** — Modern date utility library for date formatting and manipulation.
- **Embla Carousel** — Smooth, performant carousel for React.
- **Recharts 📊** — Composable chart library for data visualization.
- **Immer** — Immutable state updates for React.
- **Other tools:** Prettier, ESLint, PostCSS, class-variance-authority, clsx, sonner, and more.

---

## Architecture & Technical Decisions

- **Framework:** Next.js 15 App Router, file-based routing, and modern layouts.
- **State management:** Global state with Zustand; data validation with Zod.
- **API integration:** All HTTP requests handled via Axios with custom config.
- **UI:** Highly modular UI with reusable components in `/components/ui` and Radix UI.
- **Forms:** Robust form handling with React Hook Form + Zod.
- **Design system:** Tailwind CSS for utility-first styling and theme consistency.
- **Utilities:** date-fns for date operations, Immer for immutable updates.
- **Type safety:** Centralized types in `/types`.
- **Error boundaries:** Graceful error handling at component level.
- **Project organization:** Feature-first structure for easy scalability and maintainability.

---

## Installation & Setup

> Requires **Node.js 20.x+** (recommended version is specified in .nvmrc). You can optionally use [pnpm](https://pnpm.io/) if you prefer it over npm.

```bash
# Clone the repository
git clone https://github.com/EfeDeveloper/social-network-frontend.git
cd social-network-frontend

# Install dependencies
npm install    # or pnpm install

# Start the local development server
npm run dev

# App available at http://localhost:3000

# To build for production
npm run build

# To start production server
npm start

# To lint code
npm run lint

# To auto-format code
npm run format

```

## Project Structure

```
social-network-frontend/
├─ .eslintrc.json                # ESLint configuration
├─ .nvmrc                        # Node version manager file
├─ .prettierrc                   # Prettier configuration
├─ LICENSE
├─ app/                          # Next.js App Router directory (routing, layouts, pages)
│  ├─ create-post/page.tsx       # Create Post page
│  ├─ globals.css                # Global styles
│  ├─ layout.tsx                 # App root layout
│  ├─ login/page.tsx             # Login page
│  ├─ page.tsx                   # Home page
│  ├─ posts/page.tsx             # Posts page
│  └─ profile/page.tsx           # Profile page
├─ components/                   # Shared and UI components
│  ├─ auth-guard.tsx             # Route protection component
│  ├─ error-boundary.tsx         # Error boundary
│  ├─ navbar.tsx                 # App navigation bar
│  ├─ post-card.tsx              # Post card component
│  ├─ theme-provider.tsx         # Theme context provider
│  └─ ui/                        # UI primitives and widgets (Radix UI-based)
│     ├─ ...                     # e.g. button.tsx, dialog.tsx, form.tsx, carousel.tsx, toast.tsx, etc.
├─ hooks/                        # Custom React hooks
│  ├─ use-mobile.tsx
│  └─ use-toast.ts
├─ lib/                          # App logic, API clients, and state stores
│  ├─ api/
│  │  ├─ auth.service.ts         # Auth API service
│  │  ├─ axios.config.ts         # Axios instance/config
│  │  └─ posts.service.ts        # Posts API service
│  ├─ auth.store.ts              # Zustand auth store
│  ├─ posts.store.ts             # Zustand posts store
│  └─ utils.ts                   # Utility functions
├─ next.config.mjs               # Next.js configuration
├─ package.json                  # Project dependencies & scripts
├─ pnpm-lock.yaml                # pnpm lock file (if using pnpm)
├─ postcss.config.mjs            # PostCSS configuration
├─ public/                       # Static assets (images, SVGs, logos)
│  ├─ placeholder-logo.png
│  ├─ placeholder-logo.svg
│  ├─ placeholder-user.jpg
│  ├─ placeholder.jpg
│  └─ placeholder.svg
├─ styles/
│  └─ globals.css                # Tailwind global styles (also referenced in /app)
├─ tailwind.config.ts            # Tailwind CSS config
├─ tsconfig.json                 # TypeScript config
└─ types/
   └─ index.ts                   # TypeScript types and interfaces
```

## Best Practices & Conventions

- Emoji-based, semantic commit messages for clarity and changelog readability.
- Strict TypeScript typing and centralized types.
- Modular, feature-driven project structure.
- Global state with Zustand for predictable state management.
- Utility-first and themeable styling with Tailwind CSS.
- Radix UI for accessible, customizable UI primitives.
- Automatic code formatting and linting (Prettier + ESLint).
- Robust validation with Zod for all forms and APIs.
- Decoupled UI/business logic for maintainability.
- Adheres to Next.js best practices (App Router, layouts, server components, etc).

## Contributing

Fork the repository and create a feature branch (feature/your-feature-name).

Add your changes, tests, and make sure lint/formatting passes.

Open a clear Pull Request describing your changes.

All contributions are welcome! 🚀

## License

[MIT](LICENSE)
