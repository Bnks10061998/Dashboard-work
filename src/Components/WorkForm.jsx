// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

// const WorkForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm();

//   const [showForm, setShowForm] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedWork, setSelectedWork] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work`);
//         const data = await res.json();
//         setSubmittedData(data);
//       } catch (err) {
//         console.error('Failed to load data:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     for (const key in data) {
//       if (data[key] instanceof FileList && data[key].length > 0) {
//         formData.append(key, data[key][0]);
//       } else {
//         formData.append(key, data[key]);
//       }
//     }

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work`, {
//         method: 'POST',
//         body: formData,
//       });

//       const savedWork = await response.json();

//       if (editIndex !== null) {
//         const updated = [...submittedData];
//         updated[editIndex] = savedWork;
//         setSubmittedData(updated);
//       } else {
//         setSubmittedData((prev) => [...prev, savedWork]);
//       }

//       setShowForm(false);
//       reset();
//       setEditIndex(null);
//     } catch (err) {
//       console.error('Failed to submit:', err);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchKeyword(e.target.value);
//   };

//   const filteredData = submittedData.filter((work) =>
//     work.workName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//     work.description?.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   const handleView = (workData) => {
//     setSelectedWork(workData);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleDelete = async (id, index) => {
//     if (window.confirm('Are you sure you want to delete this entry?')) {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work/${id}`, {
//           method: 'DELETE',
//         });

//         if (res.ok) {
//           setSubmittedData((prev) => prev.filter((_, i) => i !== index));
//         } else {
//           console.error('Failed to delete entry');
//         }
//       } catch (error) {
//         console.error('Error deleting entry:', error);
//       }
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           value={searchKeyword}
//           onChange={handleSearchChange}
//           placeholder="Search by Work Name or Description"
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditIndex(null);
//             reset();
//           }}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Add Work Details
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-6 rounded shadow-md mt-4">
//           <h2 className="text-2xl font-semibold mb-4">{editIndex !== null ? 'Edit Work Details' : 'Add Work Details'}</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium">Work Name</label>
//               <input
//                 type="text"
//                 {...register('workName', { required: 'Work name is required' })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.workName && <p className="text-red-500 text-sm">{errors.workName.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Start Date</label>
//               <input
//                 type="date"
//                 {...register('startDate', { required: 'Start date is required' })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">End Date</label>
//               <input
//                 type="date"
//                 {...register('endDate', {
//                   required: 'End date is required',
//                   validate: (value) => value >= watch('startDate') || 'End date should be after start date',
//                 })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
//             </div>

//             <div className="md:col-span-3">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">Description</label>
//                   <textarea
//                     {...register('description', { required: 'Description is required' })}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                   {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">Remarks</label>
//                   <textarea
//                     {...register('remarks')}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </div>
//               </div>
//             </div>

//             {['image', 'video', 'docOrExcel'].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium">Upload {field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                 <input
//                   type="file"
//                   {...register(field)}
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//                 {editIndex !== null && submittedData[editIndex]?.[field] && (
//                   <p className="text-sm text-gray-600 mt-1">Current: {submittedData[editIndex][field]}</p>
//                 )}
//               </div>
//             ))}

//             <div className="md:col-span-3 flex justify-between mt-6">
//               <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded">Submit</button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditIndex(null);
//                   reset();
//                 }}
//                 className="text-sm text-gray-600 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {submittedData.length > 0 && !showForm && (
//         <div className="mt-6 bg-white p-6 rounded shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
//           <table className="min-w-full bg-gray-100 border border-gray-300 rounded shadow-md text-center">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-4">Work Name</th>
//                 <th className="p-4">Start Date</th>
//                 <th className="p-4">End Date</th>
//                 <th className="p-4">Description</th>
//                 <th className="p-4">Remarks</th>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Video</th>
//                 <th className="p-4">Document</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="p-4">No results found</td>
//                 </tr>
//               ) : (
//                 filteredData.map((work, index) => (
//                   <tr key={work._id}>
//                     <td className="p-4">{work.workName}</td>
//                     <td className="p-4">{work.startDate?.slice(0, 10)}</td>
//                     <td className="p-4">{work.endDate?.slice(0, 10)}</td>
//                     <td className="p-4">{work.description}</td>
//                     <td className="p-4">{work.remarks}</td>
//                     <td className="p-4">{work.image}</td>
//                     <td className="p-4">{work.video}</td>
//                     <td className="p-4">{work.docOrExcel}</td>
//                     <td className="p-4 flex justify-center gap-2">
//                       <button className="text-blue-600" onClick={() => handleView(work)}><FaEye size={20} /></button>
//                       <button
//                         className="text-yellow-500"
//                         onClick={() => {
//                           setShowForm(true);
//                           setEditIndex(index);
//                           reset({
//                             workName: work.workName,
//                             startDate: work.startDate?.slice(0, 10),
//                             endDate: work.endDate?.slice(0, 10),
//                             description: work.description,
//                             remarks: work.remarks,
//                           });
//                         }}
//                       >
//                         <FaEdit size={20} />
//                       </button>
//                       <button
//                         className="text-red-600"
//                         onClick={() => handleDelete(work._id, index)}
//                       >
//                         <FaTrashAlt size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showModal && selectedWork && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
//             <h3 className="text-2xl font-semibold mb-4">Work Details</h3>
//             <p><strong>Work Name:</strong> {selectedWork.workName}</p>
//             <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
//             <p><strong>End Date:</strong> {selectedWork.endDate}</p>
//             <p><strong>Description:</strong> {selectedWork.description}</p>
//             <p><strong>Remarks:</strong> {selectedWork.remarks}</p>
//             <p><strong>Image:</strong> {selectedWork.image}</p>
//             <p><strong>Video:</strong> {selectedWork.video}</p>
//             <p><strong>Document:</strong> {selectedWork.docOrExcel}</p>
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded mt-4"
//               onClick={handleCloseModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkForm;



// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

// const WorkForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm();

//   const [showForm, setShowForm] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedWork, setSelectedWork] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work`);
//       const data = await res.json();
//       setSubmittedData(data);
//     } catch (err) {
//       console.error('Failed to load data:', err);
//     }
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     for (const key in data) {
//       if (data[key] instanceof FileList && data[key].length > 0) {
//         formData.append(key, data[key][0]);
//       } else {
//         formData.append(key, data[key]);
//       }
//     }

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work`, {
//         method: 'POST',
//         body: formData,
//       });
//       const savedWork = await response.json();

//       if (editIndex !== null) {
//         const updated = [...submittedData];
//         updated[editIndex] = savedWork;
//         setSubmittedData(updated);
//       } else {
//         setSubmittedData((prev) => [...prev, savedWork]);
//       }

//       setShowForm(false);
//       reset();
//       setEditIndex(null);
//     } catch (err) {
//       console.error('Failed to submit:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work/${id}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setSubmittedData((prev) => prev.filter((item) => item._id !== id));
//       } else {
//         console.error('Failed to delete entry');
//       }
//     } catch (err) {
//       console.error('Failed to delete entry:', err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//           placeholder="Search by Work Name or Description"
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditIndex(null);
//             reset();
//           }}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Add Work Details
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
//           <input {...register('workName', { required: true })} placeholder="Work Name" className="p-2 border" />
//           <input type="date" {...register('startDate', { required: true })} className="p-2 border" />
//           <input type="date" {...register('endDate', { required: true })} className="p-2 border" />
//           <textarea {...register('description', { required: true })} placeholder="Description" className="p-2 border col-span-3" />
//           <textarea {...register('remarks')} placeholder="Remarks" className="p-2 border col-span-3" />

//           {['image', 'video', 'docOrExcel'].map((field) => (
//             <div key={field}>
//               <label>{field}</label>
//               <input type="file" {...register(field)} className="p-2 border" />
//               {editIndex !== null && submittedData[editIndex]?.[field] && (
//                 <p className="text-sm text-gray-600 mt-1">Current: {submittedData[editIndex][field]}</p>
//               )}
//             </div>
//           ))}

//           <div className="col-span-3 flex justify-between">
//             <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
//             <button onClick={() => { setShowForm(false); reset(); setEditIndex(null); }} type="button" className="text-gray-600">Cancel</button>
//           </div>
//         </form>
//       )}

//       {submittedData.length > 0 && !showForm && (
//         <table className="min-w-full bg-white border border-gray-300 mt-6">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2">Work Name</th>
//               <th className="p-2">Start Date</th>
//               <th className="p-2">End Date</th>
//               <th className="p-2">Description</th>
//               <th className="p-2">Remarks</th>
//               <th className="p-2">Image</th>
//               <th className="p-2">Video</th>
//               <th className="p-2">Document</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submittedData
//               .filter((work) => work.workName?.toLowerCase().includes(searchKeyword.toLowerCase()) || work.description?.toLowerCase().includes(searchKeyword.toLowerCase()))
//               .map((work, index) => (
//                 <tr key={work._id}>
//                   <td className="p-2">{work.workName}</td>
//                   <td className="p-2">{work.startDate}</td>
//                   <td className="p-2">{work.endDate}</td>
//                   <td className="p-2">{work.description}</td>
//                   <td className="p-2">{work.remarks}</td>
//                   <td className="p-2">{work.image}</td>
//                   <td className="p-2">{work.video}</td>
//                   <td className="p-2">{work.docOrExcel}</td>
//                   <td className="p-2 flex gap-2 justify-center">
//                     <button onClick={() => { setShowModal(true); setSelectedWork(work); }}><FaEye /></button>
//                     <button onClick={() => { setShowForm(true); setEditIndex(index); reset(work); }}><FaEdit /></button>
//                     <button onClick={() => handleDelete(work._id)}><FaTrashAlt className="text-red-600" /></button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}

//       {showModal && selectedWork && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Work Details</h2>
//             <p><strong>Work Name:</strong> {selectedWork.workName}</p>
//             <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
//             <p><strong>End Date:</strong> {selectedWork.endDate}</p>
//             <p><strong>Description:</strong> {selectedWork.description}</p>
//             <p><strong>Remarks:</strong> {selectedWork.remarks}</p>
//             <p><strong>Image:</strong> {selectedWork.image}</p>
//             <p><strong>Video:</strong> {selectedWork.video}</p>
//             <p><strong>Document:</strong> {selectedWork.docOrExcel}</p>
//             <button onClick={() => setShowModal(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkForm;


// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

// const WorkForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm();

//   const [showForm, setShowForm] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedWork, setSelectedWork] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work`);
//         const data = await res.json();
//         setSubmittedData(data);
//       } catch (err) {
//         console.error('Failed to load data:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     for (const key in data) {
//       if (data[key] instanceof FileList && data[key].length > 0) {
//         formData.append(key, data[key][0]);
//       } else {
//         formData.append(key, data[key]);
//       }
//     }

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work`, {
//         method: 'POST',
//         body: formData,
//       });

//       const savedWork = await response.json();

//       if (editIndex !== null) {
//         const updated = [...submittedData];
//         updated[editIndex] = savedWork;
//         setSubmittedData(updated);
//       } else {
//         setSubmittedData((prev) => [...prev, savedWork]);
//       }

//       setShowForm(false);
//       reset();
//       setEditIndex(null);
//     } catch (err) {
//       console.error('Failed to submit:', err);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchKeyword(e.target.value);
//   };

//   const filteredData = submittedData.filter((work) =>
//     work.workName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//     work.description?.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   const handleView = (workData) => {
//     setSelectedWork(workData);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           value={searchKeyword}
//           onChange={handleSearchChange}
//           placeholder="Search by Work Name or Description"
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditIndex(null);
//             reset();
//           }}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Add Work Details
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-6 rounded shadow-md mt-4">
//           <h2 className="text-2xl font-semibold mb-4">{editIndex !== null ? 'Edit Work Details' : 'Add Work Details'}</h2>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6"
//           >
//             <div>
//               <label className="block text-sm font-medium">Work Name</label>
//               <input
//                 type="text"
//                 {...register('workName', { required: 'Work name is required' })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.workName && <p className="text-red-500 text-sm">{errors.workName.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Start Date</label>
//               <input
//                 type="date"
//                 {...register('startDate', { required: 'Start date is required' })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">End Date</label>
//               <input
//                 type="date"
//                 {...register('endDate', {
//                   required: 'End date is required',
//                   validate: (value) => value >= watch('startDate') || 'End date should be after start date',
//                 })}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//               {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
//             </div>

//             <div className="md:col-span-3">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">Description</label>
//                   <textarea
//                     {...register('description', { required: 'Description is required' })}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                   {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">Remarks</label>
//                   <textarea
//                     {...register('remarks')}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </div>
//               </div>
//             </div>

//             {['image', 'video', 'docOrExcel'].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium">Upload {field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                 <input
//                   type="file"
//                   {...register(field)}
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//                 {editIndex !== null && submittedData[editIndex]?.[field] && (
//                   <p className="text-sm text-gray-600 mt-1">Current: {submittedData[editIndex][field]}</p>
//                 )}
//               </div>
//             ))}

//             <div className="md:col-span-3 flex justify-between mt-6">
//               <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded">Submit</button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditIndex(null);
//                   reset();
//                 }}
//                 className="text-sm text-gray-600 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {submittedData.length > 0 && !showForm && (
//         <div className="mt-6 bg-white p-6 rounded shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
//           <table className="min-w-full bg-gray-100 border border-gray-300 rounded shadow-md text-center">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-4">Work Name</th>
//                 <th className="p-4">Start Date</th>
//                 <th className="p-4">End Date</th>
//                 <th className="p-4">Description</th>
//                 <th className="p-4">Remarks</th>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Video</th>
//                 <th className="p-4">Document</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="p-4">No results found</td>
//                 </tr>
//               ) : (
//                 filteredData.map((work, index) => (
//                   <tr key={work._id}>
//                     <td className="p-4">{work.workName}</td>
//                     <td className="p-4">{work.startDate}</td>
//                     <td className="p-4">{work.endDate}</td>
//                     <td className="p-4">{work.description}</td>
//                     <td className="p-4">{work.remarks}</td>
//                     <td className="p-4">{work.image}</td>
//                     <td className="p-4">{work.video}</td>
//                     <td className="p-4">{work.docOrExcel}</td>
//                     <td className="p-4 flex justify-center gap-2">
//                       <button className="text-blue-600" onClick={() => handleView(work)}><FaEye size={20} /></button>
//                       <button
//                         className="text-yellow-500"
//                         onClick={() => {
//                           setShowForm(true);
//                           setEditIndex(index);
//                           reset({
//                             workName: work.workName,
//                             startDate: work.startDate?.slice(0, 10),
//                             endDate: work.endDate?.slice(0, 10),
//                             description: work.description,
//                             remarks: work.remarks,
//                           });
//                         }}
//                       >
//                         <FaEdit size={20} />
//                       </button>
//                       <button
//                         className="text-red-600"
//                         onClick={async () => {
//                           if (window.confirm('Are you sure you want to delete this entry?')) {
//                             try {
//                               const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work/${work._id}`, {
//                                 method: 'DELETE',
//                               });
//                               if (!res.ok) throw new Error();
//                               setSubmittedData((prev) => prev.filter((_, i) => i !== index));
//                             } catch {
//                               console.error('Failed to delete entry');
//                               alert('Failed to delete entry');
//                             }
//                           }
//                         }}
//                       >
//                         <FaTrashAlt size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showModal && selectedWork && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
//             <h3 className="text-2xl font-semibold mb-4">Work Details</h3>
//             <p><strong>Work Name:</strong> {selectedWork.workName}</p>
//             <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
//             <p><strong>End Date:</strong> {selectedWork.endDate}</p>
//             <p><strong>Description:</strong> {selectedWork.description}</p>
//             <p><strong>Remarks:</strong> {selectedWork.remarks}</p>
//             <p><strong>Image:</strong> {selectedWork.image}</p>
//             <p><strong>Video:</strong> {selectedWork.video}</p>
//             <p><strong>Document:</strong> {selectedWork.docOrExcel}</p>
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded mt-4"
//               onClick={handleCloseModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkForm;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work`);
        const data = await res.json();
        setSubmittedData(data);
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] instanceof FileList && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const url =
        editIndex !== null
          ? `${import.meta.env.VITE_API_URL}/api/work/${submittedData[editIndex]._id}`
          : `${import.meta.env.VITE_API_URL}/api/work`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const savedWork = await response.json();

      if (editIndex !== null) {
        const updated = [...submittedData];
        updated[editIndex] = savedWork;
        setSubmittedData(updated);
      } else {
        setSubmittedData((prev) => [...prev, savedWork]);
      }

      setShowForm(false);
      reset();
      setEditIndex(null);
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  const handleSearchChange = (e) => setSearchKeyword(e.target.value);

  const filteredData = submittedData.filter(
    (work) =>
      work.workName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      work.description?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleView = (workData) => {
    setSelectedWork(workData);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async (id, index) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/work/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error();
        setSubmittedData((prev) => prev.filter((_, i) => i !== index));
      } catch (err) {
        console.error('Failed to delete entry', err);
        alert('Failed to delete entry');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search by Work Name or Description"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditIndex(null);
            reset();
          }}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add Work Details
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">
            {editIndex !== null ? 'Edit Work Details' : 'Add Work Details'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium">Work Name</label>
              <input
                type="text"
                {...register('workName', { required: 'Work name is required' })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.workName && <p className="text-red-500 text-sm">{errors.workName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                  validate: (value) =>
                    value >= watch('startDate') || 'End date should be after start date',
                })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Remarks</label>
                  <textarea
                    {...register('remarks')}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {['image', 'video', 'docOrExcel'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium">Upload {field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="file"
                  {...register(field)}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                {editIndex !== null && submittedData[editIndex]?.[field] && (
                  <p className="text-sm text-gray-600 mt-1">Current: {submittedData[editIndex][field]}</p>
                )}
              </div>
            ))}

            <div className="md:col-span-3 flex justify-between mt-6">
              <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded">
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  reset();
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {submittedData.length > 0 && !showForm && (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded shadow-md text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Work Name</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Remarks</th>
                <th className="p-4">Image</th>
                <th className="p-4">Video</th>
                <th className="p-4">Document</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-4">No results found</td>
                </tr>
              ) : (
                filteredData.map((work, index) => (
                  <tr key={index}>
                    <td className="p-4">{work.workName}</td>
                    <td className="p-4">{work.startDate}</td>
                    <td className="p-4">{work.endDate}</td>
                    <td className="p-4">{work.description}</td>
                    <td className="p-4">{work.remarks}</td>
                    <td className="p-4">{work.image}</td>
                    <td className="p-4">{work.video}</td>
                    <td className="p-4">{work.docOrExcel}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <button className="text-blue-600" onClick={() => handleView(work)}>
                        <FaEye size={20} />
                      </button>
                      <button
                        className="text-yellow-500"
                        onClick={() => {
                          setShowForm(true);
                          setEditIndex(index);
                          reset({
                            workName: work.workName,
                            startDate: work.startDate?.slice(0, 10),
                            endDate: work.endDate?.slice(0, 10),
                            description: work.description,
                            remarks: work.remarks,
                          });
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(work._id, index)}
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Work Details</h3>
            <p><strong>Work Name:</strong> {selectedWork.workName}</p>
            <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
            <p><strong>End Date:</strong> {selectedWork.endDate}</p>
            <p><strong>Description:</strong> {selectedWork.description}</p>
            <p><strong>Remarks:</strong> {selectedWork.remarks}</p>
            <p><strong>Image:</strong> {selectedWork.image}</p>
            <p><strong>Video:</strong> {selectedWork.video}</p>
            <p><strong>Document:</strong> {selectedWork.docOrExcel}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkForm;
