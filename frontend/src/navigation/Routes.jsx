import ItSoftware from "../page/ItSoftware";
import Accounting from "../page/Accounting";
import BankingAndFinance from "../page/BankingAndFinance";
import CivilEngineer from "../page/CivilEngineer";
import HrAndTraining from "../page/HrAndTraining";
import ItHardware from "../page/ItHardware";
import ItTelecome from "../page/ItTelecome";
import OfficeAdmin from "../page/OfficeAdmin";

const route = [
    {name: "itSoftware", path: "/it-software", element: <ItSoftware />},
    {name: "accounting", path: "/accounting", element: <Accounting />},
    {name: "bankingAndFinance", path: "/banking-and-finance", element: <BankingAndFinance />},
    {name: "civilEngineer", path: "/civil-engineer", element: <CivilEngineer />},
    {name: "hrAndTraining", path: "/hr-and-training", element: <HrAndTraining />},
    {name: "itHardware", path: "/it-hardware", element: <ItHardware />},
    {name: "itTelecome", path: "/it-telecome", element: <ItTelecome />},
    {name: "officeAdmin", path: "/office-admin", element: <OfficeAdmin />},
]

export default route;