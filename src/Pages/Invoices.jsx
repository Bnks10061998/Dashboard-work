
// import React, { useState } from 'react';
// import axios from 'axios';
// import InvoicePDF from './InvoicePDF';
// import { Plus, Trash2, FileText } from 'lucide-react';

// const Invoices = () => {
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: '',
//     date: '',
//     clientName: '',
//     billingAddress: '',
//     clientEmail: '',
//     discount: 0,
//     taxPercentage: 0,
//     items: [{ description: '', rate: '', quantity: '' }],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...invoiceData.items];
//     newItems[index][field] = value;
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const addItem = () => {
//     setInvoiceData((prev) => ({
//       ...prev,
//       items: [...prev.items, { description: '', rate: '', quantity: '' }],
//     }));
//   };

//   const removeItem = (index) => {
//     const newItems = invoiceData.items.filter((_, i) => i !== index);
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/invoices/create', invoiceData);
//       alert('Invoice saved successfully!');
//       console.log(res.data);
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       alert('Failed to save invoice');
//     }
//   };

//   const subtotal = invoiceData.items.reduce((acc, item) => {
//     const rate = parseFloat(item.rate) || 0;
//     const quantity = parseFloat(item.quantity) || 0;
//     return acc + rate * quantity;
//   }, 0);

//   const discountAmount = (subtotal * parseFloat(invoiceData.discount || 0)) / 100;
//   const taxAmount = ((subtotal - discountAmount) * parseFloat(invoiceData.taxPercentage || 0)) / 100;
//   const grandTotal = subtotal - discountAmount + taxAmount;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 text-cyan-700">
//         <FileText className="w-8 h-8" /> Create Invoice
//       </h1>

//       {/* Invoice Fields */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4 border">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             { label: 'Invoice Number', name: 'invoiceNumber', type: 'text' },
//             { label: 'Invoice Date', name: 'date', type: 'date' },
//             { label: 'Client Name', name: 'clientName', type: 'text' },
//             { label: 'Client Email', name: 'clientEmail', type: 'email' },
//             { label: 'Billing Address', name: 'billingAddress', type: 'textarea' },
//             { label: 'Discount (%)', name: 'discount', type: 'number' },
//             { label: 'Tax (%)', name: 'taxPercentage', type: 'number' },
            

//           ].map(({ label, name, type }) => (
//             <div key={name} className={name === 'billingAddress' ? 'md:col-span-2' : ''}>
//               <label className="block text-sm font-medium mb-1">{label}</label>
//               {type === 'textarea' ? (
//                 <textarea
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                   rows={3}
//                 />
//               ) : (
//                 <input
//                   type={type}
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                 />
//               )}
//             </div>
            
//           ))}
//         </div>
//         <label className="block text-sm font-medium mb-1">Status</label>
// <select
//   name="status"
//   value={invoiceData.status || 'Pending'}
//   onChange={handleChange}
//   className="input-style"
// >
//   <option value="Pending">Pending</option>
//   <option value="Paid">Paid</option>
//   <option value="Unpaid">Unpaid</option>
// </select>
//       </div>

//       {/* Invoice Items */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Items</h2>
//         {invoiceData.items.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
//           >
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium mb-1">Description</label>
//               <input
//                 type="text"
//                 value={item.description}
//                 onChange={(e) =>
//                   handleItemChange(index, 'description', e.target.value)
//                 }
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Rate</label>
//               <input
//                 type="number"
//                 value={item.rate}
//                 onChange={(e) =>
//                   handleItemChange(index, 'rate', e.target.value)
//                 }
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Quantity</label>
//               <input
//                 type="number"
//                 value={item.quantity}
//                 onChange={(e) =>
//                   handleItemChange(index, 'quantity', e.target.value)
//                 }
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <button
//                 type="button"
//                 onClick={() => removeItem(index)}
//                 className="text-red-600 hover:text-red-800 mt-6 transition flex items-center"
//               >
//                 <Trash2 className="w-5 h-5" /> <span className="ml-1">Remove</span>
//               </button>
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addItem}
//           className="inline-flex items-center gap-2 text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
//         >
//           <Plus className="w-5 h-5" /> Add Item
//         </button>
//       </div>


      




