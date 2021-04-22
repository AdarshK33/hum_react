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
import Pagination from 'react-js-pagination';
import MultiSelect from 'react-multi-select-component'
import { Edit2, Eye, Search } from "react-feather";
import { AdminContext } from '../../context/AdminState'
import moment from "moment";
import "./nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { handleInputChange } from "react-select/src/utils";
const NoDueClearance = () => {
  const { 
    updateITClearanceList,viewITClearanceList,noDueClearanceList } = useContext(
    SeparationContext
  );
  const { CostCenter, costCenterList } = useContext(AdminContext)
  const [pageCount, setPageCount] = useState(0);
  const [listRecords, setListRecords] = useState([]);
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
  const [data, setData] = useState([]);
  const [costCenter, setCostCenter] = useState([])
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState(false);

/*-----------------Pagination------------------*/
const [currentPage, setCurrentPage] = useState(1);
const recordPerPage = 10;
const totalRecords = noDueClearanceList !== null && noDueClearanceList !== undefined && noDueClearanceList.length;
const pageRange = 10;
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
const currentRecords = noDueClearanceList !== null ? noDueClearanceList !== undefined && noDueClearanceList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

const handlePageChange = pageNumber => {
  setCurrentPage(pageNumber);
}
/*-----------------Pagination------------------*/

  useEffect(() => {
    CostCenter();
  }, []);
  const searchHandler = (e) => {
    setSearchValue(e.target.value)

  }
  const searchDataHandler = () => {
    if (searchValue !== "") {
      viewITClearanceList(searchValue);
    }else{
      viewITClearanceList("all");

    }
  }
  const setCostCenterHandler = (options) => {
    let data1 = options !== null ? options.map((e, i) => options[i].value) : []
    setCostCenter(options)
    console.log("options in cost center", data1)
} 
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

  const handleSave = (value) => {
    const formData = value.data
      setCleranceData(formData)
    console.log(formData,"clearanceData")
     updateITClearanceList(formData,"all", pageCount)
    console.log(data,"save button");
  };
  useEffect(() => {
    viewITClearanceList("all", pageCount);
  }, []);
  useEffect(() => {
    if (noDueClearanceList !== undefined && noDueClearanceList !== null) {
      setListRecords(noDueClearanceList);
    }
  }, [noDueClearanceList, listRecords]);
  const statusRender = (value) => {
    console.log(value);
    return <span>{value}</span>;
  };
  console.log(listRecords, clearanceData, "listRecords");
  const renderButton = (e) => {
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
        onClick={() => handleSave(e)}
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
    <div>
      <Fragment>
        <Container fluid>
      <Breadcrumb title="No Due Clearance" parent="No Due Clearance" />
      <div className="container-fluid">
        <div className="row">

          <div className="col-sm-12">
          {/* <div className="row">
              <div className="col-sm-3">
        <div className="job-filter">
          <br/>
                  <div className="faq-form mr-6">
                    <input className="form-control searchButton" type="text" placeholder="Search.." 
                    // onChange={(e) => searchHandler(e)} 
                    />
                    <Search className="search-icon" style={{ color: "#313131",alignContent:"center" }} 
                    // onClick={searchDataHandler} 
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                <div className="job-filter">
                  <div className="faq-form mr-4">
                        <Row>
                <Form.Label>Select Cost Center</Form.Label> &nbsp;&nbsp;
                <Form.Control as="select"></Form.Control>
            </Row>
                  </div>
                </div>
                </div>
                </div><br/> */}
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
                <MultiSelect
                className="selectInputWrapper"
                  options={costCenterList !== null ?
                    costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                  value={costCenter}
                  onChange={setCostCenterHandler}
                  labelledBy={"Select"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
                <div>{error && <span style={{ color: 'red' }}>Cost Center is Required</span>}</div>
          </Col>
          </div>
        </Row>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
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
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Id" field="employeeId"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Name" field="employeeName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Cost Center Name" field="costCentreName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Manager Name" field="managerName"></AgGridColumn>
            <AgGridColumn  className="columnColor" editable="false" headerName="Joining Date" field="joiningDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Last Working Day" field="lastWorkingDay"></AgGridColumn>
            <AgGridColumn className="columnColor" headerName="IT Amount To Be Recovered" field="itAmount"></AgGridColumn>

                    <AgGridColumn
                      className="columnColor"
                      field="itClearanceStatus"
                      headerName="IT Clearance"
                      editable={true}
                      cellRendererFramework={renderStatusOptions}
                      cellEditorParams={{
                        values: ["Due", "No Due", "On Hold"],
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

                {noDueClearanceList === null ? (
                  <p style={{ textAlign: "center" }}>No Record Found</p>
                ) : null}

                {noDueClearanceList !== undefined &&
                noDueClearanceList !== null &&
                currentRecords.length === 0 ? (
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
                ) : null}
              </div>
              <div>
       {noDueClearanceList !== null && noDueClearanceList !== undefined && 
         <Pagination
           itemClass="page-item"
           linkClass="page-link"
           activePage={currentPage}
           itemsCountPerPage={recordPerPage}
           totalItemsCount={totalRecords}
           pageRangeDisplayed={pageRange}
           onChange={handlePageChange}
         />
       }
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
