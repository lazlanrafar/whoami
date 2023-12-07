import { MdOutlineArrowOutward } from "react-icons/md";

type SidebarMenuItems = {
  icon?: React.ReactNode;
  name: string;
  link: string;
};

export type SidebarMenu = {
  header?: string;
  items: SidebarMenuItems[];
};

export const sidebarMenus: SidebarMenu[] = [
  {
    items: [
      {
        name: "Introduction",
        link: "/",
      },
    ],
  },
  {
    header: "Projects",
    items: [
      {
        name: "All Projects",
        link: "/projects",
      },
    ],
  },
  {
    header: "Preferences",
    items: [
      {
        name: "Skills",
        link: "/preferences/skills",
      },
      {
        name: "Social Media (Coming Soon)",
        link: "#",
      },
    ],
  },
  {
    header: "Documentation",
    items: [
      {
        icon: <MdOutlineArrowOutward />,
        name: "Guides",
        link: "/docs/guides",
      },
      {
        icon: <MdOutlineArrowOutward />,
        name: "API Preferences",
        link: "/docs/api-preferences",
      },
    ],
  },
];
