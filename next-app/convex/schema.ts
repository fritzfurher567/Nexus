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
  }).index("by_clerk_id", ["clerkId"]),
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