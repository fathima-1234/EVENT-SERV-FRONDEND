import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Navbar1 from "./Navbar1";
import instance from "../../utils/axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import "./loader.css";
import Footer from "./Footer";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateAvailabilityStatus, setDateAvailabilityStatus] = useState("");

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showDate, setShowDate] = useState(false);

  const [bookedSlot, setBookedSlot] = useState([]);
  const navigate = useNavigate();

  const [numberOfMembers, setNumberOfMembers] = useState(1); // Updated state for number of members
  const [requirements, setRequirements] = useState(""); // Updated state for requirements

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [menus, setMenus] = useState([]);

  const [userDetails, setUserDetails] = useState({
    email: "",
  });
  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserDetails({
      email: storedUser.email || "",
    });
  }, []);

  async function getSlotsForEvent(eventId) {
    try {
      const response = await instance.get(`events/slots/${eventId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch slots:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please login first");
        navigate("/login"); // Redirect to your login page route
      }
    }
  }

  useEffect(() => {
    async function getEventDetails() {
      try {
        const response = await instance.get(`events/single-event/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvent(response.data);
        console.log(response.data);
        const slotsData = await getSlotsForEvent(response.data.id);
        setSlots(slotsData);
        const menusData = await getMenus();
        setMenus(menusData);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect to your login page route
        }
      }
      setLoading(false);
    }

    async function getMenus() {
      try {
        const response = await instance.get("events/menu/");
        return response.data;
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    }

    getEventDetails();
  }, [id]);

  const handleNumberOfMembersChange = (event) => {
    const value = event.target.value || 0; // Use 0 as a default value if it's undefined or null
    setNumberOfMembers(Number(value));
  };

  const handleRequirementsChange = (event) => {
    setRequirements(event.target.value);
  };

  const handleChange = async (e) => {
    setDate(e.target.value);
    const selected = slots.filter((slot) => slot.date === e.target.value);
    setSelectedSlots(selected);

    if (selected.length > 0) {
      setDateAvailabilityStatus("Date available");
    } else {
      setDateAvailabilityStatus("Servicer slot not available.");
    }
  };
  useEffect(() => {
    console.log(selectedSlots.length);
  }, [selectedSlots]);

  const toggleDate = () => {
    setShowDate(true);
  };

  const handleClick = (id) => {
    console.log();
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      buttonElement.classList.toggle("bg-blue-500");
      buttonElement.classList.toggle("bg-green-500");
    }
    console.log(selectedSlots, "selected");
    const bookedslot = selectedSlots?.filter((selected) => selected.id === id);
    console.log(bookedslot, "booked slot");

    setBookedSlot(bookedslot);
  };

  const fetchData = async () => {
    if (showDate && date) {
      const slotsData = await getSlotsForEvent(event.id);
      console.log(slotsData);
      setSlots(slotsData);
      const selected = slotsData.filter((slot) => slot.date === date);
      setSelectedSlots(selected);
    }
  };

  const handleMenuChange = (menuId) => {
    const isSelected = selectedMenus.includes(menuId);
    if (isSelected) {
      setSelectedMenus(selectedMenus.filter((id) => id !== menuId));
    } else {
      setSelectedMenus([...selectedMenus, menuId]);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await instance.post(
        "api/stripe/confirm-booking/",
        {
          eventId: event.id,
          selectedSlots: selectedSlots.map((slot) => slot.id),
          numberOfMembers: numberOfMembers,
          requirements: requirements,
          // Add other necessary data
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      toast.success(
        "Booking confirmed successfully,For confirm the order do the payment",
      );

      setShowDate(false);
      setSelectedSlots([]);
      setDate("");
      setTimeout(() => {
        navigate(`/mybookings`);
      }, 3000);
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      toast.error("Failed to confirm booking");
    }
  };

  return (
    <div className="w-full h-full  relative">
      <Toaster position="top-center" limit={3} />
      <div className="w-full h-20 flex items-center bg-primaryBlue text-white">
        <Navbar1 />
      </div>
      <div className="p-5 w-full h-full min-h-screenflex flex-col items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center align-center h-full">
            <div class="jelly  flex items-center justify-center align-center"></div>{" "}
          </div>
        ) : event ? (
          <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-2 gap-6">
            <div className="relative group col-span-2 md:col-span-1">
              <img
                className="w-full h-75 object-cover rounded-md"
                src={event.image}
                alt="event_image"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <h1 className="text-4xl font-Playball text-green-600">
                  {event.name}
                </h1>
                <p className="text-xl font-normal text-blue-600 mt-2">
                  {"₹ " + event.price_per_person + "/ per day"}
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-0 text-center col-span-2 md:col-span-1">
              <h1 className="text-3xl font-semibold text-green-600">
                {event.name}
              </h1>
              <p className="text-gray-300 mt-2 mb-6 font-serif">
                {event.description}
              </p>
              <div className="font-serif">
                <p className="text-gray-600">category: {event.category.name}</p>

                <p className="text-gray-600">
                  Year Manufactured: {event.year_manufactured}
                </p>

                <p className="text-gray-600">
                  Seating Capacity: {event.seating_capacity}
                </p>
                <p className="text-gray-600">
                  Servicer name: {event.servicer_name}
                </p>
                <p className="text-gray-600">
                  veg/nonveg: {event.is_veg ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif text-primaryBlue">Menus:</p>
                <ul className="flex text-center">
                  {menus.map((menu) => (
                    <li
                      key={menu.id}
                      className="text-gray-600 mr-4 font-serif border-customColorA border-s bg-slate-100 rounded-xl"
                    >
                      {menu.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col bg-customColorD items-center justify-center mt-4 mx-auto max-w-[600px] font-serif">
              <div className="card">
                <h5 className="mt-1 text-slate-500 text-center">
                  {" "}
                  Number of EventMembers:
                </h5>
                <input
                  type="number"
                  value={numberOfMembers}
                  onChange={handleNumberOfMembersChange}
                  min="1"
                  className="mt-3 border-slate-50 border-2 rounded-md py-2 px-4"
                />
              </div>

              <div className="mb-4 card font-serif">
                <input
                  placeholder="Enter your requirements here..."
                  type="text"
                  value={requirements}
                  onChange={handleRequirementsChange}
                  className="mt-3 border-slate-50 border-2 rounded-md py-20 px-28"
                />
              </div>

              {!showDate ? (
                <button
                  className="bg-customColorA text-white py-2 px-10 font-serif rounded-md ms-1 mt-2"
                  onClick={() => {
                    if (!numberOfMembers || !requirements) {
                      toast.error(
                        "Please select both number of members and requirements",
                      );
                    } else {
                      toggleDate();
                    }
                  }}
                >
                  Book Now!
                </button>
              ) : (
                <div className="mb-4">
                  <h5 className="mt-1">Select Event Date</h5>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-3 border-gray-300 border-2 rounded-md py-2 px-3"
                  />
                  <h5 className="mt-1 font-serif text-red-200 text-xl">
                    {dateAvailabilityStatus}
                  </h5>
                </div>
              )}

              {showDate && selectedSlots?.length > 0 && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 mt-3">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex place-content-end">
                      <AiOutlineCloseCircle
                        className="text-end text-gray-500"
                        onClick={() => {
                          setShowDate(false);
                          setSelectedSlots([]);
                          setDate("");
                        }}
                      />
                    </div>

                    <h5 className="mt-1 font-serif text-xl">Date available:</h5>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {selectedSlots.map((slot) => {
                        const startTime = slot.date;

                        return (
                          <button
                            key={slot.id}
                            className={`bg-customColorD text-black py-2 px-4 rounded-md shadow-2xl ${
                              slot.is_booked
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            id={slot.id}
                            onClick={() =>
                              !slot.is_booked && handleClick(slot.id)
                            }
                            disabled={slot.is_booked}
                          >
                            {slot.is_booked ? "Booked" : slot.date}
                          </button>
                        );
                      })}
                    </div>

                    <div className="w-full flex place-content-center">
                      <button
                        className={`bg-yellow-500 text-black py-2 px-4 rounded-md border-black mt-4 ${
                          selectedSlots.every((slot) => slot.is_booked) || !date
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        onClick={() => handleConfirmBooking()}
                        disabled={
                          selectedSlots.every((slot) => slot.is_booked) || !date
                        }
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Link
                to={`/chat`}
                className="bg-green-500 text-white py-2 px-4 rounded-md ms-1 mt-2"
              >
                Chat with Servicer
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl font-semibold text-primaryBlue mt-4">
              Event not found
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EventDetail;
