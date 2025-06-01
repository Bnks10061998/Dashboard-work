// import React, { useState } from 'react';
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

//   // ✅ Calculate Subtotal, Discount, Tax, Grand Total
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

//       {/* ✅ Summary Section */}
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

//       {/* PDF Button */}
//       <div className="mt-10">
//         <InvoicePDF invoiceData={invoiceData} />
//       </div>
//     </div>
//   );
// };

// export default Invoices;





// import React, { useState } from 'react';
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

//   const handleSave = () => {
//     // Placeholder logic for saving
//     console.log('Invoice saved:', invoiceData);
//     alert('Invoice saved successfully!');
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




import React, { useState } from 'react';
import axios from 'axios';
import InvoicePDF from './InvoicePDF';
import { Plus, Trash2, FileText } from 'lucide-react';

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    clientName: '',
    billingAddress: '',
    clientEmail: '',
    discount: 0,
    taxPercentage: 0,
    items: [{ description: '', rate: '', quantity: '' }],
  });

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

      {/* Invoice Fields */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 space-y-4 border">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Invoice Number', name: 'invoiceNumber', type: 'text' },
            { label: 'Invoice Date', name: 'date', type: 'date' },
            { label: 'Client Name', name: 'clientName', type: 'text' },
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
  value={invoiceData.status || 'Pending'}
  onChange={handleChange}
  className="input-style"
>
  <option value="Pending">Pending</option>
  <option value="Paid">Paid</option>
  <option value="Unpaid">Unpaid</option>
</select>
      </div>

      {/* Invoice Items */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice Items</h2>
        {invoiceData.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, 'description', e.target.value)
                }
                className="input-style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rate</label>
              <input
                type="number"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(index, 'rate', e.target.value)
                }
                className="input-style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
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


      




      {/* Summary Section */}
      <div className="mt-8 p-6 bg-gray-50 border rounded-xl max-w-md ml-auto space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount ({invoiceData.discount || 0}%):</span>
          <span>- ₹{discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({invoiceData.taxPercentage || 0}%):</span>
          <span>+ ₹{taxAmount.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* PDF + Save Buttons */}
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
