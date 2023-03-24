"use client"

import { Post as post } from "@/db/schema"
import PostAdd from './postAdd'
import { useState } from 'react'
import Post from './post'



function PostNow({ content }: { content: string }) {

  return (
    <div className="border">{content}</div>
  )
}

export default function Home({ set }: { set: post[] }) {

  let emoji: string[] = [];
  set.forEach(((item) => {
    emoji.push(item.content)
  }))

  const [lists, setList] = useState(emoji.reverse())
  return (
    <>
      <div className='w-1/3 mx-auto border-black border mt-10'>
        <PostAdd setList={setList} />
        {lists.map((list, i) => <PostNow content={list} key={i} />)}
      </div>
    </>
  )
}
