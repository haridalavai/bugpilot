"use client"

import { Geist, Geist_Mono } from "next/font/google"

import "@bugpilot/ui/globals.css"
import { Providers } from "@/src/components/providers"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut, 
  UserButton,
} from '@clerk/nextjs'
import { AppSidebar } from "@bugpilot/ui/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@bugpilot/ui/components/breadcrumb"
import { Button } from "@bugpilot/ui/components/button"
import { Separator } from "@bugpilot/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@bugpilot/ui/components/sidebar"
import { sidebarData, dropdownItems } from "@/src/constants/sidebar-data"
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
import { useAuth } from "@clerk/nextjs"
import { ErrorTracker } from '@bugpilot/web';

// Initialize in your app's entry point
const bugpilot = ErrorTracker.getInstance('lg_test_b61a7c58-30bc-4b0d-9233-ddb3fc37017a', {
  environment: process.env.NODE_ENV,
  debug: process.env.NODE_ENV === 'development',
  tags: {
    web: 'true',
  },
  transport: {
    endpoint: 'http://localhost:3002/ingest/94fca20f-edee-4b1e-ad86-e13a58ecd390'
  }
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ClerkProvider>
  )
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth()
  

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <SidebarProvider>
          <AppSidebar 
            variant="sidebar" 
            teams={sidebarData.teams} 
            navItems={sidebarData.navMain} 
            projects={sidebarData.projects} 
            user={sidebarData.user} 
            signOut={signOut} 
            dropdownItems={dropdownItems} 
          />
          <SidebarInset className="gap-2">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Button onClick={() => bugpilot.captureError(new Error('Test error'))}>Test error</Button>
              <Providers>{children}</Providers>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
