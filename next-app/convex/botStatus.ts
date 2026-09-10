import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_STATUS = { mode: "fixed", activityType: "watching", texts: ["the server"] };

export const get = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db.query("botStatus").first();
    return doc ?? DEFAULT_STATUS;
  },
});

// Called by the bot via an HTTP route (once wired into your real
// ConvexActionWorker) to read the current status config.
export const getForBot = internalQuery({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db.query("botStatus").first();
    return doc ?? DEFAULT_STATUS;
  },
});

export const save = mutation({
  args: {
    mode: v.string(),
    activityType: v.string(),
    texts: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");

    const existing = await ctx.db.query("botStatus").first();
    const updatedAt = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt });
    } else {
      await ctx.db.insert("botStatus", { ...args, updatedAt });
    }

    // Bot-wide action, not tied to one server — "global" is a
    // placeholder serverId since the queue schema requires one, but
    // getPending() doesn't filter by server so this is fine.
    await ctx.db.insert("botActions", {
      userId: identity.subject,
      serverId: "global",
      type: "update_status",
      payload: args,
      status: "pending",
      createdAt: updatedAt,
    });
  },
});