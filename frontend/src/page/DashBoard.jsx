import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const DashBoard = ({children}) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
    <SideBar />
    <div className="flex-1 flex flex-col z-10">
      <main className="p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  </div>
  )
}

export default DashBoard