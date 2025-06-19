import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaStar, FaCreditCard, FaPlug, FaCog, FaQuestionCircle, FaUserShield, FaSignOutAlt, FaBoxes } from 'react-icons/fa';
import { FiSearch, FiBell } from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
  { label: 'Pricing', icon: <FaBoxOpen />, path: '/admin/pricing' },
  { label: 'Product', icon: <FaBoxOpen />, path: '/admin/product' },
  { label: 'Inventory', icon: <FaBoxes />, path: '/admin/inventory' },
  { label: 'Customers', icon: <FaUsers />, path: '/admin/customers' },
  { label: 'Review', icon: <FaStar />, path: '/admin/review', badge: 2 },
  { label: 'Payment', icon: <FaCreditCard />, path: '/admin/payment' },
  { label: 'Integration', icon: <FaPlug />, path: '/admin/integration' },
];

const accountItems = [
  { label: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  { label: 'Help', icon: <FaQuestionCircle />, path: '/admin/help' },
  { label: 'Manage Users', icon: <FaUserShield />, path: '/admin/manage-users' },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background-gray">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 p-6 text-2xl font-bold text-brand-primary">
            <span className="bg-brand-primary text-white rounded-full p-2"><FaTachometerAlt /></span>
            subcom
          </div>
          <nav className="mt-6">
            <div className="text-xs text-gray-400 px-6 mb-2">GENERAL</div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm gap-3 rounded-lg mb-1 transition-colors ${
                  isActive(item.path)
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-secondary hover:bg-background-100'
                }`}
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge.toString().padStart(2, '0')}</span>
                )}
              </Link>
            ))}
            <div className="text-xs text-gray-400 px-6 mt-6 mb-2">ACCOUNT</div>
            {accountItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm gap-3 rounded-lg mb-1 transition-colors ${
                  isActive(item.path)
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-secondary hover:bg-background-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button className="flex items-center px-6 py-3 text-sm gap-3 text-red-600 hover:bg-red-50 transition-colors mb-6">
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <div className="flex items-center gap-4 w-1/2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-background-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-background-400" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative">
              <FiBell className="text-2xl text-background-500" />
              {/* Notification badge example */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-brand-primary"
            />
          </div>
        </header>
        {/* Main Dashboard Content */}
        <main className="flex-1 bg-background-gray p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 