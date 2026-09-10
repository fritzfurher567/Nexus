import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    onboarded: v.optional(v.boolean()),
    selectedServerId: v.optional(v.string()),
    selectedServerName: v.optional(v.string()),
    discordUserId: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),
  guilds: defineTable({
    guildId: v.string(),
    name: v.string(),
    iconUrl: v.optional(v.string()),
    ownerId: v.optional(v.string()),
    memberCount: v.optional(v.number()),
    connectedAt: v.number(),
    updatedAt: v.number(),
  }).index("by_guild_id", ["guildId"]).index("by_owner_id", ["ownerId"]),
  guildSettings: defineTable({
    guildId: v.string(),
    enabledModules: v.array(v.string()),
    updatedAt: v.number(),
  }).index("by_guild_id", ["guildId"]),
  customVariables: defineTable({
    guildId: v.string(),
    name: v.string(),
    reference: v.string(),
    variableType: v.string(),
    defaultValue: v.optional(v.string()),
    scope: v.string(),
    createdAt: v.number(),
  }).index("by_guild_id", ["guildId"]),
  botStatus: defineTable({
    mode: v.string(),
    activityType: v.string(),
    texts: v.array(v.string()),
    updatedAt: v.number(),
  }),
  errorLogs: defineTable({
    timestamp: v.number(),
    action: v.string(),
    errorMessage: v.string(),
    module: v.string(),
    guildId: v.optional(v.string()),
  }).index("by_timestamp", ["timestamp"]),
  updates: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }),
  botActions: defineTable({
    userId: v.string(),
    serverId: v.string(),
    type: v.string(),
    payload: v.any(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    error: v.optional(v.string()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_status", ["status"]),
});