import { User, userSchema } from "@/schemas/user.schema";
import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usersKey } from "./query-keys";
import { z } from "zod";

export function useUsers() {
  const url = `/api/v1/users`;
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: usersKey.list("users"),
    queryFn: () => apiGet<User[]>(url, z.array(userSchema), token || ""),
    enabled: !!token,
  });

  return {
    users: query.data?.data || [],
    isLoading: query.isPending,
  };
}
