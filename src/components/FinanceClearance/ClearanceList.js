// import React, { Fragment, useState, useContext, useEffect } from "react";
// import { SeparationContext } from "../../context/SepearationState";
// import Breadcrumb from "../common/breadcrumb";
// import Select from "react-select";

// import {
//   Button,
//   Container,
//   Modal,
//   Row,
//   Col,
//   Form,
//   Table,
// } from "react-bootstrap";
// import { Edit2, Eye, Search } from "react-feather";
// // import moment from "moment";
// import "./financeClearance.css";
// import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import Pagination from "react-js-pagination";

// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { AdminContext } from "../../context/AdminState";

// // import { handleInputChange } from "react-select/src/utils";
// const FinanceClearanceList = () => {
//   const {
//     separationListView,
//     separationList,
//     total,
//     loader,
//     saveFinanceClearanceData,
//   } = useContext(SeparationContext);
//   const [pageCount, setPageCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [costCenter, setCostCenter] = useState("all");
//   const [searchValue, setSearchValue] = useState("all");
//   const [currentRecords, setCurrentRecords] = useState([]);

//   const [listRecords, setListRecords] = useState([]);
//   const recordPerPage = 10;
//   const totalRecords =
//     separationList !== undefined && separationList !== null && total;
//   const pageRange = 10;
//   const indexOfLastRecord = currentPage * recordPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
//   // const totalRecords =
//   //   separationList !== undefined && separationList !== null
//   //     ? separationList.slice(indexOfFirstRecord, indexOfLastRecord)
//   //     : [];
//   const handlePageChange = (pageNumber) => {
//     setPageCount(pageNumber - 1);
//     console.log("page change", pageNumber, pageCount);

//     setCurrentPage(pageNumber);
//     if (searchValue !== "all") {
//       separationListView(searchValue, pageNumber - 1, costCenter);
//     } else {
//       separationListView("all", pageNumber - 1, "all");
//     }
//     setCurrentRecords(separationList);
//   };

//   const searchDataHandler = () => {
//     if (searchValue !== "" && searchValue !== "all") {
//       separationListView(searchValue, pageCount, costCenter);
//     } else {
//       separationListView("all", pageCount, "all");
//     }
//   };

//   const handleCostCenter = (options) => {
//     let data2 = options !== null ? options.value : "";
//     console.log(data2);
//     setCostCenter(data2);
//     if (costCenter !== "" && costCenter !== "all") {
//       return separationListView(searchValue, pageCount, costCenter);
//     } else {
//       return separationListView("all", pageCount, "all");
//     }
//   };

//   const [financeClearanceStatus, setStatus] = useState("");
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [data, setData] = useState([]);
//   const [clearanceData, setClearanceData] = useState({});
//   const { CostCenter, costCenterList } = useContext(AdminContext);

//   const onStatusChange = (event) => {
//     console.log(event.target.value);
//     setStatus(event.target.value);
//   };
//   const renderStatusOptions = () => {
//     return (
//       <div>
//         <select name="financeClearanceStatus" onChange={(e) => statusRender(e)}>
//           <option value="0"> Due </option>
//           <option value="1"> No Due </option>
//           <option value="2"> On Hold </option>
//         </select>
//       </div>
//     );
//   };

//   // const handleSave = (value) => {
//   //   const formData = value.data;
//   //   console.log(formData, pageCount, "handlelsave");
//   //   setCleranceData(formData);
//   //   updateITClearanceList(formData, searchValue, pageCount, costCenter);
//   // };
//   useEffect(() => {
//     separationListView("all", pageCount, "all");
//   }, []);
//   useEffect(() => {
//     separationListView(searchValue, pageCount, costCenter);
//   }, [costCenter, searchValue, pageCount]);
//   useEffect(() => {
//     CostCenter();
//   }, []);
//   useEffect(() => {
//     if (separationList !== undefined && separationList !== null) {
//       setListRecords(separationList);
//     }
//   }, [separationList, listRecords]);
//   const statusRender = (e) => {
//     return <span>{e.target.value}</span>;
//   };

//   const renderButton = (e) => {
//     console.log(e, "render");
//     var buttonValue = e.data.disabled;
//     return (
//       <button
//         disabled={buttonValue}
//         style={
//           buttonValue
//             ? {
//                 backgroundColor: "#9ea4af54",
//                 color: "white",
//                 border: "1px solid #9ea4af54",
//                 paddingLeft: "10px",
//                 paddingRight: "10px",
//                 width: "100%",
//                 lineHeight: "30px",
//               }
//             : {
//                 backgroundColor: "#006ebb",
//                 color: "white",
//                 border: "1px solid #006ebb",
//                 paddingLeft: "10px",
//                 paddingRight: "10px",
//                 width: "100%",
//                 lineHeight: "30px",
//               }
//         }
//         // onClick={() => handleSave(e)}
//       >
//         Save
//       </button>
//     );
//   };

//   const onCellClicked = (params) => {
//     if (params.column.colId === "action") {
//       saveFinanceClearanceData(params.node.data);
//     }
//     if (params.column.colId === "status") {
//       // console.log(params.node.data);
//       if (params.node.data !== undefined) {
//         params.node.data.financeClearanceStatus = params.event.target.value;
//       }
//     }
//   };
//   const onCellValueChanged = (params) => {
//     if (params.column.colId === "status") {
//       console.log("hii");
//     }
//   };
//   const searchHandler = (e) => {
//     setSearchValue(e.target.value);
//   };

//   return (
//     console.log(separationList),
//     (
//       <Fragment>
//         <Breadcrumb title="Finance Clearance" parent="Finanace Clearance" />

