import { navLogo } from "../utiils";
import { ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  return (
    <header className="w-full py-3 sm:px-10 px-5 flex justify-center items-center shadow-md bg-white dark:bg-gray-900">
      <nav className="flex w-full justify-center items-center screen-max-width">
        <img src={navLogo} alt="Nav Logo" width={120}/>

        <div className="flex flex-1 justify-center items-center gap-7 max-sm:hidden">
          <button className="px-6 py-2 rounded-2xl text-white font-semibold shadow-md transition-all bg-red-600 duration-200">
            Employers
          </button>
          <button className="px-9 py-2 rounded-2xl text-white font-semibold shadow-md transition-all bg-orange-400 duration-200">
            Trainers
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-7 max:sm:flex-1 justify-center ">
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
