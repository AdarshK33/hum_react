
import React, { Fragment, useState, useContext, useEffect } from "react";
import { SeparationContext } from "../../context/SepearationState";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import moment from "moment";
import "./nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { handleInputChange } from "react-select/src/utils";
const NoDueClearance = () => {
  const { separationListView, separationList,viewITClearanceList,noDueClearanceList, total, loader } = useContext(
    SeparationContext
  );
  const [pageCount, setPageCount] = useState(0);
  const [listRecords, setListRecords] = useState([]);
  const [clearanceData, setCleranceData] = useState({
    financeClearanceId: "",
    exitId: "",
    financeClearanceStatus: "",
    financeAmount: "",
    financeRemarks: "",
    financeClearanceUpdatedBy: "",
    dateOfResignation: "",
    lastWorkingDate: "",
    employeeId: "",
    empName: "",
    costCentre: "",
    joiningDate: "",
    managerName: "",
  });
  const [financeClearanceStatus, setStatus] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [data, setData] = useState([]);

  const onStatusChange = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };
  const renderStatusOptions = () => {
    return (
      <div>
        <select>
          <option value="Due"> Due </option>
          <option value="No Due"> No Due </option>
          <option value=" On Hold"> On Hold </option>
        </select>
      </div>
    );
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleSave = () => {
    console.log(data);
  };
  useEffect(() => {
    viewITClearanceList("all", pageCount);
  },[]);
  useEffect(() => {
    if (noDueClearanceList !== undefined && noDueClearanceList !== null) {
      setListRecords(noDueClearanceList);
    }
  }, [noDueClearanceList, listRecords]);
  const statusRender = (value) => {
    console.log(value);
    return <span>{value}</span>;
  };
console.log(listRecords,listRecords,"listRecords")
  const renderButton = () => {
    return (
      <button
        style={{
          backgroundColor: "#006ebb",
          color: "white",
          border: "1px solid #006ebb",
          paddingLeft: "10px",
          paddingRight: "10px",
          width: "100%",
          lineHeight: "30px",
        }}
        onClick={() => handleSave()}
      >
        Save
      </button>
    );
  };
  const onSelectionChanged = () => {
    let selectedRows = gridApi.getSelectedRows();
    let selectedData =
      selectedRows !== null && selectedRows.length === 1 ? selectedRows[0] : "";
    setData(selectedData);
    // setData(selectedData);
    // return selectedData;
  };
 
  return (
    <Fragment>
      <Container fluid>
        <div className="row headingWrapper px-4 mx-auto">
          <div className="col-md-12">
            <b className="text-uppercase text-center">
              NO DUE CLEARANCE LISTING
            </b>
          </div>
        </div>
        <div className="row">
        <div className="job-filter">
                  <div className="faq-form mr-4">
                    <input className="form-control searchButton" type="text" placeholder="Search.." 
                    // onChange={(e) => searchHandler(e)} 
                    />
                    <Search className="search-icon" style={{ color: "#313131",alignContent:"center" }} 
                    // onClick={searchDataHandler} 
                    />
                  </div>
                </div>
          
                </div>
        {/* <button
          style={{
            backgroundColor: "#006ebb",
            color: "white",
            border: "1px solid #006ebb",
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "100%",
            lineHeight: "30px",
          }}
          onClick={() => onSelectionChanged()}
        >
          Save
        </button> */}
        <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
          <AgGridReact
            rowData={noDueClearanceList}
            rowSelection="single"
            onGridReady={onGridReady}
            defaultColDef={{
              width: 150,
              editable: true,
              resizable: true,
            }}
          >
            <AgGridColumn headerName="Employee Id" field="employeeId"></AgGridColumn>
            <AgGridColumn headerName="Employee Name" field="employeeName"></AgGridColumn>
            <AgGridColumn headerName="Cost Center Name" field="costCentreName"></AgGridColumn>
            <AgGridColumn headerName="Manager Name" field="managerName"></AgGridColumn>
            <AgGridColumn headerName="Joining Date" field="joiningDate"></AgGridColumn>
            <AgGridColumn headerName="Last Working Day" field="lastWorkingDay"></AgGridColumn>
            <AgGridColumn headerName="IT Clearance"  onClick={renderStatusOptions}></AgGridColumn>
            <AgGridColumn headerName="IT Clearance Remarks" field="itRemarks"></AgGridColumn>
            <AgGridColumn headerName="IT Clearance UpdatedBy" field="itClearanceUpdatedBy"></AgGridColumn>
            <AgGridColumn
              field="Action"
              cellRendererFramework={() => renderButton()}
            ></AgGridColumn>
          </AgGridReact>
        </div>
   
      </Container>
    </Fragment>
  );
};
export default NoDueClearance;
