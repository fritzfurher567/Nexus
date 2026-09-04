import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const OWNER_CLERK_ID = "user_3IkffAb07HuHo7yRu6mZvckvkCK";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("updates").order("desc").take(20);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== OWNER_CLERK_ID) {
      throw new Error("Only the Nexus owner can publish updates");
    }

    const title = args.title.trim();
    const content = args.content.trim();
    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    return await ctx.db.insert("updates", {
      title,
      content,
      createdAt: Date.now(),
    });
  },
});
