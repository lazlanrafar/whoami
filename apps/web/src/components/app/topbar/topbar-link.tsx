import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  tooltip?: string;
}

export default function AppTopbarLink({ href, children, tooltip }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={href} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              {children}
              <span className="sr-only">{tooltip}</span>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <span>{tooltip}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
