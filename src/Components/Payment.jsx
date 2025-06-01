// import React, { useState } from 'react';
// import { FaEdit, FaTrash, FaEye, FaPlus, FaFilePdf } from 'react-icons/fa';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const Payment = () => {
//   const [payments, setPayments] = useState([
//     {
//       id: 1,
//       date: '2025-05-01',
//       client: 'John Doe',
//       amount: 1200,
//       mode: 'UPI',
//       ref: 'TXN12345',
//       status: 'Paid',
//       paidBy: 'Admin',
//       notes: 'Monthly subscription',
//       imageUrl: '',
//     },
//   ]);

//   const [filter, setFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [clientFilter, setClientFilter] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [newPayment, setNewPayment] = useState({
//     date: '',
//     client: '',
//     amount: '',
//     mode: 'UPI',
//     ref: '',
//     status: 'Paid',
//     paidBy: '',
//     notes: '',
//     imageUrl: '',
//   });

//   const statusStyles = {
//     Paid: 'bg-green-100 text-green-800',
//     Pending: 'bg-yellow-100 text-yellow-800',
//     Failed: 'bg-red-100 text-red-800',
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewPayment({ ...newPayment, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPayment((prev) => ({
//           ...prev,
//           imageUrl: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddOrUpdate = () => {
//     const { date, client, amount, mode, ref, paidBy } = newPayment;
//     if (!date || !client || !amount || !mode || !ref || !paidBy) {
//       alert('Please fill all required fields');
//       return;
//     }

//     if (editMode) {
//       setPayments((prev) =>
//         prev.map((p) =>
//           p.id === selectedId ? { ...p, ...newPayment, amount: parseFloat(newPayment.amount) } : p
//         )
//       );
//     } else {
//       setPayments([
//         ...payments,
//         {
//           id: Date.now(),
//           ...newPayment,
//           amount: parseFloat(newPayment.amount),
//         },
//       ]);
//     }

//     setNewPayment({
//       date: '',
//       client: '',
//       amount: '',
//       mode: 'UPI',
//       ref: '',
//       status: 'Paid',
//       paidBy: '',
//       notes: '',
//       imageUrl: '',
//     });
//     setIsModalOpen(false);
//     setEditMode(false);
//     setSelectedId(null);
//   };

//   const handleEdit = (payment) => {
//     setNewPayment(payment);
//     setSelectedId(payment.id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this payment?')) {
//       setPayments(payments.filter((p) => p.id !== id));
//     }
//   };

//   const handleView = (payment) => {
//     alert(
//       `Payment Details:\n\nDate: ${new Date(payment.date).toLocaleDateString()}\nClient: ${
//         payment.client
//       }\nAmount: ₹${payment.amount.toFixed(2)}\nMode: ${payment.mode}\nRef: ${
//         payment.ref
//       }\nStatus: ${payment.status}\nPaid By: ${payment.paidBy}\nNotes: ${payment.notes || '-'}`
//     );
//   };

//   const filteredPayments = payments.filter(
//   (p) =>
//     p.client.toLowerCase().includes(filter.toLowerCase()) &&
//     (statusFilter === '' || p.status === statusFilter) &&
//     (clientFilter === '' || p.client === clientFilter)
// );

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text('Payment Summary Report', 14, 22);
//     doc.setFontSize(11);
//     doc.setTextColor(100);
    

//     const tableColumn = ['Date', 'Client', 'Amount (₹)', 'Mode', 'Ref', 'Paid By', 'Status'];
//     const tableRows = [];

//     let totalAmount = 0;

//     filteredPayments.forEach((p) => {
//       const paymentData = [
//         new Date(p.date).toLocaleDateString(),
//         p.client,
//         `₹${p.amount.toFixed(2)}`,
//         p.mode,
//         p.ref,
//         p.paidBy,
//         p.status,
//       ];
//       tableRows.push(paymentData);
//       totalAmount += p.amount;
//     });

//     // Add the table
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       theme: 'grid',
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [41, 128, 185] },
//     });

//     // Position to start images (some space below the table)
//     let finalY = doc.lastAutoTable.finalY + 10;

//     // Add receipt images thumbnails
//     filteredPayments.forEach((p) => {
//       if (p.imageUrl) {
//         const imgProps = doc.getImageProperties(p.imageUrl);
//         const imgWidth = 40;
//         const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//         // Add new page if image overflows page height
//         if (finalY + imgHeight + 15 > doc.internal.pageSize.height) {
//           doc.addPage();
//           finalY = 20;
//         }

//         doc.setFontSize(10);
//         doc.text(`Receipt - ${p.client} (${p.ref})`, 14, finalY + 10);
//         doc.addImage(p.imageUrl, 'JPEG', 14, finalY + 12, imgWidth, imgHeight);

//         finalY += imgHeight + 25;
//       }
//     });

//     // Add total sum at the bottom or after images
//     if (finalY + 10 > doc.internal.pageSize.height) {
//       doc.addPage();
//       finalY = 20;
//     }

//     doc.setFontSize(12);
//     doc.setTextColor(0);
//     doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 14, finalY + 10);

//     // doc.save('payment-summary.pdf');
//     const filename =
//     statusFilter === ''
//     ? 'payment-summary.pdf'
//     : `payment-summary-${statusFilter.toLowerCase()}.pdf`;
//     doc.save(filename);
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
//         <div>
//           <h1 className="text-4xl font-extrabold tracking-tight mb-1 flex items-center gap-2">
//             <FaPlus className="text-blue-600" />
//             Payments
//           </h1>
//           <p className="text-gray-600 text-lg">Track and manage client transactions</p>
//         </div>

//         {/* Search & Buttons */}
//         <div className="flex gap-3 flex-wrap">
//           <input
//             type="text"
//             placeholder="Search by client..."
//             className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-64"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
            
//           />

//           <select
//         className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={clientFilter}
//         onChange={(e) => setClientFilter(e.target.value)}
//       >
//         <option value="">All Clients</option>
//         {[...new Set(payments.map((p) => p.client))].map((client) => (
//           <option key={client} value={client}>
//             {client}
//           </option>
//         ))}
//       </select>

//           {/* Add status filter dropdown */}
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           >
//             <option value="">All Statuses</option>
//             <option value="Paid">Paid</option>
//             <option value="Pending">Pending</option>
//             <option value="Failed">Failed</option>
//           </select>
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md shadow-md transition flex items-center gap-2"
//             onClick={() => {
//               setIsModalOpen(true);
//               setEditMode(false);
//               setNewPayment({
//                 date: '',
//                 client: '',
//                 amount: '',
//                 mode: 'UPI',
//                 ref: '',
//                 status: 'Paid',
//                 paidBy: '',
//                 notes: '',
//                 imageUrl: '',
//               });
//             }}
//           >
//             <FaPlus /> Add Payment
//           </button>
//           <button
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-md shadow-md transition flex items-center gap-2"
//             onClick={generatePDF}
//           >
//             <FaFilePdf /> Download PDF
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100 text-gray-700 text-sm font-semibold uppercase tracking-wide">
//             <tr>
//               {['Date', 'Client', 'Amount', 'Mode', 'Ref', 'Paid By', 'Status', 'Notes', 'Actions'].map(
//                 (heading) => (
//                   <th key={heading} className="px-6 py-4 text-left whitespace-nowrap">
//                     {heading}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 text-sm">
//             {filteredPayments.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="text-center p-6 text-gray-500">
//                   No payments found.
//                 </td>
//               </tr>
//             ) : (
//               filteredPayments.map((p) => (
//                 <tr key={p.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-3">{new Date(p.date).toLocaleDateString()}</td>
//                   <td className="px-6 py-3">{p.client}</td>
//                   <td className="px-6 py-3 text-blue-600 font-semibold">₹{p.amount.toFixed(2)}</td>
//                   <td className="px-6 py-3">{p.mode}</td>
//                   <td className="px-6 py-3">{p.ref}</td>
//                   <td className="px-6 py-3">{p.paidBy}</td>
//                   <td className="px-6 py-3">
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[p.status]}`}
//                     >
//                       {p.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 truncate max-w-xs">{p.notes || '-'}</td>
//                   <td className="px-6 py-3 whitespace-nowrap flex gap-2">
//                     <button
//                       title="View"
//                       onClick={() => handleView(p)}
//                       className="text-gray-600 hover:text-blue-600"
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       title="Edit"
//                       onClick={() => handleEdit(p)}
//                       className="text-yellow-600 hover:text-yellow-800"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       title="Delete"
//                       onClick={() => handleDelete(p.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//           {/* Table Footer for Total */}
//           {filteredPayments.length > 0 && (
//             <tfoot className="bg-gray-100 font-semibold text-gray-800">
//               <tr>
//                 <td colSpan="2" className="text-right px-6 py-3">
//                   Total
//                 </td>
//                 <td className="text-blue-600 px-6 py-3">
//                   ₹
//                   {filteredPayments
//                     .reduce((acc, p) => acc + p.amount, 0)
//                     .toFixed(2)}
//                 </td>
//                 <td colSpan="6"></td>
//               </tr>
//             </tfoot>
//           )}
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-2xl font-bold mb-6">{editMode ? 'Edit Payment' : 'Add Payment'}</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddOrUpdate();
//               }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-6"
//               // className="space-y-4"
//             >
//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="date">
//                   Date *
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={newPayment.date}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="client">
//                   Client *
//                 </label>
//                 <input
//                   type="text"
//                   id="client"
//                   name="client"
//                   value={newPayment.client}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Client name"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="amount">
//                   Amount (₹) *
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   id="amount"
//                   name="amount"
//                   value={newPayment.amount}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Amount paid"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="mode">
//                   Payment Mode *
//                 </label>
//                 <select
//                   id="mode"
//                   name="mode"
//                   value={newPayment.mode}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   required
//                 >
//                   <option value="UPI">UPI</option>
//                   <option value="Net Banking">Net Banking</option>
//                   <option value="Card">Card</option>
//                   <option value="Cash">Cash</option>
//                   <option value="Cheque">Cheque</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="ref">
//                   Reference No. *
//                 </label>
//                 <input
//                   type="text"
//                   id="ref"
//                   name="ref"
//                   value={newPayment.ref}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Transaction reference"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="paidBy">
//                   Paid By *
//                 </label>
//                 <input
//                   type="text"
//                   id="paidBy"
//                   name="paidBy"
//                   value={newPayment.paidBy}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Person who paid"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="status">
//                   Status *
//                 </label>
//                 <select
//                   id="status"
//                   name="status"
//                   value={newPayment.status}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   required
//                 >
//                   <option value="Paid">Paid</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Failed">Failed</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="notes">
//                   Notes
//                 </label>
//                 <textarea
//                   id="notes"
//                   name="notes"
//                   value={newPayment.notes}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Additional notes (optional)"
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1" htmlFor="imageUrl">
//                   Receipt Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full"
//                 />
//                 {newPayment.imageUrl && (
//                   <img
//                     src={newPayment.imageUrl}
//                     alt="Receipt preview"
//                     className="mt-2 max-h-40 object-contain rounded border"
//                   />
//                 )}
//               </div>

//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setEditMode(false);
//                     setSelectedId(null);
//                   }}
//                   className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                 >
//                   {editMode ? 'Update Payment' : 'Add Payment'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:5000/api/payments'; // update if needed

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterClient, setFilterClient] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  // Helper function to format date safely
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? '-' : d.toLocaleDateString();
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API, {
        params: {
          client: filterClient,
          status: filterStatus,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPayments(res.data);
      console.log('Payments fetched:', res.data);  // Debug log
    } catch (err) {
      toast.error('Error fetching payments');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filterClient, filterStatus]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    if (data.image && data.image[0]) formData.append('image', data.image[0]);

    try {
      const url = editMode ? `${API}/${selectedPayment._id}` : API;
      const method = editMode ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success(editMode ? 'Payment updated' : 'Payment added');
      setModalOpen(false);
      reset();
      setEditMode(false);
      fetchPayments();
    } catch (err) {
      toast.error('Error saving payment');
    }
  };

  const handleEdit = (payment) => {
    setEditMode(true);
    setSelectedPayment(payment);
    setModalOpen(true);

    for (const key in payment) {
      if (key !== 'image' && key !== 'imageUrl') setValue(key, payment[key]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this payment?')) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Deleted');
      fetchPayments();
    } catch {
      toast.error('Error deleting');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Payments Report', 14, 10);
    const tableData = payments.map((p) => [
      p.client,
      p.amount,
      formatDate(p.paymentDate),
      p.status,
      p.description,
    ]);

    doc.autoTable({
      head: [['Client', 'Amount', 'Date', 'Status', 'Description']],
      body: tableData,
    });
    doc.save('payments.pdf');
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Payments</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Filter by client"
          className="border p-1 rounded"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        />
        <select
          className="border p-1 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <button
          className="bg-green-500 text-white px-3 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add
        </button>
        <button
          className="bg-blue-500 text-white px-3 rounded"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Client</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td className="border px-2 py-1 text-center" colSpan={7}>
                No payments found
              </td>
            </tr>
          )}
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.client}</td>
              <td className="border px-2 py-1">{p.amount}</td>
              <td className="border px-2 py-1">{formatDate(p.paymentDate)}</td>
              <td className="border px-2 py-1">{p.status}</td>
              <td className="border px-2 py-1">{p.description}</td>
              <td className="border px-2 py-1">
                {p.imageUrl && (
                  <img
                    src={`http://localhost:5000${p.imageUrl}`}
                    alt="payment"
                    className="h-10"
                  />
                )}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-lg mb-2">
              {editMode ? 'Edit Payment' : 'Add Payment'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="w-full mb-2 p-1 border"
                placeholder="Client"
                {...register('client')}
                required
              />
              <input
                type="number"
                className="w-full mb-2 p-1 border"
                placeholder="Amount"
                {...register('amount')}
                required
              />
              <input
                type="date"
                className="w-full mb-2 p-1 border"
                {...register('paymentDate')}
              />
              <select className="w-full mb-2 p-1 border" {...register('status')}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <input
                className="w-full mb-2 p-1 border"
                placeholder="Description"
                {...register('description')}
              />
              <input type="file" className="w-full mb-2" {...register('image')} />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    reset();
                    setEditMode(false);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;