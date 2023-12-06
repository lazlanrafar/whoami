"use client";

import { useStore } from "@/store";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const { user } = useStore();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(user?.user_metadata?.preferred_username ?? "");
  }, [user]);

  return (
    <main>
      <h3 className="text-xl mb-2">
        <span className="capitalize">{username}</span>'s Projects
      </h3>
    </main>
  );
}
