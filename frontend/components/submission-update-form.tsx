"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import {
  Submission,
  SubmissionEnum,
  SubmissionUpdateFeedback,
  submissionUpdateFeedbackSchema,
} from "@/schemas/participation.schema";
import { useSubmissionAction } from "@/hooks/useSubmissionActions";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SubmissionStatusChoice {
  label: string;
  value: string;
}

export const statuses: SubmissionStatusChoice[] = [
  {
    label: "Approved",
    value: SubmissionEnum.enum.approved,
  },
  {
    label: "Rejected",
    value: SubmissionEnum.enum.rejected,
  },
];

export function SubmissionUpdateModal({
  submission,
  isOpen,
  setIsOpen,
}: {
  submission: Submission;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { updateSubmission, isUpdating } = useSubmissionAction(submission.id);

  const form = useForm<SubmissionUpdateFeedback>({
    resolver: zodResolver(submissionUpdateFeedbackSchema),
    defaultValues: {
      feedback: submission.feedback || "",
      status: submission.status || SubmissionEnum.enum.pending,
    },
  });

  function onSubmit(data: SubmissionUpdateFeedback) {
    updateSubmission({
      status: data.status,
      feedback: data.feedback || "",
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Submission</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the vulnerability and list the sites that are affected"
                        className="w-full min-h-[200px]"
                        {...field}
                        tabIndex={19}
                        name="feedback"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a decision</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {statuses.map((status, index) => (
                        <div
                          key={status.value}
                          className="flex items-center border justify-between p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            isUpdating ? null : field.onChange(status.value)
                          }
                        >
                          <FormLabel
                            htmlFor={status.value}
                            className="font-normal flex items-center space-x-2"
                          >
                            <span>{status.label}</span>
                          </FormLabel>
                          <FormControl>
                            <input
                              type="radio"
                              value={status.value}
                              checked={field.value === status.value}
                              onChange={() => {}}
                              disabled={isUpdating}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed"
                            />
                          </FormControl>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end">
                <Button
                  className="px-8 w-[150px]"
                  disabled={isUpdating}
                  type="submit"
                >
                  {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
