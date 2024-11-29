import React, { useState } from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process, orderBy } from "@progress/kendo-data-query";
import today_appointment_data from "../../local_data/today_appoinemnt";

const CustomHeaderCell = (props) => (
  <th
    className="text-gray-800 text-xl text-center font-bold capitalize"
    {...props}
  >
    {props.title}
    {props.sortDirection && (
      <span
        className={`k-icon k-i-${
          props.sortDirection === "asc" ? "sort-asc" : "sort-desc"
        }`}
      />
    )}
  </th>
);

const column_text = [
  {
    field: "patientName",
    title: "Patient Name",
    minWidth: 50,
    width: 250,
    className: "text-blue-700 font-bold",
    headerCell: CustomHeaderCell,
  },
  {
    field: "identifier",
    title: "Identifier",
    minWidth: 50,
    width: 110,
    className: "",
    headerCell: CustomHeaderCell,
  },
  {
    field: "location",
    title: "Location",
    minWidth: 50,
    width: 200,
    className: " ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "serviceType",
    title: "Service Type",
    minWidth: 50,
    width: 250,
    headerCell: CustomHeaderCell,
  },
  {
    field: "status",
    title: "Status",
    minWidth: 50,
    width: 200,
    headerCell: CustomHeaderCell,
  },
];

const DetailRow = ({ dataItem }) => {
  return (
    <div className="p-4 bg-gray-100">
      <p>
        <strong className="text-xl">{dataItem.serviceType}</strong>
      </p>

      {/* Display a formatted date/time if available */}
      <p className="text-lg">Today, 09:22 PM</p>

      <br />

      <div className="grid grid-cols-3 gap-4 w-full h-auto ">
        <div className=" min-h-[100px] " id="patient  details">
          <p className="text-lg">Patient Details</p>
          <br />
          <p className="text-sm ">
            {" "}
            <strong> Patient name : </strong> {dataItem.patientName}{" "}
          </p>
          <p className="text-sm ">
            {" "}
            <strong> Age : </strong> 22{" "}
          </p>
          <p className="text-sm ">
            {" "}
            <strong> Gender : </strong> Male{" "}
          </p>
          <p className="text-sm ">
            {" "}
            <strong> Date of birth : </strong> 12-Dec-2001{" "}
          </p>
        </div>

        <div className=" min-h-[100px] ">
          <p className="text-lg">Appointment Notes</p>
          <br />
        </div>

        <div className=" min-h-[100px] ">
          <p className="text-lg">Appointment History</p>
          <br />

          <div className="grid grid-cols-2 h-40 w-full border-2 ">
            <div className="min-h-100  ">
              <div className="font-bold"> Completed </div>
              <div className="text-xl text-blue-700 font-bold"> 0 </div>
            </div>

            <div className="min-h-100  ">
              <div className="font-bold"> Missed </div>
              <div className="text-xl text-red-700 font-bold"> 0 </div>
            </div>

            <div className="min-h-100  ">
              <div className="font-bold"> Cancelled </div>
              <div className="text-xl text-blue-700 font-bold"> 0 </div>
            </div>

            <div className="min-h-100  ">
              <div className="font-bold"> Upcomming </div>
              <div className="text-xl text-blue-700 font-bold"> 1 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const btn = (data) => {
  return (
    <button
      className="inline-flex items-center   w-32
border-2 border-[#007d79] text-[#007d79]
px-2 py-2 font-semibold
hover:bg-[#007d79] hover:text-white"
    >
      <span>{data}</span>
    </button>
  );
};

const BooleanCell = (props) => {
  return (
    <td>{props.dataItem[props.field] ? btn("Checked") : btn("Check In")} </td>
  );
};

const initialSort = [{ field: "patientName", dir: "asc" }];

function DatagridComponent_appointment() {
  const [dataState, setDataState] = useState({ skip: 0, take: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState({}); // State to manage expanded rows
  const [sort, setSort] = React.useState(initialSort);

  const getFilteredData = (query, data) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredData = getFilteredData(searchQuery, today_appointment_data);
  const result = process(filteredData, { ...dataState, sort });

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setDataState({ skip: 0, take: 10 }); // Reset to first page on new search
  };

  const toggleRowDetails = (dataItem) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [dataItem.identifier]: !prevState[dataItem.identifier],
    }));
  };

  return (
    <>
      {/* Search section start */}

      <div className="w-full  mb-4">
        <div className="relative w-full flex flex-row items-center gap-0">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full font-medium p-1 ps-10 text-lg border-2  text-gray-900 
               bg-gray-300 
            "
              placeholder="Filter Table"
              value={searchQuery}
              onChange={handleSearch}
            />

           
          </div>

          {/* Download Button */}
          <button
            className="inline-flex items-center  
        border-2 border-[#007d79] text-brandColor-500
        px-4 py-1 font-bold 
        hover:bg-brandColor-500 hover:text-white"
          >
            <span>Download</span>
            <svg
              className="ml-2 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search section end */}

      <Grid
        data={result.data.map((item) => ({
          ...item,
          expanded: expandedRows[item.identifier] || false,
        }))}
        pageable
        onDataStateChange={onDataStateChange}
        {...dataState}
        total={filteredData.length}
        detail={(props) => <DetailRow {...props} />}
        expandField="expanded"
        onExpandChange={(e) => toggleRowDetails(e.dataItem)}
        sortable={true}
        sort={sort}
        onSortChange={(e) => setSort(e.sort)}
      >
        {column_text.map((item) => (
          <GridColumn
            key={item.field}
            field={item.field}
            title={item.title}
            width={item.width}
            cell={item.field === "status" ? BooleanCell : ""}
            headerCell={item.headerCell}
            className={"text-gray-700 font-extrabold text-lg " + item.className}
          />
        ))}
      </Grid>
    </>
  );
}

export default DatagridComponent_appointment;
