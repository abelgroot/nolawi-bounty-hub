import { BountyProgram } from "@/schemas/program.schema";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useParticipationActions } from "@/hooks/useParticipationActions";
import { ReportSubmissionModal } from "./report-submission-modal";
import { Submission } from "@/schemas/participation.schema";
import { useState } from "react";
import { useProgramActions } from "@/hooks/useProgramActions";

interface ProgramItemProps {
  program: BountyProgram;
  joined?: boolean;
  submission?: Submission;
  isOwner?: boolean;
  userId: string;
}

export function ProgramItem({
  program,
  joined,
  submission,
  isOwner,
  userId,
}: ProgramItemProps) {
  const {
    joinProgram,
    isJoining,
    leaveProgram,
    isLeaving,
    isSubmittingReport,
  } = useParticipationActions(userId);
  const { isDeleting, deleteProgram } = useProgramActions();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{program.name}</CardTitle>
            <CardDescription>{program.description}</CardDescription>
          </div>
          {isOwner ? (
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => {
                const result = confirm(
                  "Are you sure you want to delete this program?",
                );
                if (result) {
                  deleteProgram({
                    programId: program.id,
                  });
                }
              }}
            >
              {isDeleting && <Loader2 className="size-2" />}
              Delete
            </Button>
          ) : joined ? (
            <div className="flex flex-row gap-3 items-center">
              {submission ? (
                <>
                  <Button disabled variant="outline">
                    Submitted
                  </Button>
                  <div className="uppercase text-xs h-6 flex justify-center items-center rounded-full border border-gray-200 px-4 py-1">
                    {submission.status}
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Submit
                  </Button>
                  {isOpen && (
                    <ReportSubmissionModal
                      program={program}
                      hackerId={userId}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  )}

                  <Button
                    variant="destructive"
                    disabled={isLeaving || isSubmittingReport}
                    onClick={() => {
                      const result = confirm(
                        "Are you sure you want to leave the program?",
                      );
                      if (result) {
                        leaveProgram({
                          programId: program.id,
                          hackerId: userId,
                        });
                      }
                    }}
                  >
                    {isLeaving && <Loader2 className="size-2" />}
                    Leave
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Button
              disabled={isJoining}
              onClick={() => {
                const result = confirm(
                  "Are you sure you want to join the program?",
                );
                if (result) {
                  joinProgram({
                    programId: program.id,
                    hackerId: userId,
                  });
                }
              }}
              className="flex flex-row gap-1"
            >
              {isJoining && <Loader2 className="size-2" />}
              Join
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
