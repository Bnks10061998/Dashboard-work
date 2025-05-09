import React, { useState } from 'react';

const Payment = () => {
  const [payments, setPayments] = useState([
    { id: 1, clientName: 'John Doe', amount: 100, date: '2025-05-01', status: 'Paid' },
    { id: 2, clientName: 'Jane Smith', amount: 200, date: '2025-04-28', status: 'Pending' },
    { id: 3, clientName: 'Alice Johnson', amount: 150, date: '2025-05-05', status: 'Paid' },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Client Name</th>
            <th className="border-b p-2 text-left">Amount</th>
            <th className="border-b p-2 text-left">Date</th>
            <th className="border-b p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border-b p-2">{payment.clientName}</td>
              <td className="border-b p-2">{payment.amount}</td>
              <td className="border-b p-2">{payment.date}</td>
              <td className="border-b p-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
