"use client"
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import Img from 'next/image';
import { SetStateAction } from "react";


function PostAdd({ setList, setVis }: { setList: React.Dispatch<SetStateAction<any>>, setVis: React.Dispatch<SetStateAction<boolean>> }) {
  const emojiSchema = z.string().emoji().min(1).max(280);

  const { user, isLoaded } = useUser();

  async function HandleChange() {
    try {
      let content;
      let element = document.getElementById("content");
      if (element instanceof HTMLTextAreaElement) {
        content = emojiSchema.parse(element.value);
      }

      let userName;
      (!!user?.username ? userName = user?.username : (userName = (user?.firstName + "-" + user?.lastName)));
      let product = {
        content: content,
        userName: userName,
        profilePic: user?.profileImageUrl,
        createdAt: new Date(),
        userld: user?.id
      }
      setList((preValue: any) => [product, ...preValue]);
      fetch("/api/mutate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content })
      }).then((e) => console.log(e))
    } catch {
      setVis(true);
      setTimeout(() => { setVis(false) }, 3000)
    }
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
      <div className=" rounded-b-3xl mx-auto  px-10 py-6 shadow" style={{ boxShadow: "0px 4px 10px 2px rgba(0,0,0,0.1)" }}>
        <div className="flex  items-center">
          <img className=" w-14 h-14 rounded-full" width={56} height={56} alt="profilepic" src={user?.profileImageUrl as string} />
          <h1 className="ml-4 text-xl">@{!!user?.username ? user?.username : user?.fullName?.replace(/\s+/g, '-')}</h1>
        </div>
        <form className="mt-4" onKeyDown={enterComm}>
          <textarea
            id="content"
            ng-trim="false"
            className="text-3xl text-bottom resize-none focus:outline-none "
            name="content"
            placeholder="Type here"
            onKeyDown={handleKeyPress}
            cols={10}
            rows={1}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-8 rounded-3xl my-3 mr-4 ml-auto block" onClick={HandleChange} type="reset"> Post </button>
        </form >
      </div>

    </>
  )
}

export default PostAdd
