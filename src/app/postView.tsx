"use client"
import { Post as post } from "@/db/schema"
import PostAdd from './postAdd'
import { useState } from 'react'
import Post from './post'
import { SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs"
import Error from "./erroMessage";
import { AnimatePresence } from "framer-motion"


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

  const [lists, setList] = useState(set);
  const [vis, setVis] = useState(false);
  return (
    <>
      {/* {!!isSignedIn && <SignOutButton />} */}
      <div className='lg:w-2/5 w-full mx-auto border border-[#e6e7eb] border-b-transparent border-t-transparent'>
        {isSignedIn ? <PostAdd setList={setList} setVis={setVis} /> : <SignIn />}
        <AnimatePresence>
        {vis && <Error setVis={setVis} />} 
        </AnimatePresence>
        {lists.map((list, i) => <Post content={list.content} userId={list.userId} userName={list.userName} date={list.createdAt} profilePic={list.profilePic} id={list.id} key={i} />)} </div>
    </>
  )
}

