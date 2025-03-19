import { BountyProgram } from "@/schemas/program.schema";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { ViewSubmissionModal } from "./view-program-modal";
import { Submission, SubmissionEnum } from "@/schemas/participation.schema";
import { User } from "@/schemas/user.schema";
import { SubmissionUpdateModal } from "./submission-update-form";
import { cn } from "@/lib/utils";

interface SubmissionItemProps {
  submission: Submission;
  submittedBy: User;
  program: BountyProgram;
}

export function SubmissionItem({
  submission,
  submittedBy,
  program,
}: SubmissionItemProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <>
      <ViewSubmissionModal
        submission={submission}
        submittedBy={submittedBy}
        program={program}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />
      <SubmissionUpdateModal
        submission={submission}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      />
      <Card className="w-full p-4">
        <CardHeader className="p-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{submission.description}</CardTitle>
              <CardDescription className="mt-2">
                Submitted by {submittedBy.email}
              </CardDescription>
              <div
                className={cn(
                  "uppercase mt-3 text-xs h-6 flex justify-center items-center rounded-full border border-gray-200 px-4 py-1",
                  submission.status === SubmissionEnum.Enum.approved
                    ? "bg-greed-100 text-green-600"
                    : submission.status === SubmissionEnum.Enum.rejected
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600",
                )}
              >
                {submission.status}
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setIsViewOpen(true)}>
                View
              </Button>
              <Button onClick={() => setIsUpdateOpen(true)}>Update</Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
