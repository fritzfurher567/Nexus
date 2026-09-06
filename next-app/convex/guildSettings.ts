import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const DEFAULT_MODULES: string[] = [];
const ALLOWED_MODULES = new Set([
  "moderation_plus",
  "community",
  "economy_games",
  "roblox_staff",
  "server_tools",
]);

export const getForSelectedServer = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    const guildId = user?.selectedServerId;
    if (!guildId) return null;
    const settings = await ctx.db.query("guildSettings").withIndex("by_guild_id", (q) => q.eq("guildId", guildId)).unique();
    return { guildId, enabledModules: settings?.enabledModules ?? DEFAULT_MODULES };
  },
});

export const saveForSelectedServer = mutation({
  args: { enabledModules: v.array(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user?.selectedServerId) throw new Error("Select a server before changing its modules");
    const guildId = user.selectedServerId;
    const enabledModules = [...new Set(args.enabledModules)];
    if (enabledModules.some((module) => !ALLOWED_MODULES.has(module))) throw new Error("An unknown command module was selected");
    const existing = await ctx.db.query("guildSettings").withIndex("by_guild_id", (q) => q.eq("guildId", guildId)).unique();
    const updatedAt = Date.now();
    if (existing) await ctx.db.patch(existing._id, { enabledModules, updatedAt });
    else await ctx.db.insert("guildSettings", { guildId, enabledModules, updatedAt });
    await ctx.db.insert("botActions", { userId: identity.subject, serverId: guildId, type: "sync_command_modules", payload: { enabledModules }, status: "pending", createdAt: updatedAt });
  },
});

export const getEnabledModules = internalQuery({
  args: { guildId: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db.query("guildSettings").withIndex("by_guild_id", (q) => q.eq("guildId", args.guildId)).unique();
    return settings?.enabledModules ?? DEFAULT_MODULES;
  },
});
