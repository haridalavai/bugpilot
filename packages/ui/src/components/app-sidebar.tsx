"use client";

import * as React from "react";

import { NavMain } from "@bugpilot/ui/components/nav-main";
import { NavProjects } from "@bugpilot/ui/components/nav-projects";
import { DropdownItem, NavUser } from "@bugpilot/ui/components/nav-user";
import { TeamSwitcher } from "@bugpilot/ui/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@bugpilot/ui/components/sidebar";
import { LucideIcon } from "lucide-react";
interface Team {
  name: string;
  logo: LucideIcon;
  plan: string;
}

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teams: Team[];
  navItems: NavItem[];
  projects: Project[];
  user: User;
  signOut: () => void;
  dropdownItems: DropdownItem[];
}

export function AppSidebar({
  teams,
  navItems,
  projects,
  user,
  signOut,
  dropdownItems,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger  />
        <NavUser user={user} signOut={signOut} dropdownItems={dropdownItems} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
