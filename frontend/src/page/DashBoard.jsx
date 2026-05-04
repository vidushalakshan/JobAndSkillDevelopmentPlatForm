import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const DashBoard = ( ) => {
  const location = useLocation();
 
  return (
    <section className="h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500">
      <div className="shrink-0 z-50 w-full glassmorphism">
        <NavBar />
      </div>
      <div className="flex flex-1 overflow-hidden relative">
        <SideBar />
        <main className="flex-1 overflow-y-auto relative bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </section>
  );
};

export default DashBoard;
