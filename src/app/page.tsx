import PostView from "./postView";
import { post, Post } from "@/db/schema"
import { db } from "@/db/db"
import { clerkClient } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm/expressions";
import { Suspense } from "react";
import Loading from "./loading";


export const revalidate = 0;


const HomePage = async () => {
  console.time("first paint")
  let posts: Post[] = await db.select().from(post).orderBy(desc(post.createdAt), desc(post.id));
  let res: postJoin[] = await Promise.all(posts.map(async (post) => {
    let user = await clerkClient.users.getUser(post.userId)
    let userName;
    (!!user.username ? userName = user.username : (userName = (user.firstName + "-" + user.lastName)));
    return {
      ...post,
      createdAt: post.createdAt.toString(),
      profilePic: user.profileImageUrl,
      userName: userName
    }
  }))

  console.timeEnd("first paint")
  return (
    <>
    <Suspense fallback={<Loading />} >
     <PostView set={res} />
     </Suspense>
    </>
  )
}



export default HomePage
