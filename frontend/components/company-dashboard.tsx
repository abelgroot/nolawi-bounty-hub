"use client";
import { ProgramItem } from "@/components/program";
import { Button } from "@/components/ui/button";
import { usePrograms } from "@/hooks/usePrograms";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";

export default function CompanyDashboard() {
  const { user } = useCurrentUser();
  const { programs, isLoading } = usePrograms();

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div>Campnay ID: {user?.email}</div>
        <Button>Add Program</Button>
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Your Submitted Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {isLoading ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            programs
              .filter((program) => program.ownerId == user?.id)
              .map((program, idx) => (
                <ProgramItem key={idx} program={program} isOwner />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
