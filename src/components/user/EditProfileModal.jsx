// import React, { useState } from 'react';
// import ReactModal from 'react-modal';

// const EditProfileModal = ({ isOpen, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     profile_photo: '', // Add an image property to the form data
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       profile_photo: file,
//     }));
//   };

//   const handleSave = () => {
//     onSave(formData);
//   };

//   return (
//     <div>
//       <ReactModal
//         isOpen={isOpen}
//         onRequestClose={onClose}
//         contentLabel="Edit Profile Modal"
//       >
//         <h2>Edit Profile</h2>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </label>
//         <label>
//           Profile Image:
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </label>
//         {formData.profile_photo && (
//           <img src={formData.profile_photo} alt="Profile Preview" style={{ width: '50px', height: '50px' }} />
//         )}
//         <button onClick={handleSave}>Save Changes</button>
//         <button onClick={onClose}>Close</button>
//       </ReactModal>
//     </div>
//   );
// };

// export default EditProfileModal;
import React, { useState } from 'react';
import ReactModal from 'react-modal';

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_photo: '', // Add an image property to the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile_photo: file,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Edit Profile Modal"
        className="m-auto p-8 max-w-md bg-white rounded-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Profile Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        {formData.profile_photo && (
          <img
            src={URL.createObjectURL(formData.profile_photo)}
            alt="Profile Preview"
            style={{ width: '50px', height: '50px' }}
            className="mb-4 rounded-full"
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default EditProfileModal;
