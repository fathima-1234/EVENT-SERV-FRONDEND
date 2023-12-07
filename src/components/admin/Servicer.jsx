import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import instance from "../../utils/axios";

function Servicer() {
  const [servicers, setServicers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function getServicers() {
    const response = await instance.get("http://127.0.0.1:8000/servicers/");
    setServicers(response.data);
  }

  useEffect(() => {
    async function getServicers() {
      try {
        const response = await instance.get("http://127.0.0.1:8000/servicers/");
        setServicers(response.data);
      } catch (error) {}
    }
    getServicers();
  }, []);

  const statusChange = (id) => {
    instance.get(`http://127.0.0.1:8000/blockservicer/${id}/`).then(() => getServicers());
  };





  const handleSearch = () => {
    const filteredServicers = servicers.filter(servicer =>
      servicer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || servicer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||servicer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredServicers;
  };

  const filteredServicers = handleSearch();

  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-serif flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-serif">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-full p-5 flex justify-between">
          <h1 className='  text-3xl text-start  ms-4'>Servicers</h1>
          <input
              type="text"
              placeholder='&#x1F50D; Search '
              className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /></div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-black">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-black"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-black"
                  >
                    Email
                  </th>
                 
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-black"
                  >
                    Phone number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-black"
                  >
                    Status
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-4 font-large text-black"
                >
                  Action
                </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                 {filteredServicers.map((servicer, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-6 py-4">{servicer.first_name} {servicer.last_name}</td>
                    <td className="px-6 py-4">{servicer.email}</td>
                    <td className="px-6 py-4">{servicer.phone_number}</td>
                    <td class="px-6 py-4">
                      {servicer.is_active ? (
                        <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          Active
                        </span>
                      ) : (
                        <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                          Blocked
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <td class="px-6 py-4">
                        <div className="flex">
                          <label class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!servicer.is_active}
                              readOnly
                            />
                            <div
                              onClick={() => statusChange(servicer.id)}
                              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            {servicer.is_active ? (
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                Block
                              </span>
                            ) : (
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                Unblock
                              </span>
                            )}
                          </label>
                        </div>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        </div>
      </div>
    </div>
  );
} 
  



export default Servicer;