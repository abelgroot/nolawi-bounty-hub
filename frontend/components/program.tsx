import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ProgramItemProps {
  name: string;
  description: string;
  joined: boolean;
}

export function ProgramItem({ name, description, joined }: ProgramItemProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {joined ? (
            <Button variant="outline">Submit</Button>
          ) : (
            <Button>Join</Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
