// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:5000/api/clients';

// const initialClient = {
//   name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
//   state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
// };

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [clientToEdit, setClientToEdit] = useState(null);
//   const [newClient, setNewClient] = useState(initialClient);
//   const navigate = useNavigate();

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setClients(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewClient(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddClient = async () => {
//     try {
//       await axios.post(API_URL, newClient);
//       fetchClients();
//       setNewClient(initialClient);
//       setIsModalOpen(false);
//     } catch (err) {
//       alert('Error adding client');
//     }
//   };

//   const handleEdit = (client) => {
//     setNewClient(client);
//     setClientToEdit(client);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleUpdateClient = async () => {
//     try {
//       await axios.put(`${API_URL}/${clientToEdit._id}`, newClient);
//       fetchClients();
//       setIsEditMode(false);
//       setIsModalOpen(false);
//       setNewClient(initialClient);
//     } catch (err) {
//       alert('Error updating client');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure to delete?')) {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchClients();
//     }
//   };

//   const handleCreateInvoice = (client) => {
//     localStorage.setItem('selectedClient', JSON.stringify(client));
//     navigate('/invoices');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

//       <button
//         onClick={() => { setIsModalOpen(true); setIsEditMode(false); setNewClient(initialClient); }}
//         className="mb-6 py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Add New Client
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded w-[800px]">
//             <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
//             <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Object.keys(initialClient).map((key) => (
//                 <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
//                   <label className="text-sm font-medium block capitalize">{key}</label>
//                   {key === 'notes' ? (
//                     <textarea name={key} value={newClient[key]} onChange={handleChange} className="w-full p-2 border rounded" />
//                   ) : (
//                     <input type="text" name={key} value={newClient[key]} onChange={handleChange} className="w-full p-2 border rounded" />
//                   )}
//                 </div>
//               ))}
//               <div className="col-span-3 flex justify-between mt-4">
//                 <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
//                 <button
//                   onClick={isEditMode ? handleUpdateClient : handleAddClient}
//                   type="button"
//                   className="bg-blue-600 text-white py-2 px-4 rounded"
//                 >
//                   {isEditMode ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <table className="w-full mt-8 border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map(client => (
//             <tr key={client._id}>
//               <td className="border p-2">{client.name}</td>
//               <td className="border p-2">{client.email}</td>
//               <td className="border p-2">{client.phone}</td>
//               <td className="border p-2">{client.address}</td>
//               <td className="border p-2">{client.companyName}</td>
//               <td className="border p-2 space-x-2">
//                 <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button>
//                 <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Create Invoice</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:5000/api/clients';
// const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';

// const initialClient = {
//   name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
//   state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
// };

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [clientToEdit, setClientToEdit] = useState(null);
//   const [newClient, setNewClient] = useState(initialClient);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchClients();
//     fetchCountries();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setClients(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const res = await axios.get(`${COUNTRY_API}/positions`);
//       const countryList = res.data.data.map(c => c.name);
//       setCountries(countryList);
//     } catch (err) {
//       console.error('Error fetching countries:', err);
//     }
//   };

//   const fetchStates = async (country) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/states`, { country });
//       setStates(res.data.data.states.map(s => s.name));
//     } catch (err) {
//       console.error('Error fetching states:', err);
//     }
//   };

//   const fetchCities = async (country, state) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/state/cities`, { country, state });
//       setCities(res.data.data);
//     } catch (err) {
//       console.error('Error fetching cities:', err);
//     }
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     if (name === 'country') {
//       setNewClient(prev => ({ ...prev, country: value, state: '', city: '' }));
//       setStates([]);
//       setCities([]);
//       await fetchStates(value);
//     } else if (name === 'state') {
//       setNewClient(prev => ({ ...prev, state: value, city: '' }));
//       setCities([]);
//       await fetchCities(newClient.country, value);
//     } else {
//       setNewClient(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddClient = async () => {
//     try {
//       await axios.post(API_URL, newClient);
//       fetchClients();
//       setNewClient(initialClient);
//       setIsModalOpen(false);
//     } catch (err) {
//       alert('Error adding client');
//     }
//   };

//   const handleEdit = async (client) => {
//     setNewClient(client);
//     setClientToEdit(client);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//     await fetchStates(client.country);
//     await fetchCities(client.country, client.state);
//   };

//   const handleUpdateClient = async () => {
//     try {
//       await axios.put(`${API_URL}/${clientToEdit._id}`, newClient);
//       fetchClients();
//       setIsEditMode(false);
//       setIsModalOpen(false);
//       setNewClient(initialClient);
//     } catch (err) {
//       alert('Error updating client');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure to delete?')) {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchClients();
//     }
//   };

//   const handleCreateInvoice = (client) => {
//     localStorage.setItem('selectedClient', JSON.stringify(client));
//     navigate('/invoices');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

//       <button
//         onClick={() => {
//           setIsModalOpen(true);
//           setIsEditMode(false);
//           setNewClient(initialClient);
//           setStates([]);
//           setCities([]);
//         }}
//         className="mb-6 py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Add New Client
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-auto">
//             <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
//             <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Object.keys(initialClient).map((key) => (
//                 <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
//                   <label className="text-sm font-medium block capitalize">{key}</label>
//                   {key === 'country' ? (
//                     <select name="country" value={newClient.country} onChange={handleChange} className="w-full p-2 border rounded">
//                       <option value="">Select Country</option>
//                       {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                   ) : key === 'state' ? (
//                     <select name="state" value={newClient.state} onChange={handleChange} className="w-full p-2 border rounded">
//                       <option value="">Select State</option>
//                       {states.map(s => <option key={s} value={s}>{s}</option>)}
//                     </select>
//                   ) : key === 'city' ? (
//                     <select name="city" value={newClient.city} onChange={handleChange} className="w-full p-2 border rounded">
//                       <option value="">Select City</option>
//                       {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                   ) : key === 'notes' ? (
//                     <textarea name={key} value={newClient[key]} onChange={handleChange} className="w-full p-2 border rounded" />
//                   ) : (
//                     <input type="text" name={key} value={newClient[key]} onChange={handleChange} className="w-full p-2 border rounded" />
//                   )}
//                 </div>
//               ))}
//               <div className="col-span-3 flex justify-between mt-4">
//                 <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
//                 <button
//                   onClick={isEditMode ? handleUpdateClient : handleAddClient}
//                   type="button"
//                   className="bg-blue-600 text-white py-2 px-4 rounded"
//                 >
//                   {isEditMode ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <table className="w-full mt-8 border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map(client => (
//             <tr key={client._id}>
//               <td className="border p-2">{client.name}</td>
//               <td className="border p-2">{client.email}</td>
//               <td className="border p-2">{client.phone}</td>
//               <td className="border p-2">{client.address}</td>
//               <td className="border p-2">{client.companyName}</td>
//               <td className="border p-2 space-x-2">
//                 <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button>
//                 <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Create Invoice</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const API_URL = 'http://localhost:5000/api/clients';
// const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';

// const initialValues = {
//   name: '', email: '', phone: '', address: '', city: '', zipCode: '',
//   country: '', state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phone: Yup.string().required('Phone is required'),
//   country: Yup.string().required('Country is required'),
//   state: Yup.string().required('State is required'),
//   city: Yup.string().required('City is required'),
// });

// export default function ClientList() {
//   const [clients, setClients] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingClientId, setEditingClientId] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchClients();
//     fetchCountries();
//   }, []);

//   const fetchClients = async () => {
//     const res = await axios.get(API_URL);
//     setClients(res.data);
//   };

//   const fetchCountries = async () => {
//     const res = await axios.get(`${COUNTRY_API}/positions`);
//     const countryList = res.data.data.map(c => c.name);
//     setCountries(countryList);
//   };

//   const fetchStates = async (country) => {
//     const res = await axios.post(`${COUNTRY_API}/states`, { country });
//     setStates(res.data.data.states.map(s => s.name));
//   };

//   const fetchCities = async (country, state) => {
//     const res = await axios.post(`${COUNTRY_API}/state/cities`, { country, state });
//     setCities(res.data.data);
//   };

//   const handleSubmit = async (values, actions) => {
//     try {
//       if (editMode) {
//         await axios.put(`${API_URL}/${editingClientId}`, values);
//       } else {
//         await axios.post(API_URL, values);
//       }
//       fetchClients();
//       actions.resetForm();
//       setIsModalOpen(false);
//       setEditMode(false);
//       setEditingClientId(null);
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleEdit = async (client) => {
//     setEditMode(true);
//     setEditingClientId(client._id);
//     setIsModalOpen(true);
//     await fetchStates(client.country);
//     await fetchCities(client.country, client.state);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure?')) {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchClients();
//     }
//   };

//   const handleCreateInvoice = (client) => {
//     localStorage.setItem('selectedClient', JSON.stringify(client));
//     navigate('/invoices');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

//       <button
//         className="mb-6 py-2 px-4 bg-green-600 text-white rounded"
//         onClick={() => {
//           setIsModalOpen(true);
//           setEditMode(false);
//           setStates([]);
//           setCities([]);
//         }}
//       >
//         Add New Client
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-auto">
//             <h3 className="text-xl font-bold mb-4">
//               {editMode ? 'Edit Client' : 'Add Client'}
//             </h3>

//             <Formik
//               initialValues={editMode ? clients.find(c => c._id === editingClientId) || initialValues : initialValues}
//               enableReinitialize
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values, handleChange, setFieldValue }) => (
//                 <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.keys(initialValues).map(key => (
//                     <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
//                       <label className="block text-sm font-medium capitalize">{key}</label>

//                       {key === 'country' ? (
//                         <Field
//                           as="select"
//                           name="country"
//                           className="w-full p-2 border rounded"
//                           onChange={async e => {
//                             handleChange(e);
//                             const country = e.target.value;
//                             setFieldValue('state', '');
//                             setFieldValue('city', '');
//                             setStates([]);
//                             setCities([]);
//                             await fetchStates(country);
//                           }}
//                         >
//                           <option value="">Select Country</option>
//                           {countries.map(c => (
//                             <option key={c} value={c}>{c}</option>
//                           ))}
//                         </Field>
//                       ) : key === 'state' ? (
//                         <Field
//                           as="select"
//                           name="state"
//                           className="w-full p-2 border rounded"
//                           onChange={async e => {
//                             handleChange(e);
//                             const state = e.target.value;
//                             setFieldValue('city', '');
//                             await fetchCities(values.country, state);
//                           }}
//                         >
//                           <option value="">Select State</option>
//                           {states.map(s => (
//                             <option key={s} value={s}>{s}</option>
//                           ))}
//                         </Field>
//                       ) : key === 'city' ? (
//                         <Field as="select" name="city" className="w-full p-2 border rounded">
//                           <option value="">Select City</option>
//                           {cities.map(c => (
//                             <option key={c} value={c}>{c}</option>
//                           ))}
//                         </Field>
//                       ) : key === 'notes' ? (
//                         <Field
//                           as="textarea"
//                           name={key}
//                           className="w-full p-2 border rounded"
//                         />
//                       ) : (
//                         <Field
//                           type="text"
//                           name={key}
//                           className="w-full p-2 border rounded"
//                         />
//                       )}

//                       <ErrorMessage name={key} component="div" className="text-red-500 text-sm mt-1" />
//                     </div>
//                   ))}

//                   <div className="col-span-3 flex justify-between mt-4">
//                     <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
//                       Cancel
//                     </button>
//                     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//                       {editMode ? 'Update' : 'Add'}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}

//       <table className="w-full border mt-8 text-sm">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Address</th>
//             <th className="p-2 border">Company</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map(client => (
//             <tr key={client._id}>
//               <td className="p-2 border">{client.name}</td>
//               <td className="p-2 border">{client.email}</td>
//               <td className="p-2 border">{client.phone}</td>
//               <td className="p-2 border">{client.address}</td>
//               <td className="p-2 border">{client.companyName}</td>
//               <td className="p-2 border space-x-2">
//                 <button onClick={() => handleEdit(client)} className="text-blue-600">Edit</button>
//                 <button onClick={() => handleDelete(client._id)} className="text-red-600">Delete</button>
//                 <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Invoice</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = 'http://localhost:5000/api/clients';
// const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';

// const initialValues = {
//   name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
//   state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid').required('Required'),
//   phone: Yup.string().required('Required'),
//   address: Yup.string().required('Required'),
//   city: Yup.string().required('Required'),
//   zipCode: Yup.string().required('Required'),
//   country: Yup.string().required('Required'),
//   state: Yup.string().required('Required'),
//   companyName: Yup.string(),
//   gst: Yup.string(),
//   pan: Yup.string(),
//   cin: Yup.string(),
//   notes: Yup.string()
// });

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [clientToEdit, setClientToEdit] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchClients();
//     fetchCountries();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setClients(res.data);
//     } catch (err) {
//       toast.error('Failed to load clients');
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const res = await axios.get(`${COUNTRY_API}/positions`);
//       const countryList = res.data.data.map(c => c.name);
//       setCountries(countryList);
//     } catch {
//       toast.error('Failed to fetch countries');
//     }
//   };

//   const fetchStates = async (country) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/states`, { country });
//       setStates(res.data.data.states.map(s => s.name));
//     } catch {
//       toast.error('Failed to fetch states');
//     }
//   };

//   const fetchCities = async (country, state) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/state/cities`, { country, state });
//       setCities(res.data.data);
//     } catch {
//       toast.error('Failed to fetch cities');
//     }
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       if (isEditMode) {
//         await axios.put(`${API_URL}/${clientToEdit._id}`, values);
//         toast.success('Client updated successfully');
//       } else {
//         await axios.post(API_URL, values);
//         toast.success('Client added successfully');
//       }
//       fetchClients();
//       setIsModalOpen(false);
//       setIsEditMode(false);
//       setClientToEdit(null);
//       resetForm();
//     } catch {
//       toast.error('Error saving client');
//     }
//   };

//   const handleEdit = async (client) => {
//     setClientToEdit(client);
//     await fetchStates(client.country);
//     await fetchCities(client.country, client.state);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure to delete?')) {
//       try {
//         await axios.delete(`${API_URL}/${id}`);
//         fetchClients();
//         toast.success('Client deleted');
//       } catch {
//         toast.error('Error deleting client');
//       }
//     }
//   };

//   const handleCreateInvoice = (client) => {
//     localStorage.setItem('selectedClient', JSON.stringify(client));
//     navigate('/invoices');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

//       <button
//         onClick={() => {
//           setIsModalOpen(true);
//           setIsEditMode(false);
//           setClientToEdit(null);
//           setStates([]);
//           setCities([]);
//         }}
//         className="mb-6 py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Add New Client
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-auto">
//             <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
//             <Formik
//               initialValues={clientToEdit || initialValues}
//               enableReinitialize
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values, handleChange, setFieldValue }) => (
//                 <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.keys(initialValues).map((key) => (
//                     <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
//                       <label className="text-sm font-medium block capitalize">{key}</label>
//                       {key === 'country' ? (
//                         <Field
//                           as="select"
//                           name="country"
//                           className="w-full p-2 border rounded"
//                           onChange={async (e) => {
//                             const country = e.target.value;
//                             setFieldValue('country', country);
//                             setFieldValue('state', '');
//                             setFieldValue('city', '');
//                             setStates([]);
//                             setCities([]);
//                             await fetchStates(country);
//                           }}
//                         >
//                           <option value="">Select Country</option>
//                           {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                         </Field>
//                       ) : key === 'state' ? (
//                         <Field
//                           as="select"
//                           name="state"
//                           className="w-full p-2 border rounded"
//                           onChange={async (e) => {
//                             const state = e.target.value;
//                             setFieldValue('state', state);
//                             setFieldValue('city', '');
//                             await fetchCities(values.country, state);
//                           }}
//                         >
//                           <option value="">Select State</option>
//                           {states.map(s => <option key={s} value={s}>{s}</option>)}
//                         </Field>
//                       ) : key === 'city' ? (
//                         <Field as="select" name="city" className="w-full p-2 border rounded">
//                           <option value="">Select City</option>
//                           {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                         </Field>
//                       ) : key === 'notes' ? (
//                         <Field as="textarea" name={key} className="w-full p-2 border rounded" />
//                       ) : (
//                         <Field type="text" name={key} className="w-full p-2 border rounded" />
//                       )}
//                       <ErrorMessage name={key} component="div" className="text-red-600 text-sm" />
//                     </div>
//                   ))}
//                   <div className="col-span-3 flex justify-between mt-4">
//                     <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
//                     <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
//                       {isEditMode ? 'Update' : 'Add'}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}

//       <table className="w-full mt-8 border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map(client => (
//             <tr key={client._id}>
//               <td className="border p-2">{client.name}</td>
//               <td className="border p-2">{client.email}</td>
//               <td className="border p-2">{client.phone}</td>
//               <td className="border p-2">{client.address}</td>
//               <td className="border p-2">{client.companyName}</td>
//               <td className="border p-2 space-x-2">
//                 <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button>
//                 <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Create Invoice</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = 'http://localhost:5000/api/clients';
// const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';

// const initialValues = {
//   name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
//   state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid').required('Required'),
//   phone: Yup.string().required('Required'),
//   address: Yup.string().required('Required'),
//   city: Yup.string().required('Required'),
//   zipCode: Yup.string().required('Required'),
//   country: Yup.string().required('Required'),
//   state: Yup.string().required('Required'),
//   companyName: Yup.string(),
//   gst: Yup.string(),
//   pan: Yup.string(),
//   cin: Yup.string(),
//   notes: Yup.string()
// });

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [clientToEdit, setClientToEdit] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchClients();
//     fetchCountries();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setClients(res.data);
//     } catch {
//       toast.error('Failed to load clients');
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const res = await axios.get(`${COUNTRY_API}/positions`);
//       const countryList = res.data.data.map(c => c.name);
//       setCountries(countryList);
//     } catch {
//       toast.error('Failed to fetch countries');
//     }
//   };

//   const fetchStates = async (country) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/states`, { country });
//       setStates(res.data.data.states.map(s => s.name));
//     } catch {
//       toast.error('Failed to fetch states');
//     }
//   };

//   const fetchCities = async (country, state) => {
//     try {
//       const res = await axios.post(`${COUNTRY_API}/state/cities`, { country, state });
//       setCities(res.data.data);
//     } catch {
//       toast.error('Failed to fetch cities');
//     }
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       if (isEditMode) {
//         await axios.put(`${API_URL}/${clientToEdit._id}`, values);
//         toast.success('Client updated successfully');
//       } else {
//         await axios.post(API_URL, values);
//         toast.success('Client added successfully');
//       }
//       fetchClients();
//       setIsModalOpen(false);
//       setIsEditMode(false);
//       setClientToEdit(null);
//       resetForm();
//     } catch {
//       toast.error('Error saving client');
//     }
//   };

//   const handleEdit = async (client) => {
//     setClientToEdit(client);
//     await fetchStates(client.country);
//     await fetchCities(client.country, client.state);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure to delete?')) {
//       try {
//         await axios.delete(`${API_URL}/${id}`);
//         fetchClients();
//         toast.success('Client deleted');
//       } catch {
//         toast.error('Error deleting client');
//       }
//     }
//   };

//   const handleCreateInvoice = (client) => {
//     localStorage.setItem('selectedClient', JSON.stringify(client));
//     navigate('/invoices');
//   };

//   const filteredClients = clients.filter(client =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (client.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

//       <div className="mb-4 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search by name, email, phone, company..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full md:w-1/3 p-2 border rounded"
//         />

//         <button
//           onClick={() => {
//             setIsModalOpen(true);
//             setIsEditMode(false);
//             setClientToEdit(null);
//             setStates([]);
//             setCities([]);
//           }}
//           className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
//         >
//           Add New Client
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-auto">
//             <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
//             <Formik
//               initialValues={clientToEdit || initialValues}
//               enableReinitialize
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values, setFieldValue }) => (
//                 <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.keys(initialValues).map((key) => (
//                     <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
//                       <label className="text-sm font-medium block capitalize">{key}</label>
//                       {key === 'country' ? (
//                         <Field
//                           as="select"
//                           name="country"
//                           className="w-full p-2 border rounded"
//                           onChange={async (e) => {
//                             const country = e.target.value;
//                             setFieldValue('country', country);
//                             setFieldValue('state', '');
//                             setFieldValue('city', '');
//                             setStates([]);
//                             setCities([]);
//                             await fetchStates(country);
//                           }}
//                         >
//                           <option value="">Select Country</option>
//                           {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                         </Field>
//                       ) : key === 'state' ? (
//                         <Field
//                           as="select"
//                           name="state"
//                           className="w-full p-2 border rounded"
//                           onChange={async (e) => {
//                             const state = e.target.value;
//                             setFieldValue('state', state);
//                             setFieldValue('city', '');
//                             await fetchCities(values.country, state);
//                           }}
//                         >
//                           <option value="">Select State</option>
//                           {states.map(s => <option key={s} value={s}>{s}</option>)}
//                         </Field>
//                       ) : key === 'city' ? (
//                         <Field as="select" name="city" className="w-full p-2 border rounded">
//                           <option value="">Select City</option>
//                           {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                         </Field>
//                       ) : key === 'notes' ? (
//                         <Field as="textarea" name={key} className="w-full p-2 border rounded" />
//                       ) : (
//                         <Field type="text" name={key} className="w-full p-2 border rounded" />
//                       )}
//                       <ErrorMessage name={key} component="div" className="text-red-600 text-sm" />
//                     </div>
//                   ))}
//                   <div className="col-span-3 flex justify-between mt-4">
//                     <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
//                     <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
//                       {isEditMode ? 'Update' : 'Add'}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}

//       <table className="w-full mt-8 border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClients.map(client => (
//             <tr key={client._id}>
//               <td className="border p-2">{client.name}</td>
//               <td className="border p-2">{client.email}</td>
//               <td className="border p-2">{client.phone}</td>
//               <td className="border p-2">{client.address}</td>
//               <td className="border p-2">{client.companyName}</td>
//               <td className="border p-2 space-x-2">
//                 <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button>
//                 <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Create Invoice</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientList;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:5000/api/clients';
const COUNTRY_API = 'https://countriesnow.space/api/v0.1/countries';

const initialValues = {
  name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '',
  state: '', companyName: '', gst: '', pan: '', cin: '', notes: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  companyName: Yup.string(),
  gst: Yup.string(),
  pan: Yup.string(),
  cin: Yup.string(),
  notes: Yup.string()
});

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
    fetchCountries();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(API_URL);
      setClients(res.data);
    } catch {
      toast.error('Failed to load clients');
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${COUNTRY_API}/positions`);
      const countryList = res.data.data.map(c => c.name);
      setCountries(countryList);
    } catch {
      toast.error('Failed to fetch countries');
    }
  };

  const fetchStates = async (country) => {
    try {
      const res = await axios.post(`${COUNTRY_API}/states`, { country });
      setStates(res.data.data.states.map(s => s.name));
    } catch {
      toast.error('Failed to fetch states');
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const res = await axios.post(`${COUNTRY_API}/state/cities`, { country, state });
      setCities(res.data.data);
    } catch {
      toast.error('Failed to fetch cities');
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${clientToEdit._id}`, values);
        toast.success('Client updated successfully');
        fetchClients();
      } else {
        const res = await axios.post(API_URL, values);
        const newClient = res.data;
        setClients(prev => [newClient, ...prev]); // Add immediately to UI
        toast.success('Client added successfully');
      }
      setIsModalOpen(false);
      setIsEditMode(false);
      setClientToEdit(null);
      resetForm();
    } catch {
      toast.error('Error saving client');
    }
  };

  const handleEdit = async (client) => {
    setClientToEdit(client);
    await fetchStates(client.country);
    await fetchCities(client.country, client.state);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setClients(prev => prev.filter(c => c._id !== id));
        toast.success('Client deleted');
      } catch {
        toast.error('Error deleting client');
      }
    }
  };

  const handleCreateInvoice = (client) => {
    localStorage.setItem('selectedClient', JSON.stringify(client));
    navigate('/invoices');
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email, phone, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        />
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setClientToEdit(null);
            setStates([]);
            setCities([]);
          }}
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
        >
          Add New Client
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Client' : 'Add Client'}</h3>
            <Formik
              initialValues={clientToEdit || initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(initialValues).map((key) => (
                    <div key={key} className={key === 'notes' ? 'col-span-3' : ''}>
                      <label className="text-sm font-medium block capitalize">{key}</label>
                      {key === 'country' ? (
                        <Field
                          as="select"
                          name="country"
                          className="w-full p-2 border rounded"
                          onChange={async (e) => {
                            const country = e.target.value;
                            setFieldValue('country', country);
                            setFieldValue('state', '');
                            setFieldValue('city', '');
                            setStates([]);
                            setCities([]);
                            await fetchStates(country);
                          }}
                        >
                          <option value="">Select Country</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </Field>
                      ) : key === 'state' ? (
                        <Field
                          as="select"
                          name="state"
                          className="w-full p-2 border rounded"
                          onChange={async (e) => {
                            const state = e.target.value;
                            setFieldValue('state', state);
                            setFieldValue('city', '');
                            await fetchCities(values.country, state);
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </Field>
                      ) : key === 'city' ? (
                        <Field as="select" name="city" className="w-full p-2 border rounded">
                          <option value="">Select City</option>
                          {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </Field>
                      ) : key === 'notes' ? (
                        <Field as="textarea" name={key} className="w-full p-2 border rounded" />
                      ) : (
                        <Field type="text" name={key} className="w-full p-2 border rounded" />
                      )}
                      <ErrorMessage name={key} component="div" className="text-red-600 text-sm" />
                    </div>
                  ))}
                  <div className="col-span-3 flex justify-between mt-4">
                    <button onClick={() => setIsModalOpen(false)} type="button" className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                      {isEditMode ? 'Update' : 'Add'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      <table className="w-full mt-8 border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client._id}>
              <td className="border p-2">{client.name}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">{client.phone}</td>
              <td className="border p-2">{client.address}</td>
              <td className="border p-2">{client.companyName}</td>
              <td className="border p-2 space-x-2">
                {/* <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button> */}
                {/* <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button> */}
                <button onClick={() => handleCreateInvoice(client)} className="text-green-600">Create Invoice</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
