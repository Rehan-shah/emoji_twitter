import Img from "next/image"
import { post, Post as PostType } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from 'drizzle-orm/expressions';
import Post from "@/app/post";
import { clerkClient } from "@clerk/nextjs/server";

export default async function User({
  params,
}: {
  params: { user: string };
}) {

  let posts: PostType[] = await db.select().from(post).where(eq(post.userId, params.user));
  let user = await clerkClient.users.getUser(params.user)


  let userName = "";
  (!!user.username ? userName = user.username : (userName = (user.firstName + "-" + user.lastName)));
  return (
    <div className="w-2/5 mx-auto border border-[#cccccc]">
      <div><Img src="https://picsum.photos/1600/600" width={800} height={300} /></div>
      {
        posts.map((item: PostType) => (
          <Post content={item.content} date={item.createdAt.toString()} profilePic={user.profileImageUrl} userName={userName} />
        ))
      }
    </div>
  )
}
