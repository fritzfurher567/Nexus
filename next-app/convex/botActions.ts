import { internalMutation, internalQuery, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    serverId: v.string(),
    type: v.string(),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user || user.selectedServerId !== args.serverId) {
      throw new Error("Select this server before creating an action");
    }

    return await ctx.db.insert("botActions", {
      userId: identity.subject,
      serverId: args.serverId,
      type: args.type,
      payload: args.payload,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getPending = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("botActions")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("asc")
      .take(25);
  },
});

export const markProcessing = internalMutation({
  args: { id: v.id("botActions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "processing" });
  },
});

export const complete = internalMutation({
  args: {
    id: v.id("botActions"),
    status: v.union(v.literal("completed"), v.literal("failed")),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      error: args.error,
      completedAt: Date.now(),
    });
  },
});
