import React, { useState } from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Patient_info from "../../local_data/patient_Visit";

const CustomHeaderCell = (props) => (
  <th
    className="text-gray-800  text-center font-medium capitalize"
    {...props}
  >
    {props.title}
  </th>
);

const column_text = [
  {
    field: "visitTime",
    title: "Visit Time",
    minWidth: 50,
    width: 250,
    className: " ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "idNumber",
    title: "ID Number",
    minWidth: 50,
    width: 120,
    className: " ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "fullName",
    title: "Name",
    minWidth: 50,
    width: 250,
    className: "text-blue-700 font-bold  ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "gender",
    title: "Gender",
    minWidth: 50,
    width: 90,
    className: " ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "age",
    title: "Age",
    minWidth: 50,
    width: 70,
    className: " ",
    headerCell: CustomHeaderCell,
  },
  {
    field: "visitType",
    title: "Visit Type",
    minWidth: 50,
    width: 120,
    className: " ",
    headerCell: CustomHeaderCell,
  },
];

const DetailRow = ({ dataItem }) => {
  const details = [
    { label: "ID Number", value: dataItem.idNumber },
    { label: "Visit Time", value: dataItem.visitTime },
    { label: "Full Name", value: dataItem.fullName },
    { label: "Gender", value: dataItem.gender },
    { label: "Age", value: dataItem.age },
    { label: "Visit Type", value: dataItem.visitType },
  ];

  return (
    <div className="p-4 bg-gray-100">
      {details.map((detail, index) => (
        <p key={index}>
          <strong>{detail.label}:</strong> {detail.value}
        </p>
      ))}
    </div>
  );
};

function DatagridComponent() {
  const [dataState, setDataState] = useState({ skip: 0, take: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState({}); // State to manage expanded rows

  const getFilteredData = (query, data) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredData = getFilteredData(searchQuery, Patient_info);
  const result = process(filteredData, dataState);

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
      [dataItem.idNumber]: !prevState[dataItem.idNumber],
    }));
  };

  return (
    <>

    {/* search section start */}
      <div className="w-full  mb-4">
        <div className="relative">
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
            className="block w-full font-medium p-1 ps-10 text-lg text-gray-900 border bg-gray-300 
        focus:ring-[#C1C1C1] focus:border-red-700 "
            placeholder="Filter Table"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
    {/* search section end */}

{/* data grid section start  */}
      <Grid
        data={result.data.map((item) => ({
          ...item,
          expanded: expandedRows[item.idNumber] || false,
        }))}
        pageable
        onDataStateChange={onDataStateChange}
        {...dataState}
        total={filteredData.length}
        detail={(props) => <DetailRow {...props} />}
        expandField="expanded"
        onExpandChange={(e) => toggleRowDetails(e.dataItem)}
      >
        {column_text.map((item) => (
          <GridColumn
            key={item.field}
            field={item.field}
            title={item.title}
            width={item.width}
            headerCell={item.headerCell}
            className={"text-gray-700 font-extrabold text-sm " + item.className}
          />
        ))}
      </Grid>
      {/* data grid section end  */}


    </>
  );
}

export default DatagridComponent;
