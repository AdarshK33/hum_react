import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { PromotionContext } from "../../context/PromotionState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { SeparationContext } from "../../context/SepearationState";
import "./Promotion.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import { E_signContext } from "../../context/E_signState";
const PromotionList = () => {
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
  const { getReference, notification } = useContext(E_signContext);
  const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
    useContext(DocsVerifyContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const { MakeCostCenterDataNull } = useContext(SeparationContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  const [promotionStatus, setPromotionStatus] = useState("");
  const [role, setRole] = useState(0);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  useEffect(() => {
    console.log(promotionList, "promotionlist1");
    if (promotionList !== null && promotionList !== undefined) {
      setCurrentRecords(promotionList);
      console.log(promotionList, "promotionlist2");
    }
  }, [promotionList, currentRecords]);
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
      promotionListView(searchValue, pageNumber - 1, 6, role);
    } else if (promotionStatus === "Pending") {
      promotionListView("all", pageNumber - 1, 0, role);
    } else if (promotionStatus === "In Progress") {
      promotionListView("all", pageNumber - 1, 1, role);
    } else if (promotionStatus === "Approved") {
      promotionListView("all", pageNumber - 1, 3, role);
    } else if (promotionStatus === "Rejected") {
      promotionListView("all", pageNumber - 1, 4, role);
    } else if (promotionStatus === "Approve In Progress") {
      promotionListView("all", pageNumber - 1, 5, role);
    } else {
      promotionListView("all", pageNumber - 1, 6, role);
    }
    setCurrentRecords(promotionList);
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
      promotionListView(searchValue, pageCount, 6, role);
    } else {
      promotionListView("all", 0, 6, role);
    }
  };

  useEffect(() => {
    promotionListView(
      searchValue,
      pageCount,
      6,
      rolePermission == "superCostCenterManager" ? 1 : 0
    );
    console.log("user role------>", user);
  }, []);

  console.log(rolePermission, promotionList, "promotionlist3");

  const statusHandler = (e) => {
    setPromotionStatus(e.target.value);
    setPageCount(0);
    setCurrentPage(1);
    setSearchValue("");
    if (e.target.value === "Pending") {
      promotionListView("all", 0, 0, role);
    } else if (e.target.value === "In Progress") {
      promotionListView("all", 0, 1, role);
    } else if (e.target.value === "Approved") {
      promotionListView("all", 0, 3, role);
    } else if (e.target.value === "Rejected") {
      promotionListView("all", 0, 4, role);
    } else if (e.target.value === "Approve In Progress") {
      promotionListView("all", 0, 5, role);
    } else {
      promotionListView("all", 0, 6, role);
    }
  };
  const GoToLetterView = (refId,signedLetter,employeeID) => {
    console.log(refId,signedLetter,employeeID);
    getReference(refId,signedLetter,employeeID);
  };

  return (
    <Fragment>
      <Breadcrumb title="PROMOTION LIST" parent="PROMOTION LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
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

                    {/* <Link to="/manager-offer-release">
                  <Button className="apply-button btn btn-light mr-2">
                    Initate Offer
                  </Button>
                </Link> */}
                  </Col>
                  <Col sm={2} style={{ marginTop: "5px" }}>
                    <b>PROMOTION LIST</b>
                  </Col>
                  <Col sm={3}>
                    <div className="promotion_initiate">
                      <Link to="/promotion-initiate">
                        <Button className="apply-button btn btn-light mr-2">
                          Initiate Promotion
                        </Button>
                      </Link>
                    </div>
                  </Col>
                  <Col sm={2}>
                    <Form>
                      <div className="promotion_status_search">
                        {/* className="faq-form mr-2""job-filter" */}
                        <Form.Group>
                          <Form.Control
                            as="select"
                            name="probationStatus"
                            value={promotionStatus}
                            onChange={statusHandler}
                            // placeholder="Search.."
                            //   disabled={disabled}"

                            style={
                              false
                                ? { borderColor: "red" }
                                : { borderRadius: "20px" }
                            }
                          >
                            <option value="" disabled selected hidden>
                              Search status
                            </option>
                            <option value="all">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Approve In Progress">
                              Action Required
                            </option>
                          </Form.Control>
                        </Form.Group>
                        {/* <br></br> */}
                      </div>
                    </Form>
                  </Col>
                </Row>
              </div>
              {/* <div className="title_bar">
                <div className="job-filter">
                  <div className="faq-form mr-2">
                    <input
                      className="form-control searchButton"
                      type="text"
                      placeholder="Search.."
                      onChange={(e) => searchHandler(e)}
                    />
                    <Search
                      className="search-icon"
                      style={{ color: "#313131" }}
                      onClick={searchDataHandler}
                    />
                  </div>
                </div>
                
              </div> */}
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
                      <th scope="col">Position Promoted To</th>
                      <th scope="col">Promotion Date</th>
                      <th scope="col">Validated By CostCenter Manger</th>
                      <th scope="col">Date</th>
                      <th scope="col">Validated By HR/Admin</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">View</th>
                      {/* <th scope="col">Manager Action</th> */}
                      <th scope="col">Action</th>
                      <th scope="col">View Signed Document</th>
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
                            <td>{item.empName}</td>
                            <td>{item.oldPosition}</td>
                            <td>{item.promotedPosition}</td>
                            <td>
                              {item.effectiveDate !== null &&
                              item.effectiveDate !== undefined &&
                              item.effectiveDate !== ""
                                ? moment(new Date(item.effectiveDate)).format(
                                    "DD-MM-YYYY"
                                  )
                                : ""}
                            </td>
                            <td>
                              {item.validatedManagerName !== null &&
                              item.validatedManagerName !== undefined &&
                              item.validatedManagerName !== ""
                                ? item.validatedManagerName
                                : "NA"}
                            </td>
                            <td>
                              {item.managerValidatedDate !== null &&
                              item.managerValidatedDate !== undefined &&
                              item.managerValidatedDate !== ""
                                ? moment(item.managerValidatedDate).format(
                                    "DD-MM-YYYY"
                                  )
                                : "NA"}
                            </td>
                            <td>
                              {item.validatedAdminName !== null &&
                              item.validatedAdminName !== undefined &&
                              item.validatedAdminName !== ""
                                ? item.validatedAdminName
                                : "NA"}
                            </td>
                            <td>
                              {item.adminValidatedDate !== null &&
                              item.adminValidatedDate !== undefined &&
                              item.adminValidatedDate !== ""
                                ? moment(
                                    new Date(item.adminValidatedDate)
                                  ).format("DD-MM-YYYY")
                                : "NA"}
                            </td>
                            <td>
                              {/* {item.statusDesc} */}
                              {/* {item.status == 0?"Pending":item.status ==1? "Approved By Admin":
                item.status == 2?"Approved By CostCentre Manager":
                item.status == 3? "Approved By Manager":
                item.status ==4? "Rejected":''} */}
                              {item.status == 0
                                ? "Pending"
                                : item.status == 1 || item.status == 2
                                ? "In Progress"
                                : item.status == 3
                                ? "Approved"
                                : item.status == 4
                                ? "Rejected"
                                : item.status == 5
                                ? "Action Required"
                                : ""}
                            </td>
                            <td>
                              <Link to={"/view-promotion/" + item.employeeId}>
                                <Eye
                                  onClick={() => {
                                    ViewPromotionById(item.promotionId);
                                  }}
                                />
                              </Link>
                            </td>

                            {user !== null &&
                            user !== undefined &&
                            user.employeeId === item.initiatedBy ? (
                              <td>
                                {item.status === 1 || item.status === 5 ? (
                                  <Link to={"/promotion/" + item.employeeId}>
                                    <Edit2
                                      onClick={() => {
                                        ViewPromotionById(item.promotionId);
                                      }}
                                    />
                                  </Link>
                                ) : (
                                  <Edit2 />
                                )}
                              </td>
                            ) : user !== null &&
                              user !== undefined &&
                              rolePermission == "admin" ? (
                              <td>
                                {item.status === 2 ? (
                                  <Link
                                    to={
                                      "/promotion-approval/" + item.employeeId
                                    }
                                    //this link have to change according to ADMIN component
                                  >
                                    <Edit2
                                      onClick={() => {
                                        ViewPromotionById(item.promotionId);
                                      }}
                                    />
                                  </Link>
                                ) : (
                                  <Edit2 />
                                )}
                              </td>
                            ) : user !== null &&
                              user !== undefined &&
                              rolePermission == "costCenterManager" ? (
                              <td>
                                {item.status === 0 ? (
                                  <Link
                                    to={
                                      "/promotion-approval/" + item.employeeId
                                    }
                                  >
                                    <Edit2
                                      onClick={() => {
                                        ViewPromotionById(item.promotionId);
                                      }}
                                    />
                                  </Link>
                                ) : (
                                  <Edit2 />
                                )}
                              </td>
                            ) : user !== null &&
                              user !== undefined &&
                              rolePermission == "superCostCenterManager" ? (
                              <td>
                                {item.status === 0 ? (
                                  <Link
                                    to={
                                      "/promotion-approval/" + item.employeeId
                                    }
                                  >
                                    <Edit2
                                      onClick={() => {
                                        ViewPromotionById(item.promotionId);
                                      }}
                                    />
                                  </Link>
                                ) : (
                                  <Edit2 />
                                )}
                              </td>
                            ) : (
                              <td>
                                <Edit2 />
                              </td>
                            )}
                            {item.refId !== null &&
                            item.refId !== undefined &&
                            item.refId !== "" ? (
                              <td>
                                <Link>
                                  <AlertCircle
                                    onClick={() => {
                                      GoToLetterView(item.refId,item.signedLetter,item.employeeId);
                                    }}
                                  />
                                </Link>
                              </td>
                            ) : (
                              <td>
                                <AlertCircle />
                              </td>
                            )}
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

export default PromotionList;
