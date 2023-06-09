import { db } from "@/db/db";
import {post} from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { clerkClient } from "@clerk/nextjs/server";
import Post from "@/app/post";
import { Back } from "@/app/erroMessage";

export const revalidate = false;

async function hello({
  params,
}: {
  params: { postId: string };
}) {
let selectedPost = await db.select().from(post).where(eq(post.id , parseInt(params.postId)));
let user = await clerkClient.users.getUser(selectedPost[0].userId);
  let userName = "";
  (!!user.username ? userName = user.username : (userName = (user.firstName + "-" + user.lastName)));

return (
  <>
  <Back />
  <div className="lg:w-1/3 w-full  mx-auto border border-b-transparent">
    <Post content={selectedPost[0].content} userName={userName} date={selectedPost[0].createdAt.toString()} profilePic={user.profileImageUrl} userId={selectedPost[0].userId} id={selectedPost[0].id}/>
  </div>
  </>
)

}


export default hello;
