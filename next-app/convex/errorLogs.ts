import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("errorLogs").withIndex("by_timestamp").order("desc").take(50);
  },
});

// Called by the bot (once you wire it in) whenever a real error occurs.
export const log = internalMutation({
  args: {
    action: v.string(),
    errorMessage: v.string(),
    module: v.string(),
    guildId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("errorLogs", { ...args, timestamp: Date.now() });
  },
});