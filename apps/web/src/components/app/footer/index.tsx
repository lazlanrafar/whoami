import { siteConfig } from "@/constants";
import Link from "next/link";

export default function AppFooter() {
  const yearNow = new Date().getFullYear();

  return (
    <div className="mt-auto px-5 py-4 text-sm flex gap-1 text-muted-foreground border-t">
      <span>©</span>
      <span>{yearNow}</span>
      <span>with</span>
      <span className="text-red-500 animate-pulse">❤</span>
      <span>by</span>
      <span className="hover:text-foreground hover:underline">
        <Link href={siteConfig.links.github}>{siteConfig.author}</Link>
      </span>
    </div>
  );
}
