import React, { useState } from "react";
import { Edit2 } from "lucide-react"; // for edit icon

const Profile= () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Keerthi");
  const [email, setEmail] = useState("keerthi@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [bio, setBio] = useState("Creative designer and developer.");

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    // Here, you can add code to save the updated data to Firebase
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100" // Profile picture placeholder
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>
        
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">@{name.toLowerCase()}</p>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 mt-1 border rounded-lg h-24"
            />
          </div>

          {/* Edit or Save button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// import React, { useState, useEffect } from "react";
// import { db } from "./firebase"; // Import the Firebase config
// import { Edit2 } from "lucide-react"; // for edit icon

// const ProfileScreen = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     bio: "",
//   });

//   const userId = "user123"; // Example user ID. Use actual authenticated user ID from Firebase Auth

//   useEffect(() => {
//     // Fetch user data from Firestore
//     const fetchUserData = async () => {
//       try {
//         const doc = await db.collection("users").doc(userId).get();
//         if (doc.exists) {
//           setUserData(doc.data());
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error getting document: ", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEdit = () => setIsEditing(!isEditing);

//   const handleSave = async () => {
//     try {
//       await db.collection("users").doc(userId).set(userData, { merge: true });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating document: ", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   return (
//     <div className="flex justify-center p-6 bg-gray-100 h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <img
//             src="https://via.placeholder.com/100"
//             alt="Profile"
//             className="rounded-full w-24 h-24 object-cover"
//           />
//         </div>

//         <div className="text-center mb-4">
//           <h2 className="text-xl font-semibold">{userData.name}</h2>
//           <p className="text-gray-600">@{userData.name.toLowerCase()}</p>
//         </div>

//         <div className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={userData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg"
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium">Bio</label>
//             <textarea
//               name="bio"
//               value={userData.bio}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg h-24"
//             />
//           </div>

//           {/* Edit or Save button */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={isEditing ? handleSave : handleEdit}
//               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//             >
//               {isEditing ? "Save" : "Edit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileScreen;
