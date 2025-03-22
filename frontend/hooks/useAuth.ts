"use client";

import { apiPost } from "@/lib/api";
import { useAlert } from "@/providers/alert-provider";
import {
  User,
  UserCreate,
  UserSave,
  userSchema,
  AuthUserResponse,
  authUserResponseSchema,
} from "@/schemas/user.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usersKey } from "./query-keys";

export function useAuth() {
  const alert = useAlert();
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = ({ email, password }: { email: string; password: string }) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    return apiPost<AuthUserResponse>(
      `/api/v1/auth/login`,
      authUserResponseSchema,
      formData,
    );
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token.accessToken);
      queryClient.invalidateQueries({
        queryKey: usersKey.detail("currentUser"),
      });

      router.push(`/internal/user`);
    },
    onError: () => {
      alert?.error("Invalid email or password");
    },
  });
  const signUpUser = async ({
    user,
  }: {
    user: UserCreate;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    const response = await apiPost<User>("/api/v1/users", userSchema, {
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return response.data;
  };

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("Account created Successfully!");
    },
    onError: (_data, variables) => {
      const { onError } = variables;
      onError?.();
      alert?.error("Error creating account!");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({
      queryKey: usersKey.all,
    });
    router.push("/auth/login");
  };

  return {
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    errorLoggingIn: loginMutation.error,
    logout,
  };
}
