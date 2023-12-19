import React, { useState } from "react";
import { BASE_URL } from "../../utils/axios";

// import React, { useState } from 'react';

const EventCarousel = ({ event }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageUrls = [event.image, event.image1, event.image2].map(
    (imageUrl) => {
      if (imageUrl) {
        // Check if the URL is already absolute (starts with http or https)
        if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
          return imageUrl; // Use the absolute URL as is
        } else {
          // Otherwise, prepend your base URL to the relative image path
          return `${BASE_URL}${imageUrl}`;
        }
      }
      // Handle the case where imageUrl is undefined (or any other non-string value)
      return null; // You can return a default or handle this as needed
    },
  );

  const handleNextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage < imageUrls.length - 1 ? prevImage + 1 : 0,
    );
  };

  const handlePrevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage > 0 ? prevImage - 1 : imageUrls.length - 1,
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36 ml-[120px] items-center">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-80 sm:h-96 rounded-lg w-[1000px] bg-gray-100 mb-4 relative hover:scale-105 duration-300">
            <img
              src={imageUrls[currentImage]}
              alt={`Image ${currentImage}`}
              className="h-80 sm:h-96 w-full object-cover rounded-lg bg-gray-100 mb-4"
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
              <button
                className="bg-white text-black hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={handlePrevImage}
              >
                &lt;
              </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
              <button
                className="bg-white text-black hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={handleNextImage}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
