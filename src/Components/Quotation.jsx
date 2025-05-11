import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const Quotation = () => {
  const [quotations, setQuotations] = useState([
    {
      id: 1,
      number: 'QTN-001',
      clientName: 'John Doe',
      email: 'john@example.com',
      amount: 300,
      date: '2025-05-01',
      validity: '2025-05-10',
      status: 'Approved',
      description: 'Design and branding service',
      notes: 'Discount included for loyalty',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    amount: '',
    date: '',
    validity: '',
    status: 'Pending',
    description: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (quote = null) => {
    if (quote) {
      setIsEditMode(true);
      setSelectedId(quote.id);
      setFormData({ ...quote });
    } else {
      setIsEditMode(false);
      setFormData({
        clientName: '',
        email: '',
        amount: '',
        date: '',
        validity: '',
        status: 'Pending',
        description: '',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const saveQuotation = () => {
    const { clientName, email, amount, date, validity } = formData;
    if (!clientName || !email || !amount || !date || !validity) {
      alert('Please fill all required fields.');
      return;
    }

    if (isEditMode) {
      setQuotations((prev) =>
        prev.map((q) =>
          q.id === selectedId ? { ...formData, id: selectedId } : q
        )
      );
    } else {
      const newId = quotations.length + 1;
      const number = `QTN-${String(newId).padStart(3, '0')}`;
      setQuotations([
        ...quotations,
        { ...formData, id: newId, number, amount: parseFloat(amount) },
      ]);
    }

    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedId(null);
  };

  const deleteQuotation = (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      setQuotations((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const downloadPDF = (quote) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Sudhan Quotation', 14, 15);

    // Add quotation details
    doc.setFontSize(11);
    doc.text(`Quotation #: ${quote.number}`, 14, 25);
    doc.text(`Client: ${quote.clientName}`, 14, 32);
    doc.text(`Email: ${quote.email}`, 14, 39);
    doc.text(`Date: ${quote.date}`, 14, 46);
    doc.text(`Valid Until: ${quote.validity}`, 14, 53);

    // Manually add the table
    doc.text('Description', 14, 60);
    doc.text('Amount', 100, 60);
    doc.text('Status', 160, 60);
    doc.text(quote.description || 'N/A', 14, 70);
    doc.text(`₹${quote.amount}`, 100, 70);
    doc.text(quote.status, 160, 70);

    // Notes section
    if (quote.notes) {
      doc.text(`Notes: ${quote.notes}`, 14, 80);
    }

    // Save the PDF
    doc.save(`${quote.number}.pdf`);
  };

  const downloadWord = (quote) => {
    const content = `
Quotation #: ${quote.number}
Client: ${quote.clientName}
Email: ${quote.email}
Date: ${quote.date}
Valid Until: ${quote.validity}
Amount: ₹${quote.amount}
Status: ${quote.status}
Description: ${quote.description}
Notes: ${quote.notes}
    `;
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, `${quote.number}.doc`);
  };

  const statusBadge = (status) => {
    const base = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'Approved': return `${base} bg-green-100 text-green-700`;
      case 'Pending': return `${base} bg-yellow-100 text-yellow-700`;
      case 'Rejected': return `${base} bg-red-100 text-red-700`;
      default: return base;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Quotations</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          + New Quotation
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Quotation #</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{q.number}</td>
                <td className="p-3">{q.clientName}</td>
                <td className="p-3 text-blue-600 font-semibold">₹{q.amount}</td>
                <td className="p-3">{q.date}</td>
                <td className="p-3">
                  <span className={statusBadge(q.status)}>{q.status}</span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => openModal(q)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => deleteQuotation(q.id)} className="text-red-600 hover:underline">Delete</button>
                  <button onClick={() => downloadPDF(q)} className="text-green-600 hover:underline">PDF</button>
                  <button onClick={() => downloadWord(q)} className="text-purple-600 hover:underline">Word</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? 'Edit Quotation' : 'Add New Quotation'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} className="p-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
              <input type="number" name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} className="p-2 border rounded" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 border rounded" />
              <input type="date" name="validity" value={formData.validity} onChange={handleChange} className="p-2 border rounded" />
              <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded col-span-2" />
              <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="p-2 border rounded col-span-2" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveQuotation}>
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotation;
