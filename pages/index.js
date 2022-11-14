import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

import requests from "../helpers/requests";
import { auth } from "../helpers/firebase";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/actions/userAction";

import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const carouselRef = useRef(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (user) {
    return (
      <motion.div className={`relative pb-8 bg-opacity-100 bg-neutral-900`}>
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />

        <Banner />

        <div className="-mt-40 z-20 relative">
          <Row
            title="NETFLIX ORIGINALS"
            fetchURL={requests.fetchNetflixOriginals}
            isLargeRow
          />

          <Row title="Trending Now" fetchURL={requests.fetchTrending} />

          <Row title="Top Rated" fetchURL={requests.fetchTrending} />

          <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />

          <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />

          <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />

          <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />

          <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="h-screen relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 30%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.7) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/3679b63e-5d92-47a1-96ec-b26d86fc0f0a/d78af455-3db4-46ba-bf30-626909f337ea/PE-es-20211213-popsignuptwoweeks-perspective_alpha_website_medium.jpg)`,
      }}
    ></div>
  );
};

export default Home;
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
