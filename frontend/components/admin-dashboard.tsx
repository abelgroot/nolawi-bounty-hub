"use client";
import { ProgramItem } from "@/components/program";
import { usePrograms } from "@/hooks/usePrograms";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ReviewProgramModal } from "./review-program-modal";
import { ProgramAdminItem } from "./program-admin-item";

export default function AdminDashboard() {
  const { user } = useCurrentUser();
  const { programs, isLoading } = usePrograms();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div>Admin : {user?.email}</div>
        {isOpen && <ReviewProgramModal isOpen={isOpen} setIsOpen={setIsOpen} />}
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
            programs.map((program, idx) => (
              <ProgramAdminItem key={idx} program={program} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
