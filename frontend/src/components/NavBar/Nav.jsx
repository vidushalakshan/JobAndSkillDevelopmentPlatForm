import { navLogo } from "../../utiils";
import "./Nav.css";
import { ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  return (
    <header>
      <nav>
        <img src={navLogo} alt="Nav Logo" width={120} />

        <div>
          <button className="px-6 py-2 rounded-2xl text-white font-semibold shadow-md transition-all bg-red-600 duration-200">
            Employers
          </button>
          <button className="px-9 py-2 rounded-2xl text-white font-semibold shadow-md transition-all bg-orange-400 duration-200">
            Trainers
          </button>
        </div>

        <div>
          <button className="px-3 py-2 rounded-lg text-white font-semibold shadow-md transition-all bg-orange-400 duration-200">
            <UserPlusIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="px-3 py-2 rounded-lg text-white font-semibold shadow-md transition-all bg-orange-400 duration-200">
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
