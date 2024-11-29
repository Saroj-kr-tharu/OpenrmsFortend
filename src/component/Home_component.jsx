import { Hospital } from "lucide-react";
import SideMenu from "./SideMenu";
import DatagridComponent from "./dataGrid/Datagrid_component_Active_visits";
import DatagridComponent_appointment from "./dataGrid/Datagrid_component_Tody_appointments";
import Header_component from "./header_component";


const HomeComponent = () => {
  const parameters = [
    { name: "Active Visits", sub: "patients", num: "15" },
    { name: "Total visits Today", sub: "patients", num: "0" },
    { name: "Scheduled For Today", sub: "patients", num: "0" },
  ];

  return (
   <>
    <Header_component />
    <div className="min-h-screen mt-20 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Side Menu */}
        <div className="w-64 bg-white border-r-2 overflow-y-auto">
          <SideMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Logo Section */}
          <div className="flex items-center p-4 border-b border-[#F4F4F4] bg-white">
            <Hospital size={85} className="text-black mr-4" />
            <div>
              <span className="block text-lg  text-brandColor-600">Clinic</span>
              <span className="block text-3xl  text-brandColor-600">Home</span>
            </div>
          </div>

          {/* Today's Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white">
            {parameters.map((item) => (
              <div
                key={item.name}
                className="p-4 border-2 rounded-lg transition-all duration-300"
              >
                <h3 className="text-xl text-brandColor-500 capitalize font-medium mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-brandColor-400 mb-2">{item.sub}</p>
                <div className="text-3xl ">{item.num}</div>
              </div>
            ))}
          </div>

          {/* Active Visits Section */}
          <div className="flex-1 overflow-hidden p-4 bg-white">
            <div className="flex flex-col h-full border-2 border-[#E0E0E0] rounded-lg">
              {/* Title */}
              <div className="h-16 px-4 flex items-center border-b border-[#E0E0E0]">
                <h3 className="text-xl text-brandColor-500 capitalize font-bold after-underline">
                  Active Visits
                </h3>
              </div>

              {/* Data Grid */}
              <div className="flex-1 overflow-auto">
                <DatagridComponent />
              </div>
            </div>
          </div>

          {/*Today's Appointments */}
          <div className="flex-1 overflow-hidden p-4 bg-white">
            <div className="flex flex-col h-full border-2 border-[#E0E0E0] rounded-lg">
              {/* Title */}
              <div className="h-16 px-4 flex items-center border-b border-[#E0E0E0]">
                <h3 className="text-xl text-brandColor-500 capitalize font-bold after-underline">
                Today's Appointments
                </h3>
              </div>

              {/* Data Grid */}
              <div className="flex-1 overflow-auto">
                <DatagridComponent_appointment />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    </>
  );
};

export default HomeComponent;
