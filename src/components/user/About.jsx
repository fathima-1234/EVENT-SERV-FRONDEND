import React from 'react';
import aboutImage from '../../assets/about.png';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4  bg-customColorD">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img src={aboutImage} className="w-full rounded-lg bg-black cover-black" alt="About Us" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold  font-Playball mb-4">ABOUT US</h2>
          <p className="text-lg mb-6 text-gray-600 font-serif">
            Trusted By 200 + satisfied clients. Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore eit esdioilore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullaemco laboeeiris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor iesdein reprehendeerit in voluptate velit esse cillum dolore.
          </p>
          <ul className="list-disc pl-6 mb-6 font-serif">
            <li>Fresh and Fast food Delivery</li>
            <li>24/7 Customer Support</li>
            <li>Easy Customization Options</li>
            <li>Delicious Deals for Delicious Meals</li>
          </ul>
          <a href="#" className="btn bg-customColorA py-3 font-serif px-5 rounded-full inline-block">
            Read More <i className="fas fa-arrow-right ps-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

