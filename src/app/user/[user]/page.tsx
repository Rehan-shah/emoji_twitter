import Img from "next/image"
import { post, Post as PostType } from "@/db/schema";
import { db } from "@/db/db";
import { desc, eq } from 'drizzle-orm/expressions';
import Post from "@/app/post";
import { clerkClient } from "@clerk/nextjs/server";
 import { faker } from '@faker-js/faker'
import { Back as BackButton } from "@/app/erroMessage";

export const revalidate = 60;

export const metadata = { 
  title: 'Emoji Twitter',
  description: 'twiitter but less angry ',
  icons: {
    icon: "/vercel.svg" ,
    shortcut: "/favicon-32x32.png",
  }
}

export default async function User({
  params,
}: {
  params: { user: string };
}) {

  let posts: PostType[] = await db.select().from(post).where(eq(post.userId, params.user)).orderBy(desc(post.createdAt));
  let user = await clerkClient.users.getUser(params.user)

  let src =  faker.image.abstract(700 , 218,true)
  let userName = "";
  (!!user.username ? userName = user.username : (userName = (user.firstName + "-" + user.lastName)));
  return (
    <>
    <BackButton />
    <div className="lg:w-2/5 w-full mx-auto border border-[#cccccc]">
      <div className="border-b-[#cccccc] border border-t-transparent border-l-transparent border-r-transparent ">
         <Img src={src} width={800} height={250} alt={"random image"} className="filter brightness-60 " />
         <img className="rounded-full ml-3 relative z-20 -top-14" src={user.profileImageUrl} width="110px" alt="profile pic" />
        <h1 className="ml-3 -mt-12 mb-7 font-bold text-3xl">@{userName}</h1>
      </div>
      {
        posts.map((item: PostType, i: number) => (
          <Post key={i} content={item.content} date={item.createdAt.toString()} profilePic={user.profileImageUrl} userName={userName} id={item.id} userId={item.userId}/>
        ))
      }
    </div>
    </>
  )
}
