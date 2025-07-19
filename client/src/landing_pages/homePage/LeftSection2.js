import React, { useRef, useEffect, useState } from "react";
import Emergency3 from "./images/21683294_Team of emergency doctors doing cardiopulmonary resuscitation.jpg";
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
      <div className="grid grid-cols-2 gap-4 px-20 ">
        <div>
          <img src={Emergency3} alt="img" className="w-3/4 rounded-lg" />
        </div>
        <div className="py-20 text-lg">
          <h3 className="">Medical Emergency Alert :</h3>
          <p className="font-light mt-4">
            A student has reported a sudden health issue and requires immediate
            assistance.
            <br />
            Live location has been shared for quicker response.
            <br />
            Medical team has been notified and is on the way.
            <br />
            Stay calm — help is on the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
