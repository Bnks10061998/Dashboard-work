// import React, { useState } from 'react';

// const Refers = () => {
//   const [referrals, setReferrals] = useState([
//     {
//       id: 1,
//       referralName: 'Jane Doe',
//       referralCode: 'R12345',
//       status: 'Pending',
//       date: '2025-05-01',
//       imageUrl: '', // Image field
//     },
//     {
//       id: 2,
//       referralName: 'John Smith',
//       referralCode: 'R67890',
//       status: 'Approved',
//       date: '2025-04-20',
//       imageUrl: '', // Image field
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     referralName: '',
//     referralCode: '',
//     status: 'Pending',
//     date: '',
//     imageUrl: '', // Image field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, imageUrl: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const openModal = (referral = null) => {
//     if (referral) {
//       setIsEditMode(true);
//       setSelectedId(referral.id);
//       setFormData({ ...referral });
//     } else {
//       setIsEditMode(false);
//       setFormData({
//         referralName: '',
//         referralCode: '',
//         status: 'Pending',
//         date: '',
//         imageUrl: '', // Reset image field
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const saveReferral = () => {
//     const { referralName, referralCode, date } = formData;
//     if (!referralName || !referralCode || !date) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     if (isEditMode) {
//       setReferrals((prev) =>
//         prev.map((r) =>
//           r.id === selectedId ? { ...formData, id: selectedId } : r
//         )
//       );
//     } else {
//       const newId = referrals.length + 1;
//       setReferrals([
//         ...referrals,
//         { ...formData, id: newId, date },
//       ]);
//     }

//     setIsModalOpen(false);
//     setIsEditMode(false);
//     setSelectedId(null);
//   };

//   const deleteReferral = (id) => {
//     if (window.confirm('Are you sure you want to delete this referral?')) {
//       setReferrals((prev) => prev.filter((r) => r.id !== id));
//     }
//   };

//   const statusBadge = (status) => {
//     const base = 'px-2 py-1 text-xs font-semibold rounded-full';
//     switch (status) {
//       case 'Approved':
//         return `${base} bg-green-100 text-green-700`;
//       case 'Pending':
//         return `${base} bg-yellow-100 text-yellow-700`;
//       case 'Rejected':
//         return `${base} bg-red-100 text-red-700`;
//       default:
//         return base;
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Refers</h1>

//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => openModal()}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
//         >
//           + New Referral
//         </button>
//       </div>

//       <table className="w-full table-auto border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b text-left">Image</th>
//             <th className="px-4 py-2 border-b text-left">Referral Name</th>
//             <th className="px-4 py-2 border-b text-left">Referral Code</th>
//             <th className="px-4 py-2 border-b text-left">Date</th>
//             <th className="px-4 py-2 border-b text-left">Status</th>
//             <th className="px-4 py-2 border-b text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {referrals.map((r) => (
//             <tr key={r.id}>
//               <td className="px-4 py-2 border-b">
//                 <img
//                   src={r.imageUrl || 'https://via.placeholder.com/100'}
//                   alt="Referral"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//               </td>
//               <td className="px-4 py-2 border-b">{r.referralName}</td>
//               <td className="px-4 py-2 border-b">{r.referralCode}</td>
//               <td className="px-4 py-2 border-b">{r.date}</td>
//               <td className="px-4 py-2 border-b">
//                 <span className={statusBadge(r.status)}>{r.status}</span>
//               </td>
//               <td className="px-4 py-2 border-b">
//                 <button
//                   onClick={() => openModal(r)}
//                   className="text-blue-600 hover:underline mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteReferral(r.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for Add/Edit Referral */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Referral' : 'Add New Referral'}</h2>
//             <input
//               type="text"
//               name="referralName"
//               placeholder="Referral Name"
//               value={formData.referralName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-4"
//             />
//             <input
//               type="text"
//               name="referralCode"
//               placeholder="Referral Code"
//               value={formData.referralCode}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-4"
//             />
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-4"
//             />
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-4"
//             >
//               <option>Pending</option>
//               <option>Approved</option>
//               <option>Rejected</option>
//             </select>
//             <div className="mb-4">
//               <label className="block mb-2">Referral Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full p-2 border rounded"
//               />
//               {formData.imageUrl && (
//                 <div className="mt-4">
//                   <img
//                     src={formData.imageUrl}
//                     alt="Referral Preview"
//                     className="w-32 h-32 rounded-full"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end gap-2 mt-6">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//                 onClick={saveReferral}
//               >
//                 {isEditMode ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Refers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Refers = () => {
  const [referrals, setReferrals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    referralName: '',
    referralCode: '',
    status: 'Pending',
    date: '',
    image: '', // Updated to match backend
  });

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/referrals`);
      if (res.status === 200 && Array.isArray(res.data)) {
        const dataWithDefaults = res.data.map((ref) => ({
          ...ref,
          image: ref.image || 'https://via.placeholder.com/100',
        }));
        setReferrals(dataWithDefaults);
      } else {
        console.error('Expected array but got:', res.data);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (referral = null) => {
    if (referral) {
      setIsEditMode(true);
      setSelectedId(referral._id);
      const formattedDate = referral.date ? referral.date.slice(0, 10) : '';
      setFormData({
        ...referral,
        date: formattedDate,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        referralName: '',
        referralCode: '',
        status: 'Pending',
        date: '',
        image: '',
      });
    }
    setIsModalOpen(true);
  };

  const saveReferral = async () => {
    const { referralName, referralCode, date } = formData;
    if (!referralName || !referralCode || !date) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/api/referrals/${selectedId}`, formData);
      } else {
        await axios.post(`${apiUrl}/api/referrals`, formData);
      }
      fetchReferrals();
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedId(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed: ' + err.message);
    }
  };

  const deleteReferral = async (id) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      try {
        await axios.delete(`${apiUrl}/api/referrals/${id}`);
        fetchReferrals();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const statusBadge = (status) => {
    const base = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'Approved':
        return `${base} bg-green-100 text-green-700`;
      case 'Pending':
        return `${base} bg-yellow-100 text-yellow-700`;
      case 'Rejected':
        return `${base} bg-red-100 text-red-700`;
      default:
        return base;
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Refers</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          + New Referral
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Image</th>
            <th className="px-4 py-2 border-b text-left">Referral Name</th>
            <th className="px-4 py-2 border-b text-left">Referral Code</th>
            <th className="px-4 py-2 border-b text-left">Date</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((r) => (
            <tr key={r._id}>
              <td className="px-4 py-2 border-b">
                <img
                  src={r.image || 'https://via.placeholder.com/100'}
                  alt="Referral"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2 border-b">{r.referralName}</td>
              <td className="px-4 py-2 border-b">{r.referralCode}</td>
              <td className="px-4 py-2 border-b">{r.date.slice(0, 10)}</td> {/* Display formatted date */}
              <td className="px-4 py-2 border-b">
                <span className={statusBadge(r.status)}>{r.status}</span>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => openModal(r)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReferral(r._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? 'Edit Referral' : 'Add New Referral'}
            </h2>
            <input
              type="text"
              name="referralName"
              placeholder="Referral Name"
              value={formData.referralName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="referralCode"
              placeholder="Referral Code"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <div className="mb-4">
              <label className="block mb-2">Referral Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Referral Preview"
                    className="w-32 h-32 rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={saveReferral}
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refers;
