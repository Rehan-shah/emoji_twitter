"use client"
import { Post as post } from "@/db/schema"
import PostAdd from './postAdd'
import { useState } from 'react'
import Post from './post'
import { SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs"


interface postJoin {
  createdAt: string,
  profilePic: string,
  userName: string,
  id: number,
  content: string,
  userId: string,
};

function SignIn() {
  return (
    <div>
      <a href="/sign-up"><button>SignIn to tweet</button></a>
    </div>
  )
}

function Modal() {
  return (
    <div className="bg-red-200">Please only use emojis </div>
  )
}

export default function Home({ set }: { set: postJoin[] }) {
  let { isSignedIn } = useAuth();

  const [lists, setList] = useState(set.reverse());
  const [vis, setVis] = useState(false);
  return (
    <>
      {/* {!!isSignedIn && <SignOutButton />} */}
      <div className='w-2/5 mx-auto border border-[#e6e7eb] border-b-transparent border-t-transparent'>
        {isSignedIn ? <PostAdd setList={setList} setVis={setVis} /> : <SignIn />}
        {vis && <Modal />}
        {lists.map((list, i) => <Post content={list.content} userName={list.userName} date={list.createdAt} profilePic={list.profilePic} key={i} />)} </div>
    </>
  )
}
