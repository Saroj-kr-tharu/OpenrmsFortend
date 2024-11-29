import  { useState } from "react";
import { Menu, Search, UserPlus, UserCircle, Wrench, List }
 from "lucide-react";

const Header_component = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Search", icon: Search, href: "#" },
    { name: "Settings", icon: Wrench, href: "#" },
    { name: "Add Patient", icon: UserPlus, href: "#" },
    { name: "My Account", icon: UserCircle, href: "#" },
    { name: "Menu", icon: List, href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brandColor-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-2 md:p-0 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://openmrs.org/wp-content/uploads/2021/08/cropped-OpenMRSlogo-transparent.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          {navigation.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={item.href}
                className="p-4 hover:bg-[#004144] rounded-lg transition duration-300 ease-in-out block"
              >
                <item.icon size={25} className="mx-auto" />
              </a>
              {hoveredItem === item.name && (
                <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 
                  bg-black text-white text-xs px-2 py-1 rounded-md">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#005D5D] md:hidden shadow-lg">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center p-4 hover:bg-[#004144] transition duration-300"
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header_component;