//       {/* Summary Section */}
//       <div className="mt-8 p-6 bg-gray-50 border rounded-xl max-w-md ml-auto space-y-2">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
//         <div className="flex justify-between">
//           <span>Subtotal:</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Discount ({invoiceData.discount || 0}%):</span>
//           <span>- ₹{discountAmount.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax ({invoiceData.taxPercentage || 0}%):</span>
//           <span>+ ₹{taxAmount.toFixed(2)}</span>
//         </div>
//         <hr />
//         <div className="flex justify-between font-bold text-lg">
//           <span>Grand Total:</span>
//           <span>₹{grandTotal.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* PDF + Save Buttons */}
//       <div className="mt-10 flex gap-4">
//         <InvoicePDF invoiceData={invoiceData} />
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Save Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Invoices;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import InvoicePDF from './InvoicePDF';
// import { Plus, Trash2, FileText } from 'lucide-react';

// const Invoices = () => {
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: '',
//     date: '',
//     clientName: '',
//     billingAddress: '',
//     clientEmail: '',
//     discount: 0,
//     taxPercentage: 0,
//     status: 'Pending',
//     items: [{ description: '', rate: '', quantity: '' }],
//   });

//   useEffect(() => {
//     const storedClient = localStorage.getItem('selectedClient');
//     if (storedClient) {
//       const client = JSON.parse(storedClient);
//       setInvoiceData(prev => ({
//         ...prev,
//         clientName: client.name || '',
//         clientEmail: client.email || '',
//         billingAddress: client.address || '',
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...invoiceData.items];
//     newItems[index][field] = value;
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const addItem = () => {
//     setInvoiceData((prev) => ({
//       ...prev,
//       items: [...prev.items, { description: '', rate: '', quantity: '' }],
//     }));
//   };

//   const removeItem = (index) => {
//     const newItems = invoiceData.items.filter((_, i) => i !== index);
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/invoices/create', invoiceData);
//       alert('Invoice saved successfully!');
//       console.log(res.data);
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       alert('Failed to save invoice');
//     }
//   };

//   const subtotal = invoiceData.items.reduce((acc, item) => {
//     const rate = parseFloat(item.rate) || 0;
//     const quantity = parseFloat(item.quantity) || 0;
//     return acc + rate * quantity;
//   }, 0);

//   const discountAmount = (subtotal * parseFloat(invoiceData.discount || 0)) / 100;
//   const taxAmount = ((subtotal - discountAmount) * parseFloat(invoiceData.taxPercentage || 0)) / 100;
//   const grandTotal = subtotal - discountAmount + taxAmount;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 text-cyan-700">
//         <FileText className="w-8 h-8" /> Create Invoice
//       </h1>

//       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4 border">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             { label: 'Invoice Number', name: 'invoiceNumber', type: 'text' },
//             { label: 'Invoice Date', name: 'date', type: 'date' },
//             { label: 'Client Name', name: 'clientName', type: 'text' },
//             { label: 'Client Email', name: 'clientEmail', type: 'email' },
//             { label: 'Billing Address', name: 'billingAddress', type: 'textarea' },
//             { label: 'Discount (%)', name: 'discount', type: 'number' },
//             { label: 'Tax (%)', name: 'taxPercentage', type: 'number' },
//           ].map(({ label, name, type }) => (
//             <div key={name} className={name === 'billingAddress' ? 'md:col-span-2' : ''}>
//               <label className="block text-sm font-medium mb-1">{label}</label>
//               {type === 'textarea' ? (
//                 <textarea
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                   rows={3}
//                 />
//               ) : (
//                 <input
//                   type={type}
//                   name={name}
//                   value={invoiceData[name]}
//                   onChange={handleChange}
//                   className="input-style"
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <label className="block text-sm font-medium mb-1">Status</label>
//         <select
//           name="status"
//           value={invoiceData.status}
//           onChange={handleChange}
//           className="input-style"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Paid">Paid</option>
//           <option value="Unpaid">Unpaid</option>
//         </select>
//       </div>

//       <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Items</h2>
//         {invoiceData.items.map((item, index) => (
//           <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium mb-1">Description</label>
//               <input
//                 type="text"
//                 value={item.description}
//                 onChange={(e) => handleItemChange(index, 'description', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Rate</label>
//               <input
//                 type="number"
//                 value={item.rate}
//                 onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Quantity</label>
//               <input
//                 type="number"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div>
//               <button
//                 type="button"
//                 onClick={() => removeItem(index)}
//                 className="text-red-600 hover:text-red-800 mt-6 transition flex items-center"
//               >
//                 <Trash2 className="w-5 h-5" /> <span className="ml-1">Remove</span>
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addItem}
//           className="inline-flex items-center gap-2 text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
//         >
//           <Plus className="w-5 h-5" /> Add Item
//         </button>
//       </div>

