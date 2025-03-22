"use client";
import { ProgramItem } from "@/components/program";
import { Button } from "@/components/ui/button";
import { usePrograms } from "@/hooks/usePrograms";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { AddProgramModal } from "./add-program-modal";
import { useState } from "react";

export default function CompanyDashboard() {
  const { user } = useCurrentUser();
  const { programs, isLoading } = usePrograms();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div className="capitalize">Company : {user?.name}</div>
        <Button onClick={() => setIsOpen(true)}>Add Program</Button>
        {isOpen && <AddProgramModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Your Submitted Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {isLoading ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            user &&
            programs
              .filter((program) => program.ownerId == user.id)
              .map((program, idx) => (
                <ProgramItem
                  key={idx}
                  userId={user.id}
                  program={program}
                  isOwner
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
