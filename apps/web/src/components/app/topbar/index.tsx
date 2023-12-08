"use client";
import ToggleTheme from "@/components/atoms/toggle-theme";
import { siteConfig } from "@/constants";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AppTopbarLink from "./topbar-link";
import { useStore } from "@/store";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppTopbar() {
  const { user } = useStore();
  const [username, setUsername] = useState("");

  const pathname = usePathname().split("/").join(" / ").split("-").join(" ");

  useEffect(() => {
    setUsername(user?.user_metadata?.preferred_username ?? "");
  }, [user]);

  return (
    <div>
      <div className="flex h-12 max-h-12 items-center justify-between py-2 px-5 border-b ">
        <div>
          <p className="text-sm text-muted-foreground">
            <span>{username}</span>
            <span>{pathname}</span>
          </p>
        </div>

        <div className="flex gap-1 items-center">
          <ToggleTheme />

          <AppTopbarLink href={siteConfig.links.source_code} tooltip="Github">
            <FaGithub className="h-[1.2rem] w-[1.2rem]" />
          </AppTopbarLink>

          <AppTopbarLink href={siteConfig.links.saweria} tooltip="Saweria ✌️">
            <Image src={"/saweria.png"} alt="Logo" width={23} height={23} />
          </AppTopbarLink>
        </div>
      </div>
    </div>
  );
}
