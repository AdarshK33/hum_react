import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SeparationContext } from "../../../context/SepearationState";
import {Button,Container, Modal, Row, Col, Form, Table} from "react-bootstrap";
import Pagination from 'react-js-pagination';
import Select from 'react-select'
import { RotateCw, Eye, Search } from "react-feather";
import { saveAs ,FileSaver} from 'file-saver';
import { AdminContext } from '../../../context/AdminState'
import "../nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  JsonToExcel
} from 'react-json-excel';

import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const FinanaceAdminNoDueClearance = () => {
  const { total,loader,viewFinanceAdminClearanceList,
    financeAdminNoDueClearanceList,
    FinanceClearanceUploadSettlement,financeClearanceUpload,FinanceClearanceExport,
    financeClearanceExport ,UpdateAdminFinanceClearanceList} = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext)
  const [pageCount, setPageCount] = useState(0);
  const [fileUpload, setFileUpload] = useState();

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [costCenter, setCostCenter] = useState("all")
  const [searchValue, setSearchValue] = useState("all");
/*-----------------Pagination------------------*/
const [currentPage, setCurrentPage] = useState(1);
const recordPerPage = 10;
const totalRecords = financeAdminNoDueClearanceList !== null && financeAdminNoDueClearanceList !== undefined && total;
const pageRange = 10;
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
const [currentRecords, setCurrentRecords] = useState([]);

useEffect(() => {
  console.log(pageCount,"pageCount")
  viewFinanceAdminClearanceList(searchValue, pageCount,costCenter);
}, [costCenter,searchValue,pageCount]);

useEffect(() => {
  if (financeAdminNoDueClearanceList !== null && financeAdminNoDueClearanceList !== undefined) {
    setCurrentRecords(financeAdminNoDueClearanceList);
  }
}, [financeAdminNoDueClearanceList, currentRecords]);


useEffect(() => {
  CostCenter();
}, []);

