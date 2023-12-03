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
    header: "Projects",
    items: [
      {
        name: "All Projects",
        link: "/dashboard/projects",
      },
    ],
  },
  {
    header: "Setup",
    items: [
      {
        name: "Skills",
        link: "/skill",
      },
      {
        name: "Social Media",
        link: "/setup/social-media",
      },
    ],
  },
  {
    header: "Documentation",
    items: [
      {
        icon: <MdOutlineArrowOutward />,
        name: "Guides",
        link: "#",
      },
      {
        icon: <MdOutlineArrowOutward />,
        name: "API Preferences",
        link: "#",
      },
    ],
  },
];
