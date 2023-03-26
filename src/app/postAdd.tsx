"use client"
import Add from "./add"
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import Img from 'next/image';

function PostAdd<T>({ setList }: { setList: T }) {
  const emojiSchema = z.string().emoji().min(1).max(280);

  const { user, isLoaded } = useUser();

  async function HandleChange() {
    let content = emojiSchema.parse(document.getElementById("content").value);
    let userName;
    (!!user?.username ? userName = user?.username : (userName = (user?.firstName + "-" + user?.lastName)));
    let product = {
      content: content,
      userName: userName,
      profilePic: user?.profileImageUrl,
      createdAt: new Date(),
      userld: user?.id
    }
    setList((preValue) => [product, ...preValue]);
    fetch("http://localhost:3000/api/mutate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content })
    }).then((e) => console.log(e))
  }

  function enterComm(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter") {
      HandleChange();
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <>
      <form onKeyDown={enterComm}>
        <div className="flex items-center justify-start">
          <Img className="w-14 h-14 ml-4 rounded-full" width={56} height={56} src={user?.profileImageUrl} />
          <div className="pt-[15px] pl-5">
            <h1>@{!!user?.username ? user?.username : user?.fullName.replace(/\s+/g, '-')}</h1>
            <textarea
              id="content"
              ng-trim="false"
              className="text-2xl text-bottom resize-none focus:outline-none"
              name="content"
              placeholder="Type here"
              onKeyDown={handleKeyPress}
              cols={30}
              rows={1}
            />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded-2xl my-3 mr-4 ml-auto block" onClick={HandleChange} type="reset"> Post </button>
      </form >
    </>
  )
}

export default PostAdd