const handlePageChange = (pageNumber) => {
  setPageCount(pageNumber - 1);
  console.log("page change",pageNumber,pageCount)

    setCurrentPage(pageNumber);
    if (searchValue !== "all") {
      viewFinanceAdminClearanceList(searchValue,pageNumber-1,costCenter);
    } else {
      viewFinanceAdminClearanceList("all",pageNumber-1,"all");
    }
    setCurrentRecords(financeAdminNoDueClearanceList);
}

  const searchHandler = (e) => {
    setSearchValue(e.target.value)

  }
  const searchDataHandler = () => {
    if (searchValue !== "" && searchValue !== "all") {
      viewFinanceAdminClearanceList(searchValue,pageCount,costCenter);
    }else{
      viewFinanceAdminClearanceList("all",pageCount,"all");

    }
  }
  const handleSave = (value) => {
    const formData = value.data
    formData['disabled']= true

    console.log(formData,pageCount,"handlelsave")
    UpdateAdminFinanceClearanceList(formData,searchValue, pageCount,costCenter)

  };
 
  const renderButtonTwo = (e) => {
    console.log(e,"render")
    var buttonValue = e.data.disabled
    return (
      <RotateCw/>
    );
  };
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
    // uploadFile(fileObj)
    // setTimeout(()=>{
    //   window.location.reload()
    // }, 5000)

  }

  const renderButton = (e) => {
    console.log(e.data,"render")
    var buttonValue = e.data.disabled
    return (
      <button disabled={buttonValue}
        style={buttonValue?{
          backgroundColor: "#9ea4af54",
          color: "white",
          border: "1px solid #9ea4af54",
          paddingLeft: "10px",
          paddingRight: "10px",
          width: "100%",
          lineHeight: "30px",
        }:{
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
const handleCostCenter = (options) => {
  let data2 = options !== null?options.value:''
  console.log(data2)
  setCostCenter(data2)
  if (costCenter !== "" && costCenter !== "all") {
    return viewFinanceAdminClearanceList(searchValue,pageCount,costCenter);
  }else{
    return viewFinanceAdminClearanceList("all",pageCount,"all");
  }
} 
const renderStatusOptions = (value) => {
  console.log(value,"renderStatusOptions1")
    return (
      <div>
      <select name="fullAndFinalCompleteStatus" className="selectpicker" 
        data-style="btn-success"
      style={value.data.fullAndFinalCompleteStatus == 1?{border: '1px solid green',
        color: '#fff',
        backgroundColor: 'green',
        fontWeight: 'bold'}:value.data.fullAndFinalCompleteStatus == 0?{border: '1px solid red',
        color: '#fff',
        backgroundColor: 'red',
        fontWeight: 'bold'}:{color:'black'}}
       value={value.data.fullAndFinalCompleteStatus} onChange={(e) => statusRender(e,value)}>
      <option value={null}> select </option>
        <option value={1}> Yes </option>
        <option value={0}> No </option>
      </select>
    </div>
  

    )
//     <label className="switch">
//     <input className="switch-input" type="checkbox" id="checkbox" name="fullAndFinalCompleteStatus" value={value.data.fullAndFinalCompleteStatus} onChange={(e) => statusRender(e,value)}/>
// 	<span className="switch-label" data-on="Yes" data-off="No"></span> 
// 	<span className="switch-handle"></span> 
// </label>

  };
  const renderStatusOptionsTwo = (value) => {
    return (
      <div>
      <select name="deactivateProfile" className="selectpicker"
       style={value.data.deactivateProfile == 1?{border: '1px solid green',
       color: '#fff',
       backgroundColor: 'green',
       fontWeight: 'bold'}:value.data.deactivateProfile == 0?{border: '1px solid red',
       color: '#fff',
       backgroundColor: 'red',
       fontWeight: 'bold'}:{color:'black'}} 
        value={value.data.deactivateProfile} onChange={(e) => statusRenderTwo(e,value)}>
      <option value={null}> select </option>
        <option value={1}> Yes </option>
        <option value={0}> No </option>
      </select>
    </div>
    )
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const handleUploadSettlement = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      FinanceClearanceUploadSettlement(fileUpload)
    } else {
      toast.error("Please select a file to upload")
    }
  }
 
  //File export 
  const filename = 'F&FListing';
  let fields = {
    "S. No": "S. No",
    "employeeId": "Employee Id",
    "employeeName": "Employee Name",
    "costCenterName": "Cost Center Name",
    "managerName": "Manager Name",
    "joiningDate": "Joining Date",
    "lastWorkingDate":"Last Working Date",
    "modeOfSeparation":"Mode Of Separation",
    "fullAndFinalCompleteStatus":"Full And Final Complete Status",
    "fullAndFinalAmount":"Full And Final Amount",
    "fullAndFinalProcessDate":"Full And Final ProcessDate",
    "deactivateProfile":"Deactivate Profile"
  }

  let data = [];
  if (financeAdminNoDueClearanceList !== undefined && financeAdminNoDueClearanceList !== null) {
    for (let i = 0; i < financeAdminNoDueClearanceList.length; i++) {
      console.log(financeAdminNoDueClearanceList[i].holidayDate)
      data.push({
        "S. No": i + 1,
        employeeId: financeAdminNoDueClearanceList[i].employeeId,
        employeeName: financeAdminNoDueClearanceList[i].employeeName,
        costCenterName: financeAdminNoDueClearanceList[i].costCenterName,
        managerName: financeAdminNoDueClearanceList[i].managerName,
        joiningDate: financeAdminNoDueClearanceList[i].joiningDate,
        lastWorkingDate: financeAdminNoDueClearanceList[i].lastWorkingDate,
        modeOfSeparation: financeAdminNoDueClearanceList[i].modeOfSeparation,
        fullAndFinalCompleteStatus: financeAdminNoDueClearanceList[i].fullAndFinalCompleteStatus,
        fullAndFinalAmount: financeAdminNoDueClearanceList[i].fullAndFinalAmount,
        fullAndFinalProcessDate: financeAdminNoDueClearanceList[i].fullAndFinalProcessDate,
        deactivateProfile: financeAdminNoDueClearanceList[i].deactivateProfile,
      })
    }
  }
  const handleExport = (e) =>{
    const value = e.target.value
    FinanceClearanceExport(value)
//         

  }
  const statusRender = (e,value) => {
    // var result = document.getElementsByClassName("switch-input")[0].checked

    const status = e.target.value
    const financeClearanceStatus = value.data
    financeClearanceStatus['fullAndFinalCompleteStatus']= status
    console.log(e.target,"fullAndFinalCompleteStatus")

  };

  const disabledText = () => {
    toast.error("No Records to be Export")
}
  const statusRenderTwo = (e,value) => {
    // var result = document.getElementsByClassName("switch-input")[0].checked

    const status = e.target.value
    const financeClearanceStatus = value.data

    financeClearanceStatus['deactivateProfile']= status
    console.log(e.target,"deactivateProfile")

  };

  return (
    <div>
      <Fragment>
        <ToastContainer/>
      <Breadcrumb title="F & F Clearance - Admin" parent="F & F Clearance - Admin" />
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
              <div>
              <div className="nodue_title_finance" >
              <b style={{textAlign:"center"}}>F & F  Clearance Listing </b>  
                <Button style={{float:'left',marginTop: '5px'}} className="btn btn-light mr-2" onClick={''}>
                  Submit
                </Button>
                <ExcelFile data={financeClearanceExport}  element={ <Button style={{float:'right',marginTop: '5px'}} className="btn btn-light mr-2" onClick={handleExport}> Export excel</Button>}/>

                <Button className="btn btn-light mr-2"  style={{float:'right',marginTop: '5px'}} onClick={handleUploadSettlement} >
                  Upload F & F Settlement
                </Button>
                <input type="file"    
                  accept=".xlsx, .xls, .csv" 
                  style={{float:'right'}}
                    onChange={(e) => {
                      changeHandler(e)
                    }}
                  className="btn"                  
                  />
                  
              </div>
              
            
        <div className="ag-theme-alpine" style={{ align:"center",height: 350, width:'100%'
 }}>
          
          <AgGridReact 
            rowData={financeAdminNoDueClearanceList}
            rowSelection="single"
            
            onGridReady={onGridReady}
            defaultColDef={{
              width: 200,
              editable: true,
              resizable: true,
              overflowX: 'hidden'
            }}
            
          >
          <AgGridColumn width={50} className="columnColor" editable="false" headerName="S No" pinned="left" lockPinned="true" valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Id" field="employeeId"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Name" field="employeeName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Cost Center Name" field="costCenterName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Manager Name" field="managerName"></AgGridColumn>
            <AgGridColumn  className="columnColor" editable="false" headerName="Joining Date" field="joiningDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Last Working Day" field="lastWorkingDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false"  headerName="Mode of Separation" field="modeOfSeparation"></AgGridColumn>
            <AgGridColumn 
            className="columnColor"             
             headerName="F & F Complete" 
            field="fullAndFinalCompleteStatus"
              colId="status"
            cellRendererFramework={renderStatusOptions}
            cellEditorParams={{
              values: ["1","0"],
              cellRenderer: { statusRender }
            }}
            ></AgGridColumn>
            <AgGridColumn className="columnColor"   headerName="F & F Amount" field="fullAndFinalAmount"></AgGridColumn>
            <AgGridColumn className="columnColor"   headerName="F & F Processed On" field="fullAndFinalProcessDate"></AgGridColumn>
            <AgGridColumn className="columnColor" 
             headerName="Deactivate Profile"
              field="deactivateProfile"
              colId="status"
              cellRendererFramework={renderStatusOptionsTwo}
              cellEditorParams={{
                values: ["1","0"],
                cellRenderer: { statusRenderTwo}
              }}
              ></AgGridColumn>
                      <AgGridColumn width={80}
                      headerName="History"
                      pinned="right"
                      editable="false"
                      field="exitId"
                      cellRendererFramework={(e) => renderButtonTwo(e)}
                    ></AgGridColumn>
                       {/* <AgGridColumn
                      headerName="Action"
                      pinned="right"
                      editable="false"
                      field="exitId"
                      cellRendererFramework={(e) => renderButton(e)}
                    ></AgGridColumn> */}

                  </AgGridReact>
                </div>

                {financeAdminNoDueClearanceList === null ? (
                  <p style={{ textAlign: "center" }}>No Record Found</p>
                ) : null}
              </div>
                
              </div>
              <div>
       {financeAdminNoDueClearanceList == null && financeAdminNoDueClearanceList == undefined ? (
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
                ) 
                :
         <Pagination
           itemClass="page-item"
           linkClass="page-link"
           activePage={currentPage}
           itemsCountPerPage={recordPerPage}
           totalItemsCount={totalRecords}
           pageRangeDisplayed={pageRange}
           onChange={handlePageChange}
         />}
     </div>
              </div>
              </div>   
              </div>
    </Fragment> 
     </div>
  );
};
export default FinanaceAdminNoDueClearance;