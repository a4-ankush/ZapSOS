import React, { useRef, useEffect, useState } from "react";

import Emergency4 from "./images/2210.i126.079.F.m005.c9.evacuation.jpg";
import "./Home.css";

const RightSection = () => {
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
      className={`px-6 text-center py-16 fade-in-section${
        isVisible ? " fade-in" : ""
      }`}
    >
      <div className="grid grid-cols-2 gap-4 px-20 ">
        <div className="py-20 text-lg">
          <h3 className=""> Fire Emergency Alert :</h3>
          <p className="font-light mt-4">
            A fire incident has been reported on campus.
            <br />
            The location has been shared with emergency responders.
            <br />
            Evacuation in progress — avoid the affected area.
            <br />
            Stay alert and await further instructions.
          </p>
        </div>
        <div>
          <img src={Emergency4} alt="img" className="w-11/12 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
