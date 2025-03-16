"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  UserCreate,
  userCreateSchema,
  UserRole,
  UserRoleEnum,
} from "@/schemas/user.schema";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface UserRoleChoice {
  label: string;
  value: string;
}

export const roles: UserRoleChoice[] = [
  {
    label: "Hacker",
    value: UserRoleEnum.enum.hacker,
  },
  {
    label: "Company",
    value: UserRoleEnum.enum.company,
  },
];

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp, isSigningUp } = useAuth();
  const router = useRouter();

  const form = useForm<UserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {},
  });

  function onSubmit(data: UserCreate) {
    signUp({
      user: data,
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pb-20"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        disabled={isSigningUp}
                      />
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
                        placeholder="Password"
                        {...field}
                        disabled={isSigningUp}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Repeate Passowrd"
                        {...field}
                        disabled={isSigningUp}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Role</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role, index) => (
                        <div
                          key={role.value}
                          className="flex items-center border justify-between p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            isSigningUp ? null : field.onChange(role.value)
                          }
                        >
                          <FormLabel
                            htmlFor={role.value}
                            className="font-normal flex items-center space-x-2"
                          >
                            <span>{role.label}</span>
                          </FormLabel>
                          <FormControl>
                            <input
                              type="radio"
                              value={role.value}
                              checked={field.value === role.value}
                              onChange={() => {}}
                              disabled={isSigningUp}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed"
                            />
                          </FormControl>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full grid grid-cols-2 gap-2">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="px-8 w-full"
                    disabled={isSigningUp}
                  >
                    {isSigningUp && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    Login
                  </Button>
                </Link>
                <Button
                  className="px-8 w-full"
                  disabled={isSigningUp}
                  type="submit"
                  tabIndex={22}
                >
                  {isSigningUp && <Loader2 className="w-5 h-5 animate-spin" />}
                  Create Account
                </Button>
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
}
