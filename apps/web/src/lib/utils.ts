import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const whoAmiAssetUrl = process.env.NEXT_PUBLIC_WHOAMI_ASSETS_URL as string;

export function whoAmiAsset(path?: string) {
  return path ? `${whoAmiAssetUrl}/${path}` : "/no-image.jpg";
}
