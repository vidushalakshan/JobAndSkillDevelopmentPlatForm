import { navLogo } from "../utils";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();


  
  return (
    <>
      {" "}
      <header className="w-full py-3 sm:px-10 px-5 flex justify-center items-center shadow-md  z-50">
        <nav className="flex w-full justify-center items-center screen-max-width">
          <img  src={navLogo} alt="Nav Logo" width={120} />

          <div className="flex flex-1 justify-center items-center gap-7 max-sm:hidden">
            <button  className="px-6 py-2 rounded-2xl text-white font-semibold shadow-md transition-colors duration-200 hover:bg-red-700 bg-red-600">
              Employers
            </button>
            <button  className="px-9 py-2 rounded-2xl text-white font-semibold shadow-md transition-colors duration-200 hover:bg-orange-500 bg-orange-400 ">
              Trainers
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-7 max:sm:flex-1 justify-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.username}
                  </span>
                </div>
                <button
                  className="px-3 py-2 rounded-lg text-white font-semibold shadow-md transition-colors duration-200 hover:bg-orange-500"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            ) : (
              <>
                <button
                  className="px-3 py-2 rounded-lg text-white font-semibold shadow-md bg-orange-400 transition-colors duration-200 hover:bg-orange-500"
                  onClick={() => navigate("/signup")}
                >
                  <UserPlusIcon className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  className="px-3 py-2 rounded-lg text-white font-semibold shadow-md bg-orange-400  transition-colors duration-200 hover:bg-orange-500"
                  onClick={() => navigate("/login")}
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
