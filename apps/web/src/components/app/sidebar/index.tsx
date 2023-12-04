"use client";

import { CiLogout } from "react-icons/ci";
import { Logo } from "@/assets";
import { sidebarMenus } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function AppSidebar() {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="h-screen max-h-screen w-64 overflow-auto border-r hidden sm:block">
      <div className="mb-2">
        <div className="flex h-12 max-h-12 items-center border-b px-6 ">
          <a href={"/"} className="">
            <Image src={Logo} alt="Logo" width={80} height={40} />
          </a>
        </div>
      </div>
      <div className="">
        <nav className="overflow-auto">
          <ul>
            {sidebarMenus.map((menu, i) => (
              <div key={i} className="border-b py-5 px-6 ">
                {menu.header && (
                  <div className="flex space-x-3 mb-3">
                    <span className="text-sm text-muted-foreground w-full">
                      {menu.header}
                    </span>
                  </div>
                )}
                <ul className="space-y-1">
                  {menu.items.map((item) => (
                    <li key={item.name}>
                      <Link className="block" target="_self" href={item.link}>
                        <span className="group flex max-w-full cursor-pointer items-center py-1 text-sm text-foreground hover:underline">
                          {item.icon && (
                            <span className="mr-3 text-muted-foreground">
                              {item.icon}
                            </span>
                          )}
                          <span>{item.name}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="border-b py-5 px-6">
              <ul className="space-y-1">
                <li>
                  <a
                    className="block"
                    target="_self"
                    onClick={() => handleLogout()}
                  >
                    <span className="group flex max-w-full cursor-pointer items-center py-1 text-sm text-foreground hover:underline">
                      <span className="mr-3 text-muted-foreground">
                        <CiLogout />
                      </span>
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
