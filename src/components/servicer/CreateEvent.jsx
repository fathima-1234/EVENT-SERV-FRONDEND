import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";

function CreateEvent() {

  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [yearManufactured, setYearManufactured] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [price_per_person, setPricePerPerson] = useState(null);
  const [image, setImage] = useState(null);
  const [categoryList, setCategorylist] = useState([]);
  const navigate = useNavigate();
  const [isVeg, setIsVeg] = useState("");
  const [endingDate, setEndingDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function categories() {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).userID;
        const response = await instance.get("http://127.0.0.1:8000/events/categories1/", {
          params: { servicer: userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategorylist(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    }
  
    categories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
 

    const form = new FormData();
    form.append("category", category);
    form.append("name", name);
    form.append("year_manufactured", yearManufactured);
    form.append("seating_capacity", seatingCapacity);
    form.append("description", description);
    form.append("city", city);
    form.append("price_per_person", price_per_person);
    form.append("image", image);
    form.append("ending_time", endingDate);
    form.append("is_veg",isVeg)
   
    if (image) {
      const imageFileType = image.type;
      if (imageFileType.startsWith("image")) {
        form.append("image", image);
      } else {
        toast.error("Please select an image file for the 'image' field");
        return;
      }
    }
    const servicerID = JSON.parse(localStorage.getItem("user")).userID; // Get the servicer ID from localStorage
    form.append("servicer", servicerID); // Include

    console.log(image);
    
   
    
    const res = await instance.post("http://127.0.0.1:8000/events/create-event/",form,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
    console.log(res);
    if (res.status === 201) {
      toast.success("event added");
      navigate("/eventservicer");
    } else {
      toast.error(res.statusText);
    }
  };

  const handlePriceChange = (e) => {
    const enteredValue = parseFloat(e.target.value);
    if (!isNaN(enteredValue) && enteredValue >= 0) {
      setPricePerPerson(enteredValue);
    } else {
      // Prevent updating the state with negative values
      setPricePerPerson("");
    }
  };
  const handleEndingDateChange = (e) => {
    setEndingDate(e.target.value);
  };
return (
  <div className="bg-gradient-to-br from-purple-300 to-blue-200 min-h-screen flex items-center justify-center px-4">
    <Toaster position="top-center" reverseOrder={false} />

    <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold underline mb-6 text-center">Add Event</h1>
      <form
      onSubmit={handleSubmit}
      encType="multipart/formdata"
    >
      <div className="space-y-4">
        <label className="block text-base" htmlFor="event">
          Event Name
        </label>
        <input
          className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-base" htmlFor="event">
          Description
        </label>
        <input
          className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-base" htmlFor="event">
          City
        </label>
        <input
          className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>





{/* Seating Capacity */}
<div className="space-y-4">
<label className="block text-base" htmlFor="seating_capacity">
  Seating Capacity
</label>
<input
  className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
  type="number"
  name="seating_capacity"
  onChange={(e) => setSeatingCapacity(e.target.value)}
  required
/>
</div>

{/* Year Manufactured */}
<div className="space-y-4">
<label className="block text-base" htmlFor="year_manufactured">
  Year Manufactured
</label>
<input
  className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
  type="number"
  name="year_manufactured"
  onChange={(e) => setYearManufactured(e.target.value)}
  required
/>
</div>

 
<div className="space-y-4">
<label className="block text-base">
  Veg/NonVeg
</label>
<div className="space-x-4">
  <input
    type="radio"
    id="is_veg_yes"
    name="is_veg"
    value="yes"
    checked={isVeg === "yes"}
    onChange={(e) => setIsVeg(e.target.value)}
    required
  />
  <label htmlFor="is_veg_yes">Yes</label>
  <input
    type="radio"
    id="is_veg_no"
    name="is_veg"
    value="no"
    checked={isVeg === "no"}
    onChange={(e) => isVeg(e.target.value)}
  />
  <label htmlFor="is_veg_no">No</label>
</div>
</div> 



{/* Price */}
<div className="space-y-4">
<label className="block text-base" htmlFor="event">
  Price Per Person
</label>
<input
  className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
  type="number"
  name="price"
  value={price_per_person}
  onChange={handlePriceChange}
  required
/>
</div>

 Image
<div className="space-y-4">
<label className="block text-base" htmlFor="car">
  Image
</label>
<input
  className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
  type="file"
  name="image"
  onChange={(e) => setImage(e.target.files[0])}
  required
/>
</div> 
<div className="space-y-4">
      <label className="block text-base" htmlFor="endingDate">
        Ending Date
      </label>
      <input
        className="w-full h-12 border-2 rounded-md px-4 outline-none focus:ring-primaryBlue focus:border-primaryBlue"
        type="datetime-local" // or "date" if you don't need time
        name="endingDate"
        value={endingDate}
        onChange={handleEndingDateChange}
        required
      />
    </div>
{/* Category */}
<div className="space-y-4">
<label className="block text-base" htmlFor="event">
  Category
</label>
<select
  className="w-full h-12 border-2 rounded-md px-4 bg-gray-200 border-gray-300 text-gray-800 outline-none focus:border-gray-400"
  name="category"
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Select Category</option>
  {categoryList.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>
</div>


<input
className="bg-green-600 hover:bg-green-700 mt-4 h-12 w-full text-white font-semibold rounded-md shadow-md cursor-pointer transition-colors duration-300"
type="submit"
value="Add Event"
/>

      </form>
    </div>
  </div>
);
}

export default CreateEvent;