import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance, { BASE_URL } from "../../utils/axios";

import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "./Events.css";

function Event() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); // Increase the number of posts per page for better visibility

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentEvents = events.slice(firstPostIndex, lastPostIndex);

  async function getEvents() {
    const response = await instance.get("events/event/");
    setEvents(response.data);
  }

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await instance.get("events/home-list-event/");
        setEvents(response.data);
      } catch (error) {}
    }
    getEvents();
  }, []);

  const statusChange = (id) => {
    instance.get(`events/block-event/${id}`).then(() => getEvents());
  };

  const options = [
    { value: 0, label: "All" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Pending" },
  ];

  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />

      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-serif flex flex-col place-content-start place-items-center bg-customColorD shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-serif">
          <div className="w-full p-5">
            <input
              type="text"
              placeholder="Search by name "
              className="border-b-2 border-primaryBlue focus:outline-none px-2 w-full"
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-black">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-black">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-black">
                    Event Image
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-black">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-black">
                    Short Description
                  </th>

                  <th scope="col" className="px-6 py-4 font-large text-black">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-black">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {currentEvents.map((event) => (
                  <tr className="hover:bg-gray-50" key={event.id}>
                    <td className="px-6 py-4">
                      <p>{event.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        className="event-image"
                        src={`${event.image}`}
                        alt={event.name}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p>{event.category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{event.description}</p>
                    </td>

                    <td className="action-col">
                      <p className="text-green-500">{event.status}</p>
                    </td>
                    <td>
                      <Link
                        className="action-text"
                        to={`/singleeventdetail/${event?.id}`}
                      >
                        <p className="edit">
                          <AiFillEye /> View
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentEvents.length < postsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Event;
