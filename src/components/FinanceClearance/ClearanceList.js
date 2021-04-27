import React, { Fragment, useState, useContext, useEffect } from "react";
import { SeparationContext } from "../../context/SepearationState";
import Breadcrumb from "../common/breadcrumb";

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
// import moment from "moment";
import "./financeClearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Pagination from "react-js-pagination";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { handleInputChange } from "react-select/src/utils";
const FinanceClearanceList = () => {
  const {
    separationListView,
    separationList,
    total,
    loader,
    saveFinanceClearanceData,
  } = useContext(SeparationContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [costCenter, setCostCenter] = useState("all");
  const [searchValue, setSearchValue] = useState("all");

  const [listRecords, setListRecords] = useState([]);
  const recordPerPage = 10;
  const totalRecords =
    separationList !== undefined && separationList !== null && total;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords =
    separationList !== undefined && separationList !== null
      ? separationList.slice(indexOfFirstRecord, indexOfLastRecord)
      : [];
  const handlePageChange = (pageNumber) => {
    console.log("page change");
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
  };

  const [financeClearanceStatus, setStatus] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [data, setData] = useState([]);
  const [clearanceData, setClearanceData] = useState({});

  const onStatusChange = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };
  const renderStatusOptions = () => {
    return (
      <div>
        <select name="financeClearanceStatus" onChange={(e) => statusRender(e)}>
          <option value="0"> Due </option>
          <option value="1"> No Due </option>
          <option value="2"> On Hold </option>
        </select>
      </div>
    );
  };

  const handleSave = () => {
    // onSelectionChanged();
  };
  useEffect(() => {
    separationListView("all", pageCount, "all");
  }, []);
  useEffect(() => {
    if (separationList !== undefined && separationList !== null) {
      setListRecords(separationList);
    }
  }, [separationList, listRecords]);
  const statusRender = (e) => {
    return <span>{e.target.value}</span>;
  };

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
      >
        Save
      </button>
    );
  };

  const onCellClicked = (params) => {
    if (params.column.colId === "action") {
      saveFinanceClearanceData(params.node.data);
    }
    if (params.column.colId === "status") {
      // console.log(params.node.data);
      if (params.node.data !== undefined) {
        params.node.data.financeClearanceStatus = params.event.target.value;
      }
    }
  };
  const onCellValueChanged = (params) => {
    if (params.column.colId === "status") {
      console.log("hii");
    }
  };

  return (
    console.log(separationList),
    (
      <Fragment>
        <Breadcrumb title="Finance Clearance" parent="Finanace Clearance" />

        <Container fluid>
          <div className="row headingWrapper px-4 mx-auto">
            <div className="col-md-12">
              <b className="text-uppercase text-center">
                NO DUE CLEARANCE LISTING
              </b>
            </div>
          </div>
          <Row className="mt-4 mainWrapper">
            <Col className="searchBox">
              <input
                className="form-control inputWrapper"
                type="text"
                placeholder="Search.."
              />
              <Search
                className="search-icon"
                style={{ color: "#313131", marginRight: "25rem" }}
                //   onClick={searchDataHandler}
              />
            </Col>
            <Col className="selectList">
              <label>Select Cost Center</label> &nbsp;&nbsp;
              <Form.Control
                as="select"
                className="selectInputWrapper"
              ></Form.Control>
            </Col>
          </Row>

          <div className="ag-theme-alpine" style={{ height: 400, width: 1450 }}>
            <AgGridReact
              rowData={separationList}
              onGridReady={(params) => setGridApi(params.api)}
              onCellClicked={onCellClicked}
              onCellValueChanged={onCellValueChanged}
            >
              <AgGridColumn field="employeeId"></AgGridColumn>
              <AgGridColumn field="empName"></AgGridColumn>
              <AgGridColumn field="costCentre"></AgGridColumn>
              <AgGridColumn field="managerName"></AgGridColumn>
              <AgGridColumn field="joiningDate"></AgGridColumn>
              <AgGridColumn
                field="lastWorkingDate"
                headerName="Last working Day"
              ></AgGridColumn>
              <AgGridColumn
                field="financeAmount"
                headerName="Finance Amount to be Recovered"
                editable={true}
                singleClickEdit={true}
              ></AgGridColumn>
              <AgGridColumn
                field="financeClearanceStatus"
                headerName="Finance Clearance"
                colId="status"
                editable={true}
                cellRendererFramework={renderStatusOptions}
                // cellEditor={agRichSelectCellEditor}
                cellEditorParams={{
                  values: ["0", "1", "2"],
                  cellRenderer: { statusRender },
                }}
              ></AgGridColumn>
              <AgGridColumn
                field="financeRemarks"
                headerName="Finance Clearance Remarks"
                editable={true}
                singleClickEdit={true}
              ></AgGridColumn>
              <AgGridColumn
                field="financeClearanceUpdatedBy"
                editable={true}
                singleClickEdit={true}
              ></AgGridColumn>
              <AgGridColumn
                field="Action"
                colId="action"
                cellRendererFramework={() => renderButton()}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </Container>
        <div>
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
          />
        </div>
      </Fragment>
    )
  );
};
export default FinanceClearanceList;
