// import React, { useState } from 'react';

// const Payment = () => {
//   const [payments, setPayments] = useState([
//     { id: 1, date: '2025-05-01', client: 'John Doe', amount: 1200, status: 'Paid' },
//     { id: 2, date: '2025-05-03', client: 'Jane Smith', amount: 800, status: 'Pending' },
//     { id: 3, date: '2025-05-06', client: 'Alice Johnson', amount: 650, status: 'Failed' },
//   ]);

//   const [filter, setFilter] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPayment, setNewPayment] = useState({
//     date: '',
//     client: '',
//     amount: '',
//     status: 'Paid',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewPayment({ ...newPayment, [name]: value });
//   };

//   const addPayment = () => {
//     if (!newPayment.date || !newPayment.client || !newPayment.amount) {
//       alert('All fields are required');
//       return;
//     }

//     setPayments([
//       ...payments,
//       { ...newPayment, id: payments.length + 1, amount: parseFloat(newPayment.amount) },
//     ]);
//     setNewPayment({ date: '', client: '', amount: '', status: 'Paid' });
//     setIsModalOpen(false);
//   };

//   const downloadCSV = () => {
//     const csvContent = [
//       ['Date', 'Client', 'Amount', 'Status'],
//       ...payments.map(p => [p.date, p.client, p.amount, p.status]),
//     ]
//       .map(e => e.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'payments.csv';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const statusColors = {
//     Paid: 'text-green-600',
//     Pending: 'text-yellow-600',
//     Failed: 'text-red-600',
//   };

//   const filteredPayments = payments.filter(p =>
//     p.client.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Payment Transactions</h1>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search client..."
//             className="border rounded p-2"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           />
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded"
//             onClick={() => setIsModalOpen(true)}
//           >
//             + Add Payment
//           </button>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={downloadCSV}
//           >
//             Export CSV
//           </button>
//         </div>
//       </div>

//       <table className="w-full text-sm border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="text-left py-2 px-4">Date</th>
//             <th className="text-left py-2 px-4">Client</th>
//             <th className="text-left py-2 px-4">Amount (₹)</th>
//             <th className="text-left py-2 px-4">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPayments.map(payment => (
//             <tr key={payment.id} className="border-t hover:bg-gray-50">
//               <td className="py-2 px-4">{payment.date}</td>
//               <td className="py-2 px-4">{payment.client}</td>
//               <td className="py-2 px-4">₹{payment.amount}</td>
//               <td className={`py-2 px-4 font-medium ${statusColors[payment.status]}`}>
//                 {payment.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Add Payment</h2>
//             <div className="space-y-4">
//               <input
//                 type="date"
//                 name="date"
//                 value={newPayment.date}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="client"
//                 placeholder="Client Name"
//                 value={newPayment.client}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Amount"
//                 value={newPayment.amount}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <select
//                 name="status"
//                 value={newPayment.status}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option>Paid</option>
//                 <option>Pending</option>
//                 <option>Failed</option>
//               </select>
//             </div>
//             <div className="flex justify-end mt-6 space-x-2">
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={addPayment}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;
import React, { useState } from 'react';

const Payment = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: '2025-05-01',
      client: 'John Doe',
      amount: 1200,
      mode: 'UPI',
      ref: 'TXN12345',
      status: 'Paid',
      paidBy: 'Admin',
      notes: 'Monthly subscription',
    },
  ]);

  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newPayment, setNewPayment] = useState({
    date: '',
    client: '',
    amount: '',
    mode: 'UPI',
    ref: '',
    status: 'Paid',
    paidBy: '',
    notes: '',
  });

  const statusStyles = {
    Paid: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Failed: 'bg-red-100 text-red-700',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddOrUpdate = () => {
    const { date, client, amount, mode, ref, paidBy } = newPayment;
    if (!date || !client || !amount || !mode || !ref || !paidBy) {
      alert('Please fill all required fields');
      return;
    }

    if (editMode) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === selectedId ? { ...p, ...newPayment, amount: parseFloat(newPayment.amount) } : p
        )
      );
    } else {
      setPayments([
        ...payments,
        {
          id: Date.now(),
          ...newPayment,
          amount: parseFloat(newPayment.amount),
        },
      ]);
    }

    setNewPayment({
      date: '',
      client: '',
      amount: '',
      mode: 'UPI',
      ref: '',
      status: 'Paid',
      paidBy: '',
      notes: '',
    });
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedId(null);
  };

  const handleEdit = (payment) => {
    setNewPayment(payment);
    setSelectedId(payment.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      setPayments(payments.filter((p) => p.id !== id));
    }
  };

  const filteredPayments = payments.filter((p) =>
    p.client.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-600">Track and manage client transactions</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by client..."
            className="border p-2 rounded w-52 shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              setIsModalOpen(true);
              setEditMode(false);
              setNewPayment({
                date: '',
                client: '',
                amount: '',
                mode: 'UPI',
                ref: '',
                status: 'Paid',
                paidBy: '',
                notes: '',
              });
            }}
          >
            + Add Payment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Mode</th>
              <th className="p-3 text-left">Ref</th>
              <th className="p-3 text-left">Paid By</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="p-3">{new Date(p.date).toLocaleDateString()}</td>
                <td className="p-3">{p.client}</td>
                <td className="p-3 text-blue-600 font-semibold">₹{p.amount.toFixed(2)}</td>
                <td className="p-3">{p.mode}</td>
                <td className="p-3 text-gray-600">{p.ref}</td>
                <td className="p-3">{p.paidBy}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-3">{p.notes}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? 'Edit Payment' : 'Add Payment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" name="date" value={newPayment.date} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="client" placeholder="Client Name" value={newPayment.client} onChange={handleChange} className="p-2 border rounded" />
              <input type="number" name="amount" placeholder="Amount (₹)" value={newPayment.amount} onChange={handleChange} className="p-2 border rounded" />
              <select name="mode" value={newPayment.mode} onChange={handleChange} className="p-2 border rounded">
                <option>UPI</option>
                <option>Cash</option>
                <option>Card</option>
                <option>Bank Transfer</option>
              </select>
              <input type="text" name="ref" placeholder="Reference / TXN ID" value={newPayment.ref} onChange={handleChange} className="p-2 border rounded" />
              <select name="status" value={newPayment.status} onChange={handleChange} className="p-2 border rounded">
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <input type="text" name="paidBy" placeholder="Paid By" value={newPayment.paidBy} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="notes" placeholder="Notes (optional)" value={newPayment.notes} onChange={handleChange} className="p-2 border rounded col-span-full" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddOrUpdate}>
                {editMode ? 'Save Changes' : 'Add Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
