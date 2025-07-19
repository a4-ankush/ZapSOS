import React from "react";
import "./Home.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import LeftSection2 from "./LeftSection2";
import RightSection2 from "./RightSection2";

const Home = () => {
  return (
    <div className="px-6">
      <div className="animated-gradient-bg p-3 rounded-2xl mt-8">
        <h1 className="text-9xl font-extrabold text-center mt-32 fade-in zapsos-glow">
          Zap<span className="sos-gradient">SOS</span>
        </h1>
        <p className="text-2xl font-normal text-center mt-5 mb-56 fade-in">
          “<span className="text-red-500">Emergency</span> Help. In a Zap!”
        </p>
        <div className="grid grid-cols-3 gap-96 text-center ">
          <div>You</div>
          <div className="text-xl">Your SOS in a Zap !</div>
          <div>Helpers</div>
        </div>

        <hr className="blue-glow-hr" />
      </div>
      <div>
        <div className="mt-24">
          <LeftSection />
          <RightSection />
          <LeftSection2 />
          <RightSection2 />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
