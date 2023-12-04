import ToggleTheme from "@/components/atoms/toggle-theme";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function AppTopbar() {
  return (
    <div>
      <div className="flex h-12 max-h-12 items-center justify-between py-2 px-5 border-b ">
        <p className="text-sm text-foreground-lighter">Preferences</p>

        <div className="flex gap-1 items-center">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <FaGithub className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
