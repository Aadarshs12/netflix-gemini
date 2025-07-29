"use client";

import { FaPlay } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="absolute h-screen top-0 left-0 z-10 w-full pt-32 md:pt-48 px-4 md:px-10 text-white bg-gradient-to-r from-black to-transparent">
      <h1 className="text-3xl w-4/5 line-clamp-1 md:text-5xl lg:text-6xl font-bold">
        {original_title}
      </h1>
      <p className="text-base line-clamp-3 mb-5 text-white text-opacity-75 md:text-lg py-4 md:py-6 w-full md:w-3/4 lg:w-7/12">
        {overview}
      </p>
      <div className="flex gap-4 md:gap-6 items-center">
        <button className="bg-white py-2 px-4 md:px-8 flex gap-1 items-center text-black  rounded-lg hover:bg-opacity-70 transition">
          <FaPlay /> Play
        </button>
        <button className="bg-[#374151] py-2 px-4 md:px-8 flex gap-1 items-center text-black  rounded-lg bg-opacity-70 hover:bg-opacity-80 transition">
          <FaInfoCircle /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
