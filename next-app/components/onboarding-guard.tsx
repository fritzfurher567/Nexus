"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function OnboardingGuard() {
  const router = useRouter();
  const user = useQuery(api.users.getCurrentUser);

  useEffect(() => {
    if (user && user.onboarded !== true) {
      router.replace("/setup");
    }
  }, [router, user]);

  return null;
}
