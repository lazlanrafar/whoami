"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  return (
    <main>
      <div className="mb-3">
        <h3 className="text-xl mb-2">Form Projects</h3>
        <p className="text-muted-foreground text-sm">
          Showcase your projects and let people know what you have been working
          on recently.
        </p>
      </div>

      <hr className="border-dashed my-5" />
    </main>
  );
}
