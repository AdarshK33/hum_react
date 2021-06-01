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

import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
const PromotionList = () => {
  const { promotionListView,promotionEmployeeData,ViewPromotionEmployeeById,
     promotionList, loader, total } = useContext(PromotionContext);
  const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
    useContext(DocsVerifyContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  useEffect(() => {
    promotionListView("all", pageCount);
    console.log("user role", user);
  }, []);

  useEffect(() => {
    if (promotionList !== null && promotionList !== undefined) {
      setCurrentRecords(promotionList);
    }
  }, [promotionList, currentRecords]);
  useEffect(() => {
    ViewPromotionEmployeeById();
  }, [promotionEmployeeData]);


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
      promotionListView(searchValue, pageNumber - 1);
    } else {
      promotionListView("all", pageNumber - 1);
    }
    setCurrentRecords(promotionList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      promotionListView(searchValue, pageCount);
    } else {
      promotionListView("all", pageCount);
    }
  };

  const fetchCandidateDetails = (candidateId) => {
    // ViewPromotionEmployeeById(candidateId);
    // verificationDocsView(candidateId);
    // personalInfo(candidateId);
    viewRole();
    CostCenter();
  };
  return (
    <Fragment>
      <Breadcrumb title="Promotion Listing" parent="Promotion Listing" />
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
                <Link to="/promotion-initiate">
                  <Button className="apply-button btn btn-light mr-2">
                    Initate Promotion
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
                      <th scope="col">Employee Id </th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Position Promoted To</th>
                      <th scope="col">Promotion Date</th>
                      <th scope="col">Approved By CostCenter Manger</th>
                      <th scope="col">Date</th>
                      <th scope="col">Approved By HR/Admin</th>
                      <th scope="col">Date</th>  
                      <th scope="col">Status</th> 
                       <th scope="col">View</th>
                    
                    </tr>
                  </thead>
                  {loader === true &&
                  promotionList !== null &&
                  promotionList !== undefined ? (
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
                  ) : promotionList !== undefined &&
                    promotionList !== null &&
                    promotionList.length > 0 ? (
                    promotionList.map((item, i) => {
                      return (
                        <tbody key={item.promotionId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>
                              {item.empName} 
                            </td>
                            <td>{item.oldPosition}</td>
                            <td>{item.promotedPosition}</td>
                            <td>{item.promotionDate}</td>
                            <td>{item.approveByCostCentreManagerName}</td>
                            <td>{item.approveByCostCentreManagerDate}</td>   
                             <td>{item.approveByHr}</td>
                            <td>{item.hrDate}</td>
                            <td>{item.status}</td>
                            <td>
                              <Link to="/view-offer-release">
                                <Eye
                                  onClick={() => {
                                     ViewPromotionEmployeeById(item.employeeId);
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
      {promotionList !== null && promotionList !== undefined && (
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
