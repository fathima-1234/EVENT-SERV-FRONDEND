import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance, { BASE_URL } from "../../utils/axios";
import "./loader.css";
function Servicercard1() {
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await instance.get("events/categories/");

        setCategoryData(categories.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/home-list-event?category=${categoryId}`);
  };

  console.log("categories: ", categoryData);

  return (
    <div className="w-full">
      {/* <h1 className='text-center py-12 text-xl font-serif'> Our Events</h1> */}

      <h1 className="text-3xl mb-[70px] text-center py-12 ">What We Offer</h1>
      {Array.isArray(categoryData) && categoryData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categoryData.map((category) => (
            <div
              key={category.id}
              className="w-full bg-black rounded-lg p-12 flex flex-col justify-center items-center black-cover"
              style={{
                // backgroundImage: `url(${BASE_URL}${category.image})`,
                backgroundImage: `url(${category.image})`,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="mb-8"></div>
              <div className="text-center relative">
                <p className="text-xl text-white font-serif mb-2">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        //     {categoryData.map((category) => (
        //   console.log('category.image:', category.image)
        // ))}
        <p className="text-center font-serif text-customColorA ">Loading...</p>
      )}

      <div className="text-center mb-10">
        <Link
          to="/home-list-event"
          className="p-2 overflow-hidden rounded-md bg-customColorA hover:bg-customColorD text-sm font-serif text-black"
        >
          See All Events
        </Link>
      </div>
    </div>
  );
}

export default Servicercard1;
