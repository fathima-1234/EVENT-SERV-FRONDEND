import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../utils/axios";
import { Link } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Eventservicer() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    year_manufactured: "",
    seating_capacity: "",
    is_veg:"",
    description: "",
    category: 0, // Assuming 0 is the default category value
    price_per_person: 0, // Assuming 0 is the default price value
    user: "", // Assuming an empty string is the default user value
    image: null,
  });
  const [category, setCategory] = useState([]);

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentEvent = events.slice(firstPostIndex, lastPostIndex);


  const handleOpen = (id) => {
    setSelectedEventId(id);
    setOpen(true);
  };

  

  const handleEdit = (event) => {
    setSelectedEventId(event.id);
    setEditMode(true);
    setEditedEvent({
      ...event,
      category: event.category.id, // Extract the ID from the category object
    });
    setOpen(true);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value); // Convert the value to an integer
    setEditedEvent({
      ...editedEvent,
      category: categoryId,
      
    });
  };
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
     if (files && files.length > 0) {
       setUploadedImage(files[0]);
       setEditedEvent((preveditedEvent) => ({
       ...preveditedEvent,
       image: URL.createObjectURL(files[0]),
      }));
     }}else
     {
      setEditedEvent((preveditedEvent) => ({
        ...preveditedEvent,
        [name]: value,
      }));
    }
  };
  

  const handleSave = async () => {
    try {
      console.log(editedEvent,'edit');
      const formData = new FormData();
    
      formData.append("name", editedEvent.name);
   
      formData.append("description", editedEvent.description);
      formData.append("category", editedEvent.category);
     
      formData.append("year_manufactured", editedEvent.year_manufactured);
      
      
      formData.append("seating_capacity", editedEvent.seating_capacity);
      
      
     
      

      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
     
      formData.append("price_per_person", editedEvent.price_per_person);
console.log(formData,'asdfghj');
      await updateevent(selectedEventId, formData);
    } catch (error) {
      toast.error("Failed to save the event");
    }
  };

 


  const updateevent = async (id, formData) => {
    try {
      const response = await instance.put(
        `http://127.0.0.1:8000/events/update-event/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getevents();
      toast.success("event updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to update the event");
    }
  };

  const deleteEvent = async (event_id) => {
    console.log(event_id);
  
    
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this car. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await instance.delete(`http://127.0.0.1:8000/events/delete-event/${event_id}/`);
          console.log(response);
          getevents();
          toast.success("Event deleted successfully");
        } catch (error) {
          toast.error("Failed to delete the Event");
        }
      }
    });
  };

  const handleClose = () => {
    setSelectedEventId(null);
    setEditMode(false);
    setEditedEvent({});
    setOpen(false);
  };

  const handleButtonClick = () => {
    navigate("/createevent");
  };
  const handleButtonClicks = () => {
    navigate('/singleeventdetail/${event?.id}'); 
  };

  

  


  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).userID;
    getevents(userId);
  }, []);

  const getevents = async (userId) => {
    try {
      const response = await instance.get("http://127.0.0.1:8000/events/event/", { params: { renter: userId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },});
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };




  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).userID;
    getCategory(userId);
  }, []);

  const getCategory = async (userId) => {
    try {
      const response = await instance.get("http://127.0.0.1:8000/events/categories1/", {
        params: { servicer: userId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategory(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };


  async function getuser() {
    const response = await instance.get("http://127.0.0.1:8000/users/");
    setUser(response.data);
  }

  useEffect(() => {
    getuser();
  }, []);

  const statusChange = (id) => {
    // console.log('user id', id)
    instance.get(`http://127.0.0.1:8000/blockuser/${id}`).then(() => getuser());
    // console.log(response);
  };

  const handleCreateSlot = (eventId) => {
    navigate(`/createslot/${eventId}`);
  };
  
  return (
    <div className="">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <h1 className="text-3xl font-bold text-center text-custom-red mt-10 mb-6">Your Events</h1>
          <div className="w-full p-5 mb-10">
            <button
              className="bg-blue-600 text-white rounded px-4 py-2 float-right transition duration-300 ease-in-out transform hover:scale-110 hover:bg-blue-700 focus:outline-none"
              onClick={handleButtonClick}
            >
              Add new event
            </button>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Event Image
                  </th> 
                 
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Price per person
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Actions
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    View
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {events.map((event) => (
                  <tr className="hover:bg-gray-50" key={event.id}>
                    <td className="px-6 py-4">
                      <p>{event.name}</p>
                    </td>
                     <td className="px-6 py-4">
                      <img className="h-16 w-16 object-cover rounded" src={event.image} alt={event.name} />
                    </td> 
                    
                    <td className="px-6 py-4">
                      <p>{event.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{event.price_per_person}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{event.category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1 transition duration-300 ease-in-out transform hover:scale-110 hover:bg-red-700 focus:outline-none"
                          onClick={() => deleteEvent(event.id)}
                        >
                          Delete
                        </button>
                        
                         <button
                          className="bg-green-600 text-white rounded px-2 py-1 transition duration-300 ease-in-out transform hover:scale-110 hover:bg-red-700 focus:outline-none"
                         onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button> 
                        <button
                          onClick={() => handleCreateSlot(event.id)}
                          className="bg-green-600 text-white rounded px-2 py-1 transition duration-300 ease-in-out transform hover:scale-110 hover:bg-green-700 focus:outline-none"
                        >
                          Add Slot
                          </button> 
                      </div> 
                    </td> 
              <td>
                      <Link className="action-text" to={`/singleeventdetail/${event?.id}`}>
                        <p className="edit">
                          <AiFillEye /> View
                        </p>
                      </Link>
                    </td>
                    <td><p className='text-black'> {event.status }</p>
                        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

            

         <Dialog open={open} onClose={handleClose}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            {editMode ? "Edit Event" : "Confirmation"}
            <Button
              color="red"
              buttonType="link"
              onClick={handleClose}
              ripple="dark"
              className="p-1 text-black"
            >
              <FaTimes className="bg-black text-black"/>
            </Button>
          </div>
        </DialogHeader>
        <DialogBody divider>
        <div className="h-96 overflow-y-auto">
          {editMode ? (
            <div>
              <label className="text-gray-600">Name</label>
              <Input
                name="name"
                value={editedEvent.name || ""}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="mt-1"
              />
             
              <label className="text-gray-600">Year Manufactured</label>
              <Input
                name="year_manufactured"
                value={editedEvent.year_manufactured || ""}
                onChange={handleInputChange}
                placeholder="Enter Year Manufactured"
                className="mt-1"
              />
             
              
              <label className="text-gray-600">Seating Capacity</label>
              <Input
                name="seating_capacity"
                value={editedEvent.seating_capacity || ""}
                onChange={handleInputChange}
                placeholder="Enter Seating Capacity"
                className="mt-1"
              />
             
              Yes
              <label className="text-gray-600">Description</label>
              <Input
                name="description"
                value={editedEvent.description || ""}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="mt-1"
              />
              <label className="text-gray-600">Price_per_Person</label>
              <Input
                name="price"
                value={editedEvent.price_per_person || ""}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="mt-1"
              />
              <br />
              <label className="text-gray-600">Category</label>
              <select
                value={editedEvent.category.id}
                onChange={handleCategoryChange}
                name="category"
                className="border rounded-lg p-1 mt-1"
              >
                {category.map((category) => (
                  <option value={category.id} key={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
  
              <br />
              <label className="text-gray-600">Image</label>
              <div className="flex items-center mt-1">
                {uploadedImage ? (
                  <span className="mr-2">{uploadedImage.name}</span>
                ) : (
                  <span className="mr-2">Choose file</span>
                )}
                <input type="file" name="image" onChange={handleInputChange} />
              </div> 
            </div>
          ) : (
            "Are you sure you want to delete this event?"
          )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClose} className="mr-1 text-black">
            Cancel
          </Button>
          {editMode ? (
            <Button variant="gradient" color="green" onClick={handleSave}className="mr-1 text-black">
              Save
            </Button>
          ) : (
            <Button variant="gradient" color="green" className=" text-black" >
              Confirm
            </Button>
          )}
        </DialogFooter>
      </Dialog>
        <ToastContainer position="top-center" /> 
       
      </div>
    
  );
}

export default Eventservicer;