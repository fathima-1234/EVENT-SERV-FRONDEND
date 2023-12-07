import React, { useEffect, useState } from "react";
import instance,  { BASE_URL } from '../../utils/axios';
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


function MenuList() {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

 // Define the fetchMenu function here
 const fetchMenu = async () => {
  try {
    const response = await instance.get("http://127.0.0.1:8000/events/menu/");
    setMenu(response.data);
  } catch (error) {
    console.error("Failed to fetch menu:", error);
  }
};

useEffect(() => {
  // Fetch all menu when the component mounts
  fetchMenu();
}, []);

  

  
  const deleteMenu = async (menu_id) => {
    console.log(menu_id);
  
    // Show the SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this menu. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await instance.delete(
            `http://127.0.0.1:8000/events/delete-event-menu/${menu_id}/`
          );
          console.log(response);
          fetchMenu();
          toast.success("Menu deleted successfully");
          handleClose();
        } catch (error) {
          toast.error("Failed to delete the Menu");
        }
      }
    });
  };


  const handleClose = () => {
    setSelectedMenu(null);
    setOpen(false);
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", selectedMenu.name);
      formData.append("description", selectedMenu.description);
      formData.append("image", selectedMenu.image);

      const response = await instance.get(`http://127.0.0.1:8000/events/update-event-menu/${selectedMenu.id}`, formData);

      if (response.status === 200) {
        toast.success('Menu updated successfully');
        fetchMenu();
        handleClose();
      } else {
        toast.error('Failed to update menu');
      }
    } catch (error) {
      toast.error('Failed to update menu');
    }
  };


  return (
  <div className="flex h-full bg-acontent">
<Sidebar />
<div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-serif flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
  <div className="w-full h-screen px-3  font-serif">
    <div className="w-full p-5 mb-10">
      <Button
        className="bg-customColorA text-black font-serif float-right"
        onClick={() => navigate("/createmenu")}
      >
        Add Menu
      </Button>
    </div>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className=" rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full  border-collapse bg-white text-left text-sm text-black">
        <thead className="bg-customColorD">
          <tr>
            <th scope="col" className="px-6 py-4 font-serif text-black">
              Menu Name
            </th>
            <th scope="col" className="px-6 py-4 font-serif text-black">
               Image
            </th>
           
            <th scope="col" className="px-6 py-4 font-serif text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {menu.map((menu) => (
            <tr className="hover:bg-gray-50" key={menu.id}>
              <td className="px-6 py-4 text-black">
                <p>{menu.name}</p>
              </td>
              <td className="px-6 py-4">
                <p>
                <img className="event-image" src={`${BASE_URL}${menu.image}`} alt={menu.name} />
                  {/* <img className="w-4/5 h-24" src={category.image} alt={category.name} /> */}
                </p>
              </td>
            
              <td className="px-6 py-4">
                <div className="flex space-x-2 text-black ">
                  <Button
                    onClick={() => handleOpen(menu)}
                    variant="gradient"
                    className="text-black bg-customColorA"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteMenu(menu.id)}
                    variant="gradient"
                    className="text-black bg-customColorA"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
<Dialog open={open} onClose={handleClose}>
  <DialogHeader>Edit Menu</DialogHeader>
  <DialogBody>
    <label className="text-gray-700">Name:</label>
    <input
      className="border border-gray-300 p-2 mt-1 w-full"
      type="text"
      value={selectedMenu?.name || ""}
      onChange={(e) =>
        setSelectedMenu((prevMenu) => ({
          ...prevMenu,
          name: e.target.value,
        }))
      }
    />
    <label className="text-gray-700 mt-3">Description:</label>
    <input
      className="border border-gray-300 p-2 mt-1 w-full"
      type="text"
      value={selectedMenu?.description || ""}
      onChange={(e) =>
        setSelectedMenu((prevMenu) => ({
          ...prevMenu,
          description: e.target.value,
        }))
      }
    />
    <label className="text-gray-700 mt-3">Image:</label>
  
    <input
      className="border border-gray-300 p-2 mt-1 w-full"
      type="file"
      accept="image/*"
      onChange={(e) =>
        setSelectedMenu((prevMenu) => ({
          ...prevMenu,
          image: e.target.files[0],
        }))
      }
    />
  </DialogBody>
  <DialogFooter>
    <Button
      variant="text"
      color="red"
      onClick={handleClose}
      className="mr-1"
    >
      Cancel
    </Button>
    <Button
      variant="gradient"
      color="green"
      onClick={handleEdit}
    >
      Save
    </Button>
  </DialogFooter>
</Dialog>
<ToastContainer position="top-center" />
</div>
);
}

export default MenuList;
