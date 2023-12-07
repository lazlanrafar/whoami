"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/store";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GuidesPage() {
  const endPoints = [
    {
      name: "Fetch Projects",
      method: "GET",
      url: "[WHOAMI_API_URL]/projects",
    },
    {
      name: "Fetch Skills",
      method: "GET",
      url: "[WHOAMI_API_URL]/skills",
    },
    {
      name: "Fetch Assets",
      method: "GET",
      url: "[WHOAMI_ASSETS_URL]/[ASSETS_PATH]",
    },
  ];

  const handleCopy = (string: string) => {
    navigator.clipboard.writeText(string);
    toast.success("Copied to clipboard");
  };

  return (
    <main className="max-w-3xl">
      <div className="mb-3">
        <h3 className="text-xl mb-2">Guides</h3>
        <p className="text-muted-foreground text-sm">Guide for using Whoami</p>
      </div>

      <Separator className="my-5" />
      <div className="mb-5">
        <h4 className="text-sm mb-1">API Endpoints</h4>
        <p className="text-sm text-muted-foreground">
          Get your API URL from{" "}
          <Link
            href="/docs/api-preferences"
            className="text-foreground hover:underline"
          >
            API Preferences
          </Link>
          . You can use this API URL to fetch your data.
        </p>
      </div>

      <div className="space-y-3">
        {endPoints.map((endPoint) => (
          <div key={endPoint.url} className="">
            <p className="mb-3 text-sm">{endPoint.name}</p>
            <div className="flex items-start gap-3">
              <Input
                readOnly
                value={endPoint.method + " " + endPoint.url}
                className="h-full"
              />
              <Button
                className="h-full"
                onClick={() => handleCopy(endPoint.url)}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
