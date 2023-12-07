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
    header: "Setup",
    items: [
      {
        name: "Skills",
        link: "/setup/skills",
      },
      {
        name: "Social Media",
        link: "/setup/social-media",
      },
    ],
  },
  {
    header: "Settings",
    items: [
      {
        icon: <MdOutlineArrowOutward />,
        name: "API Preferences",
        link: "/settings/api-preferences",
      },
      // {
      //   icon: <MdOutlineArrowOutward />,
      //   name: "API Preferences",
      //   link: "#",
      // },
    ],
  },
];
