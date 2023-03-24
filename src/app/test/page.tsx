import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import Post from "@/app/post"

function test() {

  dayjs.extend(relativeTime)
  let placeholder = {
    userName: 'Rehan Shah',
    content: "😂😂😂",
    date: new Date(),
    profilePick: "https://images.clerk.dev/oauth_github/img_2NRYKZV6hDY4BWq1iUhXnCzrLHx.png"
  }

  return (
    <div>
      <Post content={placeholder.content} userName={placeholder.userName} date={placeholder.date} profilePic={placeholder.profilePick} />
    </div>
  )
}


export default test 
