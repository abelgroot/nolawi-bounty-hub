"use client";
import { ProgramItem } from "@/components/program";
import { useParticipation } from "@/hooks/useParticipation";
import { usePrograms } from "@/hooks/usePrograms";
import { useCompanies } from "@/hooks/useCompanies";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function HackerDashboard() {
  const { user } = useCurrentUser();
  const { programs, isLoading } = usePrograms();
  const { companies, isLoading: loadingCompanies } = useCompanies();
  const { joinedPrograms, isLoading: loadingJoined } = useParticipation(
    user?.id,
  );
  const { submissions, isLoading: loadingSubmissions } = useSubmissions();

  const joinedProgramIds = joinedPrograms.map((program) => program.id);
  const availablePrograms = programs.filter(
    (program) => !joinedProgramIds.includes(program.id),
  );

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6">
        Hacker ID: {user?.email}
      </h2>
      <div className="grid grid-cols-2">
        <div className="p-4 w-full">
          <h2 className="text-lg font-bold">Available Programs</h2>
          <div className="w-full flex flex-col gap-4 mt-4">
            {isLoading ? (
              <div>
                <Loader2 /> loading programs ...
              </div>
            ) : (
              availablePrograms.map(
                (program, idx) =>
                  user && (
                    <ProgramItem key={idx} program={program} userId={user.id} />
                  ),
              )
            )}
          </div>
        </div>
        <div>
          <div className="p-4">
            <h2 className="text-lg font-bold">Your Joined Programs</h2>
            <div className="w-full flex flex-col gap-4 mt-4">
              {loadingJoined || loadingSubmissions ? (
                <div>
                  <Loader2 /> loading joined programs ...
                </div>
              ) : (
                joinedPrograms.map(
                  (program, idx) =>
                    user && (
                      <ProgramItem
                        key={idx}
                        program={program}
                        userId={user.id}
                        joined={true}
                        submission={submissions.find(
                          (submission) => submission.programId === program.id,
                        )}
                      />
                    ),
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold w-full text-center">
          Suggested Campanies
        </h3>
        {loadingCompanies && <div>Loading companies...</div>}
        <div className="flex flex-wrap gap-10 justify-center items-center p-10">
          {companies.map((company, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <Link
                href={`/internal/company/${company.id}`}
                key={idx}
                className="h-[150px] w-[150px] bg-slate-200 rounded-full hover:ring-1 hover:ring-sky-400"
              ></Link>
              <p>{company.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
