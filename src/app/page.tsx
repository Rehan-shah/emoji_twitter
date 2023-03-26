import PostView from "./postView";
import { post, Post } from "@/db/schema"
import { db } from "@/db/db"
import { currentUser, SignIn } from "@clerk/nextjs/app-beta";
import { clerkClient } from "@clerk/nextjs/server";


export const dynamic = "force-dynamic";

const HomePage = async () => {
  let user = await currentUser();
  let posts: Post[] = await db.select().from(post);

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
  return (
    <>
      <PostView set={res} />
    </>
  )
}



export default HomePage
