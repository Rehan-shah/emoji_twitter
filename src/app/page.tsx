import PostView from "./postView";
import { post, Post } from "@/db/schema"
import { db } from "@/db/db"
import { currentUser, SignIn } from "@clerk/nextjs/app-beta";

export const dynamic = "force-dynamic";

const HomePage = async () => {

  let res: Post[] = await db.select().from(post)
  console.log(res);
  return (
    <>
      <PostView set={res} />
    </>
  )
}



export default HomePage
