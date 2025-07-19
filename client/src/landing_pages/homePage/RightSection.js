import React, { useRef, useEffect, useState } from "react";

import Emergency2 from "./images/9016137_4070895.jpg";
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
          <h3 className="">Harassment Alert Issued :</h3>
          <p className="font-light mt-4">
            A student has reported an incident of harassment on campus.
            <br />
            Real-time location and message details have been shared with
            authorities.
            <br />
            Your safety matters — our team is taking immediate action.
            <br />
            Stay aware. Stay safe. Speak up when it counts.
          </p>
        </div>
        <div>
          <img src={Emergency2} alt="img" className="w-2/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
