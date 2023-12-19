import React, { useEffect, useState } from "react";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import instance, { BASE_URL } from "../../utils/axios";
import { CiBatteryEmpty } from "react-icons/ci";
import notfound from "../../assets/notfound.jfif";

function Event1() {
  const [eventsData, setEventsData] = useState([]);
  const [eventsSearch, setEventsSearch] = useState("");
  const [filteredEventsData, setFilteredEventsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCity, setUniqueCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("lowToHigh");
  const [priceRange, setPriceRange] = useState("");

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const initialSearchQuery = queryParams.search || "";
  const selectedCategoryId = queryParams.category || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const events = await instance.get("events/user-events/");
        const categories = await instance.get("events/categories/");
        setEventsData(events.data);
        setFilteredEventsData(events.data);
        setCategoryData(categories.data);

        if (initialSearchQuery.trim() !== "") {
          const filteredEvents = events.data.filter(
            (event) =>
              event.name
                .toLowerCase()
                .includes(initialSearchQuery.toLowerCase()) ||
              event.servicer.first_name
                .toLowerCase()
                .includes(initialSearchQuery.toLowerCase()),
          );
          setFilteredEventsData(filteredEvents);
        }

        if (selectedCategoryId !== "") {
          const filteredEvents = events.data.filter(
            (event) =>
              event.category.id === parseInt(selectedCategoryId) &&
              event.is_active === true,
          );
          setFilteredEventsData(filteredEvents);
        }
      } catch (error) {
        console.error("Error fetching events or categories:", error);
      }
    }
    fetchData();
  }, [initialSearchQuery, selectedCategoryId]);

  const fetchUniqueCity = async () => {
    try {
      const response = await instance.get("events/user-locations/");
      setUniqueCity(response.data.city);
    } catch (error) {
      console.error("Error fetching unique location:", error);
    }
  };

  useEffect(() => {
    fetchUniqueCity();
  }, []);

  const handleEventsSearchChange = (event) => {
    setEventsSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    if (selectedValue === "") {
      const activeEvents = eventsData.filter(
        (event) => event.is_active === true,
      );
      setFilteredEventsData(activeEvents);
    } else {
      const filteredEvents = eventsData.filter(
        (event) =>
          event.category.id === parseInt(selectedValue) &&
          event.is_active === true,
      );
      setFilteredEventsData(filteredEvents);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (eventsSearch.trim() === "") {
      setFilteredEventsData(eventsData);
    } else {
      const filteredEvents = eventsData.filter(
        (event) =>
          event.name.toLowerCase().includes(eventsSearch.toLowerCase()) ||
          event.servicer_name
            .toLowerCase()
            .includes(eventsSearch.toLowerCase()),
      );
      setFilteredEventsData(filteredEvents);
    }
  };

  const handleCityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);

    if (selectedValue === "") {
      setFilteredEventsData(eventsData);
    } else {
      const filteredEvents = eventsData.filter(
        (event) => event.servicer.city === selectedValue,
      );
      setFilteredEventsData(filteredEvents);
    }
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);
    let sortedEvents = [...filteredEventsData];
    if (selectedValue === "lowToHigh") {
      sortedEvents.sort((a, b) => a.starting_price - b.starting_price);
    } else if (selectedValue === "highToLow") {
      sortedEvents.sort((a, b) => b.starting_price - a.starting_price);
    }
    setFilteredEventsData(sortedEvents);
  };

  const handlePriceRangeChange = (event) => {
    const selectedValue = event.target.value;
    setPriceRange(selectedValue);
    let filteredEvents = [...eventsData];
    if (selectedValue === "0-100") {
      filteredEvents = filteredEvents.filter(
        (event) => event.starting_price < 100,
      );
    } else if (selectedValue === "100-500") {
      filteredEvents = filteredEvents.filter(
        (event) => event.starting_price >= 100 && event.starting_price <= 500,
      );
    } else if (selectedValue === "500-1500") {
      filteredEvents = filteredEvents.filter(
        (event) => event.starting_price >= 500 && event.starting_price <= 1500,
      );
    } else if (selectedValue === "1500-2000") {
      filteredEvents = filteredEvents.filter(
        (gig) => event.starting_price >= 15000 && event.starting_price <= 20000,
      );
    } else if (selectedValue === "2000-above") {
      filteredEvents = filteredEvents.filter(
        (event) => event.starting_price >= 2000,
      );
    }
    setFilteredEventsData(filteredEvents);
  };

  return (
    <div>
      <Navbar1 className="fixed top-0 w-full bg-white shadow-md z-50" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <form className="flex items-center" onSubmit={handleSearch}>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-white border border-customColorA text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search Servicers"
                required
                value={eventsSearch}
                onChange={handleEventsSearchChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-serif text-black bg-customColorA rounded-lg border border-customColorA hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              Search
            </button>
          </form>

          <div className="flex flex-wrap mt-5">
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="outline-none font-serif focus:outline-none border px-3 py-1 bg-customColorD rounded-sm flex items-center w-full"
              >
                <option value="">All Categories</option>
                {categoryData &&
                  categoryData
                    .filter((category) => category.is_active)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
              <select
                onChange={handleCityChange}
                value={selectedCity}
                className="outline-none font-serif focus:outline-none border px-3 py-1 bg-customColorD  rounded-sm flex items-center w-full"
              >
                <option value="">All Locations</option>
                {uniqueCity &&
                  uniqueCity.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
              <select
                onChange={handleSortChange}
                value={sortBy}
                className="outline-none focus:outline-none border font-serif px-1 py-1 bg-customColorD rounded-sm flex items-center w-full"
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
              <select
                onChange={handlePriceRangeChange}
                value={priceRange}
                className="outline-none  font-serif focus:outline-none border px-3 py-1 bg-customColorD rounded-sm flex items-center w-full"
              >
                <option value="">Price Range: Any</option>
                <option value="0-5000">Below ₹100</option>
                <option value="5000-10000">₹100 - ₹500</option>
                <option value="10000-15000">₹500 - ₹1500</option>
                <option value="15000-20000">₹1500 - ₹2000</option>
                <option value="20000-above">₹2000 and above</option>
              </select>
            </div>
          </div>
        </div>

        {filteredEventsData.length === 0 ? (
          <div className="col-span-1  my-6 flex justify-center items-center">
            <img
              src={notfound}
              alt="Image"
              className="w-full h-auto max-w-lg"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {filteredEventsData
              .filter((event) => event.is_active === true)
              .map((event) => (
                <div
                  key={event.id}
                  className="w-full bg-customColorD rounded-lg p-4 flex flex-col justify-center items-center"
                >
                  <Link to={`/single-view/${event.id}`}>
                    <div className="mb-2">
                      <img
                        className="object-center object-cover rounded-xl h-56 w-80"
                        src={`${event.image}`}
                        alt={event.name}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg text-green-500 font-serif">
                        {event.name}
                      </p>
                      <p className="text-sm text-customColorA font-serif">
                        {event.category.name}
                      </p>
                    </div>
                    <div className="mt-2 text-base text-gray-600 font-serif w-80 sm:w-64 md:w-80">
                      <p className="mb-3 text-black">{event.description}</p>
                      <div className="flex flex-wrap justify-between">
                        <p className="w-1/2 text-black">
                          {" "}
                          ₹{event.price_per_person}/person
                        </p>
                        <div className="w-1/2 flex bg-customColorA rounded-xl">
                          <p className="mx-12 font-serif text-sm text-white">
                            <p className="text-black">
                              {" "}
                              {event.is_veg ? "Vegitarian" : "Veg&NonVeg"}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
export default Event1;
