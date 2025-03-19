import { User, userSchema } from "@/schemas/user.schema";
import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usersKey } from "./query-keys";
import { z } from "zod";

export function useCompanies() {
  const url = `/api/v1/users/companies`;
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: usersKey.list("companies"),
    queryFn: () => apiGet<User[]>(url, z.array(userSchema), token || ""),
    enabled: !!token,
  });

  return {
    companies: query.data?.data || [],
    isLoading: query.isPending,
  };
}
