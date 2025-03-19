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
}

export function ProgramAdminItem({ program }: ProgramItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{program.name}</CardTitle>
            <CardDescription>{program.description}</CardDescription>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => {}}>
              View
            </Button>
            <Button onClick={() => {}}>Approve</Button>
            <Button variant="destructive" onClick={() => {}}>
              Deny
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
