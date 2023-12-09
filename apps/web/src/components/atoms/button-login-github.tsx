import supabase from "@/lib/supabase";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { siteConfig } from "@/constants";

export default function ButtonLoginGithub() {
  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: siteConfig.url,
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log(data);
    toast.success("Login success");
  };

  return (
    <Button variant="outline" onClick={signInWithGithub}>
      <FaGithub className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
}
