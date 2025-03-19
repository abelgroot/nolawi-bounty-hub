import { User, userSchema } from "@/schemas/user.schema";
import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usersKey } from "./query-keys";

export function useUser(userId: string) {
  const url = `/api/v1/users/${userId}`;
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: usersKey.detail(userId),
    queryFn: () => apiGet<User>(url, userSchema, token || ""),
    enabled: !!token,
  });

  return {
    user: query.data?.data || null,
    isLoading: query.isPending,
  };
}
