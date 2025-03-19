import { apiDelete, apiPost } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  companyProgramsKey,
  participationKey,
  submissionsKey,
} from "./query-keys";
import { BountyProgram } from "@/schemas/program.schema";
import { z } from "zod";
import {
  participantSchema,
  Participant,
  SubmissionCreateType,
  submissionCreateSchema,
} from "@/schemas/participation.schema";
import { useAlert } from "@/providers/alert-provider";

export function useParticipationActions(hackerId?: string) {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const queryClient = useQueryClient();

  const joinProgram = async ({
    programId,
    hackerId,
  }: {
    programId: string;
    hackerId: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    const url = `/api/v1/participation`;
    await apiPost<Participant>(
      url,
      participantSchema,
      { hacker_id: hackerId, program_id: programId },
      token || "",
    );
  };

  const leaveProgram = async ({
    programId,
    hackerId,
  }: {
    programId: string;
    hackerId: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    await apiDelete(
      `/api/v1/participation/${programId}/${hackerId}`,
      token || "",
    );
  };

  const submitReport = async ({
    programId,
    hackerId,
    description,
    details,
  }: {
    programId: string;
    hackerId: string;
    description: string;
    details: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    await apiPost<SubmissionCreateType>(
      `/api/v1/submissions`,
      submissionCreateSchema,
      { program_id: programId, hacker_id: hackerId, description, details },
      token || "",
    );
  };

  const joinProgramMutation = useMutation({
    mutationFn: joinProgram,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("You have successfully joined the program!");
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
      alert?.error("Failed to join the program!");
    },
  });

  const leaveProgramMutation = useMutation({
    mutationFn: leaveProgram,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("You have successfully left the program!");
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
      alert?.error("Failed to remove your from the program!");
    },
  });

  const submitReportMutation = useMutation({
    mutationFn: submitReport,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("You have successfully submitted your report!");
      queryClient.invalidateQueries({
        queryKey: participationKey.all,
      });
      queryClient.invalidateQueries({
        queryKey: submissionsKey.all,
      });
    },
    onError: (_error, variables) => {
      const { onError } = variables;
      onError?.();
      alert?.error("Failed to submit your report!");
    },
  });

  console.log(submitReportMutation.error);

  return {
    joinProgram: joinProgramMutation.mutate,
    isJoining: joinProgramMutation.isPending,
    leaveProgram: leaveProgramMutation.mutate,
    isLeaving: leaveProgramMutation.isPending,
    submitReport: submitReportMutation.mutate,
    isSubmittingReport: submitReportMutation.isPending,
  };
}
