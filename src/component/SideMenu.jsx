import React, { useState } from "react";

const SideMenu = () => {
  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Wards", href: "/ward" },
    { name: "Patient Lists", href: "/patientList" },
    { name: "Service Queues", href: "/serviceQueue" },
    { name: "Appointments", href: "/appointments" },
    { name: "Laboratory", href: "/laboratory" },
  ];

  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div 
      className="hidden mt-4 h-screen border-1 border-white 
      rounded shadow-xl md:col-span-3 md:block"
    >
      {navigation.map((item) => (
        <div
          key={item.name}
          className={`bg-white text-brandColor-900 font-medium py-2 px-4 
          flex items-center hover:cursor-pointer hover:bg-slate-300
          ${
            activeLink === item.name
              ? "font-semibold bg-slate-200 text-brandColor-900 border-l-4 border-brandColor-500"
              : ""
          }`}
          onClick={() => setActiveLink(item.name)}
        >
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); 
              setActiveLink(item.name);
            }}
            className="w-full"
            aria-current={activeLink === item.name ? "page" : undefined}
          >
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;