import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black bg-customColorD">
      <div>
        <h1 className="w-full text-3xl font-bold text-customColorA font-Playball">
          EventServ
        </h1>
        <p className="py-4">
          When it comes to food, I am strongly opinionated and don't mind
          sharing them. - Anthony Bourdain
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare className="text-customColorA" size={30} />
          <FaInstagram className="text-customColorA" size={30} />
          <FaTwitterSquare className="text-customColorA" size={30} />
          <FaGithubSquare className="text-customColorA" size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6 font-serif">
        <div>
          <h6 className="font-medium text-black">Special Facilities</h6>
          <ul>
            <li className="py-2 text-sm">Cheese Burger</li>
            <li className="py-2 text-sm">Sandwitch</li>
            <li className="py-2 text-sm">Paneer Burger</li>
            <li className="py-2 text-sm">Sweets</li>
          </ul>
        </div>
        {/* <div>
          <h6 className='font-medium text-black'>Services</h6>
          <ul>
            <li className='py-2 text-sm'>Pricing</li>
            <li className='py-2 text-sm'>Documentation</li>
            <li className='py-2 text-sm'>Guides</li>
            <li className='py-2 text-sm'>API Status</li>
          </ul>
        </div> */}
        <div>
          <h6 className="font-medium text-black">Company</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Blog</li>
            <li className="py-2 text-sm">Jobs</li>
            <li className="py-2 text-sm">Press</li>
            <li className="py-2 text-sm">Careers</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-black">Contact Us</h6>
          <ul>
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
