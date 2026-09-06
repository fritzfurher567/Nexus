import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsertFromClerk = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    discordUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      // Never touch `onboarded` here — only the wizard itself should
      // flip it, so a profile update (name/avatar change) doesn't
      // accidentally re-trigger onboarding.
      await ctx.db.patch(existing._id, {
        email: args.email,
        username: args.username,
        imageUrl: args.imageUrl,
        ...(args.discordUserId ? { discordUserId: args.discordUserId } : {}),
      });
      return existing._id;
    }

    return await ctx.db.insert("users", { ...args, onboarded: false });
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const completeOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, { onboarded: true });
  },
});

export const selectServer = mutation({
  args: {
    serverId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const server = await ctx.db
      .query("guilds")
      .withIndex("by_guild_id", (q) => q.eq("guildId", args.serverId))
      .unique();
    if (!server) throw new Error("That server is not currently connected to Nexus");
    if (!user.discordUserId || server.ownerId !== user.discordUserId) {
      throw new Error("You can only manage Discord servers you own");
    }

    await ctx.db.patch(user._id, {
      selectedServerId: args.serverId,
      selectedServerName: server.name,
    });
  },
});
