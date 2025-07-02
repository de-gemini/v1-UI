import { useState } from "react";
import {
  FaBars,
  FaBoxOpen,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
  { label: "Pricing", icon: <FaBoxOpen />, path: "/admin/pricing" },
  { label: "Calendar", icon: <FaCalendarAlt />, path: "/admin/calendar" },
  { label: "Bookings", icon: <FaUsers />, path: "/admin/bookings" },
  // { label: 'Product', icon: <FaBoxOpen />, path: '/admin/product' },
  // { label: 'Inventory', icon: <FaBoxes />, path: '/admin/inventory' },
  // { label: 'Customers', icon: <FaUsers />, path: '/admin/customers' },
  // { label: 'Review', icon: <FaStar />, path: '/admin/review', badge: 2 },
  // { label: 'Payment', icon: <FaCreditCard />, path: '/admin/payment' },
  // { label: 'Integration', icon: <FaPlug />, path: '/admin/integration' },
];

const accountItems = [
  { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
  // { label: 'Help', icon: <FaQuestionCircle />, path: '/admin/help' },
  // { label: 'Manage Users', icon: <FaUserShield />, path: '/admin/manage-users' },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-font flex min-h-screen bg-background-gray`}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-brand-primary">
              Gemini Admin
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <nav className="mt-6">
            <div className="text-xs text-gray-400 px-6 mb-2">GENERAL</div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-6 py-3 text-sm gap-3 mb-1 transition-colors ${
                  isActive(item.path)
                    ? "bg-brand-primary text-brand-secondary font-bold"
                    : "text-neutral-500 hover:bg-background-100"
                }`}
              >
                {item.icon}
                {item.label}
                {/* {item.badge && (
                  <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.badge.toString().padStart(2, "0")}
                  </span>
                )} */}
              </Link>
            ))}
            <div className="text-xs text-gray-400 px-6 mt-6 mb-2">ACCOUNT</div>
            {accountItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-6 py-3 text-sm gap-3 rounded-lg mb-1 transition-colors ${
                  isActive(item.path)
                    ? "bg-brand-primary text-white"
                    : "text-neutral-500 hover:bg-background-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-6 py-3 text-sm gap-3 text-red-600 hover:bg-red-50 transition-colors mb-6"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaBars className="text-gray-600" />
            </button>
            <div className="hidden sm:flex items-center gap-4 w-full max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-background-300 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-background-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative">
              <FiBell className="text-xl sm:text-2xl text-background-500" />
              {/* Notification badge example */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-primary"
            />
          </div>
        </header>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 py-3 bg-white border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-background-300 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-background-400" />
          </div>
        </div>

        {/* Main Dashboard Content */}
        <main className="flex-1 bg-neutral-100 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
