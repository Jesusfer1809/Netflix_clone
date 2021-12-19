import React from "react";

function login() {
  return (
    <div
      className="h-screen relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 30%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.7) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/3679b63e-5d92-47a1-96ec-b26d86fc0f0a/d78af455-3db4-46ba-bf30-626909f337ea/PE-es-20211213-popsignuptwoweeks-perspective_alpha_website_medium.jpg)`,
      }}
    >
      <div className="flex justify-between items-center px-10">
        <img src="/logo.png" className=" h-32 object-cover " />

        <button
          className=" px-4 py-2  font-semibold text-white rounded-sm"
          style={{
            backgroundColor: "#DE0611",
          }}
        >
          Sign In
        </button>
      </div>

      <div className="text-white w-full px-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center ">
        <h1 className=" text-5xl block mb-8 font-bold">
          Unlimited movies, TV shows, and more.
        </h1>

        <h2 className=" text-3xl block mb-4 font-semibold">
          Watch anywhere. Cancel anytime.
        </h2>

        <h3 className=" text-lg block mb-8 font-medium">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>

        <form>
          <input
            type="email"
            placeholder="Email address"
            className=" w-1/3 py-3 px-3 outline-none text-slate-900"
          />

          <button
            className=" px-6 py-3  font-semibold text-white"
            style={{
              backgroundColor: "#DE0611",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
