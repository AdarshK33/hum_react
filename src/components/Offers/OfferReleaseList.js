import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Modal, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import { E_signContext } from "../../context/E_signState";

const OfferReleaseList = () => {
  const {
    candidateView,
    candidateList,
    loader,
    total,
    viewCandidateId,
    noShowCandidate,
  } = useContext(OfferContext);
  const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
    useContext(DocsVerifyContext);
  const { getReference, notification } = useContext(E_signContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  const [infoModalShow, setInfoModelShow] = useState(false);
  const [noShowId, setNoShowId] = useState();
  useEffect(() => {
    candidateView("all", pageCount);
    console.log("user role", user);
  }, []);

  useEffect(() => {
    if (candidateList !== null && candidateList !== undefined) {
      setCurrentRecords(candidateList);
    }
  }, [candidateList, currentRecords]);

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
      candidateView(searchValue, pageNumber - 1);
    } else {
      candidateView("all", pageNumber - 1);
    }
    setCurrentRecords(candidateList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      candidateView(searchValue, pageCount);
    } else {
      candidateView("all", pageCount);
    }
  };

  const fetchCandidateDetails = (candidateId) => {
    viewCandidateId(candidateId);
    verificationDocsView(candidateId);
    personalInfo(candidateId);
    viewRole();
    CostCenter();
  };
  console.log(rolePermission, "rolePermission");
  const noShowHandler = () => {
    console.log("no show candidate", noShowId);
    setPageCount(currentPage - 1);
    setCurrentPage(currentPage);
    if (searchValue !== "") {
      noShowCandidate(noShowId, searchValue, pageCount);
    } else {
      noShowCandidate(noShowId, "all", pageCount);
    }
    setInfoModelShow(false);
  };
  const editNoShowHandler = (candidateId) => {
    console.log("no show candidate", candidateId);
    setPageCount(currentPage - 1);
    setCurrentPage(currentPage);
    if (searchValue !== "") {
      noShowCandidate(candidateId, searchValue, pageCount);
    } else {
      noShowCandidate(candidateId, "all", pageCount);
    }
    setInfoModelShow(false);
  };
  const dummyFun = (e) => {
    console.log("no show candidate", e.target.name);
  };
  const handleModalClose = () => {
    setInfoModelShow(false);
  };
  const handleModalOpen = (e) => {
    setNoShowId(e.target.name);
    setInfoModelShow(true);
  };
  const GoToLetterView = (refId) => {
    console.log(refId);
    getReference(refId);
  };
  return (
    <Fragment>
      <Modal show={infoModalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Do you want to make this employe as a no show
            </label>

            <div className="text-center mb-2">
              <Button onClick={noShowHandler}>Proceed</Button>

              <Button style={{ marginLeft: "2rem" }} onClick={handleModalClose}>
                Close
              </Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Breadcrumb title="Offers" parent="Offer Release" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar">
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
                <Link to="/manager-offer-release">
                  <Button
                    className="apply-button btn btn-light mr-2"
                    onClick={() => {
                      viewCandidateId(0);
                    }}
                  >
                    Initiate Offer
                  </Button>
                </Link>
              </div>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Candidate ID</th>
                      <th scope="col">Candidate Name</th>
                      <th scope="col">Application Date</th>
                      <th scope="col">Document Verification Status</th>
                      <th scope="col">Candidate Application Status</th>
                      <th scope="col">Edit</th>
                      <th scope="col">View</th>
                      {user !== null &&
                      user !== undefined &&
                      rolePermission !== "admin" ? (
                        <th scope="col">Action</th>
                      ) : (
                        ""
                      )}

                      <th scope="col">No Show</th>
                      {user !== null &&
                      user !== undefined &&
                      rolePermission === "admin" ? (
                        <th scope="col">No Show Edit</th>
                      ) : (
                        ""
                      )}
                      <th scope="col">View Signed Offer Letter</th>
                    </tr>
                  </thead>
                  {loader === true &&
                  candidateList !== null &&
                  candidateList !== undefined ? (
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
                  ) : candidateList !== undefined &&
                    candidateList !== null &&
                    candidateList.length > 0 ? (
                    candidateList.map((item, i) => {
                      return (
                        <tbody
                          style={
                            item.noShow === true
                              ? { backgroundColor: "rgb(130 127 127)" }
                              : {}
                          }
                          key={item.candidateId}
                        >
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.candidateId}</td>
                            <td>
                              {item.firstName} {item.lastName}
                            </td>
                            <td>{item.createdDate}</td>
                            <td>{item.overallStatusDesc}</td>
                            <td>{item.statusDesc}</td>

                            <td>
                              {item.noShow === true ? (
                                <Edit2 />
                              ) : item.status === 5 ||
                                item.status === 6 ||
                                item.status === 2 ||
                                item.status === 3 ||
                                item.status === 7 ? (
                                <Edit2 />
                              ) : (
                                <Link to="/edit-offer-release">
                                  <Edit2
                                    onClick={() => {
                                      viewCandidateId(item.candidateId);
                                    }}
                                  />
                                </Link>
                              )}
                            </td>

                            <td>
                              {item.noShow === false ? (
                                <Link to="/view-offer-release">
                                  <Eye
                                    onClick={() => {
                                      viewCandidateId(item.candidateId);
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Eye />
                              )}
                            </td>
                            {user !== null &&
                            user !== undefined &&
                            rolePermission !== "admin" ? (
                              <td>
                                {
                                // item.overallStatus === 1 &&
                                // item.status === 2 &&
                                // item.noShow === false 
                                true? (
                                  <Link to="/offer-relase-and-onboard">
                                    <AlertCircle
                                      onClick={() => {
                                        fetchCandidateDetails(item.candidateId);
                                      }}
                                    />
                                  </Link>
                                ) : item.noShow === false &&
                                  (item.overallStatus === 0 ||
                                    item.overallStatus === 2 ||
                                    item.status === 6) ? (
                                  <AlertCircle />
                                ) : (
                                  <AlertCircle />
                                  // <Link to="/offer-relase-and-onboard">
                                  //   <AlertCircle
                                  //     onClick={() => {
                                  //       fetchCandidateDetails(item.candidateId);
                                  //     }}
                                  //   />
                                  // </Link>
                                )}
                              </td>
                            ) : (
                              ""
                            )}
                            <td>
                              <div className="boxField input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  name={item.candidateId}
                                  checked={item.noShow}
                                  disabled={
                                    item.status === 0 ||
                                    item.status === 5 ||
                                    item.status === 6 ||
                                    item.overallStatus === 1
                                  }
                                  onChange={
                                    item.noShow ? dummyFun : handleModalOpen
                                  }
                                />
                              </div>
                            </td>

                            {user !== null &&
                            user !== undefined &&
                            rolePermission === "admin" ? (
                              <td
                                style={
                                  item.noShow === true
                                    ? { backgroundColor: "white" }
                                    : {}
                                }
                              >
                                {item.noShow === true ? (
                                  <Link>
                                    <Edit2
                                      onClick={() => {
                                        editNoShowHandler(item.candidateId);
                                      }}
                                    />
                                  </Link>
                                ) : (
                                  <Edit2 />
                                )}
                              </td>
                            ) : (
                              ""
                            )}
                            {item.refId !== null &&
                            item.refId !== undefined &&
                            item.refId !== "" ? (
                              <td>
                                <Link>
                                  <AlertCircle
                                    onClick={() => {
                                      GoToLetterView(item.refId);
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
      {candidateList !== null && candidateList !== undefined && (
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

export default OfferReleaseList;
