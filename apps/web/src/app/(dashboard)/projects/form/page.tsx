"use client";

import FormProject from "@/components/organisms/form-project";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  return (
    <main className="max-w-xl">
      <div className="mb-3">
        <h3 className="text-xl mb-2">Form Projects</h3>
        <p className="text-muted-foreground text-sm">
          Showcase your projects and let people know what you have been working
          on recently.
        </p>
      </div>

      <hr className="border-dashed my-5" />

      <FormProject />
    </main>
  );
}
