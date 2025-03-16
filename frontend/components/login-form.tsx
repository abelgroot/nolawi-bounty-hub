"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  });

  const signInform = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = signInform;

  const { login, isLoggingIn, errorLoggingIn } = useAuth();

  const onSubmit = (data: z.infer<typeof schema>) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email below to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signInform}>
            <form onSubmit={handleOnSubmit} onKeyDown={handleKeyDown}>
              <div className="flex flex-col gap-4 mt-4 justify-center items-center">
                <FormField
                  control={signInform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="w-full"
                          {...field}
                          tabIndex={20}
                          name="email"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signInform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          className="w-full"
                          {...field}
                          tabIndex={21}
                          name="password"
                          autoComplete="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full grid grid-cols-2 gap-2">
                  <Link href="/auth/signup">
                    <Button
                      variant="outline"
                      className="px-8 w-full"
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn && (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      )}
                      Sign Up
                    </Button>
                  </Link>
                  <Button
                    className="px-8 w-full"
                    disabled={isLoggingIn}
                    type="submit"
                    tabIndex={22}
                  >
                    {isLoggingIn && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3 justify-center items-center">
        <Link
          href="/"
          className="w-full text-center text-sm underline underline-offset-2"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
