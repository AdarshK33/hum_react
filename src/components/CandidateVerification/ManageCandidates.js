import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import Pagination from "react-js-pagination";
import "./ManageCandidate.css";
import { DocsVerifyContext } from "../../context/DocverificationState";

const CandidateList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const {
    candidateView,
    candidateList,
    loader,
    total,
    viewCandidateId,
  } = useContext(OfferContext);

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
  } = useContext(DocsVerifyContext);
  useEffect(() => {
    candidateView("all", pageCount);
  }, []);
  useEffect(() => {
    if (candidateList !== null && candidateList !== undefined) {
      setCurrentRecords(candidateList);
    }
  }, [candidateList, currentRecords]);

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
  return (
    <Fragment>
      <Breadcrumb
        title="Candidate Verification"
        parent="Candidate Verification"
      />
      <div className="container-fluid">
        <div className="row headingWrapper px-4 mx-auto">
          <div className="col-md-10">
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
                <th scope="col">Admin Document Verification Status</th>
                <th scope="col">UAN Verification Status</th>
                <th scope="col">Overall Status</th>
                <th scope="col">Action</th>
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
                          ? "Pending Verification"
                          : "Approved"}
                      </td>
                      <td>{item.uanStatusDesc}</td>
                      <td>{item.statusDesc}</td>

                      <td>
                        {/* <Link to={"/verification/" + item.candidateId}> */}
                               <Link to={"/admin_no_due_clearance"}>
                              {/* <Link to={"/admin-finance-clearance"}> */}
                          {/* <Link to={"/no_due_clearance"}> */}
                          {/* <Link to={"/finance-clearance"}> */}
                          <AlertCircle
                            onClick={() => {
                              FetchCandidateData(item.candidateId);
                            }}
                          />
                        </Link>
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
export default CandidateList;
