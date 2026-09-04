import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { verifyWebhook } from "@clerk/backend/webhooks";

const http = httpRouter();

function isBotAuthorized(request: Request) {
  const secret = process.env.BOT_ACTION_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

http.route({
  path: "/bot/actions",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!isBotAuthorized(request)) return new Response("Unauthorized", { status: 401 });
    const actions = await ctx.runQuery(internal.botActions.getPending, {});
    return Response.json(actions);
  }),
});

http.route({
  path: "/bot/actions/claim",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!isBotAuthorized(request)) return new Response("Unauthorized", { status: 401 });
    const body = await request.json();
    await ctx.runMutation(internal.botActions.markProcessing, body);
    return new Response(null, { status: 204 });
  }),
});

http.route({
  path: "/bot/actions/complete",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!isBotAuthorized(request)) return new Response("Unauthorized", { status: 401 });
    const body = await request.json();
    await ctx.runMutation(internal.botActions.complete, body);
    return new Response(null, { status: 204 });
  }),
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    let event;
    try {
      event = await verifyWebhook(request, {
        signingSecret: process.env.CLERK_WEBHOOK_SECRET,
      });
    } catch (err) {
      console.error("Clerk webhook verification failed", err);
      return new Response("Invalid signature", { status: 400 });
    }

    if (event.type === "user.created" || event.type === "user.updated") {
      const { id, email_addresses, username, image_url } = event.data;
      await ctx.runMutation(internal.users.upsertFromClerk, {
        clerkId: id,
        email: email_addresses?.[0]?.email_address ?? "",
        username: username ?? undefined,
        imageUrl: image_url ?? undefined,
      });
    }

    if (event.type === "user.deleted") {
      const { id } = event.data;
      if (id) {
        await ctx.runMutation(internal.users.deleteFromClerk, { clerkId: id });
      }
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
