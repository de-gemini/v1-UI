import { FaArrowUp, FaArrowDown, FaShoePrints, FaBoxOpen, FaTshirt } from 'react-icons/fa';
import {Header} from './components/Header.tsx'


const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      
            
      <Header head="Welcome back Kelly" subtitle="Welcome to your admin dashboard"/>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-orange-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Ecommerce Revenue</span>
          <span className="text-2xl font-bold">$245,450</span>
          <div className="flex items-center gap-2 mt-2 text-green-600 text-xs">
            <FaArrowUp /> 14.9% <span className="text-gray-400">(+43,211$)</span>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">New Customers</span>
          <span className="text-2xl font-bold">684</span>
          <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
            <FaArrowDown /> 8.6%
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Repeat Purchase Rate</span>
          <span className="text-2xl font-bold">75.12 %</span>
          <div className="flex items-center gap-2 mt-2 text-green-600 text-xs">
            <FaArrowUp /> 25.4% <span className="text-gray-400">(+20.11%)</span>
          </div>
        </div>
        <div className="bg-cyan-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Average Order Value</span>
          <span className="text-2xl font-bold">$2,412.23</span>
          <div className="flex items-center gap-2 mt-2 text-green-600 text-xs">
            <FaArrowUp /> 35.2% <span className="text-gray-400">(+ $754)</span>
          </div>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Conversion rate</span>
          <span className="text-2xl font-bold">32.65 %</span>
          <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
            <FaArrowDown /> 12.42%
          </div>
        </div>
      </div>

      {/* Summary Chart Placeholder */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-background-200 rounded text-sm">Last 7 days</button>
            {/* Add more filter buttons as needed */}
          </div>
        </div>
        {/* Chart placeholder - replace with real chart */}
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-background-300 rounded-lg">
          [Chart Placeholder]
        </div>
      </div>

      {/* Lower Section: Recent Orders, Most Selling Products, Weekly Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6 col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <button className="text-brand-primary text-sm">View All</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows - replace with real data */}
              <tr>
                <td className="py-2">Water Bottle</td>
                <td className="py-2 text-brand-primary">Peterson Jack</td>
                <td className="py-2">#8441573</td>
                <td className="py-2">27 Jun 2025</td>
                <td className="py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span></td>
              </tr>
              <tr>
                <td className="py-2">Iphone 15 Pro</td>
                <td className="py-2 text-brand-primary">Michel Datta</td>
                <td className="py-2">#2457841</td>
                <td className="py-2">26 Jun 2025</td>
                <td className="py-2"><span className="bg-red-100 text-red-800 px-2 py-1 rounded">Cancelled</span></td>
              </tr>
              <tr>
                <td className="py-2">Headphone</td>
                <td className="py-2 text-brand-primary">Jesiya Rose</td>
                <td className="py-2">#1024784</td>
                <td className="py-2">20 Jun 2025</td>
                <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Shipped</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Side Widgets */}
        <div className="flex flex-col gap-6">
          {/* Most Selling Products */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Most Selling Products</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaShoePrints className="text-xl text-blue-500" />
                Snicker Vento <span className="ml-auto text-xs text-gray-400">128 Sales</span>
              </li>
              <li className="flex items-center gap-3">
                <FaBoxOpen className="text-xl text-blue-400" />
                Blue Backpack <span className="ml-auto text-xs text-gray-400">401 Sales</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTshirt className="text-xl text-yellow-500" />
                Water Bottle <span className="ml-auto text-xs text-gray-400">1k+ Sales</span>
              </li>
            </ul>
          </div>
          {/* Weekly Top Customers */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Top Customers</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="" className="w-8 h-8 rounded-full" />
                Marks Hoverson <span className="ml-auto text-xs text-gray-400">25 Orders</span>
                <button className="ml-2 text-brand-primary text-xs">View</button>
              </li>
              <li className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="" className="w-8 h-8 rounded-full" />
                Marks Hoverson <span className="ml-auto text-xs text-gray-400">15 Orders</span>
                <button className="ml-2 text-brand-primary text-xs">View</button>
              </li>
              <li className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="" className="w-8 h-8 rounded-full" />
                Jhony Peters <span className="ml-auto text-xs text-gray-400">23 Orders</span>
                <button className="ml-2 text-brand-primary text-xs">View</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 