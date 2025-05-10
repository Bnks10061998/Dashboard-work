// import React, { useState } from 'react';
// import html2pdf from 'html2pdf.js';
// import logo from '../assets/Logo.jpg'; // Your image import

// const Invoices = () => {
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: '',
//     clientName: '',
//     clientEmail: '',
//     billingAddress: '',
//     date: '',
//     items: [{ description: '', quantity: 1, rate: 0 }],
//     discount: 0, // Add discount field
//     taxPercentage: 10, // Default tax percentage
//   });

//   const handleItemChange = (index, field, value) => {
//     const items = [...invoiceData.items];
//     items[index][field] = value;
//     setInvoiceData({ ...invoiceData, items });
//   };

//   const addItem = () => {
//     setInvoiceData({ ...invoiceData, items: [...invoiceData.items, { description: '', quantity: 1, rate: 0 }] });
//   };

//   const removeItem = (index) => {
//     const items = [...invoiceData.items];
//     items.splice(index, 1);
//     setInvoiceData({ ...invoiceData, items });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData({ ...invoiceData, [name]: value });
//   };

//   const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
//   const discountAmount = (subtotal * invoiceData.discount) / 100;
//   const netValue = subtotal - discountAmount;
//   const tax = (netValue * invoiceData.taxPercentage) / 100;
//   const total = netValue + tax;

//   const downloadPDF = () => {
//     const element = document.getElementById('invoice-preview');
//     if (!element) {
//       console.error('Invoice preview not found!');
//       return;
//     }

//     const options = {
//       margin: [20, 20],
//       filename: `${invoiceData.invoiceNumber}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: {
//         unit: 'in',
//         format: 'letter',
//         orientation: 'portrait',
//       },
//     };

//     // Check if the element is available
//     html2pdf()
//       .from(element)
//       .set(options)
//       .toPdf()
//       .get('pdf')
//       .then((pdf) => {
//         // Check if logo exists before adding it
//         const logoUrl = logo; // Use the imported logo

//         pdf.addImage(logoUrl, 'JPEG', 0.5, 0.5, 1.5, 1.5); // Adjust logo size and position
//         pdf.text('Invoice', 3, 1); // Title for invoice

//         pdf.text(`Invoice #: ${invoiceData.invoiceNumber}`, 0.5, 2);
//         pdf.text(`Date: ${invoiceData.date}`, 0.5, 2.25);
//         pdf.text(`Client: ${invoiceData.clientName}`, 0.5, 2.5);
//         pdf.text(`Email: ${invoiceData.clientEmail}`, 0.5, 2.75);
//         pdf.text(`Billing Address: ${invoiceData.billingAddress}`, 0.5, 3);

//         let yPosition = 3.5;
//         invoiceData.items.forEach((item, index) => {
//           pdf.text(item.description, 0.5, yPosition);
//           pdf.text(item.quantity.toString(), 4.5, yPosition);
//           pdf.text(`$${item.rate.toFixed(2)}`, 5.5, yPosition);
//           pdf.text(`$${(item.quantity * item.rate).toFixed(2)}`, 6.5, yPosition);
//           yPosition += 0.5;
//         });

//         pdf.text(`Subtotal: $${subtotal.toFixed(2)}`, 0.5, yPosition);
//         yPosition += 0.5;
//         pdf.text(`Discount (${invoiceData.discount}%): -$${discountAmount.toFixed(2)}`, 0.5, yPosition);
//         yPosition += 0.5;
//         pdf.text(`Net Value: $${netValue.toFixed(2)}`, 0.5, yPosition);
//         yPosition += 0.5;
//         pdf.text(`Tax (${invoiceData.taxPercentage}%): $${tax.toFixed(2)}`, 0.5, yPosition);
//         yPosition += 0.5;
//         pdf.text(`Total: $${total.toFixed(2)}`, 0.5, yPosition);

