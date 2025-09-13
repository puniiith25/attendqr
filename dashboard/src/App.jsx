import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Pages/AdminDashBoard/DashBoard";
import Teachers from "./Pages/AdminDashBoard/Teachers";
import Students from "./Pages/AdminDashBoard/Students";
import Sections from "./Pages/AdminDashBoard/Sections";
import TimeTables from "./Pages/AdminDashBoard/TimeTables";
import Reports from "./Pages/AdminDashBoard/Reports";
import Notifications from "./Pages/AdminDashBoard/Notifications";
import Settings from "./Pages/AdminDashBoard/Settings";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div >
      <Navbar />
      <SideBar />

      <div className="fex-1">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/timetable" element={<TimeTables />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
