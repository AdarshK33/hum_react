import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { PromotionContext } from "../../context/PromotionState";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { SeparationContext } from "../../context/SepearationState";
import "./EmployeeHistory.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

const EmployeeList = () => {
  const {
    promotionListView,
    promotionIdData,
    ViewPromotionById,
    promotionList,
    loader,
    total,
    ViewPromotionByEmployee,
    promotionByEmployee,
  } = useContext(PromotionContext);
  const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
    useContext(DocsVerifyContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const { MakeCostCenterDataNull } = useContext(SeparationContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([{
    employeeId:"DSI000011",
    employeeName:"Rakesh",
    position:"Sport leader",
    role:"Admin",
    costcenter:"IN1058",
    active:"yes",
    createdBy:"Prashant"
  }]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  const [promotionStatus, setPromotionStatus] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [role, setRole] = useState(0);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  useEffect(() => {
    MakeCostCenterDataNull();
  }, []);
  useEffect(() => {
    if (rolePermission == "superCostCenterManager") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [rolePermission]);
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "") {
      promotionListView(searchValue, pageNumber - 1,6,role);
    } else if (promotionStatus === "Pending") {
      promotionListView("all", pageNumber - 1, 0,role);
    } else if (promotionStatus === "In Progress") {
      promotionListView("all", pageNumber - 1, 1,role);
    } else if (promotionStatus === "Approved") {
      promotionListView("all", pageNumber - 1, 3,role);
    } else if (promotionStatus === "Rejected") {
      promotionListView("all", pageNumber - 1, 4,role);
    } else if (promotionStatus === "Approve In Progress") {
      promotionListView("all", pageNumber - 1, 5,role);
    } else {
      promotionListView("all", pageNumber - 1,6,role);
    }
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPromotionStatus("");
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      promotionListView(searchValue, pageCount,6,role);
    } else {
      promotionListView("all", 0,6,role);
    }
  };

  useEffect(() => {
    promotionListView(searchValue, pageCount,6,rolePermission == "superCostCenterManager" ? 1 : 0
    );
    console.log("user role------>", user);
  }, []);

  console.log(rolePermission,promotionList, "promotionlist3");
  const fromDateHandler = (date) => {
    let value = date;
    console.log("fromDate", value);
    setStartDate(value);
  };

  const toDateHandler = (date) => {
    let value1 = date;
    console.log("toDate", value1);
    setEndDate(value1);
  };

  return (
    <Fragment>
      <Breadcrumb title="EMPLOYEE LIST" parent="EMPLOYEE LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
          <Row>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>From Date</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(e) => fromDateHandler(e)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      /*  minDate={currentYear} */
                      placeholderText="From Date"
                      required
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>To Date</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <div>
                    <DatePicker
                      selected={endDate}
                      // onChange={(e) => toDateHandler(e)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      minDate={startDate}
                      placeholderText="To Date"
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-sm-4">
              <Button type="submit" className="submitButton">
            Export as master
          </Button>
              </div>
            </Row>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <Row>
                  <Col>
                    <div
                      style={{
                        width: "65%",
                        float: "left",

                        marginTop: "10px",
                        marginLeft: "8px",
                      }}
                      className="faq-form mr-2"
                    >
                      <input
                        className="form-control searchButton"
                        type="text"
                        value={searchValue}
                        placeholder="Search.."
                        onChange={(e) => searchHandler(e)}
                      />
                      <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandler}
                      />
                      <br></br>
                    </div>
                  </Col>
                  <Col sm={2} style={{ marginTop: "5px" }}>
                    <b>EMPLOYEE LIST</b>
                  </Col>
                </Row>
              </div>
           
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Employee Id </th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Role</th>
                      <th scope="col">Cost Center</th>
                      <th scope="col">Created By</th>
                      <th scope="col">is Active?</th>
                      <th scope="col">Edit</th>
                      <th scope="col">History</th>
                      <th scope="col">Exit User</th>
                  
                    </tr>
                  </thead>
                  {loader === true &&
                  currentRecords !== null &&
                  currentRecords !== undefined ? (
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
                  ) : currentRecords !== undefined &&
                    currentRecords !== null &&
                    currentRecords.length > 0 &&
                    total > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.promotionId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.position}</td>
                            <td>{item.role}</td>
                            <td>{item.costcenter}</td>
                           <td>{item.createdBy}</td>
                           <td>{item.active}</td>
                            <td>
                              <Edit2/>
                            </td>
                            <td>
                              <Link to={"/view-promotion/" + item.employeeId}>
                              <div style={{  paddingTop: "2px",  fontSize: "24px" }}>
                            <i className="fa fa-history"></i>
                          </div>
                              </Link>
                            </td>
                            <td>
                              <div style={{  paddingTop: "2px",  fontSize: "24px" }}>
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="12">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {currentRecords !== null && currentRecords !== undefined && (
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
    </Fragment>
  );
};

export default EmployeeList;
