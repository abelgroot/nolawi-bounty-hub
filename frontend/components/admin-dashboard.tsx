"use client";
import { ProgramItem } from "@/components/program";
import { usePrograms } from "@/hooks/usePrograms";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { ReviewProgramModal } from "./review-program-modal";
import { SubmissionItem } from "./program-admin-item";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useUsers } from "@/hooks/useUsers";

export default function AdminDashboard() {
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const { programs, isLoading: lodingPrograms } = usePrograms();
  const { submissions, isLoading: loadingSubmissions } = useSubmissions();
  const { users, isLoading: loadingUsers } = useUsers();

  const getUser = useCallback(
    (id: string) => {
      return users.find((user) => user.id === id);
    },
    [users],
  );

  const getProgram = useCallback(
    (id: string) => {
      return programs.find((program) => program.id === id);
    },
    [programs],
  );

  const loading = lodingPrograms || loadingSubmissions || loadingUsers;

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div>Admin : {user?.name}</div>
        {isOpen && <ReviewProgramModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Your Submitted Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {loading || loadingUsers ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            user &&
            submissions.map((submission, idx) => {
              const submittedBy = getUser(submission.hackerId);
              const program = getProgram(submission.programId);
              return (
                submittedBy &&
                program && (
                  <SubmissionItem
                    key={idx}
                    submission={submission}
                    submittedBy={submittedBy}
                    program={program}
                  />
                )
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
