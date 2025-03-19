import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { submissionsKey } from "./query-keys";
import { z } from "zod";
import { Submission, submissionSchema } from "@/schemas/participation.schema";

export function useSubmissions(hackerId?: string) {
  const url = `/api/v1/submissions/${hackerId}`;
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: submissionsKey.list(hackerId || ""),
    queryFn: () =>
      apiGet<Submission[]>(url, z.array(submissionSchema), token || ""),
    enabled: !!hackerId && !!token,
  });

  return {
    submissions: query.data?.data || [],
    isLoading: query.isPending,
  };
}
