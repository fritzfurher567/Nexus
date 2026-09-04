"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          modalBackdrop: "backdrop-blur-sm",
          modalContent: "border border-white/10 bg-[#121316] shadow-2xl",
          card: "border border-white/10 bg-[#121316] shadow-2xl",
          headerTitle: "text-white",
          headerSubtitle: "text-white/60",
          socialButtonsBlockButton:
            "border border-white/10 bg-white/5 text-white hover:bg-white/10",
          socialButtonsBlockButtonText: "text-white",
          formFieldLabel: "text-white/80",
          formFieldInput:
            "border-white/10 bg-[#0d0e10] text-white placeholder:text-white/40",
          formButtonPrimary:
            "bg-white text-black hover:bg-white/90",
          footerActionText: "text-white/60",
          footerActionLink: "text-white hover:text-white/80",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-white/70 hover:text-white",
          dividerLine: "bg-white/10",
          dividerText: "text-white/50",
          formFieldAction: "text-white/70 hover:text-white",
          otpCodeFieldInput:
            "border-white/10 bg-[#0d0e10] text-white",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}