//         pdf.save(`${invoiceData.invoiceNumber}.pdf`);
//       })
//       .catch((error) => {
//         console.error('Error generating PDF:', error);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     downloadPDF(); // Automatically download the PDF after form submission
//   };

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             name="invoiceNumber"
//             placeholder="Invoice Number"
//             onChange={handleChange}
//             value={invoiceData.invoiceNumber}
//             required
//             className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
//           />
//           <input
//             type="text"
//             name="clientName"
//             placeholder="Client Name"
//             onChange={handleChange}
//             value={invoiceData.clientName}
//             required
//             className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
//           />
//           <input
//             type="email"
//             name="clientEmail"
//             placeholder="Client Email"
//             onChange={handleChange}
//             value={invoiceData.clientEmail}
//             required
//             className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
//           />
//           <textarea
//             name="billingAddress"
//             placeholder="Billing Address"
//             onChange={handleChange}
//             value={invoiceData.billingAddress}
//             required
//             className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
//           />
//           <input
//             type="number"
//             name="discount"
//             placeholder="Discount (%)"
//             onChange={handleChange}
//             value={invoiceData.discount}
//             className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
//           />
//           {/* Items Table */}
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="p-2 border">Description</th>
//                 <th className="p-2 border">Quantity</th>
//                 <th className="p-2 border">Rate</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoiceData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(e) => handleItemChange(index, 'description', e.target.value)}
//                       required
//                       className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                       min="1"
//                       required
//                       className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="number"
//                       value={item.rate}
//                       onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
//                       min="0"
//                       required
//                       className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       className="px-4 py-2 bg-red-600 text-white rounded"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button type="button" onClick={addItem} className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
//             Add Item
//           </button>
//           <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded mt-4">
//             Generate PDF
//           </button>
//         </form>
//         <div id="invoice-preview" className="hidden">
//           <div className="bg-white p-6 border rounded shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoices;


import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import logo from '../assets/Logo.jpg'; // Ensure this path is correct and Logo.jpg is in your assets folder

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    clientName: '',
    clientEmail: '',
    billingAddress: '',
    date: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    discount: 0,
    taxPercentage: 10,
  });

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    const items = [...invoiceData.items];
    items.splice(index, 1);
    setInvoiceData({ ...invoiceData, items });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + parseFloat(item.quantity || 0) * parseFloat(item.rate || 0),
    0
  );
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const netValue = subtotal - discountAmount;
  const tax = (netValue * invoiceData.taxPercentage) / 100;
  const total = netValue + tax;

  const downloadPDF = () => {
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.fontSize = '12px';

    const content = `
      <div>
        <h2>Invoice</h2>
        <p><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</p>
        <p><strong>Date:</strong> ${invoiceData.date}</p>
        <p><strong>Client:</strong> ${invoiceData.clientName}</p>
        <p><strong>Email:</strong> ${invoiceData.clientEmail}</p>
        <p><strong>Billing Address:</strong> ${invoiceData.billingAddress}</p>
        <hr/>
        <table border="1" cellpadding="4" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items
              .map((item) => {
                const quantity = parseFloat(item.quantity) || 0;
                const rate = parseFloat(item.rate) || 0;
                const amount = quantity * rate;
                return `
                <tr>
                  <td>${item.description}</td>
                  <td>${quantity}</td>
                  <td>${rate.toFixed(2)}</td>
                  <td>${amount.toFixed(2)}</td>
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
        <br/>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Discount (${invoiceData.discount}%):</strong> -${discountAmount.toFixed(2)}</p>
        <p><strong>Net Value:</strong> ${netValue.toFixed(2)}</p>
        <p><strong>Tax (${invoiceData.taxPercentage}%):</strong> ${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>
    `;

    element.innerHTML = content;

    const options = {
      margin: 0.5,
      filename: `${invoiceData.invoiceNumber || 'invoice'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadPDF();
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            onChange={handleChange}
            value={invoiceData.invoiceNumber}
            required
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            onChange={handleChange}
            value={invoiceData.clientName}
            required
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <input
            type="email"
            name="clientEmail"
            placeholder="Client Email"
            onChange={handleChange}
            value={invoiceData.clientEmail}
            required
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <textarea
            name="billingAddress"
            placeholder="Billing Address"
            onChange={handleChange}
            value={invoiceData.billingAddress}
            required
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={invoiceData.date}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            onChange={handleChange}
            value={invoiceData.discount}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
          />
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Rate</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      required
                      className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                      className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      min="0"
                      required
                      className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
          >
            Add Item
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded mt-4"
          >
            Generate PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default Invoices;
