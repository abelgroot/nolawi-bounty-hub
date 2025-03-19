import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { participationKey } from "./query-keys";
import { BountyProgram, bountyProgramSchema } from "@/schemas/program.schema";
import { z } from "zod";

export function useParticipation(hackerId?: string) {
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: participationKey.list(hackerId || ""),
    queryFn: () =>
      apiGet<BountyProgram[]>(
        `/api/v1/participation/hacker/${hackerId}`,
        z.array(bountyProgramSchema),
        token || "",
      ),
    enabled: !!hackerId && !!token,
  });

  return {
    joinedPrograms: query.data?.data || [],
    isLoading: query.isPending,
  };
}
