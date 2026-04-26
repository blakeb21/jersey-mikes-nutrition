import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Suspense } from "react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider, PostHogPageView } from "@/components/posthog-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Jersey Mike's Nutrition Calculator",
  description:
    "Calculate calories, protein, carbs, and fat for any Jersey Mike's sub. Customize size, bread, Mike's Way toppings, and extras to see accurate nutrition for your exact order.",
  keywords: [
    "Jersey Mike's nutrition",
    "Jersey Mike's calories",
    "Jersey Mike's macros",
    "sub nutrition calculator",
    "Jersey Mike's protein",
  ],
  openGraph: {
    title: "Jersey Mike's Nutrition Calculator",
    description:
      "Build your Jersey Mike's order and see exact calories, protein, carbs, and fat — customized for your size, bread, and toppings.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary",
    title: "Jersey Mike's Nutrition Calculator",
    description:
      "Customize your Jersey Mike's order and track macros in real time.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body className="h-dvh overflow-hidden">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <ThemeProvider>{children}</ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
