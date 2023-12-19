import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance, { BASE_URL } from "../../utils/axios";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";

function Menu() {
  const [menuData, setMenuData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const menu = await instance.get("events/menu/");

        setMenuData(menu.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <Navbar1 />

      <h1 className="text-center py-12 text-3xl font-Playball"> Our Menus</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {menuData.map((menu) => (
          <div key={menu.id} className="bg-white rounded-lg p-6 shadow-md">
            <img
              src={`${menu.image}`}
              alt={menu.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <div className="text-center ">
              <p className="text-xl text-black font-serif mb-2">{menu.name}</p>
              <p className="text-sm text-gray-300 font-serif">
                {menu.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Menu;
