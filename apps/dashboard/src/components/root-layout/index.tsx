"use client";

import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@bugpilot/ui/components/sidebar";
import { sidebarData, dropdownItems } from "@/src/constants/sidebar-data";
import { AppSidebar } from "@bugpilot/ui/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@bugpilot/ui/components/breadcrumb";
import { Providers } from "@/src/components/providers";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Separator } from "@bugpilot/ui/components/separator";

const RootLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col w-full max-w-screen">
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
        {/* <SidebarInset className="overflow-x-hidden">
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
            
          </SidebarInset> */}
        <main className="overflow-x-hidden w-full" >
          <Providers>{children}</Providers>
        </main>
      </SidebarProvider>
      {/* <div className="container-wrapper">
        <div className="container py-6">
          <section className="overflow-hidden rounded-[0.5rem]  bg-background shadow w-full"> */}
      {/* </section>
          </div>
        </div> */}
    </div>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <RootLayoutComponent>{children}</RootLayoutComponent>
    </ClerkProvider>
  );
};

export default RootLayout;
