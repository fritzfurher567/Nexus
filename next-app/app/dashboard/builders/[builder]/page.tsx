import { notFound } from "next/navigation";
import { BuilderScreen } from "@/components/builders";

const builders = ["command", "event", "message"] as const;
type BuilderType = (typeof builders)[number];

export default async function BuilderPage({ params }: { params: Promise<{ builder: string }> }) {
  const { builder } = await params;
  if (!builders.includes(builder as BuilderType)) notFound();
  return <BuilderScreen type={builder as BuilderType} />;
}
