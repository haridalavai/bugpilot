// This is sample data.
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    User,
  } from "lucide-react"

export const sidebarData = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    projects: [],
    navMain: [
      {
        title: "Issues",
        url: "/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Error",
            url: "/issues?level=error",
          },
          {
            title: "Warning",
            url: "/issues?level=warning",
          },
          {
            title: "Info",
            url: "/issues?level=info",
          },
        ],
      },
      {
        title: "Events",
        url: "/events",
        icon: Map,
        items: [
          {
            title: "All Events",
            url: "/events",
          },
        ],
      },
      {
        title: "Automation",
        url: "/automation",
        icon: Bot,
        // items: [
        //   {
        //     title: "Workflows",
        //     url: "#",
        //   },
        //   {
        //     title: "Triggers",
        //     url: "#",
        //   },
        //   {
        //     title: "Quantum",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Profiles",
        url: "/profiles",
        icon: User,
        items: [
          {
            title: "All Profiles",
            url: "/profiles",
          },
        ],
      },
    ]
  }

  export const dropdownItems = [
    {
      icon: User,
      label: "Account",
      onClick: () => {},
    },
  ]
