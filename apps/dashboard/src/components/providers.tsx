"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PostHogProvider } from "./PostHogProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </PostHogProvider>
  )
}