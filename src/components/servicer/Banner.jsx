import React from "react";
import bannerimage from "../../assets/bannerimage.jpeg"; // Replace this with the actual image URL or import the image
import "./Banner.css"; // Import the CSS file for the Banner component
import { Link } from "react-router-dom";

const Banner = () => {
  const name = JSON.parse(localStorage.getItem("user")).name;
  return (
    <div className="custom-banner relative w-full ">
      {/* Banner Image */}
      <img
        src={bannerimage}
        alt="Banner"
        className="custom-banner-image w-1/2"
      />

      {/* Overlay */}
      <div className="custom-banner-overlay absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>

      {/* Content */}
      <div className="custom-banner-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="custom-banner-heading text-4xl font-serif mb-4">
          Welcome to Your Servicer Dashboard, {name}
        </h1>
        <p className="custom-banner-text text-lg mb-4">
          Start managing your event listings and bookings now!
        </p>
        <Link
          to="/eventservicer"
          className=" px-6 py-3 mt-8 bg-customColorA text-black font-serif rounded-lg hover:bg-customColorD transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Banner;
