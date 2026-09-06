import type { AuthConfig } from "convex/server";

const authConfig = {
  providers: [
    {
      // Convex has its own environment; browser variables from .env.local
      // are not available here.
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;

export default authConfig;