//       <div className="mt-8 p-6 bg-gray-50 border rounded-xl max-w-md ml-auto space-y-2">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
//         <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
//         <div className="flex justify-between"><span>Discount ({invoiceData.discount}%):</span><span>- ₹{discountAmount.toFixed(2)}</span></div>
//         <div className="flex justify-between"><span>Tax ({invoiceData.taxPercentage}%):</span><span>+ ₹{taxAmount.toFixed(2)}</span></div>
//         <hr />
//         <div className="flex justify-between font-bold text-lg"><span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
//       </div>

//       <div className="mt-10 flex gap-4">
//         <InvoicePDF invoiceData={invoiceData} />
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Save Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Invoices;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoicePDF from './InvoicePDF';
import { Plus, Trash2, FileText } from 'lucide-react';

const Invoices = () => {
  const [clients, setClients] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    clientName: '',
    billingAddress: '',
    clientEmail: '',
    discount: 0,
    taxPercentage: 0,
    status: 'Pending',
    items: [{ description: '', rate: '', quantity: '' }],
  });

  // Fetch clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clients');
        setClients(res.data);
      } catch (err) {
        console.error('Failed to load clients:', err);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (e) => {
    const selectedName = e.target.value;
    const selectedClient = clients.find((c) => c.name === selectedName);

    setInvoiceData((prev) => ({
      ...prev,
      clientName: selectedName,
      clientEmail: selectedClient?.email || '',
      billingAddress: selectedClient?.address || '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', rate: '', quantity: '' }],
    }));
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/invoices/create', invoiceData);
      alert('Invoice saved successfully!');
      console.log(res.data);
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Failed to save invoice');
    }
  };

  const subtotal = invoiceData.items.reduce((acc, item) => {
    const rate = parseFloat(item.rate) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return acc + rate * quantity;
  }, 0);

  const discountAmount = (subtotal * parseFloat(invoiceData.discount || 0)) / 100;
  const taxAmount = ((subtotal - discountAmount) * parseFloat(invoiceData.taxPercentage || 0)) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 text-cyan-700">
        <FileText className="w-8 h-8" /> Create Invoice
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4 border">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Client</label>
            <select
              value={invoiceData.clientName}
              onChange={handleClientSelect}
              className="input-style"
            >
              <option value="">-- Select Client --</option>
              {clients.map((client) => (
                <option key={client._id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="hidden"
            name="clientName"
            value={invoiceData.clientName}
            readOnly
          />

          {[ // rest of the form fields
            { label: 'Invoice Number', name: 'invoiceNumber', type: 'text' },
            { label: 'Invoice Date', name: 'date', type: 'date' },
            { label: 'Client Email', name: 'clientEmail', type: 'email' },
            { label: 'Billing Address', name: 'billingAddress', type: 'textarea' },
            { label: 'Discount (%)', name: 'discount', type: 'number' },
            { label: 'Tax (%)', name: 'taxPercentage', type: 'number' },
          ].map(({ label, name, type }) => (
            <div key={name} className={name === 'billingAddress' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={invoiceData[name]}
                  onChange={handleChange}
                  className="input-style"
                  rows={3}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={invoiceData[name]}
                  onChange={handleChange}
                  className="input-style"
                />
              )}
            </div>
          ))}
        </div>

        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={invoiceData.status}
          onChange={handleChange}
          className="input-style"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Invoice Items section stays the same */}
      {/* Summary and Save section stays the same */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Items</h2>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="input-style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rate</label>
              <input
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                className="input-style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="input-style"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-800 mt-6 transition flex items-center"
              >
                <Trash2 className="w-5 h-5" /> <span className="ml-1">Remove</span>
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>

      <div className="mt-8 p-6 bg-gray-50 border rounded-xl max-w-md ml-auto space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
        <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Discount ({invoiceData.discount}%):</span><span>- ₹{discountAmount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax ({invoiceData.taxPercentage}%):</span><span>+ ₹{taxAmount.toFixed(2)}</span></div>
        <hr />
        <div className="flex justify-between font-bold text-lg"><span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
      </div>

      <div className="mt-10 flex gap-4">
        <InvoicePDF invoiceData={invoiceData} />
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoices;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CLIENT_API_URL = 'http://localhost:5000/api/clients';

// const Invoices = () => {
//   const [clients, setClients] = useState([]);
//   const [invoiceData, setInvoiceData] = useState({
//     clientName: '',
//     clientEmail: '',
//     billingAddress: '',
//     invoiceDate: '',
//     dueDate: '',
//     items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
//     total: 0,
//   });

//   // Fetch clients on load
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(CLIENT_API_URL);
//         setClients(res.data);
//       } catch (err) {
//         console.error('Failed to fetch clients:', err);
//       }
//     };
//     fetchClients();
//   }, []);

//   // Load selected client from localStorage if available
//   useEffect(() => {
//     const savedClient = localStorage.getItem('selectedClient');
//     if (savedClient) {
//       const client = JSON.parse(savedClient);
//       setInvoiceData((prev) => ({
//         ...prev,
//         clientName: client.name,
//         clientEmail: client.email,
//         billingAddress: client.address,
//       }));
//       localStorage.removeItem('selectedClient');
//     }
//   }, []);

//   // Handle client selection
//   const handleClientSelect = (e) => {
//     const selectedName = e.target.value;
//     const client = clients.find((c) => c.name === selectedName);
//     if (client) {
//       setInvoiceData((prev) => ({
//         ...prev,
//         clientName: client.name,
//         clientEmail: client.email,
//         billingAddress: client.address,
//       }));
//     }
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle item input change
//   const handleItemChange = (index, field, value) => {
//     const items = [...invoiceData.items];
//     items[index][field] = field === 'description' ? value : parseFloat(value) || 0;

//     // Recalculate amount
//     items[index].amount = items[index].quantity * items[index].rate;

//     // Recalculate total
//     const total = items.reduce((acc, item) => acc + item.amount, 0);

//     setInvoiceData((prev) => ({
//       ...prev,
//       items,
//       total,
//     }));
//   };

//   // Add new item
//   const addItem = () => {
//     setInvoiceData((prev) => ({
//       ...prev,
//       items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
//     }));
//   };

//   // Remove item
//   const removeItem = (index) => {
//     const items = invoiceData.items.filter((_, i) => i !== index);
//     const total = items.reduce((acc, item) => acc + item.amount, 0);
//     setInvoiceData((prev) => ({
//       ...prev,
//       items,
//       total,
//     }));
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>

//       <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">Client Name</label>
//           <select
//             name="clientName"
//             value={invoiceData.clientName}
//             onChange={handleClientSelect}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">Select a client</option>
//             {clients.map((client) => (
//               <option key={client._id} value={client.name}>
//                 {client.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Client Email</label>
//           <input
//             type="email"
//             name="clientEmail"
//             value={invoiceData.clientEmail}
//             className="w-full border p-2 rounded"
//             readOnly
//           />
//         </div>

//         <div className="sm:col-span-2">
//           <label className="block text-sm font-medium mb-1">Billing Address</label>
//           <textarea
//             name="billingAddress"
//             value={invoiceData.billingAddress}
//             className="w-full border p-2 rounded"
//             rows={2}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Invoice Date</label>
//           <input
//             type="date"
//             name="invoiceDate"
//             value={invoiceData.invoiceDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Due Date</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={invoiceData.dueDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//       </form>

//       <h2 className="text-xl font-semibold mt-8 mb-4">Invoice Items</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Description</th>
//               <th className="p-2 border">Quantity</th>
//               <th className="p-2 border">Rate</th>
//               <th className="p-2 border">Amount</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.items.map((item, index) => (
//               <tr key={index}>
//                 <td className="p-2 border">
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleItemChange(index, 'description', e.target.value)}
//                     className="w-full border p-1 rounded"
//                   />
//                 </td>
//                 <td className="p-2 border">
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                     className="w-full border p-1 rounded"
//                   />
//                 </td>
//                 <td className="p-2 border">
//                   <input
//                     type="number"
//                     min="0"
//                     value={item.rate}
//                     onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
//                     className="w-full border p-1 rounded"
//                   />
//                 </td>
//                 <td className="p-2 border text-right">{item.amount.toFixed(2)}</td>
//                 <td className="p-2 border text-center">
//                   <button
//                     onClick={() => removeItem(index)}
//                     className="text-red-600 font-bold"
//                     disabled={invoiceData.items.length === 1}
//                   >
//                     ✕
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <button
//           onClick={addItem}
//           className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           + Add Item
//         </button>
//       </div>

//       <div className="text-right mt-6 text-xl font-semibold">
//         Total: ₹{invoiceData.total.toFixed(2)}
//       </div>

//       {/* Save/Submit button (placeholder) */}
//       <div className="mt-6 text-right">
//         <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Save Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Invoices;
