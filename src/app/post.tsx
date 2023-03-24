

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

function post({ content, userName, date, profilePic }: { content: string, userName: string, date: Date, profilePic: string }) {

  dayjs.extend(relativeTime)
  let relativeDate = dayjs().to(dayjs(date)) // "31 years ago"
  return (

    <div className="w-1/3 border border-black mx-auto mb-auto py-2">
      <div className="flex items-center justify-start w-full">
        <img className="w-14 h-14 ml-4 rounded-full" src={profilePic} />
        <div className="pl-5 w-full">
          <div className="flex justify-between mr-4"> <div><h1>@{userName}</h1></div><div><h1 className="text-gray-500">{relativeDate}</h1></div></div>
          <h1 className="text-4xl">{content}</h1>
        </div>
      </div>
    </div>
  )
}


export default post
