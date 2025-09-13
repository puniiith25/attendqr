import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaLayerGroup, FaClock, FaChartBar, FaBell, FaCog } from "react-icons/fa";

const SideBar = () => {
    const menuItems = [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        { name: "Students", path: "/students", icon: <FaUserGraduate /> },
        { name: "Teachers", path: "/teachers", icon: <FaChalkboardTeacher /> },
        { name: "Sections", path: "/sections", icon: <FaLayerGroup /> },
        { name: "Time Table", path: "/timetable", icon: <FaClock /> },
        { name: "Reports", path: "/reports", icon: <FaChartBar /> },
        { name: "Notifications", path: "/notifications", icon: <FaBell /> },
        { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];

    return (
        <div className="w-56 h-screen border-r border-gray-400 flex flex-col">

            <h1>Hello-world</h1>
            <h1>Hello-world</h1>
            <h1>Hello-world</h1>

        </div>
    );
};

export default SideBar;
