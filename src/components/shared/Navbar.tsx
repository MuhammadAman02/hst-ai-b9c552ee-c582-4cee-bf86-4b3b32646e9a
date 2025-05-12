import { useState } from 'react';
import { Bell, Menu, X, Search } from 'lucide-react';
import { mockAlerts } from '../../utils/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ThemeToggle } from '../theme/ThemeToggle';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const [unreadAlerts] = useState(mockAlerts.filter(alert => !alert.isRead).length);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30 shadow-sm">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-cu-blue-700 dark:text-cu-blue-300">
              CU Shield
            </span>
            <span className="bg-cu-green-100 text-cu-green-800 dark:bg-cu-green-900 dark:text-cu-green-200 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full">
              Fraud Detection
            </span>
          </div>
          
          <div className="hidden md:flex md:flex-1 mx-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <Input 
                type="search" 
                className="block w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                placeholder="Search transactions, members..." 
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadAlerts > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-alert-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      {unreadAlerts}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockAlerts.slice(0, 3).map((alert) => (
                  <DropdownMenuItem key={alert.id} className="flex flex-col items-start py-2">
                    <div className="flex items-center w-full">
                      <span className={`alert-badge alert-badge-${alert.severity} mr-2`}>
                        {alert.severity}
                      </span>
                      <span className="font-medium">{alert.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.description}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-cu-blue-600 dark:text-cu-blue-400 cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center ml-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-cu-blue-600 flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <div className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;