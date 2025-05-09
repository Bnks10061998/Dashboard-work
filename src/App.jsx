import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';  
import WorkForm from './Components/WorkForm'; 
import ClientList from './Components/ClientList';  
import Payment from './Components/Payment';  
import Quotation from './Components/Quotation';
import Refers from './Components/Refers'; 

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar /> {/* Sidebar Menu */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/add-work" element={<WorkForm />} />
            <Route path="/client-list" element={<ClientList />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/refers" element={<Refers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
