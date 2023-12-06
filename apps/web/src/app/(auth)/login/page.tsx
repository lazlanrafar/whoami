"use client";

import ButtonLoginGithub from "@/components/atoms/button-login-github";
import ButtonLoginGoogle from "@/components/atoms/button-login-google";
import HrText from "@/components/atoms/hr-text";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email must to be filled" }),
  password: z.string().min(1, { message: "Password must to be filled" }),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) toast.error(error.message);
    else {
      toast.success("Login success");
      router.push("/");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login or continue with social media
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <ButtonLoginGithub />
        <ButtonLoginGoogle />
      </div>
      <HrText text="Or continue with" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button className="w-full" type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </Form>
      <p className="text-sm">
        <span>Don't have an account?</span>
        <Link href="/register" className="font-medium ml-1 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
