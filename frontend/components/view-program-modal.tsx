import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Submission } from "@/schemas/participation.schema";
import { BountyProgram } from "@/schemas/program.schema";
import { User } from "@/schemas/user.schema";

export function ViewSubmissionModal({
  submission,
  submittedBy,
  program,
  isOpen,
  setIsOpen,
}: {
  submission: Submission;
  submittedBy: User;
  program: BountyProgram;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const values = [
    {
      label: "Program Name",
      value: program.name,
    },
    {
      label: "Program Description",
      value: program.description,
    },
    {
      label: "Submitted by",
      value: submittedBy.email,
    },
    {
      label: "Submission Description",
      value: submission.description,
    },
    {
      label: "Submission Details",
      value: submission.details,
    },
    {
      label: "Submitted on",
      value: new Date(submission.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bounty program</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {values.map((value) => (
            <div key={value.label} className="space-y-0">
              <div className="text-xs text-slate-600">{value.label}</div>
              <div className="text-sm">{value.value}</div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-end">
          <Button className="w-[150px]" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
