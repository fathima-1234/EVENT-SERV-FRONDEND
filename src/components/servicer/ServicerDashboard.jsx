import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";
import { Button, Input } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ServicerBookings() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userID;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.userID) {
      setUser(userData.userID);
      getBookings(userData.userID);
    }
  }, []);

  async function getBookings(userId) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const response = await instance.get(
        `api/stripe/servicerbookings/?user=${userId}`,
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Could not fetch data", error);
      console.error("API error response:", error.response);
    }
  }

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      booking?.event?.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return filteredBookings;
  };

  const filteredBookings = handleSearch();

  const calculateBookingCounts = () => {
    const bookingCounts = filteredBookings.reduce((acc, booking) => {
      const eventName = booking.event.name;

      if (acc[eventName]) {
        acc[eventName]++;
      } else {
        acc[eventName] = 1;
      }

      return acc;
    }, {});

    return Object.keys(bookingCounts).map((eventName) => ({
      eventName,
      bookingCount: bookingCounts[eventName],
    }));
  };

  const bookingCountsData = calculateBookingCounts();

  return (
    <div className="">
      <Sidebar />
      <div className="flex h-full bg-acontent mt-3">
        <Toaster position="top-center" reverseOrder={false} limit={1} />

        <div className="px-5 w-full h-auto min-h-screen font-serif mx-5 mt-2 py-8  flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
          <div className="w-full h-screen px-3 ">
            {/* Bar chart for the number of bookings per event */}
            <div className="overflow-hidden rounded-lg border border-gray-200  shadow-md m-5">
              <h2 className="text-2xl mb-2 text-black">
                Number of Bookings per Event
              </h2>
              <BarChart width={800} height={400} data={bookingCountsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookingCount" fill="#e0e0e0" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
