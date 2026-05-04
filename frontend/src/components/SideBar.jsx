import { NavLink } from "react-router-dom";
import links from '../navigation/Routes'
import { BriefcaseIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/context";

const SideBar = () => {
    const { user } = useUser();

    return (
        <aside className="w-72 h-full bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-white/5 transition-all duration-300">
          <nav className="h-full py-8 px-4 overflow-y-auto">
            {user?.role === 'ADMIN' && (
              <div className="mb-8">
                <div className="mb-4 px-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Admin</h2>
                </div>
                <NavLink
                  to="/employee"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-blue-500"
                    }`
                  }
                >
                  <ChartBarIcon className="w-5 h-5" />
                  <span className="font-bold">Admin Panel</span>
                </NavLink>
              </div>
            )}

            <div className="mb-8 px-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Categories</h2>
            </div>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-blue-500"
                      }`
                    }
                  >
                    <BriefcaseIcon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">
                      {link.name.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      );
}

export default SideBar