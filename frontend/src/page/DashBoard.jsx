import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const DashBoard = ({ children }) => {
  return (
    <section className="h-screen flex flex-col  bg-white dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="shrink-0 z-20 w-full">
        <NavBar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-6 text-white">
          {children}
        </main>
      </div>
    </section>
  );
};

export default DashBoard;
