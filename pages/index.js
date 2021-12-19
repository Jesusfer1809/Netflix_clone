import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

import requests from "../helpers/requests";

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div className=" relative pb-8 bg-black bg-opacity-100">
      <Navbar />

      <Banner />

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
