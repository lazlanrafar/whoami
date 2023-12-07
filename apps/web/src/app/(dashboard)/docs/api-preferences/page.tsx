"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiPreferencesPage() {
  const [APIUrl, setAPIUrl] = useState("");

  const WHOAMI_URL = process.env.NEXT_PUBLIC_WHOAMI_URL;
  const { user } = useStore();

  useEffect(() => {
    if (!user) return;

    setAPIUrl(`${WHOAMI_URL}/member/${user?.id}`);
  }, [user]);

  const handleCopyAPIUrl = () => {
    navigator.clipboard.writeText(APIUrl);

    toast.success("Copied to clipboard");
  };

  return (
    <main className="max-w-3xl">
      <div className="mb-3">
        <h3 className="text-xl mb-2">API Preferences</h3>
        <p className="text-muted-foreground text-sm">
          Configure your API preferences, such as API key, API secret, etc.
        </p>
      </div>

      <Card>
        <CardHeader className="border-b py-3">
          <CardTitle className="text-sm">URL</CardTitle>
        </CardHeader>
        <CardContent className="py-3">
          <div className="flex items-start gap-3">
            <Input readOnly value={APIUrl} className="h-full" />
            <Button className="h-full" onClick={handleCopyAPIUrl}>
              <Copy size={16} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            A RESTful endpoint for querying and managing your database.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
