
import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { SeparationContext } from "../../context/SepearationState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import "./financeClearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const FinanceClearanceList = () => {
  const {
    total,
    loader,FinanceClearanceExport,
    saveFinanceClearanceData,
    separationListView,
    separationList,
  } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const [pageCount, setPageCount] = useState(0);
  const [clearanceData, setCleranceData] = useState({
    financeclearanceId: "",
    exitId: "",
    financeClearanceStatus: "",
    financeAmount: "",
    financeRemarks: "",
    financeClearanceUpdatedBy: "",
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
  const [actionStatus, setActionStatus] = useState("3");
  const [enableValue , SetEnableValue] = useState(null)
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 20;
  const totalRecords = total;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const [currentRecords, setCurrentRecords] = useState([]);

  useEffect(() => {
    if (separationList !== null && separationList !== undefined) {
      
      setCurrentRecords(separationList);
    }
  }, [separationList, currentRecords]);

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "all" || actionStatus !== "3" || costCenter !== "all") {

      separationListView(searchValue, pageNumber - 1,actionStatus, costCenter);
    } else {

      separationListView("all",pageNumber - 1,"3", "all");
    }
    setCurrentRecords(separationList);
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
      separationListView(searchValue, pageCount,actionStatus, costCenter);
    } else {
      separationListView("all", pageCount,"3", "all");
    }
  };

  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    setCostCenter(data2);
    if (costCenter !== "" && costCenter !== "all") {
      console.log(data2,"if");
       separationListView(searchValue, pageCount,actionStatus, data2);
    } else {
      console.log(data2,"else");
       separationListView("all", pageCount,"3", "all");
    }
  };
  const handleExport = (e) =>{
    const value = e.target.value
    FinanceClearanceExport(value)
  }
  const handleActionStatus = (options)=>{
    let data2 = options !== null?options.value:''
    setActionStatus(data2)
    if (actionStatus !== "" && actionStatus !== "3") {
      separationListView(searchValue, pageCount, data2,costCenter);
    } else {
      separationListView("all", pageCount,"3" ,"all");
    } 
  }
  const renderStatusOptions = (value) => {
    return (
      <div>
        <select
          name="financeClearanceStatus" className="selectpicker" 
          defaultValue={value.data.financeClearanceStatus}
          value={enableValue}
          onChange={(e) => statusRender(e, value)}
        >
          <option value={null}> select </option>
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
    const statusData = e.target.value;
    const clearanceStatus = value.data;
    SetEnableValue(statusData)
    console.log(clearanceStatus ,"before")
      clearanceStatus['financeClearanceStatus']= statusData
      console.log(clearanceStatus,"after")    
  };

  const handleSave = (value) => {
    const formData = value.data;
    console.log(formData, pageCount, "handlelsave");
    if(formData.financeClearanceStatus !== "" && formData.financeClearanceStatus !== null ){
     if( formData.financeClearanceStatus == 0 && formData.financeRemarks !==null && formData.financeRemarks !== undefined && formData.financeRemarks !==""){
      formData['disabled'] = false
      console.log(formData,"0")
      setCleranceData(formData);
     saveFinanceClearanceData(formData, searchValue, pageCount,actionStatus, costCenter);
    toast.info("Finance Clearance fetched successfully")
    }else if(formData.financeClearanceStatus == 1 ){
      formData['disabled'] = true
      console.log(formData,"1")
      setCleranceData(formData);
     saveFinanceClearanceData(formData, searchValue, pageCount,actionStatus, costCenter);
    toast.info("Finance Clearance fetched successfully")
    }else if(formData.financeClearanceStatus == 2){
      formData['disabled'] = false
      console.log(formData,"2")
      setCleranceData(formData);
     saveFinanceClearanceData(formData, searchValue, pageCount,actionStatus, costCenter);
    toast.info("Finance Clearance fetched successfully")
    }else{
      toast.error("Please enter finance-remarks")
    }
    }else{
      toast.error("please enter finance status and remarks")
    }
  };
  useEffect(() => {
    console.log(pageCount, "pageCount");
    separationListView(searchValue, pageCount,actionStatus, costCenter);
  }, [costCenter, searchValue, pageCount,actionStatus]);

 
  console.log(separationList, "noDueClearance");
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
  const options = [
    { value: "3", label: "All" },
    { value: "0", label: "Due" },
    { value: "1", label: "No Due" },
    { value: "2", label: "On Hold" },
  ];
  return (
    <div>
      <Fragment>
      <ToastContainer />
        <Container fluid>
      <Breadcrumb title="Finance Clearance" parent="Finance Clearance" />
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
        <option value={"all"}> select Action </option>
          <option value="Save"> Save </option>
          <option value="NotSaved"> Not Saved </option>
        </select> */}
               <Col className="selectList">
           <br/>
            <label className="title" style={{padding:"6px"}}>Finance Clearance Status</label> &nbsp;&nbsp;
          <Select
          className="selectInputWrapperStatus"
           name="filters"
          placeholder="Finance Clearance Status"
          onChange={handleActionStatus}         
          options={options}
                required isSearchable />
            </Col>
        </div>
          <div className="col-sm-4">
          <Col className="selectList">
            <br/>
            <label className="title" style={{padding:"6px"}}>Select Cost Center</label> &nbsp;&nbsp;
             
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
              <b >FINANCE NO DUE CLEARANCE LISTING </b>       
              <Button style={{float:'right',marginTop: '5px'}} className="btn btn-light mr-2" onClick={handleExport}> Export excel</Button>       
              </div>
         

        <div className="ag-theme-alpine" style={{ align:"center", height: 350, width:'100%'}}>
          
                    <AgGridReact
                      rowData={separationList}
                      rowSelection="single"
                      onGridReady={onGridReady}
                      defaultColDef={{
                        width: 200,
                        editable: true,
                        resizable: true,
                      }}
                    >
                      <AgGridColumn
                        className="columnColor"
                        editable="false"
                        headerName="S No"
                        width={80}
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
                        field="empName"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        editable="false"
                        headerName="Cost Center Name"
                        field="costCentre"
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
                        field="lastWorkingDate"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Finance Amount To Be Recovered"
                        // editable ={enableValue}
                        field="financeAmount"
                      ></AgGridColumn>

                      <AgGridColumn
                        className="columnColor"
                        field="financeClearanceStatus"
                        headerName="Finance Clearance"
                        // editable ={enableValue}
                        colId="status"
                        cellRendererFramework={renderStatusOptions}
                        cellEditorParams={{
                          values: ["0", "1", "2"],
                          cellRenderer: { statusRender },
                        }}
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        // editable ={enableValue}
                        headerName="Finance Clearance Remarks"
                        field="financeRemarks"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        // editable ={enableValue}
                        headerName="Finance Clearance UpdatedBy"
                        field="financeClearanceUpdatedBy"
                      ></AgGridColumn>
                      <AgGridColumn
                        headerName="Action"
                        editable="false"
                        field="exitId"
                        cellRendererFramework={(e) => renderButton(e)}
                      ></AgGridColumn>
                    </AgGridReact>
                  </div>

                  {separationList === null ? (
                    <p style={{ textAlign: "center" }}>No Record Found</p>
                  ) : null}
                </div>
                <div>
                  {separationList == null && separationList == undefined ? (
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
                      firstPageText="First"
                      lastPageText="Last"
                      onChange={handlePageChange}
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
export default FinanceClearanceList;
