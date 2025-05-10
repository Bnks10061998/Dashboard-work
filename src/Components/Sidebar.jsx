import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars, FaTimes, FaTachometerAlt, FaProjectDiagram, FaEnvelope,
  FaCalendarAlt, FaFileInvoiceDollar, FaUserCircle, FaSignOutAlt,
  FaCog, FaListAlt, FaCreditCard, FaQuoteLeft, FaUserFriends,
  FaImages, FaPalette, FaComments, FaTools
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-900 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-blue-900 text-white w-64 p-4 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <MenuItem to="/overview" icon={<FaTachometerAlt />} label="Overview" />
          <MenuItem to="/add-work" icon={<FaCog />} label="Add Work Details" />
          <MenuItem to="/client-list" icon={<FaListAlt />} label="Client List" />
          <MenuItem to="/payment" icon={<FaCreditCard />} label="Payment" />
          <MenuItem to="/quotation" icon={<FaQuoteLeft />} label="Quotation" />
          <MenuItem to="/refers" icon={<FaUserFriends />} label="Refers" />
          <MenuItem to="/projects" icon={<FaProjectDiagram />} label="My Projects" />
          <MenuItem to="/gallery" icon={<FaImages />} label="Project Gallery" />
          <MenuItem to="/templates" icon={<FaPalette />} label="Design Templates" />
          <MenuItem to="/feedback" icon={<FaComments />} label="Client Feedback" />
          <MenuItem to="/invoices" icon={<FaFileInvoiceDollar />} label="Invoices" />
          <MenuItem to="/calendar" icon={<FaCalendarAlt />} label="Calendar" />
          <MenuItem to="/messages" icon={<FaEnvelope />} label="Messages" />
          <MenuItem to="/profile" icon={<FaUserCircle />} label="Profile" />
          <MenuItem to="/settings" icon={<FaTools />} label="Settings" />
          <MenuItem to="/logout" icon={<FaSignOutAlt />} label="Logout" special />
        </ul>
      </div>
    </>
  );
};

const MenuItem = ({ to, icon, label, special }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center gap-3 hover:bg-blue-700 p-2 rounded transition-colors ${special ? 'hover:bg-red-600' : ''}`}
    >
      <span className="text-lg">{icon}</span> {label}
    </Link>
  </li>
);

export default Sidebar;
