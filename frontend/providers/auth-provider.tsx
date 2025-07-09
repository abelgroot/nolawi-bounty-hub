"use client";
import PageLoading from "@/components/page-loading";
import { usersKey } from "@/hooks/query-keys";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User, userSchema } from "@/schemas/user.schema";
import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface AuthContextProps {
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const url = "/api/v1/users";
  const { token, isTokenLoaded } = useLocalStorage("token");

  const { logout } = useAuth();
  const router = useRouter();

  const { isPending, isError, data, error } = useQuery({
    queryKey: usersKey.detail("currentUser"),
    queryFn: () => apiGet<User>(`${url}/me`, userSchema, token || ""),
    enabled: !!token,
    retry: 2,
  });

  const user = data?.data || null;

  useEffect(() => {
    if (isTokenLoaded && !token) {
      router.push("/");
    }
  }, [isTokenLoaded, token, router]);

  useEffect(() => {
    if (isError || (!user && !isPending)) {
      logout();
    }
  }, [isError, user, isPending, logout]);

  if (isPending)
    return (
      <div className="flex h-screen w-full items-center justify-center px-4">
        <PageLoading />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useCurrentUser = () => useContext(AuthContext);
