import React, { useEffect, useState } from "react";
import instance, { BASE_URL } from "../../utils/axios";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  // Define the fetchCategories function here
  const fetchCategories = async () => {
    try {
      const response = await instance.get("events/categories1/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    // Fetch all categories when the component mounts
    fetchCategories();
  }, []);

  const deleteCategory = async (cat_id) => {
    console.log(cat_id);

    // Show the SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this category. This action cannot be undone.",
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
            `events/delete-event-category/${cat_id}/`,
          );
          console.log(response);
          fetchCategories();
          toast.success("Category deleted successfully");
          handleClose();
        } catch (error) {
          toast.error("Failed to delete the Category");
        }
      }
    });
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setOpen(false);
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", selectedCategory.name);
      formData.append("description", selectedCategory.description);
      formData.append("image", selectedCategory.image);

      const response = await instance.get(
        `events/update-event-category/${selectedCategory.id}`,
        formData,
      );

      if (response.status === 200) {
        toast.success("Category updated successfully");
        fetchCategories();
        handleClose();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Failed to update category");
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
              onClick={() => navigate("/createcategory")}
            >
              Add EventCategory
            </Button>
          </div>
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className=" rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full  border-collapse bg-white text-left text-sm text-black">
              <thead className="bg-customColorD">
                <tr>
                  <th scope="col" className="px-6 py-4 font-serif text-black">
                    event Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-serif text-black">
                    event Image
                  </th>

                  <th scope="col" className="px-6 py-4 font-serif text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {categories.map((category) => (
                  <tr className="hover:bg-gray-50" key={category.id}>
                    <td className="px-6 py-4 text-black">
                      <p>{category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>
                        <img
                          className="event-image"
                          src={`${category.image}`}
                          alt={category.name}
                        />
                        {/* <img className="w-4/5 h-24" src={category.image} alt={category.name} /> */}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-2 text-black ">
                        <Button
                          onClick={() => handleOpen(category)}
                          variant="gradient"
                          className="text-black bg-customColorA"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteCategory(category.id)}
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
        <DialogHeader>Edit Category</DialogHeader>
        <DialogBody>
          <label className="text-gray-700">Name:</label>
          <input
            className="border border-gray-300 p-2 mt-1 w-full"
            type="text"
            value={selectedCategory?.name || ""}
            onChange={(e) =>
              setSelectedCategory((prevCategory) => ({
                ...prevCategory,
                name: e.target.value,
              }))
            }
          />
          <label className="text-gray-700 mt-3">Description:</label>
          <input
            className="border border-gray-300 p-2 mt-1 w-full"
            type="text"
            value={selectedCategory?.description || ""}
            onChange={(e) =>
              setSelectedCategory((prevCategory) => ({
                ...prevCategory,
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
              setSelectedCategory((prevCategory) => ({
                ...prevCategory,
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
          <Button variant="gradient" color="green" onClick={handleEdit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default CategoryList;
