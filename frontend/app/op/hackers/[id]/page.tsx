import { ProgramItem } from "@/components/program";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  if (!params.id) return notFound();

  const avaiablePrograms = [
    { name: "Program 1", description: "Description for Program 1" },
    { name: "Program 2", description: "Description for Program 2" },
    { name: "Program 3", description: "Description for Program 3" },
  ];

  const yourPrograms = [
    { name: "Program 1", description: "Description for Program 1" },
    { name: "Program 2", description: "Description for Program 2" },
    { name: "Program 3", description: "Description for Program 3" },
  ];

  const campaines = [
    { id: 1, name: "Campany 1" },
    { id: 2, name: "Campany 2" },
    { id: 3, name: "Campany 3" },
  ];

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold p-4 border-b mb-6">
        Hacker ID: {params.id}
      </h2>
      <div className="grid grid-cols-2">
        <div className="p-4 w-full">
          <h2 className="text-lg font-bold">Available Programs</h2>
          <div className="w-full flex flex-col gap-4 mt-4">
            {avaiablePrograms.map((program, idx) => (
              <ProgramItem
                key={idx}
                name={program.name}
                description={program.description}
                joined={false}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="p-4">
            <h2 className="text-lg font-bold">Your Joined Programs</h2>
            <div className="w-full flex flex-col gap-4 mt-4">
              {yourPrograms.map((program, idx) => (
                <ProgramItem
                  key={idx}
                  name={program.name}
                  description={program.description}
                  joined={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold w-full text-center">
          Suggested Campanies
        </h3>
        <div className="flex flex-wrap gap-10 justify-center items-center p-10">
          {campaines.map((campain, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <Link
                href={`/op/campaines/${campain.id}`}
                key={idx}
                className="h-[150px] w-[150px] bg-slate-200 rounded-full hover:ring-1 hover:ring-sky-400"
              ></Link>
              <p>{campain.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
