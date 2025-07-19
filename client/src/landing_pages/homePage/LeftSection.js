import React, { useRef, useEffect, useState } from "react";
import Emergency1 from "./images/26763275_2108.i201.031.S.m004.c13.car accidents isometric.jpg";
import "./Home.css";

const LeftSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`px-6 text-center fade-in-section${
        isVisible ? " fade-in" : ""
      }`}
    >
      <div className="text-4xl font-bold mb-10 text-center">
        <h4>
          From emergency to response — ZapSOS bridges the gap with technology.
        </h4>
        <p className="font-normal mt-10 ">For Emergency Situations Like :</p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-20 ">
        <div>
          <img src={Emergency1} alt="img" className="w-3/4 rounded-lg" />
        </div>
        <div className="py-20 text-lg">
          <h3 className="">Road Accident Reported Nearby :</h3>
          <p className="font-light mt-4">
            Every second matters when lives are at risk.
            <br />
            A student has triggered an SOS after witnessing a severe road
            collision.
            <br />
            Real-time location has been sent to campus authorities.
            <br />
            Help is on the way — stay alert, stay responsible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
