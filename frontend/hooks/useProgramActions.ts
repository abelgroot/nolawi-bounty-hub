import { apiDelete, apiPost } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyProgramsKey, participationKey } from "./query-keys";
import { BountyProgram, bountyProgramSchema } from "@/schemas/program.schema";
import { useAlert } from "@/providers/alert-provider";

export function useProgramActions() {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const queryClient = useQueryClient();

  const createProgram = async ({
    name,
    description,
    rewardAmount,
  }: {
    name: string;
    description: string;
    rewardAmount: number;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    const url = `/api/v1/bountyprograms`;
    await apiPost<BountyProgram>(
      url,
      bountyProgramSchema,
      { name: name, description: description, reward_amount: rewardAmount },
      token || "",
    );
  };

  const deleteProgram = async ({
    programId,
  }: {
    programId: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    await apiDelete(`/api/v1/bountyprograms/${programId}`, token || "");
  };

  const createProgramMutation = useMutation({
    mutationFn: createProgram,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("Program created successfully!");
      queryClient.invalidateQueries({
        queryKey: companyProgramsKey.all,
      });
    },
    onError: (_error, variables) => {
      const { onError } = variables;
      onError?.();
      alert?.error("Failed create program");
    },
  });

  const deleteProgramMutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("You have successfully deleted the program!");
      queryClient.invalidateQueries({
        queryKey: companyProgramsKey.all,
      });
      queryClient.invalidateQueries({
        queryKey: participationKey.all,
      });
    },
    onError: (_error, variables) => {
      const { onError } = variables;
      onError?.();
      alert?.error("Failed to delete your from the program!");
    },
  });

  return {
    createProgram: createProgramMutation.mutate,
    isCreating: createProgramMutation.isPending,
    deleteProgram: deleteProgramMutation.mutate,
    isDeleting: deleteProgramMutation.isPending,
  };
}
