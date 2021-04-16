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
import "./financeClearance.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import { handleInputChange } from "react-select/src/utils";
const FinanceClearanceList = () => {
  const { separationListView, separationList, total, loader } = useContext(
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

  // const handleInputChange = (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   setCleranceData({ ...clearanceData, [e.target.name]: e.target.value });
  // };
  const handleSave = () => {
    console.log(data);
  };
  useEffect(() => {
    separationListView("all", pageCount);
  }, []);
  useEffect(() => {
    if (separationList !== undefined && separationList !== null) {
      setListRecords(separationList);
    }
  }, [separationList, listRecords]);
  const statusRender = (value) => {
    console.log(value);
    return <span>{value}</span>;
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
  // const renderList = (clearanceData) => {
  //   return (
  //     <tbody key={clearanceData.exitId}>
  //       <tr>
  //         <td>{clearanceData.exitId}</td>
  //         <td>{clearanceData.employeeId}</td>
  //         <td>{clearanceData.empName}</td>
  //         <td>{clearanceData.costCentre}</td>
  //         <td>{clearanceData.managerName}</td>
  //         <td>
  //           {clearanceData.joiningDate !== null
  //             ? moment(clearanceData.joiningDate).format("DD/MM/YYYY")
  //             : "N/A"}
  //         </td>
  //         <td>
  //           {clearanceData.lastWorkingDate !== null
  //             ? moment(clearanceData.lastWorkingDate).format("DD/MM/YYYY")
  //             : "N/A"}
  //         </td>
  //         <td>
  //           <input
  //             type="text"
  //             className="inputWrapper"
  //             name="financeAmount"
  //             value={clearanceData.financeAmount}
  //             onChange={(e) => handleInputChange(e)}
  //           ></input>
  //         </td>
  //         <td>
  //           <Form.Control as="select" className="">
  //             <option>Due</option>
  //             <option>No Due</option>
  //             <option>On Hold</option>
  //           </Form.Control>
  //         </td>
  //         <td>
  //           <input
  //             type="text"
  //             className="inputWrapper"
  //             name="financeRemarks"
  //             onChange={(e) => handleInputChange(e)}
  //             value={clearanceData.financeRemarks}
  //           ></input>
  //         </td>
  //         <td>{clearanceData.financeClearanceUpdatedBy}</td>
  //         <td>
  //           <button
  // style={{
  //   backgroundColor: "#006ebb",
  //   color: "white",
  //   border: "1px solid #006ebb",
  //   paddingLeft: "10px",
  //   paddingRight: "10px",
  // }}
  //             onClick={() => handleSave()}
  //           >
  //             Save
  //           </button>
  //         </td>
  //       </tr>
  //     </tbody>
  //   );
  // };
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
        <Row className="mt-4">
          <Col sm={4}>
            <input
              className="form-control "
              type="text"
              placeholder="Search.."
              //   onChange={(e) => searchHandler(e)}
            />
            <Search
              className="search-icon"
              style={{ color: "#313131" }}
              //   onClick={searchDataHandler}
            />
          </Col>
          <Col sm={8}>
            <Row>
              <Col sm={1}>
                <Form.Label>Select Cost Center</Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Control as="select"></Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
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
        <div className="ag-theme-alpine" style={{ height: 400, width: 1450 }}>
          <AgGridReact
            rowData={separationList}
            rowSelection="single"
            onGridReady={onGridReady}
          >
            <AgGridColumn field="employeeId"></AgGridColumn>
            <AgGridColumn field="empName"></AgGridColumn>
            <AgGridColumn field="costCentre"></AgGridColumn>
            <AgGridColumn field="managerName"></AgGridColumn>
            <AgGridColumn field="joiningDate"></AgGridColumn>
            <AgGridColumn field="lastWorkingDate"></AgGridColumn>
            <AgGridColumn field="financeAmount"></AgGridColumn>
            <AgGridColumn
              field="financeClearanceStatus"
              editable={true}
              cellRendererFramework={renderStatusOptions}
              cellEditorParams={{
                values: ["Due", "No Due", "On Hold"],
                cellRenderer: { statusRender },
              }}
            ></AgGridColumn>
            <AgGridColumn field="financeRemarks" editable={true}></AgGridColumn>
            <AgGridColumn field="financeClearanceUpdatedBy"></AgGridColumn>
            <AgGridColumn
              field="Action"
              cellRendererFramework={() => renderButton()}
            ></AgGridColumn>
          </AgGridReact>
        </div>
        {/* <Table>
          <thead>
            <tr>
              <th scope="col">S. No</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Cost Center Name</th>
              <th scope="col">Manager Name</th>
              <th scope="col">Joining Date</th>
              <th scope="col">Last Working Day</th>
              <th scope="col">Finance Amount to be Recovered</th>
              <th scope="col">Finance Clearance</th>
              <th scope="col">Finance Clearance Remarks</th>
              <th scope="col">Finance Clearance Updated by</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {loader === true &&
          separationList !== null &&
          separationList !== undefined ? (
            <tbody>
              <tr>
                <td colSpan="12">
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
                </td>
              </tr>
            </tbody>
          ) : separationList !== undefined &&
            separationList !== null &&
            separationList.length > 0 ? (
            separationList.map((item, i) => {
              return renderList(item);
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan="12">No Record Found</td>
              </tr>
            </tbody>
          )}
        </Table> */}
      </Container>
    </Fragment>
  );
};
export default FinanceClearanceList;
