import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';  
import WorkForm from './Components/WorkForm'; 
import ClientList from './Components/ClientList';  
import Payment from './Components/Payment';  
import Quotation from './Components/Quotation';
import Refers from './Components/Refers'; 
import Overview from './Pages/Overview';
import Projects from './Pages/Projects';
import Gallery from './Pages/Gallery';
import Templates from './Pages/Templates';
import Feedback from './Pages/Feedback';
import Invoices from './Pages/Invoices';
import CalendarPage from './Pages/Calendar';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Logout from './Pages/Logout';
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
            <Route path="overview" element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="templates" element={<Templates />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


// import { Routes, Route } from 'react-router-dom';
// import DashboardLayout from './components/DashboardLayout';
// import Overview from './pages/Overview';
// import AddWork from './pages/AddWork';
// // import other pages here...

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<DashboardLayout />}>
//         <Route path="overview" element={<Overview />} />
//         <Route path="add-work" element={<AddWork />} />
//         <Route path="client-list" element={<ClientList />} />
//         <Route path="payment" element={<Payment />} />
//         <Route path="quotation" element={<Quotation />} />
//         <Route path="refers" element={<Refers />} />
//         <Route path="projects" element={<Projects />} />
//         <Route path="gallery" element={<Gallery />} />
//         <Route path="templates" element={<Templates />} />
//         <Route path="feedback" element={<Feedback />} />
//         <Route path="invoices" element={<Invoices />} />
//         <Route path="calendar" element={<Calendar />} />
//         <Route path="messages" element={<Messages />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="logout" element={<Logout />} />
//       </Route>
//     </Routes>
//   );
// }
