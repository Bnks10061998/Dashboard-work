import React, { useState } from 'react';

const Quotation = () => {
  const [quotations, setQuotations] = useState([
    { id: 1, clientName: 'John Doe', amount: 300, date: '2025-05-01', status: 'Approved' },
    { id: 2, clientName: 'Jane Smith', amount: 400, date: '2025-04-28', status: 'Pending' },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quotations</h2>
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
          {quotations.map((quote) => (
            <tr key={quote.id}>
              <td className="border-b p-2">{quote.clientName}</td>
              <td className="border-b p-2">{quote.amount}</td>
              <td className="border-b p-2">{quote.date}</td>
              <td className="border-b p-2">{quote.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Quotation;
