import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Alerts', icon: <AlertTriangle size={20} />, path: '/alerts' },
    { name: 'Members', icon: <Users size={20} />, path: '/members' },
    { name: 'Transactions', icon: <FileText size={20} />, path: '/transactions' },
    { name: 'Reports', icon: <BarChart3 size={20} />, path: '/reports' },
    { name: 'Rules', icon: <Shield size={20} />, path: '/rules' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-20 w-64 h-screen pt-16 transition-transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="text-gray-500 dark:text-gray-400">{item.icon}</div>
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/logout"
            className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="ml-3">Logout</span>
          </Link>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="p-4 bg-cu-blue-50 dark:bg-cu-blue-900 rounded-lg">
            <h4 className="text-sm font-medium text-cu-blue-800 dark:text-cu-blue-200">Need Help?</h4>
            <p className="text-xs text-cu-blue-600 dark:text-cu-blue-300 mt-1">Contact our support team for assistance with fraud detection.</p>
            <button className="mt-2 text-xs font-medium text-cu-blue-700 dark:text-cu-blue-300 hover:text-cu-blue-800 dark:hover:text-cu-blue-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;