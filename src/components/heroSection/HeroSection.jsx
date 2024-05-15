import React from "react";
import heroImg from "../../assets/heroImg.jpg";

function HeroSection() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <img
          src={heroImg}
          alt="Online shopping illustration"
          className="w-full max-w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default HeroSection;
