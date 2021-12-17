import Head from "next/head";
import alpes from "../public/alpes.jpg";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Animated } from "react-animated-css";

export default function Home() {
  const [hiding, setHiding] = useState(true);
  const [contentHeight, setContentHeight] = useState("0px");

  const content = useRef(null);

  const [contentWidth, setContentWidth] = useState(null);

  useEffect(async () => {
    const xd = async () => {
      await setContentWidth(content.current.scrollWidth);
    };

    await xd();
    console.log(contentWidth);
  }, []);

  const toggleShowContent = () => {
    setHiding(!hiding);
    setContentHeight(hiding ? "0px" : `${content.current.scrollHeight}px`);
    console.log(content.current.scrollHeight);
  };

  return (
    <div className="container mx-auto mt-5">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            Tailwind CSS
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            id="boton"
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={toggleShowContent}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          id="menu"
          ref={content}
          className={`w-full block flex-grow overflow-hidden max-h-${
            hiding ? "0" : "44"
          }  transition-all duration-500 lg:flex lg:items-center lg:w-auto lg:max-h-44  `}
        >
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Download
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

/*
<div className="container w-full  sm:w-1/2 lg:w-1/3  shadow-slate-500 shadow-md rounded-md ">
        <Image src={alpes} />

        <div className=" p-6 sm:p-5">
          <h2 className=" text-2xl mb-6 font-medium">The Coldest Sunset</h2>

          <p className=" text-base mb-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          <div className="flex justify-around">
            <div className="bg-neutral-300 text-sm rounded-full px-3 py-1">
              #photography
            </div>
            <div className="bg-neutral-300 text-sm rounded-full px-3 py-1">
              #travel
            </div>
            <div className="bg-neutral-300 text-sm rounded-full px-3 py-1">
              #winter
            </div>
          </div>
        </div>
      </div>
*/
