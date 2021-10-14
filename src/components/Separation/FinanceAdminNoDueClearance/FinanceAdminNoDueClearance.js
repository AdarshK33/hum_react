import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SeparationContext } from "../../../context/SepearationState";
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
import { Link } from "react-router-dom";
import Select from "react-select";
import { RotateCw, Eye, Search } from "react-feather";
import { saveAs, FileSaver } from "file-saver";
import { AdminContext } from "../../../context/AdminState";
import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { OfferContext } from "../../../context/OfferState";
import { PermissionContext } from "../../../context/PermissionState";
import "../nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { JsonToExcel } from "react-json-excel";

import ReactExport from "react-data-export";

const FinanaceAdminNoDueClearance = () => {
  const { ViewEmployeeDataById, changeEmployeeId, ModeOfSeparationView } =
    useContext(EmployeeSeparationContext);
  const {
    total,
    loader,
    viewFinanceAdminClearanceList,
    financeAdminNoDueClearanceList,
    FinanceClearanceUploadSettlement,
    financeClearanceUpload,
    FinanceAdminClearanceExport,
    financeAdminClearanceExport,
    UpdateAdminFinanceClearanceList,
  } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const { AllCostCenter, allCostCenterList } = useContext(OfferContext);
  const { rolePermission } = useContext(PermissionContext);
  const [pageCount, setPageCount] = useState(0);
  const [fileUpload, setFileUpload] = useState();

  const [gridApi, setGridApi] = useState(null);
  const [checkedData, setCheckedData] = useState([]);
  const [checkedValue, setCheckedValue] = useState(false);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [costCenter, setCostCenter] = useState("all");
  const [searchValue, setSearchValue] = useState("all");
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  // const totalRecords = financeAdminNoDueClearanceList !== null && financeAdminNoDueClearanceList !== undefined && financeAdminNoDueClearanceList.length;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const [currentRecords, setCurrentRecords] = useState([]);
  // const currentRecords = financeAdminNoDueClearanceList !== null && financeAdminNoDueClearanceList !== undefined ? financeAdminNoDueClearanceList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  useEffect(() => {
    console.log(pageCount, "pageCount");
    viewFinanceAdminClearanceList(searchValue, pageCount, costCenter);
  }, [costCenter, searchValue, pageCount]);

  useEffect(() => {
    if (
      financeAdminNoDueClearanceList !== null &&
      financeAdminNoDueClearanceList !== undefined
    ) {
      setCurrentRecords(financeAdminNoDueClearanceList);
    }
  }, [financeAdminNoDueClearanceList, currentRecords]);

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

  const fetchEmployeeDetails = (employeeId) => {
    changeEmployeeId(employeeId);
    ViewEmployeeDataById(employeeId);
    ModeOfSeparationView();
  };
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    console.log("page change", pageNumber, pageCount);

    setCurrentPage(pageNumber);
    if (searchValue !== "all" || costCenter !== "all") {
      viewFinanceAdminClearanceList(searchValue, pageNumber - 1, costCenter);
    } else {
      viewFinanceAdminClearanceList("all", pageNumber - 1, "all");
    }
    setCurrentRecords(financeAdminNoDueClearanceList);
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const searchDataHandler = () => {
    if (searchValue !== "" && searchValue !== "all") {
      viewFinanceAdminClearanceList(searchValue, pageCount, costCenter);
    } else {
      viewFinanceAdminClearanceList(searchValue, pageCount, "all");
    }
  };
  const handleSave = () => {
    //     let preValue = checkedData
    //     function removeDuplicates(originalArray, prop) {
    //       var newArray = [];
    //       var lookupObject  = {};

    //       for(var i in originalArray) {
    //          lookupObject[originalArray[i][prop]] = originalArray[i];
    //       }

    //       for(i in lookupObject) {
    //           newArray.push(lookupObject[i]);
    //       }
    //        return newArray;
    //   }

    //  var uniqueArray = removeDuplicates(preValue, "employeeId");
    console.log(checkedData, "submit");

    // setCheckedData(uniqueArray)
    UpdateAdminFinanceClearanceList(
      checkedData,
      searchValue,
      pageCount,
      costCenter
    );
  };
  const handleValidCheck = (e) => {
    console.log(e, "handleValidCheck");
    return true;
  };
  const renderButtonTwo = (e) => {
    var buttonValue = e.data.disabled;
    return (
      <Link to={"/history-view/" + e.data.employeeId}>
        <RotateCw
          onClick={() => {
            fetchEmployeeDetails(e.data.employeeId);
          }}
        />
      </Link>
    );
  };
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];

    console.log("clicked", fileObj);
    if (
      fileObj !== undefined &&
      fileObj !== null &&
      fileObj !== "" &&
      fileObj.name !== undefined &&
      fileObj.name !== null &&
      fileObj.name !== "" &&
      (fileObj.name.includes(".xlsx") || fileObj.name.includes(".xls"))
    ) {
      setFileUpload(fileObj);
    } else {
      toast.error("Please select a valid file to upload");
    }
    // uploadFile(fileObj)
    // setTimeout(()=>{
    //   window.location.reload()
    // }, 5000)
  };

  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    console.log(data2);
    setCostCenter(data2);
    if (costCenter !== "" && costCenter !== "all") {
      return viewFinanceAdminClearanceList(searchValue, pageCount, data2);
    } else {
      return viewFinanceAdminClearanceList("all", pageCount, data2);
    }
  };
  const renderStatusOptions = (value) => {
    console.log(value, "renderStatusOptions1");
    return (
      <div>
        <select
          name="fullAndFinalCompleteStatus"
          className="selectpicker"
          disabled={true}
          data-style="btn-success"
          style={
            value.data.fullAndFinalCompleteStatus == 1
              ? {
                  border: "1px solid green",
                  color: "green",
                  borderBlockEndStyle: "green",
                  fontWeight: "bold",
                }
              : value.data.fullAndFinalCompleteStatus == 0
              ? {
                  border: "1px solid red",
                  color: "red",
                  borderBlockEndStyle: "red",
                  fontWeight: "bold",
                }
              : { color: "black" }
          }
          value={value.data.fullAndFinalCompleteStatus}
          onChange={(e) => statusRender(e, value)}
        >
          <option value={null}> select </option>
          <option value={1}> Yes </option>
          <option value={0}> No </option>
        </select>
      </div>
    );
  };
  const renderStatusOptionsTwo = (value) => {
    return (
      <div>
        <select
          name="deactivateProfile"
          className="selectpicker"
          disabled={true}
          style={
            value.data.deactivateProfile == 1
              ? {
                  border: "1px solid green",
                  color: "green",
                  borderBlockEndStyle: "green",
                  fontWeight: "bold",
                }
              : value.data.deactivateProfile == 0
              ? {
                  border: "1px solid red",
                  color: "red",
                  borderBlockEndStyle: "red",
                  fontWeight: "bold",
                }
              : { color: "black" }
          }
          value={value.data.deactivateProfile}
          onChange={(e) => statusRenderTwo(e, value)}
        >
          <option value={null}> select </option>
          <option value={1}> Yes </option>
          <option value={0}> No </option>
        </select>
      </div>
    );
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const handleUploadSettlement = () => {
    // console.log(fileUpload, fileUpload.size, "file999");
    if (
      fileUpload !== undefined &&
      fileUpload !== null &&
      fileUpload !== "" &&
      fileUpload.name !== undefined &&
      fileUpload.name !== null &&
      fileUpload.name !== "" &&
      (fileUpload.name.includes(".xlsx") || fileUpload.name.includes(".xls"))
    ) {
      if (
        fileUpload !== undefined &&
        fileUpload !== null &&
        fileUpload !== "" &&
        fileUpload.size !== undefined &&
        fileUpload.size !== null &&
        fileUpload.size !== "" &&
        (fileUpload.size / 1024 < 500 || fileUpload.size / 1024 == 500)
      ) {
        if (fileUpload !== undefined && fileUpload !== null) {
          FinanceClearanceUploadSettlement(
            fileUpload,
            searchValue,
            pageCount,
            costCenter
          );
        } else {
          toast.error("Please select a file to upload");
        }
      } else {
        toast.error("File size should not exceed 500kb ");
      }
    } else {
      toast.error("Please select a valid file to upload");
    }
  };
  const onSelectionChanged = (e) => {
    let formData = e.data;
    console.log(e.data, "formData");
    if (checkedValue == false) {
      setCheckedValue(true);
    } else if (checkedValue == true) {
      setCheckedValue(false);
    }
    if (formData["disabled"] == false) {
      let preValue = checkedData;
      let keyValues = [];
      preValue.map((item) => {
        keyValues.push(item.employeeId);
      });
      console.log(keyValues, "keyValues");
      if (
        formData["deactivateProfile"] !== null &&
        formData["fullAndFinalCompleteStatus"] !== null &&
        formData["fullAndFinalProcessDate"] !== null
        // formData["fullAndFinalAmount"] !== null
      ) {
        if (!keyValues.includes(formData.employeeId)) {
          console.log(formData, "push");
          preValue.push(formData);
          setCheckedData(preValue);
        } else if (keyValues.includes(formData.employeeId)) {
          console.log(formData, "splice");

          preValue.map((item, index) => {
            if (item["employeeId"] == formData.employeeId) {
              preValue.splice(index, 1);
              setCheckedData(preValue);
            }
          });
        }
      }
    } else {
      // toast.error("Details for the selected record is not present")
    }
    // gridApi.forEachNode(function (node) {
    //   console.log(node.data,node,"node")
    //   node.setSelected(true);
    // });
    //  if(formData['disabled'] == true){
    //     preValue.push(formData)
    //     setCheckedData(preValue)
    //     if(formData['deactivateProfile'] !== null && formData['fullAndFinalCompleteStatus'] !== null && formData['fullAndFinalProcessDate'] !== null && formData['fullAndFinalAmount'] !== null ){

    //         function removeDuplicates(data, key) {

    //           return setCheckedData([
    //             ...new Map(data.map(item => [key(item), item])).values()
    //           ])

    //         };

    //         removeDuplicates(preValue, item => item.employeeId)
    //         console.log(removeDuplicates(preValue, item => item.employeeId)
    //         ,checkedData)
    //       }else if(checkedValue == false){
    //         toast.error("Details for the selected record is not present")
    //       }
    //     }

    //     preValue.map((item,index)=>{
    //             if(item['employeeId'] == formData.employeeId){
    //               item['disabled'] = false
    //               preValue.splice(index,1)
    //               setCheckedData(preValue)
    //             }else{

    //               console.log(checkedData,"checkbox")
    //             }
    // })
  };

  const handleExport = (e) => {
    const value = e.target.value;
    FinanceAdminClearanceExport(value);
  };
  const handleChecked = function (params) {
    console.log(
      params.columnApi.getRowGroupColumns().length === 0,
      "handleChecked"
    );
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  const statusRender = (e, value) => {
    const status = e.target.value;
    const financeClearanceStatus = value.data;
    financeClearanceStatus["fullAndFinalCompleteStatus"] = status;
    console.log(e.target, "fullAndFinalCompleteStatus");
  };

  const statusRenderTwo = (e, value) => {
    const status = e.target.value;
    const financeClearanceStatus = value.data;

    financeClearanceStatus["deactivateProfile"] = status;
    console.log(e.target, "deactivateProfile");
  };

  return (
    <div>
      <Fragment>
        <ToastContainer />
        <Breadcrumb
          title="F & F Clearance - Admin"
          parent="F & F Clearance - Admin"
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
                <div className="col-sm-2">
                  <Button className="submitButton" onClick={handleExport}>
                    {" "}
                    Export excel
                  </Button>
                </div>
              </Row>
              <div className="card" style={{ overflowX: "auto" }}>
                <div>
                  <div className="nodue_title_finance">
                    <b style={{ textAlign: "center" }}>
                      F & F Clearance Listing{" "}
                    </b>
                    <Button
                      style={{
                        float: "left",
                        marginTop: "7px",
                        marginLeft: "5px",
                        height: "35px",
                      }}
                      className="btn btn-light mr-2"
                      onClick={handleSave}
                    >
                      Submit
                    </Button>

                    <Button
                      className="btn btn-light mr-2"
                      style={{
                        float: "right",
                        marginTop: "7px",
                        height: "35px",
                      }}
                      onClick={handleUploadSettlement}
                    >
                      Upload F & F Settlement
                    </Button>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      style={{
                        marginTop: "2px",
                        float: "right",
                        width: "250px",
                      }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      className="btn"
                    />
                  </div>

                  <div
                    className="ag-theme-alpine"
                    style={{ align: "center", height: 490, width: "100%" }}
                  >
                    <AgGridReact
                      rowData={financeAdminNoDueClearanceList}
                      defaultColDef={{
                        width: 200,
                        resizable: true,
                        overflowX: "hidden",
                      }}
                      autoGroupColumnDef={{
                        headerName: "Employee Id",
                        field: "employeeId",
                        valueGetter: function (params) {
                          if (params.node.group) {
                            return params.node.key;
                          } else {
                            return params.data[params.autoGroupColumnDef.field];
                          }
                        },
                        headerCheckboxSelection: true,
                        cellRenderer: "agGroupCellRenderer",
                        cellRendererParams: { checkbox: true },
                      }}
                      isRowSelectable={function (rowNode) {
                        console.log(rowNode, "rownode****");
                        return rowNode.data
                          ? rowNode.data.deactivateProfile !== null &&
                              rowNode.data.fullAndFinalCompleteStatus !==
                                null &&
                              rowNode.data.fullAndFinalProcessDate !== null &&
                              // rowNode.data.fullAndFinalAmount !== null &&
                              rowNode.data.disabled !== true
                          : false;
                      }}
                      // pagination={true}
                      // paginationPageSize={10}
                      debug={true}
                      rowGroupPanelShow={"always"}
                      pivotPanelShow={"always"}
                      enableRangeSelection={true}
                      rowSelection={"multiple"}
                      groupSelectsChildren={true}
                      suppressRowClickSelection={true}
                      suppressAggFuncInHeader={true}
                      onRowSelected={(e) => onSelectionChanged(e)}
                      onGridReady={onGridReady}
                    >
                      <AgGridColumn
                        width={80}
                        type="checkbox"
                        className="columnColor"
                        headerName="S No"
                        pinned="left"
                        lockPinned="true"
                        valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerCheckboxSelection={handleChecked}
                        headerCheckboxSelectionFilteredOnly={handleValidCheck}
                        checkboxSelection={handleChecked}
                        headerName="Employee Id"
                        field="employeeId"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Employee Name"
                        field="employeeName"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Cost Center Name"
                        field="costCenterName"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Manager Name"
                        field="managerName"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Joining Date"
                        field="joiningDate"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Last Working Day"
                        field="lastWorkingDate"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Mode of Separation"
                        field="modeOfSeparation"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="F & F Complete"
                        field="fullAndFinalCompleteStatus"
                        colId="status"
                        cellRendererFramework={renderStatusOptions}
                        cellEditorParams={{
                          values: ["1", "0"],
                          cellRenderer: { statusRender },
                        }}
                      ></AgGridColumn>
                      {/* <AgGridColumn
                        className="columnColor"
                        headerName="F & F Amount"
                        field="fullAndFinalAmount"
                      ></AgGridColumn> */}
                      <AgGridColumn
                        className="columnColor"
                        type="dateColumn"
                        headerName="F & F Processed On"
                        field="fullAndFinalProcessDate"
                      ></AgGridColumn>
                      <AgGridColumn
                        className="columnColor"
                        headerName="Deactivate Profile"
                        field="deactivateProfile"
                        colId="status"
                        cellRendererFramework={renderStatusOptionsTwo}
                        cellEditorParams={{
                          values: ["1", "0"],
                          cellRenderer: { statusRenderTwo },
                        }}
                      ></AgGridColumn>
                      <AgGridColumn
                        width={80}
                        headerName="History"
                        pinned="right"
                        editable="false"
                        field="exitId"
                        cellRendererFramework={(e) => renderButtonTwo(e)}
                      ></AgGridColumn>
                    </AgGridReact>
                  </div>

                  {currentRecords === null ? (
                    <p style={{ textAlign: "center" }}>No Record Found</p>
                  ) : null}
                </div>
              </div>
              <div>
                {currentRecords == null && currentRecords == undefined ? (
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
      </Fragment>
    </div>
  );
};

export default FinanaceAdminNoDueClearance;
