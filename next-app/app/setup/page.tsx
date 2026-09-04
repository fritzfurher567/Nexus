import { OnboardingWizard } from "@/the wizzard/components/onboarding/setup-wizzard";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SetupGuard } from "@/components/setup-guard";

export default async function SetupPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <SetupGuard />
      <div className="mx-auto max-w-5xl">
        <OnboardingWizard />
      </div>
    </main>
  );
}
