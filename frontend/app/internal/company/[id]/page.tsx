"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{
    id: string;
  }>();

  return (
    <div>
      <h1>Company Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
