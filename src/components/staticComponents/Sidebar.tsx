import { type FC } from "react";
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
// import WarehouseIcon from '@mui/icons-material/Warehouse';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';

interface SidebarProps {
    isExpanded: boolean;
    onToggleSidebar: () => void;
}

interface MenuItem {
    name: string;
    path: string;
    icon: React.ReactElement;
}

const menuItems: MenuItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
    // { name: 'Warehouse', path: '/warehouse', icon: <WarehouseIcon /> },
    { name: 'Stock Tracking', path: '/stock-tracking', icon: <TrendingUpIcon /> },
    // { name: 'Reports', path: '/reports', icon: <AssessmentIcon /> },
    // { name: 'Users', path: '/users', icon: <PeopleIcon /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

const Sidebar: FC<SidebarProps> = ({ isExpanded, onToggleSidebar }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside
            className={`${isExpanded ? 'w-64' : 'w-20'
                } bg-white border-r border-gray-200 h-screen overflow-hidden transition-all duration-300 ease-in-out shadow-sm`}
        >
            {/* Sidebar Header */}
            <div className={`h-16 flex items-center justify-between border-b border-gray-200 ${isExpanded ? 'px-4' : 'px-3'}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                        DH
                    </div>
                    {isExpanded && (
                        <div className="overflow-hidden">
                            <h1 className="text-sm font-bold text-gray-800 whitespace-nowrap">Dummy HR</h1>
                            <p className="text-xs text-gray-500 -mt-0.5 whitespace-nowrap">Inventory Management System</p>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggleSidebar}
                    className="text-gray-500 hover:text-indigo-600 transition-colors p-1"
                    title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isExpanded ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <nav className="mt-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                    } ${!isExpanded && 'justify-center'}`}
                                title={!isExpanded ? item.name : ''}
                            >
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                    {item.icon}
                                </span>
                                {isExpanded && (
                                    <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
