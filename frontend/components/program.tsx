import { BountyProgram } from "@/schemas/program.schema";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface ProgramItemProps {
  program: BountyProgram;
  joined?: boolean;
  isOwner?: boolean;
}

export function ProgramItem({ program, joined, isOwner }: ProgramItemProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{program.name}</CardTitle>
            <CardDescription>{program.description}</CardDescription>
          </div>
          {!isOwner &&
            (joined ? (
              <Button variant="outline">Submit</Button>
            ) : (
              <Button>Join</Button>
            ))}
        </div>
      </CardHeader>
    </Card>
  );
}
