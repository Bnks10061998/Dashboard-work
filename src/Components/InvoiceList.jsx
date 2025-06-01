import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText } from 'lucide-react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(res.data);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
        <FileText className="w-7 h-7" /> Invoice List
      </h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, index) => {
              const subtotal = inv.items.reduce((acc, item) => acc + item.rate * item.quantity, 0);
              const discount = (subtotal * (inv.discount || 0)) / 100;
              const tax = ((subtotal - discount) * (inv.taxPercentage || 0)) / 100;
              const total = subtotal - discount + tax;

              return (
                <tr key={inv._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{inv.invoiceNumber || `INV-${index + 1}`}</td>
                  <td className="p-3">{inv.clientName}</td>
                  <td className="p-3">{new Date(inv.date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : inv.status === 'Unpaid' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 font-medium">₹{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
