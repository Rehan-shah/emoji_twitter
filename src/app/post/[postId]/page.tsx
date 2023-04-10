import { db } from "@/db/db";
import {post} from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { clerkClient } from "@clerk/nextjs/server";
import Post from "@/app/post";


async function hello({
  params,
}: {
  params: { postId: string };
}) {
console.time("Fetch time") 
let selectedPost = await db.select().from(post).where(eq(post.id , parseInt(params.postId)));
let user = await clerkClient.users.getUser(selectedPost[0].userId);
  let userName = "";
  (!!user.username ? userName = user.username : (userName = (user.firstName + "-" + user.lastName)));
console.timeEnd("Fetch time")

return (
  <div className="w-1/3 mx-auto border border-b-transparent">
    <Post content={selectedPost[0].content} userName={userName} date={selectedPost[0].createdAt.toString()} profilePic={user.profileImageUrl} userId={selectedPost[0].userId} id={selectedPost[0].id}/>
  </div>
)

}


export default hello;
