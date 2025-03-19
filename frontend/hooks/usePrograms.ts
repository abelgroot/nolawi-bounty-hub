import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { companyProgramsKey } from "./query-keys";
import { BountyProgram, bountyProgramSchema } from "@/schemas/program.schema";
import { z } from "zod";

export function usePrograms() {
  const url = `/api/v1/bountyprograms`;
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: companyProgramsKey.list(`programs-${token}`),
    queryFn: () =>
      apiGet<BountyProgram[]>(url, z.array(bountyProgramSchema), token || ""),
    enabled: !!token,
  });

  return {
    programs: query.data?.data || [],
    isLoading: query.isPending,
  };
}