//         <Container fluid>
//           <div className="row headingWrapper px-4 mx-auto">
//             <div className="col-md-12">
//               <b className="text-uppercase text-center">
//                 NO DUE CLEARANCE LISTING
//               </b>
//             </div>
//           </div>
//           <Row className="mt-4 mainWrapper">
//             <Col className="searchBox">
//               <input
//                 className="form-control inputWrapper"
//                 type="text"
//                 placeholder="Search.."
//                 onChange={(e) => searchHandler(e)}
//               />
//               <Search
//                 className="search-icon"
//                 style={{ color: "#313131", marginRight: "25rem" }}
//                 onClick={searchDataHandler}
//               />
//             </Col>
//             <Col className="selectList">
//               <label>Select Cost Center</label> &nbsp;&nbsp;
//               <Select
//                 className="selectInputWrapper"
//                 name="filters"
//                 placeholder="Cost Center"
//                 options={
//                   costCenterList !== null
//                     ? costCenterList.map((e) => ({
//                         label: e.costCentreName,
//                         value: e.costCentreName,
//                       }))
//                     : []
//                 }
//                 onChange={handleCostCenter}
//                 required
//                 isSearchable
//               />
//             </Col>
//           </Row>

//           <div className="ag-theme-alpine" style={{ height: 400, width: 1450 }}>
//             <AgGridReact
//               rowData={separationList}
//               onGridReady={(params) => setGridApi(params.api)}
//               onCellClicked={onCellClicked}
//               onCellValueChanged={onCellValueChanged}
//             >
//               <AgGridColumn
//                 className="columnColor"
//                 editable="false"
//                 headerName="S No"
//                 pinned="left"
//                 valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}
//               ></AgGridColumn>

//               <AgGridColumn field="employeeId"></AgGridColumn>
//               <AgGridColumn field="empName"></AgGridColumn>
//               <AgGridColumn field="costCentre"></AgGridColumn>
//               <AgGridColumn field="managerName"></AgGridColumn>
//               <AgGridColumn field="joiningDate"></AgGridColumn>
//               <AgGridColumn
//                 field="lastWorkingDate"
//                 headerName="Last working Day"
//               ></AgGridColumn>
//               <AgGridColumn
//                 field="financeAmount"
//                 headerName="Finance Amount to be Recovered"
//                 editable={true}
//                 singleClickEdit={true}
//               ></AgGridColumn>
//               <AgGridColumn
//                 field="financeClearanceStatus"
//                 headerName="Finance Clearance"
//                 colId="status"
//                 editable={true}
//                 cellRendererFramework={renderStatusOptions}
//                 // cellEditor={agRichSelectCellEditor}
//                 cellEditorParams={{
//                   values: ["0", "1", "2"],
//                   cellRenderer: { statusRender },
//                 }}
//               ></AgGridColumn>
//               <AgGridColumn
//                 field="financeRemarks"
//                 headerName="Finance Clearance Remarks"
//                 editable={true}
//                 singleClickEdit={true}
//               ></AgGridColumn>
//               <AgGridColumn
//                 field="financeClearanceUpdatedBy"
//                 editable={true}
//                 singleClickEdit={true}
//               ></AgGridColumn>
//               <AgGridColumn
//                 field="exitId"
//                 headerName="Action"
//                 colId="action"
//                 cellRendererFramework={(e) => renderButton(e)}
//               ></AgGridColumn>
//             </AgGridReact>
//           </div>
//         </Container>
//         <div>
//           <Pagination
//             itemClass="page-item"
//             linkClass="page-link"
//             activePage={currentPage}
//             itemsCountPerPage={recordPerPage}
//             totalItemsCount={totalRecords}
//             pageRangeDisplayed={pageRange}
//             onChange={handlePageChange}
//           />
//         </div>
//       </Fragment>
//     )
//   );
// };
// export default FinanceClearanceList;

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
import "./financeClearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const FinanceClearanceList = () => {
  const {
    total,
    loader,
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
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords =
    separationList !== null && separationList !== undefined && total;
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
    console.log("page change", pageNumber, pageCount);

    setCurrentPage(pageNumber);
    if (searchValue !== "all") {
      separationListView(searchValue, pageNumber - 1, costCenter);
    } else {
      separationListView("all", pageNumber - 1, "all");
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
      separationListView(searchValue, pageCount, costCenter);
    } else {
      separationListView("all", pageCount, "all");
    }
  };

  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    console.log(data2);
    setCostCenter(data2);
    if (costCenter !== "" && costCenter !== "all") {
      return separationListView(searchValue, pageCount, costCenter);
    } else {
      return separationListView("all", pageCount, "all");
    }
  };

  const renderStatusOptions = (value) => {
    return (
      <div>
        <select
          name="financeClearanceStatus"
          value={value.data.financeClearanceStatus}
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
    saveFinanceClearanceData(formData, searchValue, pageCount, costCenter);
  };
  useEffect(() => {
    console.log(pageCount, "pageCount");
    separationListView(searchValue, pageCount, costCenter);
  }, [costCenter, searchValue, pageCount]);
  const statusRender = (e, value) => {
    const status = e.target.value;
    const clearanceStatus = value.data;
    clearanceStatus["financeClearanceStatus"] = status;
    clearanceStatus["disabled"] = true;
  };
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
  return (
    <div>
      <Fragment>
        <Container fluid>
      <Breadcrumb title="Finance Clearance" parent="Finance Clearance" />
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
                      rowData={separationList}
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
                        field="financeAmount"
                      ></AgGridColumn>

                      <AgGridColumn
                        className="columnColor"
                        field="financeClearanceStatus"
                        headerName="Finance Clearance"
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
                        headerName="Finance Clearance Remarks"
                        field="financeRemarks"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
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
