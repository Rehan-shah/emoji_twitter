import { post, Post, newPost } from "@/db/schema"
import { db } from "@/db/db"
import { NextResponse } from "next/server";
import { z } from "zod";
import { date } from "drizzle-orm/mysql-core";
import { getAuth } from "@clerk/nextjs/server"

const PostSchema = z.object({
  content: z.string().emoji().max(280).min(1),
});


export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);

    if (!userId) {
      return new NextResponse("Not authorized", { status: 401 });
    }
    const body = await req.json();
    const parsed = PostSchema.safeParse(body);

    if (!parsed.success) {
      return new NextResponse("Invalid body", { status: 400 });
    }
    const { content } = parsed.data;

    let NewPost: newPost = {
      content: content,
      createdAt: new Date(),
      userId: userId
    }

    // try {
    const insert = await db.insert(post).values(NewPost)
    const hello: Post[] = await db.select().from(post)
    return new NextResponse("success", { status: 200 })
    // } catch (e) {
    // return new NextResponse(`New error : ${e}`, { status: 500 });
    // }
  } catch (e) {
    console.log(e);
  }
}

