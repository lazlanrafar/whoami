"use client";
import { useEffect } from "react";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";

export const GuestRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return children;
};
