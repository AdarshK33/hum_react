import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";

const OfferReleaseList = () => {
  const {
    candidateView,
    candidateList,
    loader,
    total,
    viewCandidateId,
  } = useContext(OfferContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    candidateView("all", pageCount);
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

  return (
    <Fragment>
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
                  <Button className="apply-button btn btn-light mr-2">
                    Initate Offer
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
                      <th scope="col">Overall Status</th>
                      <th scope="col">Edit</th>
                      <th scope="col">View</th>
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
                            <td>{item.createdDate}</td>
                            <td>{item.verificationStatusDesc}</td>
                            <td>{item.statusDesc}</td>
                            
                              <td>
                              <Link to="/edit-offer-release">
                                <Edit2
                                  onClick={() => {
                                    viewCandidateId(item.candidateId);
                                  }}
                                />
                                 </Link>
                              </td>
                           
                            
                              <td>
                              <Link to="/view-offer-release">
                                <Eye
                                  onClick={() => {
                                    viewCandidateId(item.candidateId);
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
