"use client";
import { ProgramItem } from "@/components/program";
import { useParticipation } from "@/hooks/useParticipation";
import { usePrograms } from "@/hooks/usePrograms";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useUser } from "@/hooks/useUser";
import { useCurrentUser } from "@/providers/auth-provider";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{
    id: string;
  }>();

  const { user } = useUser(id);
  const { user: currentUser } = useCurrentUser();
  const { programs, isLoading: loadingPrograms } = usePrograms();

  const { joinedPrograms, isLoading: loadingJoined } = useParticipation(
    currentUser?.id,
  );
  const { submissions, isLoading: loadingSubmissions } = useSubmissions();

  const joinedProgramIds = joinedPrograms.map((program) => program.id);
  const availablePrograms = programs.filter(
    (program) => !joinedProgramIds.includes(program.id),
  );

  const isLoading = loadingPrograms || loadingJoined || loadingSubmissions;

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <Link
          href={`/internal/user`}
          className="flex justify-center items-center gap-2 border rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100"
        >
          <ChevronLeft className="size-4" />
          Back
        </Link>
        <div>Campany : {user?.name}</div>
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {isLoading ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            joinedPrograms
              .filter((program) => program.ownerId == id)
              .map(
                (program, idx) =>
                  currentUser && (
                    <ProgramItem
                      key={idx}
                      program={program}
                      userId={currentUser.id}
                      joined={true}
                      submission={submissions.find(
                        (submission) => submission.programId === program.id,
                      )}
                    />
                  ),
              )
          )}
        </div>
        <div className="w-full flex flex-col gap-4 mt-4">
          {isLoading ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            availablePrograms
              .filter((program) => program.ownerId == id)
              .map(
                (program, idx) =>
                  currentUser && (
                    <ProgramItem
                      key={idx}
                      program={program}
                      userId={currentUser.id}
                    />
                  ),
              )
          )}
        </div>
      </div>
    </div>
  );
}
