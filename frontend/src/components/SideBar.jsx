import { NavLink } from "react-router-dom";
import links from '../navigation/Routes'
import { 
  BriefcaseIcon, 
  ChartBarSquareIcon, 
  UserGroupIcon,
  SparklesIcon,
  ClipboardDocumentListIcon 
} from "@heroicons/react/24/outline";
import { useUser } from "../context/context";

const SideBar = () => {
    const { user } = useUser();

    return (
        <aside className="w-72 h-full bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-white/5 transition-all duration-300">
          <nav className="h-full py-8 px-4 overflow-y-auto">
            {user?.role === 'ADMIN' && (
              <div className="mb-8">
                <div className="mb-4 px-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Administrator</h2>
                </div>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-blue-500"
                    }`
                  }
                >
                  <ChartBarSquareIcon className="w-5 h-5" />
                  <span className="font-bold">Admin Console</span>
                </NavLink>
              </div>
            )}

            {user && (
               <div className="mb-8">
                <div className="mb-4 px-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Personal</h2>
                </div>
                <NavLink
                  to="/my-jobs"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-indigo-500"
                    }`
                  }
                >
                  <ClipboardDocumentListIcon className="w-5 h-5" />
                  <span className="font-bold">My Activity</span>
                </NavLink>
              </div>
            )}

            <div className="mb-4 px-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Job Categories</h2>
            </div>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? "bg-blue-600/10 text-blue-600 border border-blue-500/20"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-blue-500"
                      }`
                    }
                  >
                    <BriefcaseIcon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-semibold">
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

export default SideBar;