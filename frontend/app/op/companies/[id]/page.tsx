import { ProgramItem } from "@/components/program";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  if (!params.id) return notFound();

  const programs = [
    { name: "Program 1", description: "Description for Program 1" },
    { name: "Program 2", description: "Description for Program 2" },
    { name: "Program 3", description: "Description for Program 3" },
  ];

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6 flex justify-between items-center">
        <div>Campnay ID: {params.id}</div>
        <Button>Add Program</Button>
      </h2>
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold">Your Submitted Programs</h2>
        <div className="w-full flex flex-col gap-4 mt-4">
          {programs.map((program, idx) => (
            <ProgramItem
              key={idx}
              name={program.name}
              description={program.description}
              joined={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
