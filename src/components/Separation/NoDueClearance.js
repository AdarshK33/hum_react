import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
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
import Pagination from "react-js-pagination";
import Select from "react-select";
import { Edit2, Eye, Search } from "react-feather";
import { AdminContext } from "../../context/AdminState";
import "./nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const NoDueClearance = () => {
  const {
    total,
    loader,
    updateITClearanceList,
    viewITClearanceList,
    noDueClearanceList,
  } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const [pageCount, setPageCount] = useState(0);
  const [clearanceData, setCleranceData] = useState({
    itclearanceId: "",
    exitId: "",
    itClearanceStatus: "",
    itAmount: "",
    itRemarks: "",
    itClearanceUpdatedBy: "",
    lastWorkingDay: "",
    employeeId: "",
    employeeName: "",
    costCentreName: "",
    joiningDate: "",
    managerName: "",
  });
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [costCenter, setCostCenter] = useState("all");
  const [searchValue, setSearchValue] = useState("all");
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords =
    noDueClearanceList !== null && noDueClearanceList !== undefined && total;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const [currentRecords, setCurrentRecords] = useState([]);

  useEffect(() => {
    if (noDueClearanceList !== null && noDueClearanceList !== undefined) {
      setCurrentRecords(noDueClearanceList);
    }
  }, [noDueClearanceList, currentRecords]);

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    console.log("page change", pageNumber, pageCount);

    setCurrentPage(pageNumber);
    if (searchValue !== "all") {
      viewITClearanceList(searchValue, pageNumber - 1, costCenter);
    } else {
      viewITClearanceList("all", pageNumber - 1, "all");
    }
    setCurrentRecords(noDueClearanceList);
  };
  /*-----------------Pagination------------------*/

  useEffect(() => {
    CostCenter();
  }, []);
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const searchDataHandler = () => {
    if (searchValue !== "" && searchValue !== "all") {
      viewITClearanceList(searchValue, pageCount, costCenter);
    } else {
      viewITClearanceList("all", pageCount, "all");
    }
  };

  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    console.log(data2);
    setCostCenter(data2);
    if (costCenter !== "" && costCenter !== "all") {
      return viewITClearanceList(searchValue, pageCount, costCenter);
    } else {
      return viewITClearanceList("all", pageCount, "all");
    }
  };

  const renderStatusOptions = (value) => {
    console.log("options", value);
    return (
      <div>
        <select
          name="itClearanceStatus"
          value={value.data.itClearanceStatus}
          onChange={(e) => statusRender(e, value)}
        >
          <option value="0"> Due </option>
          <option value="1"> No Due </option>
          <option value="2"> On Hold </option>
        </select>
      </div>
    );
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleSave = (value) => {
    const formData = value.data;
    console.log(formData, pageCount, "handlelsave");
    setCleranceData(formData);
    updateITClearanceList(formData, searchValue, pageCount, costCenter);
  };
  useEffect(() => {
    console.log(pageCount, "pageCount");
    viewITClearanceList(searchValue, pageCount, costCenter);
  }, [costCenter, searchValue, pageCount]);
  const statusRender = (e, value) => {
    const status = e.target.value;
    const clearanceStatus = value.data;
    clearanceStatus["itClearanceStatus"] = status;
    clearanceStatus["disabled"] = true;
  };
  console.log(noDueClearanceList, "noDueClearance");
  const renderButton = (e) => {
    console.log(e, "render");
    var buttonValue = e.data.disabled;
    return (
      <button
        disabled={buttonValue}
        style={
          buttonValue
            ? {
                backgroundColor: "#9ea4af54",
                color: "white",
                border: "1px solid #9ea4af54",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "100%",
                lineHeight: "30px",
              }
            : {
                backgroundColor: "#006ebb",
                color: "white",
                border: "1px solid #006ebb",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "100%",
                lineHeight: "30px",
              }
        }
        onClick={() => handleSave(e)}
      >
        Save
      </button>
    );
  };
  const employeeIdHandle = (e) => {
    console.log(e, "employeeId");
  };
  return (
    <div>
      <Fragment>
        <Container fluid>
      <Breadcrumb title="No Due Clearance" parent="No Due Clearance" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Row className="mt-4 mainWrapper">
          <Col className="searchBox">
            <input
              className="form-control inputWrapper"
              type="text"
              placeholder="Search.."
              onChange={(e) => searchHandler(e)}
            />
            <Search
              className="search-icon"
              style={{ color: "#313131", marginRight: "17rem" }}
              onClick={searchDataHandler} 
                          />
          </Col>
          <div className="col-sm-6">
          <Col className="selectList">
            <br/>
            <label className="title">Select Cost Center</label> &nbsp;&nbsp;
             
          <Select
          className="selectInputWrapper"
           name="filters"
          placeholder="Cost Center"
          options={costCenterList !== null ?costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
            onChange={handleCostCenter}
               required isSearchable />
          </Col>
          </div>
        </Row>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="nodue_title" >
              <b >NO DUE CLEARANCE LISTING </b>            
              </div>
         

        <div className="ag-theme-alpine" style={{ align:"center",height: 495, width: 1400 }}>
          
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
          <AgGridColumn className="columnColor" editable="false" headerName="S No" lockPinned="true" pinned="left" valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Id" field="employeeId"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Name" field="employeeName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Cost Center Name" field="costCentreName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Manager Name" field="managerName"></AgGridColumn>
            <AgGridColumn  className="columnColor" editable="false" headerName="Joining Date" field="joiningDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Last Working Day" field="lastWorkingDay"></AgGridColumn>
            <AgGridColumn className="columnColor" headerName="IT Amount To Be Recovered" field="itAmount"></AgGridColumn>

                  <div
                    className="ag-theme-alpine"
                    style={{ align: "center", height: 495, width: 1400 }}
                  >
                    <AgGridReact
                      rowData={noDueClearanceList}
                      rowSelection="single"
                      onGridReady={onGridReady}
                      defaultColDef={{
                        width: 150,
                        editable: true,
                        resizable: true,
                      }}
                    ></AgGridReact>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="S No"
                      pinned="left"
                      valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Employee Id"
                      field="employeeId"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Employee Name"
                      field="employeeName"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Cost Center Name"
                      field="costCentreName"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Manager Name"
                      field="managerName"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Joining Date"
                      field="joiningDate"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      editable="false"
                      headerName="Last Working Day"
                      field="lastWorkingDay"
                    ></AgGridColumn>
                    <AgGridColumn
                      className="columnColor"
                      headerName="IT Amount To Be Recovered"
                      field="itAmount"
                    ></AgGridColumn>

                    <div
                      className="ag-theme-alpine"
                      style={{ align: "center", height: 495, width: 1400 }}
                    >
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
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Employee Id"
                          field="employeeId"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Employee Name"
                          field="employeeName"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Cost Center Name"
                          field="costCentreName"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Manager Name"
                          field="managerName"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Joining Date"
                          field="joiningDate"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          editable="false"
                          headerName="Last Working Day"
                          field="lastWorkingDay"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          headerName="IT Amount To Be Recovered"
                          field="itAmount"
                        ></AgGridColumn>

                        <AgGridColumn
                          className="columnColor"
                          field="itClearanceStatus"
                          headerName="IT Clearance"
                          editable={true}
                          colId="status"
                          cellRendererFramework={renderStatusOptions}
                          cellEditorParams={{
                            values: ["0", "1", "2"],
                            cellRenderer: { statusRender },
                          }}
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          headerName="IT Clearance Remarks"
                          field="itRemarks"
                        ></AgGridColumn>
                        <AgGridColumn
                          className="columnColor"
                          headerName="IT Clearance UpdatedBy"
                          field="itClearanceUpdatedBy"
                        ></AgGridColumn>
                        <AgGridColumn
                          headerName="Action"
                          editable="false"
                          field="exitId"
                          cellRendererFramework={(e) => renderButton(e)}
                        ></AgGridColumn>
                      </AgGridReact>
                    </div>
                  </div>
                  </AgGridReact>
                  <div>
                    {noDueClearanceList == null &&
                    noDueClearanceList == undefined ? (
                      <div
                        className="loader-box loader"
                        style={{ width: "100% !important" }}
                      >
                        <div className="loader">
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                        </div>
                      </div>
                    ) : (
                      <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={currentPage}
                        itemsCountPerPage={recordPerPage}
                        totalItemsCount={totalRecords}
                        pageRangeDisplayed={pageRange}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    </div>
    )
};
export default NoDueClearance;
