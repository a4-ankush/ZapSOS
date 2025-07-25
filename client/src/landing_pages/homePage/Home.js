import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import LeftSection2 from "./LeftSection2";
import RightSection2 from "./RightSection2";
import { BsStars } from "react-icons/bs";

const Home = () => {
  return (
    <div className="px-6">
      <div className="animated-gradient-bg-1 p-3 rounded-2xl mt-8">
        <h1 className=" h1-size text-9xl font-extrabold text-center mt-32 fade-in zapsos-glow">
          Zap<span className="sos-gradient">SOS</span>
        </h1>
        <p className="text-2xl font-normal text-center mt-5 mb-56 fade-in">
          “<span className="text-red-500">Emergency</span> Help. In a Zap!”
        </p>
        <div className="grid grid-cols-3 gap-96 text-center ">
          <div>You</div>
          <div className="text-xl">
            Your <span className="text-red-500">SOS</span> in a Zap !
          </div>
          <div>Helpers</div>
        </div>

        <hr className="blue-glow-hr" />
      </div>
      <Link to="/zapai">
        <div className=" animated-gradient-bg flex flex-col  items-center justify-center mt-10  text-black bg-white h-44 rounded-2xl shadow-lg ">
          <BsStars className="text-3xl  text-purple-500" />
          <h1 className="text-6xl fade-in">
            try
            <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x">
              {" "}
              ZapAI
            </span>{" "}
            now !
          </h1>
        </div>
      </Link>

      <div>
        <div className="mt-10">
          <LeftSection />
          <RightSection />
          <LeftSection2 />
          <RightSection2 />
        </div>
      </div>
      <div className="text-center py-10">
        <Link
          to="/student"
          className=" mt-10 bg-red-600 p-3 rounded-md text-lg font-semibold text-white hover:bg-red-700 transition-all duration-300 ease-out shadow-lg hover:scale-105 hover:shadow-2xl"
        >
          Send SOS Now!
        </Link>
        <p className="text-2xl p-3 text-white mt-4">
          "ZapSOS: Because Every Second Matters."
        </p>
      </div>
    </div>
  );
};

export default Home;
