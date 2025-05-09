import React, { useState } from 'react';

const Refers = () => {
  const [referrals, setReferrals] = useState([
    { id: 1, referrer: 'Sarah', referred: 'John Doe', status: 'Completed' },
    { id: 2, referrer: 'Mike', referred: 'Jane Smith', status: 'Pending' },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Refers</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Referrer</th>
            <th className="border-b p-2 text-left">Referred Client</th>
            <th className="border-b p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <tr key={referral.id}>
              <td className="border-b p-2">{referral.referrer}</td>
              <td className="border-b p-2">{referral.referred}</td>
              <td className="border-b p-2">{referral.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Refers;
