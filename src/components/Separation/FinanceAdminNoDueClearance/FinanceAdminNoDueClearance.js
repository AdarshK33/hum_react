import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SeparationContext } from "../../../context/SepearationState";
import {Button,Container, Modal, Row, Col, Form, Table} from "react-bootstrap";
import Pagination from 'react-js-pagination';
import Select from 'react-select'
import { Edit2, Eye, Search } from "react-feather";
import { AdminContext } from '../../../context/AdminState'
import "../nodueclearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const FinanaceAdminNoDueClearance = () => {
  const { total,loader,viewFinanceAdminClearanceList,financeAdminNoDueClearanceList } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext)
  const [pageCount, setPageCount] = useState(0);
 
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
  if (financeAdminNoDueClearanceList !== null && financeAdminNoDueClearanceList !== undefined) {
    setCurrentRecords(financeAdminNoDueClearanceList);
  }
}, [financeAdminNoDueClearanceList, currentRecords]);

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
/*-----------------Pagination------------------*/

  useEffect(() => {
    CostCenter();
  }, []);
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
    console.log(formData,pageCount,"handlelsave")
  };
 
  const renderButtonTwo = (e) => {
    console.log(e,"render")
    var buttonValue = e.data.disabled
    return (
      <Edit2/>
    );
  };
  // const renderButton = (e) => {
  //   console.log(e,"render")
  //   var buttonValue = e.data.disabled
  //   return (
  //     <button disabled={buttonValue}
  //       style={buttonValue?{
  //         backgroundColor: "#9ea4af54",
  //         color: "white",
  //         border: "1px solid #9ea4af54",
  //         paddingLeft: "10px",
  //         paddingRight: "10px",
  //         width: "100%",
  //         lineHeight: "30px",
  //       }:{
  //         backgroundColor: "#006ebb",
  //         color: "white",
  //         border: "1px solid #006ebb",
  //         paddingLeft: "10px",
  //         paddingRight: "10px",
  //         width: "100%",
  //         lineHeight: "30px",
  //       }}
  //        onClick={() => handleSave(e)}
  //     >
  //       Save
  //     </button>
  //   );
  // };
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
    return (
      <label className="switch">
    <input className="switch-input" type="checkbox" id="checkbox" name="fullAndFinalCompleteStatus" value={value.data.fullAndFinalCompleteStatus} onChange={(e) => statusRender(e,value)}/>
	<span className="switch-label" data-on="Yes" data-off="No"></span> 
	<span className="switch-handle"></span> 
</label>

    )

  };
  const renderStatusOptionsTwo = (value) => {
    return (

 <label className="switch">
    <input className="switch-input" type="checkbox" id="checkbox" name="deactivateProfile" value={value.data.deactivateProfile} onChange={(e) => statusRenderTwo(e,value)}/>
<span className="switch-label" data-on="Yes" data-off="No"></span> 
<span className="switch-handle"></span> 
</label>
    )
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  
  useEffect(() => {
    console.log(pageCount,"pageCount")
    viewFinanceAdminClearanceList(searchValue, pageCount,costCenter);
  }, [costCenter,searchValue,pageCount]);

  const statusRender = (e,value) => {
    var result = document.getElementsByClassName("switch-input")[0].checked

    const status = e.target.value
    const financeClearanceStatus = value.data
    financeClearanceStatus['fullAndFinalCompleteStatus']= status
    financeClearanceStatus['disabled']= true
    console.log(status,result,"fullAndFinalCompleteStatus")

  };

  const statusRenderTwo = (e,value) => {
    var result = document.getElementsByClassName("switch-input")[0].checked

    const status = e.target.value
    const financeClearanceStatus = value.data

    financeClearanceStatus['deactivateProfile']= status
    financeClearanceStatus['disabled']= true
    console.log(status,result,"deactivateProfile")

  };

  return (
    <div>
      <Fragment>
        <Container fluid>
      <Breadcrumb title="F & F Listing" parent="F & F Listing" />
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
              <div className="nodue_title" >
              <b >F & F Listing </b>            
              </div>
         

        <div className="ag-theme-alpine" style={{ align:"center",height: 495, width: 1400 }}>
          
          <AgGridReact 
            rowData={financeAdminNoDueClearanceList}
            rowSelection="single"
            
            onGridReady={onGridReady}
            defaultColDef={{
              width: 150,
              editable: true,
              resizable: true,
            }}
            
          >
          <AgGridColumn className="columnColor" editable="false" headerName="S No" pinned="left" lockPinned="true" valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Id" field="employeeId"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Employee Name" field="employeeName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Cost Center Name" field="costCentreName"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Manager Name" field="managerName"></AgGridColumn>
            <AgGridColumn  className="columnColor" editable="false" headerName="Joining Date" field="joiningDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" headerName="Last Working Day" field="lastWorkingDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false"  headerName="Mode of Separation" field="modeOfSeparation"></AgGridColumn>
            <AgGridColumn 
            className="columnColor" 
            editable="false" 
             headerName="F & F Complete" 
            field="fullAndFinalCompleteStatus"
            valueGetter="node.rowIndex"
            editable="false" 
              colId="status"
            cellRendererFramework={renderStatusOptions}
            cellEditorParams={{
              values: ["Yes","No"],
              cellRenderer: { statusRender },
            }}
            ></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false"  headerName="F & F Amount" field="fullAndFinalAmount"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false"  headerName="F & F Processed On" field="fullAndFinalProcessDate"></AgGridColumn>
            <AgGridColumn className="columnColor" editable="false" 
             headerName="Deactivate Profile"
              field="deactivateProfile"
              colId="status"
              cellRendererFramework={renderStatusOptionsTwo}
              cellEditorParams={{
                values: ["Yes","No"],
                cellRenderer: { statusRenderTwo}
              }}
              ></AgGridColumn>
                      <AgGridColumn
                      headerName="History"
                      editable="false"
                      field="exitId"
                      cellRendererFramework={(e) => renderButtonTwo(e)}
                    ></AgGridColumn>
                    {/* <AgGridColumn
                      className="columnColor"
                      field="itClearanceStatus"
                      headerName="IT Clearance"
                      editable="false" 
                        colId="status"
                      cellRendererFramework={renderStatusOptions}
                      cellEditorParams={{
                        values: ["0","1","2"],
                        cellRenderer: { statusRender },
                      }}
                    ></AgGridColumn> */}
                 

                  </AgGridReact>
                </div>

                {financeAdminNoDueClearanceList === null ? (
                  <p style={{ textAlign: "center" }}>No Record Found</p>
                ) : null}

                
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
              </Container>     
    </Fragment> 
     </div>
  );
};
export default FinanaceAdminNoDueClearance;