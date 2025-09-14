import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, Calendar, ChartColumnDecreasing, Clock, GraduationCap, Home, Settings, Users } from 'lucide-react'
const SideBarItems = [
    { to: '/', label: 'DashBoard', Icon: Home },
    { to: '/students', label: 'Students', Icon: Users },
    { to: '/teachers', label: 'Teachers', Icon: GraduationCap },
    { to: '/sections', label: 'Sections', Icon: Calendar },
    { to: '/timetable', label: 'Timetable', Icon: Clock },
    { to: '/reports', label: 'Reports', Icon: ChartColumnDecreasing },
    { to: '/notifications', label: 'Notifications', Icon: Bell },
    { to: '/settings', label: 'Settings', Icon: Settings },
]

function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-[calc(100%)] w-74  bg-blue-950 text-white border-r border-gray-200 shadow-sm p-4">
            <div className="pb-3 items-center flex flex-col border-b border-gray-600">
                <h1 className="font-semibold text-[20px]">College Admin</h1>
                <p>Engineering College</p>
            </div>
            <div className="pt-8 cursor-pointer">
                {SideBarItems.map((item, index) => (
                    <NavLink className={({ isActive }) => `flex gap-3  border-b border-gray-300 py-3 ${isActive ? "font-semibold text-white" : "text-gray-400"}`} key={index} to={item.to} end>
                        <item.Icon />
                        <h4>{item.label}</h4>
                    </NavLink>



                ))}

            </div>
        </div>
    );
}

export default Sidebar;
