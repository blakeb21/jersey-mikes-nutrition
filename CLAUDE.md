# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server with Turbopack
bun build        # Production build
bun lint         # ESLint
bun typecheck    # TypeScript type check (tsc --noEmit)
bun format       # Prettier (formats all .ts/.tsx)
```

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component-name>
```

Components are placed in `components/ui/`. The project uses the `base-mira` style with `mist` base color and `hugeicons` icon library.

## Architecture

- **Next.js 16 App Router** — all routes live under `app/`. Uses RSC by default; mark client components with `"use client"`.
- **UI components** — shadcn/ui components in `components/ui/`, built on `@base-ui/react` primitives (not Radix). Custom/shared components go directly in `components/`.
- **Styling** — Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`. Design tokens are CSS variables defined in `:root` / `.dark` using OKLCH colors. Use `cn()` from `@/lib/utils` to merge class names.
- **Theming** — `components/theme-provider.tsx` wraps the app with `next-themes`. Dark mode toggles on `d` keypress (outside inputs).
- **Path aliases** — `@/*` maps to the repo root, so `@/components`, `@/lib`, `@/hooks` all resolve from root.
