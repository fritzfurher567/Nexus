import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listForSelectedServer = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user?.selectedServerId) return [];
    return await ctx.db
      .query("customVariables")
      .withIndex("by_guild_id", (q) => q.eq("guildId", user.selectedServerId!))
      .collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    reference: v.string(),
    variableType: v.string(),
    defaultValue: v.optional(v.string()),
    scope: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user?.selectedServerId) throw new Error("Select a server first");
    const guildId = user.selectedServerId;
    await ctx.db.insert("customVariables", { guildId, ...args, createdAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("customVariables") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user?.selectedServerId) throw new Error("Select a server first");
    const variable = await ctx.db.get(args.id);
    if (!variable || variable.guildId !== user.selectedServerId) throw new Error("Variable not found in the selected server");
    await ctx.db.delete(args.id);
  },
});
