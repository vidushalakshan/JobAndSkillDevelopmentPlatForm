import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
// import { useUser } from "../context/context";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const DashBoard = ( ) => {
  // const { user} = useUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // },[user, navigate]);


  // if (!user) return null;
  
  return (
    <section className="h-screen flex flex-col  bg-white dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="shrink-0 z-20 w-full">
        <NavBar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-6 text-white">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashBoard;
