import { NavLink } from "react-router-dom";
import links from '../navigation/Routes'


const SideBar = () => {
    return (
        <aside className="w-64 h-full overflow-y-auto shadow-2xl  mt-0">
          <nav>
          <ul className="space-y-6 p-4">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
          </nav>
        </aside>
      );
}

export default SideBar