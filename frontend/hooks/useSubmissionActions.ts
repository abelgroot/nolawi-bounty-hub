import { apiGet, apiPost } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submissionsKey } from "./query-keys";
import { z } from "zod";
import {
  Submission,
  submissionSchema,
  SubmissionStatus,
} from "@/schemas/participation.schema";
import { useAlert } from "@/providers/alert-provider";

export function useSubmissionAction(submissionId: string) {
  const url = `/api/v1/submissions/feedback/${submissionId}`;
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const queryClient = useQueryClient();

  const updateSubmission = async ({
    status,
    feedback,
  }: {
    status: SubmissionStatus;
    feedback: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    await apiPost<Submission>(
      url,
      submissionSchema,
      { status, feedback },
      token || "",
    );
  };

  const updateSubmissionMutation = useMutation({
    mutationFn: updateSubmission,
    onSuccess: (_data, variables) => {
      const { onSuccess } = variables;
      onSuccess?.();
      alert?.success("Submission updated successfully!");
      queryClient.invalidateQueries({
        queryKey: submissionsKey.all,
      });
    },
    onError: (_error, variables) => {
      const { onError } = variables;
      onError?.();
      alert?.error("Failed update submissions");
    },
  });

  return {
    updateSubmission: updateSubmissionMutation.mutate,
    isUpdating: updateSubmissionMutation.isPending,
  };
}
