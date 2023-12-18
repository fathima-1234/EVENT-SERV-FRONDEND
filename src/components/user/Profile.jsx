import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar1 from "./Navbar1";
import instance,  { BASE_URL } from '../../utils/axios';
import ReactModal from 'react-modal';
import EditProfileModal from './EditProfileModal';
import toast from 'react-hot-toast'; 

// ReactModal.setAppElement('#root');
const rootElement = document.getElementById('root');
ReactModal.setAppElement(rootElement);

const Profile = () => {
  const [userData, setUserData] = useState({
    email: "",
    id: "",
    name: "",
    profile_photo: "", // Add an image property to userData
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_photo: null, // Assuming profile_photo is a file
  });

  useEffect(() => {
    // Fetch user profile data from the API when the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('User is not authenticated');
          return;
        }

        const response = await fetch('https://eventsev.onrender.com/user/user-createprofile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          // credentials: 'include',
        });
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData = await response.json();
        setUserData(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        if (error.response) {
          console.error('Status code:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const saveChanges = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
  
      const form = new FormData();
      form.append('name', formData.name);  // Add other form fields as needed
      form.append('email', formData.email);
      form.append('profile_photo', formData.profile_photo);  // Assuming profile_photo is a file
  
      const response = await fetch('https://eventsev.onrender.com/user/user-profile/update/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update user profile:', response.status, errorData);
        throw new Error('Failed to update user profile');
      }
  
      // Handle the success case as needed
      console.log('Profile updated successfully');
      toast.success('Profile updated successfully');
      closeModal();
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Toaster position='top-center' limit={3} />
      <div className="w-full h-20 flex items-center">
      <Navbar1 />
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-customColorD shadow-xl rounded-xl p-6 w-full max-w-md mx-3 mt-10 font-serif">
          <div className="overflow-hidden w-full">
            <h1 className="font-Playball text-3xl mb-4">My Profile</h1>
          </div>

          <div className="w-full p-4 rounded-lg hover:bg-customColorD text-center transition duration-300 transform hover:scale-105">
            {userData.profile_photo ? (
              <img
             
                src={`${userData.profile_photo}`}
                alt="Profile"
                className="w-20 h-20 rounded-full  text-center"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            )}
            <p className="text-lg font-serif mb-2">{userData.name}</p>
            <p className="text-lg font-serif mb-2">{userData.email}</p>

            <div className="text-right">
              <button onClick={openModal}
              className="bg-customColorA hover:bg-slate-700 focus:ring focus:ring-slate-700 text-black rounded-full px-4 py-2 transition duration-300"
              >Edit Profile
              </button>
              {/* Pass userData and saveChanges to your modal */}
              <EditProfileModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveChanges} 
                userData={userData}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


