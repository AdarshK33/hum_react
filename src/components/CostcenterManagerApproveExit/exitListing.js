import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { PermissionContext } from "../../context/PermissionState";

import { AppContext } from "../../context/AppState";
const ExitListing = () => {
  const {
    EmployeeSeparationExitList,
    EmployeeSeparationListExitView,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationView,
    ModeOfSeparationData,
    loader,
    total,
    changeEmployeeId,
    ViewEmployeeProfile,
  } = useContext(EmployeeSeparationContext);
  const { user ,getUserInfo,fetchEmployeeProfile,fetchemployeeData} = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [role,setRole] = useState(0)
  useEffect(() => {
    EmployeeSeparationListExitView("all", pageCount, 9);
    getUserInfo()
    fetchEmployeeProfile()
  }, []);
  useEffect(() => {
    if (rolePermission == "superCostCenterManager") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [rolePermission]);
  console.log("---->", EmployeeSeparationExitList);
  console.log(rolePermission,"rolePermission")

  // useEffect(() => {
  //   if (
  //     EmployeeSeparationExitList !== null &&
  //     EmployeeSeparationExitList !== undefined
  //   ) {
  //     console.log("list");
  //     setCurrentRecords(EmployeeSeparationExitList);
  //   }
  // }, [EmployeeSeparationExitList, currentRecords]);
  // console.log("Records-->", currentRecords);

  useEffect(() => {
    if (
      EmployeeSeparationExitList &&
      EmployeeSeparationExitList !== null &&
      EmployeeSeparationExitList !== undefined &&
      Object.keys(EmployeeSeparationExitList).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (EmployeeSeparationExitList.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      EmployeeSeparationExitList.map((rotate, r) => {
        ModeOfSeparationData.map((item, i) => {
          if (
            EmployeeSeparationExitList[r].modeOfSeparationId ===
            ModeOfSeparationData[i].modeOfSeparation.separationId
          ) {
            // console.log(
            //   "seww",
            //   ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
            // );

            ModeOfSeparationData[i].modeOfSeparationReasonList.map(
              (item1, j) => {
                if (
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId === 0
                ) {
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId = "";
                } else if (
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId ===
                  ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                    .separationReasonId
                ) {
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId =
                    ModeOfSeparationData[i].modeOfSeparationReasonList[
                      j
                    ].modeOfSeparationReason;
                  // console.log(
                  //   "sepp",
                  //   ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  //     .modeOfSeparationReason
                  // );
                }
              }
            );
          }
        });
      });
      setCurrentRecords(EmployeeSeparationExitList);
    }
  }, [EmployeeSeparationExitList, ModeOfSeparationData]);
  console.log(user,fetchemployeeData, "user");
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
      EmployeeSeparationListExitView(searchValue, pageNumber - 1, 9);
    } else {
      EmployeeSeparationListExitView("all", pageNumber - 1, 9);
    }
    setCurrentRecords(EmployeeSeparationExitList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      EmployeeSeparationListExitView(searchValue, pageCount, 9);
    } else {
      EmployeeSeparationListExitView("all", pageCount, 9);
    }
  };

  const fetchEmployeeDetails = (employeeId) => {
    console.log(employeeId,"fetchEmployeeDetails")
    changeEmployeeId(employeeId);
    ViewEmployeeDataById(employeeId);
    ModeOfSeparationView();
    // viewCandidateId(candidateId);
    // verificationDocsView(candidateId);
    // personalInfo(candidateId);
    // viewRole();
    // CostCenter();
  };
  return (
    console.log(EmployeeSeparationExitList),
    (
      <Fragment>
        <Breadcrumb
          title="Employee Separation List"
          parent="Employee Separation List"
        />
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="card" style={{ overflowX: "auto" }}>
                <div
                  className="title_bar"
                  style={{ textAlign: "center", fontSize: "larger" }}
                >
                  <Row>
                    <Col sm={8}>
                      <b>EMPLOYEE SEPARATION LISTING</b>
                    </Col>
                    <Col sm={4}>
                      <div
                        style={{
                          width: "55%",
                          float: "right",
                          marginTop: "10px",
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
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Contract Type</th>
                        <th scope="col">Resignation Date</th>
                        <th scope="col">Last Working Day</th>
                        <th scope="col">Reason for Resignation</th>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Notice Period</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {loader === true &&
                    EmployeeSeparationExitList !== null &&
                    EmployeeSeparationExitList !== undefined &&
                    ModeOfSeparationData !== null &&
                    ModeOfSeparationData !== undefined ? (
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
                    ) : EmployeeSeparationExitList !== undefined &&
                      EmployeeSeparationExitList !== null &&
                      EmployeeSeparationExitList.length > 0 &&
                      ModeOfSeparationData !== null &&
                      ModeOfSeparationData !== undefined ? (
                      EmployeeSeparationExitList.map((item, i) => {
                        return (
                          <tbody key={item.employeeId}>
                            <tr>
                              <td>{i + 1 + indexOfFirstRecord}</td>
                              <td>{item.employeeId}</td>
                              <td>{item.employeeName}</td>
                              <td>{item.position}</td>
                              <td>{item.contractType}</td>
                              <td>{item.dateOfResignation}</td>
                              <td>{item.lastWorkingDate}</td>
                              <td>{item.reasonForResignation}</td>
                              <td>{item.managerName}</td>
                              <td>
                                {item.contractType!==null && item.contractType !== undefined && item.contractType.toLowerCase() ===
                                "internship"
                                  ? "NA"
                                  : item.noticePeriod}
                              </td>
                              <td>
                              {item.status === 0
                                ? "Resignation Applied"
                                : item.status === 1
                                ? "Withdraw"
                                : item.status === 2
                                ? "Resignation Confirmed"
                                : item.status === 3
                                ? "Resignation Approved"
                                : item.status === 4
                                ? "Terminated Confirmed"
                                : item.status === 5
                                ? "Terminated Approved"
                                : item.status === 6
                                ? "End of InternShip"
                                : item.status === 7
                                ? "End of Probation"
                                : item.status === 8
                                ? "Not Confirmed"
                                :item.status === 10
                                ? "Employee Demise Confirmed":
                                item.status === 11 
                                ? "Employee Demise Approved": ""}
                            </td>
                              <td>
                                {/* {(item !== null &&
                                item !== undefined &&
                                Object.keys(item).length !== 0)?(
                                (item.loginType == 7 || item.additionalRole == 7) && item.isManager === true?(
                                  (item.status === 2 ||
                                    item.status === 3 ||
                                      item.status === 5)?(
                                        <Edit2 />
                                            ) : (
                                                <Link
                        to={"/exit-action/" + item.employeeId}
                                    >
                                        <Edit2
                                            onClick={() => {
                                        fetchEmployeeDetails(
                          item.employeeId
                                        );
                                            }}
                          />
                      </Link>
                      )
                    ) : (item.status === 0 || item.status === 8) ? (
                        <Link
              to={"/exit-action/" + item.employeeId}
                >
                            <Edit2  
                      onClick={() => {
                        fetchEmployeeDetails(item.employeeId);
                                          }}
                                            />
                                </Link>
                                  ) : (
                                  <Link
                                  to={"/employee-info/" + item.employeeId}
                                  >
                                  <Edit2
                                  onClick={() => {
                                  fetchEmployeeDetails(item.employeeId);
                                  }}
                                  />
                                  </Link>
                                  )
                                  ) : (
                                  <Edit2 />
                                  )}test         */}
                                {item.status === 3 ||
                                item.status === 11 ||
                                item.status === 5 ||
                                item.status === 6 ?
                                <Edit2 />: rolePermission === "manager" && (item.status === 0 || item.status === 8 ) ?
                                <Link to={"/exit-action/" + item.employeeId}>
                                    <Edit2
                                      onClick={() => {
                                        fetchEmployeeDetails(item.employeeId);
                                      }}
                                    />
                                  </Link> :
                                  ((rolePermission === "costCenterManager" ||
                                  rolePermission === "superCostCenterManager" ||
                                  rolePermission === "admin")
                                   && ((item.status === 2 && item.managerEsign === true) ||(item.status === 4 && item.managerEsign === true) || item.status === 10 )) ?
                                   <Link to={"/employee-info/" + item.employeeId}>
                                    <Edit2
                                      onClick={() => {
                                        fetchEmployeeDetails(item.employeeId);
                                      }}
                                    />
                                  </Link>:
                                    <Edit2 />
                                }

                                {/* {item.status === 3 ||
                                item.status === 11 ||
                                item.status === 5 ||
                                item.status === 6 ? (
                                  <Edit2 />
                                ) :(item.status === 0 && rolePermission === "manager")?(
                                  <Link to={"/exit-action/" + item.employeeId}>
                                    <Edit2
                                      onClick={() => {
                                        fetchEmployeeDetails(item.employeeId);
                                      }}
                                    />
                                  </Link>
                                ):item.status === 8 ? (
                                  <Link to={"/exit-action/" + item.employeeId}>
                                    <Edit2
                                      onClick={() => {
                                        fetchEmployeeDetails(item.employeeId);
                                      }}
                                    />
                                  </Link>
                                ) :(((
                                  (user.loginType == 1 || user.loginType == 7 || user.loginType ==  3 ||user.loginType ==  9)
                                   ||
                                 (user.additionalRole == 1 || user.additionalRole == 7 ||user.additionalRole == 3 ||user.additionalRole == 9)
                                ) 
                                &&
                                item.isManager == true &&
                                (item.status == 2 || item.status == 10))
                                 ||
                                 ((
                                  (user.loginType == 1 || user.loginType == 7 || user.loginType ==  3 ||user.loginType ==  9)
                                   ||
                                 (user.additionalRole == 1 || user.additionalRole == 7 ||user.additionalRole == 3 ||user.additionalRole == 9)
                                ) 
                                 && 
                                 (item.status == 2 || item.status == 10))
                                 //   ||

                              // ((
                              //   (user.loginType == 0 ||user.loginType == 2 ||user.loginType == 3)
                              //   ||
                              //   (
                              //   (user.additionalRole == 0 || user.additionalRole == 2 || user.additionalRole == 3)
                              //   )
                              //    && user.isManager == true
                              //   ) &&
                              //   item.status == 2)
                                ) ? (
                                  <Link
                                    to={"/employee-info/" + item.employeeId}
                                  >
                                    <Edit2
                                      onClick={() => {
                                        fetchEmployeeDetails(item.employeeId);
                                      }}
                                    />
                                  </Link>
                                ):<Edit2/>} */}
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
        {EmployeeSeparationExitList !== null &&
          EmployeeSeparationExitList !== undefined &&
          ModeOfSeparationData !== null &&
          ModeOfSeparationData !== undefined &&
          Object.keys(ModeOfSeparationData).length !== 0 && (
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
    )
  );
};

export default ExitListing;
