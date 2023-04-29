"use client"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from 'next/image';

function post({ content, userName, date, profilePic , userId , id }: { content: string, userName: string, date: string, profilePic: string, userId : string, id: number }) {

  dayjs.extend(relativeTime)
  let relativeDate = dayjs().to(dayjs(new Date(date)))
  return (
 <div className="flex items-center border-transparent border border-b-[#e6e7eb] py-2 justify-start w-full"  onClick={() =>{ window.location.replace(`/post/${id}`)}}>
  <a href={`/user/${userId}`}>
    <img className="w-16 h-16 ml-4 rounded-full" src={profilePic} alt={userName} />
  </a>
  <div className="pl-5 w-full">
    <div className="flex justify-between mr-4 text-lg">
      <a href={`/user/${userId}`}>
        <h1>@{userName}</h1>
      </a>
      <h1 className="text-gray-500">{relativeDate}</h1>
    </div>
    <h1 className="text-5xl">{content}</h1>
  </div>
</div>

  )
}


export default post
