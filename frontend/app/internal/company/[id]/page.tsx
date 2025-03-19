"use client";
import { ProgramItem } from "@/components/program";
import { usePrograms } from "@/hooks/usePrograms";
import { useUser } from "@/hooks/useUser";
import { useCurrentUser } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{
    id: string;
  }>();

  const { user } = useUser(id);
  const { user: currentUser } = useCurrentUser();
  const { programs, isLoading } = usePrograms();

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div>Campnay ID: {user?.email}</div>
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {isLoading ? (
            <div>
              <Loader2 /> loading programs ...
            </div>
          ) : (
            user &&
            programs
              .filter((program) => program.ownerId == id)
              .map((program, idx) => (
                <ProgramItem
                  key={idx}
                  userId={user.id}
                  program={program}
                  isOwner={program.ownerId === currentUser?.id}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
