import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/store";

export const AuthenticatedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    console.log(user);

    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return children;
};
