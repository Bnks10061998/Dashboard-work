import React, { useState } from "react";
import { UserCircle } from "lucide-react";

const users = [
  { id: 1, name: "Keerthi" },
  { id: 2, name: "Sathya" },
  { id: 3, name: "Vishnu" },
];

const initialMessages = {
  1: [
    { from: "them", text: "Hi! Could you share the latest banner mockup?" },
    { from: "me", text: "Sure! Uploading it now." },
  ],
  2: [{ from: "them", text: "Can we update the logo spacing?" }],
  3: [],
};

const Messages = () => {
  const [activeUserId, setActiveUserId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [activeUserId]: [
        ...(prev[activeUserId] || []),
        { from: "me", text: newMessage.trim() },
      ],
    }));
    setNewMessage("");
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-6">Messages</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setActiveUserId(user.id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
                activeUserId === user.id ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <div className="bg-gray-300 rounded-full p-2">
                <UserCircle className="w-5 h-5 text-gray-600" />
              </div>
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4 border-b bg-white shadow-sm">
          <h3 className="text-lg font-medium">
            Chat with <span className="text-blue-600">{users.find((u) => u.id === activeUserId)?.name}</span>
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {(messages[activeUserId] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[60%] p-3 rounded-lg text-sm ${
                msg.from === "me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.image && (
                <img src={msg.image} alt="uploaded" className="rounded mb-2 max-w-full" />
              )}
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="text-sm text-gray-500 italic mt-2">
              {users.find((u) => u.id === activeUserId)?.name} is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setMessages((prev) => ({
                      ...prev,
                      [activeUserId]: [
                        ...(prev[activeUserId] || []),
                        { from: "me", text: "", image: reader.result },
                      ],
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              📎
            </label>

            {/* Message input */}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setIsTyping(true);
                clearTimeout(typingTimeout);
                const timeout = setTimeout(() => setIsTyping(false), 1000);
                setTypingTimeout(timeout);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

// import React, { useState, useEffect } from "react";
// import { UserCircle } from "lucide-react";
// import { ref, onValue, set } from "firebase/database";
// import { db, storage } from "./firebase"; // Import Firebase config
// import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const users = [
//   { id: 1, name: "Keerthi" },
//   { id: 2, name: "Sathya" },
//   { id: 3, name: "Vishnu" },
// ];

// const initialMessages = {
//   1: [
//     { from: "them", text: "Hi! Could you share the latest banner mockup?" },
//     { from: "me", text: "Sure! Uploading it now." },
//   ],
//   2: [{ from: "them", text: "Can we update the logo spacing?" }],
//   3: [],
// };

// const Messages = () => {
//   const [activeUserId, setActiveUserId] = useState(1);
//   const [messages, setMessages] = useState(initialMessages);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [fileUploading, setFileUploading] = useState(false);

//   useEffect(() => {
//     const messagesRef = ref(db, `messages/${activeUserId}`);
//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       setMessages(snapshot.val() || {});
//     });

//     return () => unsubscribe();
//   }, [activeUserId]);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;

//     const newMessageData = { from: "me", text: newMessage.trim() };

//     const messagesRef = ref(db, `messages/${activeUserId}`);
//     set(messagesRef, [...(messages[activeUserId] || []), newMessageData]);

//     setNewMessage("");
//     setIsTyping(false);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileUploading(true);

//       const storageReference = storageRef(storage, `images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageReference, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Progress can be tracked here if desired
//         },
//         (error) => {
//           console.error("Upload failed: ", error);
//           setFileUploading(false);
//         },
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           const newMessageData = {
//             from: "me",
//             text: "",
//             image: downloadURL,
//           };

//           const messagesRef = ref(db, `messages/${activeUserId}`);
//           set(messagesRef, [...(messages[activeUserId] || []), newMessageData]);
//           setFileUploading(false);
//         }
//       );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       <div className="w-72 bg-white border-r p-4 shadow-md">
//         <h2 className="text-xl font-semibold mb-6">Messages</h2>
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setActiveUserId(user.id)}
//               className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
//                 activeUserId === user.id ? "bg-gray-200 font-semibold" : ""
//               }`}
//             >
//               <div className="bg-gray-300 rounded-full p-2">
//                 <UserCircle className="w-6 h-6 text-gray-600" />
//               </div>
//               <span>{user.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div className="p-4 border-b bg-white shadow-sm">
//           <h3 className="text-lg font-medium">
//             Chat with{" "}
//             <span className="text-blue-600">
//               {users.find((u) => u.id === activeUserId)?.name}
//             </span>
//           </h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//           {(messages[activeUserId] || []).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-[60%] p-3 rounded-lg text-sm ${
//                 msg.from === "me"
//                   ? "ml-auto bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {msg.image && (
//                 <img src={msg.image} alt="uploaded" className="rounded mb-2 max-w-full" />
//               )}
//               {msg.text}
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-sm text-gray-500 italic mt-2">
//               {users.find((u) => u.id === activeUserId)?.name} is typing...
//             </div>
//           )}
//         </div>

//         {/* Input Section */}
//         <div className="p-4 border-t bg-white shadow-inner">
//           <div className="flex items-center gap-3">
//             {/* File Upload */}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="file-upload"
//               onChange={handleImageUpload}
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer text-gray-500 hover:text-gray-700"
//             >
//               📎
//             </label>

//             {/* Message Input */}
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => {
//                 setNewMessage(e.target.value);
//                 setIsTyping(true);
//                 clearTimeout(typingTimeout);
//                 const timeout = setTimeout(() => setIsTyping(false), 1000);
//                 setTypingTimeout(timeout);
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             {/* Send Button */}
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             >
//               Send
//             </button>
//           </div>

//           {/* File Uploading Feedback */}
//           {fileUploading && (
//             <div className="text-sm text-gray-500 italic mt-2">Uploading image...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;

// import React, { useState, useEffect } from "react";
// import { signUp, login, logout, createGroup, sendMessage, uploadImage, requestPushPermission, handleIncomingMessage, setUserPresence, getMessages } from "./firebase";
// import { UserCircle } from "lucide-react";

// const users = [
//   { id: 1, name: "Keerthi" },
//   { id: 2, name: "Sathya" },
//   { id: 3, name: "Vishnu" },
// ];

// const Messages = () => {
//   const [activeUserId, setActiveUserId] = useState(1);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [groupName, setGroupName] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [imageFile, setImageFile] = useState(null);

//   // SignUp/Login
//   const handleLogin = async () => {
//     const userCredential = await login("user@example.com", "password123");
//     setUser(userCredential);
//   };

//   const handleSignUp = async () => {
//     const userCredential = await signUp("user@example.com", "password123");
//     setUser(userCredential);
//   };

//   const handleLogout = async () => {
//     await logout();
//     setUser(null);
//   };

//   // Group Creation
//   const handleCreateGroup = () => {
//     if (groupName.trim() && selectedMembers.length > 0) {
//       createGroup(groupName, selectedMembers, user.uid);
//       setGroupName("");
//       setSelectedMembers([]);
//     }
//   };

//   // Message Sending
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       sendMessage("group_id", newMessage, user.uid); // Assume group_id is the active group ID
//       setNewMessage("");
//     }
//   };

//   // Upload Image
//   const handleImageUpload = async () => {
//     if (imageFile) {
//       const downloadURL = await uploadImage(imageFile, `groups/group_id/images/${imageFile.name}`);
//       sendMessage("group_id", `Image: ${downloadURL}`, user.uid);
//     }
//   };

//   // Push Notifications
//   useEffect(() => {
//     requestPushPermission();
//     handleIncomingMessage();
//   }, []);

//   // Presence Tracking
//   useEffect(() => {
//     if (user) {
//       setUserPresence(user.uid, true); // Set the user to online
//     }
//     return () => {
//       if (user) {
//         setUserPresence(user.uid, false); // Set the user to offline when they log out
//       }
//     };
//   }, [user]);

//   // Fetch Messages
//   useEffect(() => {
//     getMessages("group_id", (data) => {
//       setMessages(data);
//     });
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       <div className="w-72 bg-white border-r p-4">
//         <h2 className="text-xl font-semibold mb-6">Messages</h2>
//         <button onClick={handleLogin}>Login</button>
//         <button onClick={handleSignUp}>Sign Up</button>
//         {user && <button onClick={handleLogout}>Logout</button>}
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setActiveUserId(user.id)}
//               className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100`}
//             >
//               <div className="bg-gray-300 rounded-full p-2">
//                 <UserCircle className="w-5 h-5 text-gray-600" />
//               </div>
//               <span>{user.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div className="p-4 border-b bg-white shadow-sm">
//           <h3 className="text-lg font-medium">
//             Chat with <span className="text-blue-600">{users.find((u) => u.id === activeUserId)?.name}</span>
//           </h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-3">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`max-w-xs p-2 rounded-lg ${msg.sender === user?.uid ? 'bg-blue-200' : 'bg-gray-200'}`}>
//               <span className="text-sm">{msg.text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="bg-gray-100 p-4 flex items-center gap-3">
//           <input
//             type="text"
//             placeholder="Type your message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1 p-2 rounded-lg border bg-white"
//           />
//           <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg">
//             Send
//           </button>
//           <input
//             type="file"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="hidden"
//             id="file-upload"
//           />
//           <label htmlFor="file-upload" className="bg-gray-300 p-2 rounded-lg cursor-pointer">
//             Upload Image
//           </label>
//           <button onClick={handleImageUpload} className="bg-green-500 text-white p-2 rounded-lg">
//             Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;
