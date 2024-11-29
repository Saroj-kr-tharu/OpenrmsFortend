import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Wards", href: "/home/ward" },
    { name: "Patient Lists", href: "/home/paitentlist" },
    { name: "Service Queues", href: "/home/servicequeue" },
    { name: "Appointments", href: "/home/appointment" },
    { name: "Laboratory", href: "/home/laboratory" },
  ];

  return (
    <div className="hidden mt-4 h-screen border-1 border-white rounded shadow-xl md:col-span-3 md:block">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          end
          className={({ isActive }) => `
            block bg-white text-brandColor-900 font-medium py-2 px-4 
            hover:cursor-pointer hover:bg-slate-300
            ${isActive 
              ? "font-semibold bg-slate-200 text-brandColor-900 border-l-4 border-brandColor-500" 
              : ""}
          `}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideMenu;