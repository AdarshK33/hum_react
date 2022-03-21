import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import Pagination from "react-js-pagination";
import "./ManageCandidate.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

const CandidateList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [docStatus, setDocStatus] = useState("");
  const { candidateView, candidateList, loader, total, viewCandidateId } =
    useContext(OfferContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);

  const {
    fetchNominationDetails,
    nominationDetails,
    addressInfo,
    bankDetailsData,
    contactInformation,
    personalInfo,
    fetchPfDetails,
    verificationDocsView,
    downloadDocument,
    candidateVerificationView,
    candidateVerificationList
  } = useContext(DocsVerifyContext);
  useEffect(() => {
    candidateVerificationView("all", pageCount);
  }, []);
  useEffect(() => {
    if (candidateVerificationList !== null && candidateVerificationList !== undefined) {
      setCurrentRecords(candidateVerificationList);
    }
  }, [candidateVerificationList, currentRecords]);

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
      candidateVerificationView(searchValue, pageNumber - 1);
    }
    if (docStatus === "Pending") {
      candidateVerificationView("all", pageNumber - 1, 0);
    } else if (docStatus === "In Progress") {
      candidateVerificationView("all", pageNumber - 1, 3);
    } else if (docStatus === "Approved") {
      candidateVerificationView("all", pageNumber - 1, 1);
    } else if (docStatus === "Disapproved") {
      candidateVerificationView("all", pageNumber - 1, 2);
    } else {
      candidateVerificationView("all", pageNumber - 1);
    }
    setCurrentRecords(candidateVerificationList);
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setDocStatus("");
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      candidateVerificationView(searchValue, pageCount);
    } else {
      candidateVerificationView("all", pageCount);
    }
  };
  const handleView = (photo) => {
    window.open(photo);
  };
  const FetchCandidateData = (candidateId) => {
    fetchNominationDetails(candidateId);
    fetchPfDetails(candidateId);
    verificationDocsView(candidateId);
    bankDetailsData(candidateId);
    contactInformation(candidateId);
    addressInfo(candidateId);
    personalInfo(candidateId);
  };

  const statusHandler = (e) => {
    setDocStatus(e.target.value);
    setPageCount(0);
    setCurrentPage(1);
    setSearchValue("");
    if (e.target.value === "Pending") {
      candidateVerificationView("all", 0, 0);
    } else if (e.target.value === "In Progress") {
      candidateVerificationView("all", 0, 3);
    } else if (e.target.value === "Approved") {
      candidateVerificationView("all", 0, 1);
    } else if (e.target.value === "Disapproved") {
      candidateVerificationView("all", 0, 2);
    } else {
      candidateVerificationView("all", 0);
    }
  };

  return (
    <Fragment>
      <Breadcrumb
        title="Candidate Verification"
        parent="Candidate Verification"
      />
      <div className="container-fluid">
        <div className="row headingWrapper px-4 mx-auto">
          <div className="col-md-2 ">
            <Form>
              <div className="promotion_status_search">
                {/* className="faq-form mr-2""job-filter" */}
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="probationStatus"
                    value={docStatus}
                    onChange={statusHandler}
                    style={
                      false ? { borderColor: "red" } : { borderRadius: "20px" }
                    }
                  >
                    <option value="" disabled selected hidden>
                      Search status
                    </option>
                    <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                    <option value="Disapproved">Disapproved</option>
                  </Form.Control>
                </Form.Group>
                {/* <br></br> */}
              </div>
            </Form>
          </div>
          <div className="col-md-8">
            <b className="text-uppercase text-center">
              Candidate Verification listing
            </b>
          </div>
          <div className="col-md-2 mt-2">
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
        </div>
        <div className="table-responsive">
          <Table id="table-to-xls" className="table table-hover">
            <thead
              className="thead-light"
              style={{ backgroundColor: "#2f3c4e" }}
            >
              {" "}
              <tr>
                <th scope="col">S. No</th>
                <th scope="col">Candidate ID</th>
                <th scope="col">Candidate Name</th>
                {/* <th scope="col">Candidate Profile</th> */}
                <th scope="col">Application Date</th>
                <th scope="col">Manager Document Verification Status</th>
                <th scope="col">Verification Team Document Status</th>
                <th scope="col">UAN Verification Status</th>
                <th scope="col">Final Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {loader === true &&
            candidateVerificationList !== null &&
            candidateVerificationList !== undefined ? (
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
            ) : candidateVerificationList !== undefined &&
            candidateVerificationList !== null &&
            candidateVerificationList.length > 0 ? (
              candidateVerificationList.map((item, i) => {
                return (
                  <tbody key={item.candidateId}>
                    <tr>
                      <td>{i + 1 + indexOfFirstRecord}</td>
                      <td>{item.candidateId}</td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      {/* <td>
                        <a
                          onClick={() => downloadDocument(item.photo)}
                          style={{ cursor: "pointer" }}
                        >
                          view
                        </a>
                      </td> */}
                      <td>{item.createdDate}</td>
                      <td>{item.verificationStatusDesc}</td>
                      <td>
                        {item.adminVerificationStatus === 0
                          ? "Pending"
                          : item.adminVerificationStatus === 3
                          ? "In Progress"
                          : item.adminVerificationStatus === 1
                          ? "Approved"
                          : "Disapproved"}
                      </td>
                      <td>{item.uanStatusDesc}</td>
                      <td>{item.overallStatusDesc}</td>

                      <td>
                        {user !== null &&
                        user !== undefined &&
                        rolePermission === "admin" &&
                        item.contractType !== "Internship" &&
                        (item.adminVerificationStatus === 0 ||
                          item.adminVerificationStatus === 3 ||
                          item.adminVerificationStatus === 1) &&
                        item.uanStatus === 0 ? (
                          <Link to={"/verification/" + item.candidateId}>
                            <AlertCircle
                              onClick={() => {
                                FetchCandidateData(item.candidateId);
                              }}
                            />
                          </Link>
                        ) : user !== null &&
                          user !== undefined &&
                          rolePermission === "admin" &&
                          item.contractType === "Internship" &&
                          (item.adminVerificationStatus === 0 ||
                            item.adminVerificationStatus === 3) &&
                          item.uanStatus === 4 ? (
                          <Link to={"/verification/" + item.candidateId}>
                            <AlertCircle
                              onClick={() => {
                                FetchCandidateData(item.candidateId);
                              }}
                            />
                          </Link>
                        ) : user !== null &&
                          user !== undefined &&
                          rolePermission !== "admin" &&
                          (item.verificationStatus === 0 ||
                            item.verificationStatus === 3) ? (
                          <Link to={"/verification/" + item.candidateId}>
                            <AlertCircle
                              onClick={() => {
                                FetchCandidateData(item.candidateId);
                              }}
                            />
                          </Link>
                        ) :user !== null &&
                        user !== undefined &&
                        rolePermission === "admin" &&
                        item.contractType !== "Internship" &&
                        (item.adminVerificationStatus === 0 ||
                          item.adminVerificationStatus === 3) ? (
                          <Link to={"/verification/" + item.candidateId}>
                            <AlertCircle
                              onClick={() => {
                                FetchCandidateData(item.candidateId);
                              }}
                            />
                          </Link>): (
                          //   <Link to={"/verification/" + item.candidateId}>
                          //   <AlertCircle
                          //     onClick={() => {
                          //       FetchCandidateData(item.candidateId);
                          //     }}
                          //   />
                          // </Link>
                          <AlertCircle />
                        )}
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
      {candidateVerificationList !== null && candidateVerificationList !== undefined && (
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
export default CandidateList;
