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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit2, Eye, Search } from "react-feather";
import { AdminContext } from "../../context/AdminState";
import { OfferContext } from "../../context/OfferState";
import { PermissionContext } from "../../context/PermissionState";
import "./nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const NoDueClearance = () => {
  const {
    total,
    loader,
    NoDueClearanceClearanceExport,
    noDueClearanceClearanceExport,
    updateITClearanceList,
    viewITClearanceList,
    noDueClearanceList,
  } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const { AllCostCenter, allCostCenterList } = useContext(OfferContext);
  const { rolePermission } = useContext(PermissionContext);
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
  const [dropValue,setDropValue] = useState({value:null})
  const [costCenter, setCostCenter] = useState("all");
  const [searchValue, setSearchValue] = useState("all");
  const [actionStatus, setActionStatus] = useState("3");
  const [enableValue , SetEnableValue] = useState(null)
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const [currentRecords, setCurrentRecords] = useState([]);

  useEffect(() => {
    console.log("current 11111");
    if (noDueClearanceList !== null && noDueClearanceList !== undefined) {
      setCurrentRecords(noDueClearanceList);
    }
  }, [noDueClearanceList, currentRecords]);

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "all" ||actionStatus !== "3" || costCenter !== "all") {
      console.log(
        "page change1",
        searchValue,
        actionStatus,
        costCenter,
        pageCount
      );
      viewITClearanceList(
        searchValue,
        pageNumber - 1,
        actionStatus,
        costCenter
      );
    } else {
      console.log(
        "page change2",
        searchValue,
        actionStatus,
        costCenter,
        pageCount
      );

      viewITClearanceList("all", pageNumber - 1, "3", "all");
    }
    setCurrentRecords(noDueClearanceList);
  };

  /*-----------------Pagination------------------*/

  useEffect(() => {
    CostCenter();
  }, []);

  useEffect(() => {
    let superMangerFlag;
    if(rolePermission === "superCostCenterManager"){
      superMangerFlag=1
      AllCostCenter(superMangerFlag);
    }else{
      superMangerFlag=0
      AllCostCenter(superMangerFlag);
    }
  }, [rolePermission]);
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const handleExport = (e) => {
    const value = e.target.value;
    NoDueClearanceClearanceExport(value);
  };
  const searchDataHandler = () => {
    if (searchValue !== "" && searchValue !== "all") {
      viewITClearanceList(searchValue, pageCount, actionStatus, costCenter);
    } else {
      viewITClearanceList(searchValue, pageCount, "3", "all");
    }
  };

  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    console.log(data2);
    setCostCenter(data2);
    if (costCenter !== "" && costCenter !== "all") {
      viewITClearanceList(searchValue, pageCount, actionStatus, data2);
    } else {
      viewITClearanceList("all", pageCount, "3", data2);
    }
  };
  const handleActionStatus = (options) => {
    let data2 = options !== null ? options.value : "";
    setActionStatus(data2);
    if (actionStatus !== "" && actionStatus !== "all") {
      viewITClearanceList(searchValue, pageCount, data2, costCenter);
    } else {
      viewITClearanceList("all", pageCount, data2, "all");
    }
  };
  const renderStatusOptions = (value) => {
      let data = value.data.itClearanceStatus 
      var id = value.data.exitId
    console.log(value,data,"renderstatusoption")
    return (
      <div>
        <select
          className="selectpicker"
          name="itClearanceStatus"
          key={id}
          defaultValue={data}
          value={enableValue}
          onChange={(e) => statusRender(e, value)}
        >
          <option value={null}> Yet to Approve </option>
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
  const statusRender = (e, value) => {
    e.preventDefault();
    console.log(e.target.value,"status render")
    var statusData = e.target.value;
    SetEnableValue(statusData)

    var clearanceStatus = value.data;
    if(clearanceStatus['itClearanceStatus'] !== statusData){
      console.log(statusData,clearanceStatus,"in if")
      clearanceStatus["itClearanceStatus"] = statusData;
    }
 
  
  console.log(clearanceStatus,"ittttt")
  };
  const handleSave = (value) => {
    const formData = value.data;
    console.log(formData, "handlsave");
    if (
      formData.itClearanceStatus !== "" &&
      formData.itClearanceStatus !== null
    ) {
      if (
        formData.itClearanceStatus == 0 &&
        formData.itRemarks !== null &&
        formData.itRemarks !== undefined &&
        formData.itRemarks !== ""
      ) {
        setCleranceData(formData);
        formData['disabled'] = false
        console.log(formData,"0")
        updateITClearanceList(
          formData,
          searchValue,
          pageCount,
          actionStatus,
          costCenter
        );
      } else if (
        formData.itClearanceStatus == 1 &&
        formData.itAmount == 0
      ) {
        console.log(formData,"1")

        formData['disabled'] = false
        setCleranceData(formData);
        updateITClearanceList(
          formData,
          searchValue,
          pageCount,
          actionStatus,
          costCenter
        );
      } else if (
        formData.itClearanceStatus == 2 &&
        formData.itRemarks !== null &&
        formData.itRemarks !== undefined &&
        formData.itRemarks !== ""
      ) {
        formData['disabled'] = false

        console.log(formData,"2")
        setCleranceData(formData);
        updateITClearanceList(
          formData,
          searchValue,
          pageCount,
          actionStatus,
          costCenter
        );
      } else {
        toast.error(formData.itClearanceStatus == 1?"Please enter IT-remarks and ItAmount should be zero":"Please enter IT-remarks");
      }
    } else {
      toast.error("please enter IT status and remarks");
    }
    SetEnableValue(null)
  };
  useEffect(() => {
    console.log(pageCount, "cost search action page");
    viewITClearanceList(searchValue, pageCount, actionStatus, costCenter);
  }, [costCenter, searchValue, pageCount, actionStatus]);

  const renderButton = (e) => {
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
  const options = [
    { value: "3", label: "All" },
    { value: "4", label: "Yet to Approve" },
    { value: "0", label: "Due" },
    { value: "1", label: "No Due" },
    { value: "2", label: "On Hold" },
  ];


const itStatusValue = [
  { value: '0', label: 'Due' },
  { value: '1', label: 'No Due' },
  { value: '2', label: 'On Hold' },
];
const getRowId = params => params.data.exitId;

  return (
    <div>
      <Fragment>
        <ToastContainer />
        <Container fluid>
          <Breadcrumb
            title="IT No Due Clearance"
            parent="IT No Due Clearance"
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Row className="mt-4 mainWrapper">
                  <div className="col-sm-3">
                    {" "}
                    <input
                      className="form-control searchButton"
                      type="text"
                      placeholder="Search.."
                      onChange={(e) => searchHandler(e)}
                    />
                    <Search
                      className="search-icon mr-2"
                      style={{ color: "#313131" }}
                      onClick={searchDataHandler}
                    />
                  </div>
                  <div className="col-sm-5">
                    {/* <select className="selectActionStatus"  name="itClearanceStatus"  onChange={(e) => handleActionStatus(e)}>
        <option value={"all"}> select Action</option>
          <option value="Save"> Save </option>
          <option value="NotSaved"> Not saved </option>
        </select> */}
                    <Col className="selectList">
                      <br />
                      <label className="title" style={{ padding: "6px" }}>
                        IT Clearance Status
                      </label>{" "}
                      &nbsp;&nbsp;
                      <Select
                        className="selectInputWrapperStatus"
                        name="filters"
                        placeholder="IT Clearance Status"
                        onChange={handleActionStatus}
                        options={options}
                        required
                        isSearchable
                      />
                    </Col>
                  </div>
                  <div className="col-sm-4">
                    <Col className="selectList">
                      <br />
                      <label className="title" style={{ padding: "6px" }}>
                        Select Cost Center
                      </label>{" "}
                      &nbsp;&nbsp;
                      <Select
                        className="selectInputWrapper"
                        name="filters"
                        placeholder="Cost Center"
                        options={
                          allCostCenterList !== null
                            ? allCostCenterList.map((e) => ({
                                label: e.costCentreName,
                                value: e.costCentreName,
                              }))
                            : []
                        }
                        onChange={handleCostCenter}
                        required
                        isSearchable
                      />
                    </Col>
                  </div>
                </Row>
                <div className="card" style={{ overflowX: "auto" }}>
                  <div className="nodue_title">
                    <b>IT NO DUE CLEARANCE LISTING </b>
                    <Button
                      style={{ float: "right", marginTop: "5px" }}
                      className="btn btn-light mr-2"
                      onClick={handleExport}
                    >
                      {" "}
                      Export excel
                    </Button>
                  </div>

                  <div
                    className="ag-theme-alpine"
                    style={{ align: "center", height: 490, width: "100%" }}
                  >
                    <AgGridReact
                      rowData={noDueClearanceList}
                      rowSelection="single"
                      onGridReady={onGridReady}
                      suppressRowClickSelection={true}
                      getRowId={getRowId}
                      defaultColDef={{
                        width: 200,
                        editable: true,
                        resizable: true,
                      }}
                    >
                      <AgGridColumn
                        width={80}
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
                        // editable= {enableValue}
                        headerName="IT Amount To Be Recovered"
                        field="itAmount"
                      ></AgGridColumn>

                      <AgGridColumn
                        className="columnColor"
                        field="itClearanceStatus"
                        headerName="IT Clearance"
                         editable= {false}
                        colId="status"
                        getColId="exitId"
                        singleClickEdit="true"
                        cellRendererFramework={renderStatusOptions}
                        cellRendererParams={{
                          suppressEnterExpand: true,
                        }}
                        cellEditorParams={{
                          values: ["0", "1", "2", "4"],
                          cellRenderer: { statusRender },
                        }}
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        // editable= {enableValue}
                        headerName="IT Clearance Remarks"
                        field="itRemarks"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        // editable= {enableValue}
                        headerName="IT Clearance UpdatedBy"
                        field="itClearanceUpdatedBy"
                      ></AgGridColumn>
                      <AgGridColumn
                        headerName="Action"
                        editable="false"
                        field="disabled"
                        cellRendererFramework={(e) => renderButton(e)}
                      ></AgGridColumn>
                    </AgGridReact>
                  </div>

                  {noDueClearanceList === null ? (
                    <p style={{ textAlign: "center" }}>No Record Found</p>
                  ) : null}
                </div>
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
                      firstPageText="First"
                      lastPageText="Last"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    </div>
  );
};
export default NoDueClearance;
