import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

const guildArgs = {
  guildId: v.string(),
  name: v.string(),
  iconUrl: v.optional(v.string()),
  ownerId: v.optional(v.string()),
  memberCount: v.optional(v.number()),
};

export const upsert = internalMutation({
  args: guildArgs,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("guilds")
      .withIndex("by_guild_id", (q) => q.eq("guildId", args.guildId))
      .unique();
    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        iconUrl: args.iconUrl,
        ownerId: args.ownerId,
        memberCount: args.memberCount,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("guilds", {
      ...args,
      connectedAt: now,
      updatedAt: now,
    });
  },
});

export const remove = internalMutation({
  args: { guildId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("guilds")
      .withIndex("by_guild_id", (q) => q.eq("guildId", args.guildId))
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user?.discordUserId) return [];
    return await ctx.db
      .query("guilds")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.discordUserId))
      .collect();
  },
});

export const requestLeave = mutation({
  args: { guildId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not signed in");
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    const guild = await ctx.db
      .query("guilds")
      .withIndex("by_guild_id", (q) => q.eq("guildId", args.guildId))
      .unique();
    if (!guild) throw new Error("Server not found");
    if (!user?.discordUserId || guild.ownerId !== user.discordUserId) {
      throw new Error("You can only remove the bot from servers you own");
    }
    await ctx.db.insert("botActions", {
      userId: identity.subject,
      serverId: args.guildId,
      type: "leave_guild",
      payload: {},
      status: "pending",
      createdAt: Date.now(),
    });
  },
});