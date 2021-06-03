import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { ProbationContext } from "../../context/ProbationState";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import "./probation.css";

const ProbationList = () => {
  //   const { loader } = useContext(OfferContext);
  const {
    ProbationListView,
    probationListData,
    total,
    changeEmpId,
    ViewProbationDataById,
    probationData,
    empId,
    loader,
  } = useContext(ProbationContext);
  //   const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
  //     useContext(DocsVerifyContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);

  const [firstBtn, setFirstBtn] = useState(false);
  const [secondBtn, setSecondBtn] = useState(false);
  const [thirdBtn, setThirdBtn] = useState(false);
  const [fourthBtn, setFourthBtn] = useState(false);
  const [fifthBtn, setFifthBtn] = useState(true);
  const [firstTimeUpdate, setFirstTimeUpdate] = useState(true);
  useEffect(() => {
    // ProbationListView("all", pageCount);
    ProbationListView(0, "all", pageCount);
    console.log("user role", user);
  }, []);

  useEffect(() => {
    if (
      probationListData &&
      Object.keys(probationListData).length !== 0 &&
      probationListData !== null &&
      probationListData !== undefined
    ) {
      setCurrentRecords(probationListData);
    }
  }, [probationListData, currentRecords]);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "") {
      //   ProbationListView(searchValue, pageNumber - 1);
      ProbationListView(0, searchValue, pageNumber - 1);
    } else if (firstBtn) {
      ProbationListView(5, "all", pageNumber - 1);
    } else if (secondBtn) {
      ProbationListView(7, "all", pageNumber - 1);
    } else if (thirdBtn) {
      ProbationListView(10, "all", pageNumber - 1);
    } else if (fourthBtn) {
      ProbationListView(14, "all", pageNumber - 1);
    } else {
      ProbationListView(0, "all", pageNumber - 1);
    }
    setCurrentRecords(probationListData);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      //   ProbationListView(searchValue, pageCount);
      ProbationListView(0, searchValue, pageCount);
      setFirstBtn(false);
      setSecondBtn(false);
      setThirdBtn(false);
      setFourthBtn(false);
      setFifthBtn(false);
    } else {
      //   ProbationListView("all", pageCount);
      ProbationListView(0, "all", pageCount);
      setFirstBtn(false);
      setSecondBtn(false);
      setThirdBtn(false);
      setFourthBtn(false);
      setFifthBtn(true);
    }
  };

  const searchByDueDay = (val) => {
    switch (val) {
      case 0:
        ProbationListView(0, "all", pageCount);
        setFifthBtn(true);
        setFirstBtn(false);
        setSecondBtn(false);
        setThirdBtn(false);
        setFourthBtn(false);
        break;

      case 5:
        // ProbationListView(5, pageCount);
        ProbationListView(5, "all", pageCount);
        setFirstBtn(true);
        setSecondBtn(false);
        setThirdBtn(false);
        setFourthBtn(false);
        setFifthBtn(false);
        break;
      case 7:
        // ProbationListView(7, pageCount);
        ProbationListView(7, "all", pageCount);
        setFirstBtn(false);
        setSecondBtn(true);
        setThirdBtn(false);
        setFourthBtn(false);
        setFifthBtn(false);
        break;
      case 10:
        // ProbationListView(10, pageCount);
        ProbationListView(10, "all", pageCount);
        setFirstBtn(false);
        setSecondBtn(false);
        setThirdBtn(true);
        setFourthBtn(false);
        setFifthBtn(false);
        break;
      case 14:
        // ProbationListView(14, pageCount);
        ProbationListView(14, "all", pageCount);
        setFirstBtn(false);
        setSecondBtn(false);
        setThirdBtn(false);
        setFourthBtn(true);
        setFifthBtn(false);
        break;

      default:
        break;
    }
  };
  const fetchEmployeeDetails = (employeeId) => {
    changeEmpId(employeeId);
    ViewProbationDataById(employeeId);
  };
  return (
    <Fragment>
      <Breadcrumb title="Probation List" parent="Probation List" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b style={{ marginLeft: "13rem" }}>PROBATION LIST</b>
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
                    <br></br>
                  </div>
                </div>

                {/* <Link to="/manager-offer-release">
                  <Button className="apply-button btn btn-light mr-2">
                    Initate Offer
                  </Button>
                </Link> */}
              </div>
              <div className="probation_dashboard">
                {/* <Row>
                  <Col> */}
                <div
                  style={{
                    textAlign: "center",
                    color: "#006EBB",
                    marginLeft: "1rem",
                  }}
                >
                  {" "}
                  <b>PROBATION DASHBOARD</b>
                </div>
                <div
                  style={{
                    color: "#006EBB",
                    marginLeft: "1rem",
                    // marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Row>
                    <Col sm={1}></Col>
                    <Col sm={2} style={{ marginLeft: "-2rem" }}>
                      <Button
                        disabled={firstBtn}
                        className={firstBtn ? "clickedButton" : "FirstButtons "}
                        // className={"clickedButton"}
                        onClick={() => {
                          searchByDueDay(5);
                        }}
                      >
                        Due In
                        <hr
                          align="center"
                          width="60%"
                          size="10"
                          color="white"
                          className={"lineStyle"}
                        />
                        5 Days
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button
                        disabled={secondBtn}
                        className={
                          secondBtn ? "clickedButton" : "SecondButtons "
                        }
                        onClick={() => {
                          searchByDueDay(7);
                        }}
                      >
                        Due In
                        <hr
                          align="center"
                          width="60%"
                          size="10"
                          color="white"
                          className={"lineStyle"}
                        />
                        1 Week
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button
                        disabled={thirdBtn}
                        className={thirdBtn ? "clickedButton" : "ThirdButtons"}
                        onClick={() => {
                          searchByDueDay(10);
                        }}
                      >
                        Due In
                        <hr
                          align="center"
                          width="60%"
                          size="10"
                          color="white"
                          className={"lineStyle"}
                        />
                        10 Days
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button
                        disabled={fourthBtn}
                        className={
                          fourthBtn ? "clickedButton" : "FourthButtons"
                        }
                        onClick={() => {
                          searchByDueDay(14);
                        }}
                      >
                        Due In
                        <hr
                          align="center"
                          width="60%"
                          size="10"
                          color="white"
                          className={"lineStyle"}
                        />
                        2 Weeks
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button
                        disabled={fifthBtn}
                        className={fifthBtn ? "clickedButton" : "FifthButtons"}
                        onClick={() => {
                          searchByDueDay(0);
                        }}
                      >
                        View
                        <hr
                          align="center"
                          width="60%"
                          size="10"
                          color="white"
                          className={"lineStyle"}
                        />
                        All
                      </Button>
                    </Col>
                    <Col sm={1}></Col>
                  </Row>
                </div>

                {/* </Col>
                </Row> */}
              </div>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Employee ID</th>
                      <th scope="col">Cost Center</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Date of Joining</th>
                      <th scope="col">Date of Confirmation</th>
                      <th scope="col">Due Days</th>
                      <th scope="col">Reminder Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
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
                        <tbody key={item.probationId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.empId}</td>
                            <td>{item.costCentre}</td>
                            <td>{item.empName}</td>
                            <td>{item.dateOfJoining}</td>
                            <td>{item.probationConfirmationDate}</td>
                            <td>{item.dueDays}</td>
                            <td>{item.reminderSent}</td>
                            <td>
                              {item.status === 0
                                ? "Due for confirmation"
                                : item.status === 1
                                ? "Confirmed"
                                : item.status === 2
                                ? "Extended"
                                : ""}
                            </td>

                            <td>
                              {item.status !== 0 ? (
                                <Edit2 />
                              ) : (
                                <Link to={"/probation-action/" + item.empId}>
                                  <Edit2
                                    onClick={() => {
                                      fetchEmployeeDetails(item.empId);
                                    }}
                                  />
                                </Link>
                              )}
                            </td>

                            {/* <td>
                              <Link to="/view-offer-release">
                                <Eye
                                  onClick={() => {
                                    viewCandidateId(item.candidateId);
                                  }}
                                />
                              </Link>
                            </td> */}
                            {/* {user !== null &&
                            user !== undefined &&
                            user.role !== "ADMIN" ? (
                              <td>
                                <Link to="/offer-relase-and-onboard">
                                  <AlertCircle
                                    onClick={() => {
                                      fetchCandidateDetails(item.candidateId);
                                    }}
                                  />
                                </Link>
                              </td>
                            ) : (
                              ""
                            )} */}
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
      {currentRecords !== null && currentRecords !== undefined && total > 0 && (
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

export default ProbationList;
