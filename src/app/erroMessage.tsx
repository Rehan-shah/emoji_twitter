"use client"
import type { SetStateAction } from "react";
import { motion } from "framer-motion";
import { Dispatch, useState } from "react";
import { AnimatePresence } from "framer-motion";

function Error({setVis} : { setVis : Dispatch<SetStateAction<boolean>>}) {
    setTimeout(() =>{setVis(false)} , 2300)
  return (
    <>
     <motion.div
    initial={{y:75}}
    animate={{ y: -50}}
    exit={{ y: 75}}
    className="text-white bg-red-700 text-center rounded-lg absolute bottom-0 left-0 right-0 mx-auto py-3 text-xl w-64 z-50">
      Please input emojis only
    </motion.div>
    </>
  )
}

export const Back = () => {
    return(
      <div className="inline-block z-50 absolute m-2 text-lg ">
     <a href="/"><button className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline hover:border-black">
        <svg width="24" height="24" viewBox="0 0 16 16">
          <path d="M9 4 L5 8 L9 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
        </svg>
        <span className="mx-2 text-xl">Back</span>
      </button></a>
        </div>
    )
  }


export default Error;
