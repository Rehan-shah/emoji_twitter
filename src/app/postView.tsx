"use client"

import { Post as post } from "@/db/schema"
import PostAdd from './postAdd'
import { useState } from 'react'
import Post from './post'
import { SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs"

// function PostNow({ content }: { content: string }) {

//   return (
//     <div className="border">{content}</div>
//   )
// }

export default function Home({ set }: { set: postJoin[] }) {
  let { isSignedIn } = useAuth();

  const [lists, setList] = useState(set.reverse())
  return (
    <>
      {!!isSignedIn && <SignOutButton />}
      {!isSignedIn && <a href="/sign-up">sigin in</a>}
      <div className='w-1/3 mx-auto border-b-black border mt-10'>
        <PostAdd setList={setList} />
        {lists.map((list, i) => <Post content={list.content} userName={list.userName} date={list.createdAt} profilePic={list.profilePic} key={i} />)} </div>
    </>
  )
}
