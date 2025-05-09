import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { FaCog, FaListAlt, FaCreditCard, FaQuoteLeft, FaUserFriends } from 'react-icons/fa'; // Import icons for menu items

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/add-work" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaCog size={20} /> Add Work Details
          </Link>
        </li>
        <li>
          <Link to="/client-list" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaListAlt size={20} /> Client List
          </Link>
        </li>
        <li>
          <Link to="/payment" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaCreditCard size={20} /> Payment
          </Link>
        </li>
        <li>
          <Link to="/quotation" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaQuoteLeft size={20} /> Quotation
          </Link>
        </li>
        <li>
          <Link to="/refers" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaUserFriends size={20} /> Refers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
