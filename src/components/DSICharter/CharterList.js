import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { DSICharterContext } from "../../context/DSICharterState";
import { AppContext } from "../../context/AppState";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import moment from "moment";
const CharterList = () => {
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { dsiCharterCreate ,dsiCharterData,viewCharter,total,loader,charterData} = useContext(DSICharterContext);
const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)  

  useEffect(() => {
    if (user !== null && user !== undefined) {
        viewCharter("all",0)
        console.log("user role", user);
    }
  }, []);


  useEffect(() => {
    if (charterData !== null && charterData !== undefined) {
      setCurrentRecords(charterData);
    }
  }, [charterData, currentRecords]);
  console.log("charterData", charterData);

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
        viewCharter(searchValue, pageNumber - 1);
    } else {
      if (user !== null && user !== undefined) {
        viewCharter(user.employeeId, pageNumber - 1);
      }
    }
    setCurrentRecords(charterData);
  };

  /*-----------------Pagination------------------*/


  return (
    <Fragment>
      <Breadcrumb
        title="CHARTER LIST"
        parent="CHARTER LIST"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>CHARTER LIST </b>
              </div>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">SL. No</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Code of Conduct</th>
                      {/* <th scope="col">Ethics Charter</th> */}
                      <th scope="col">IT Charter</th>
                      {/* <th scope="col">Action</th> */}
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
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.employeeId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.codeOfConduct?"Yes":"No"}</td>
                            {/* <td>{item.ethicsCharter?"Yes":"No"}</td> */}
                            <td>{item.dsiItCharter?"Yes":"No"}</td>
                            {/* <td>
                              {true? (
                                <Link to="/letters/show-cause">
                                  <Edit2
                                    // onClick={() => {}}
                                  />
                                </Link>
                              ) : (
                                <Edit2 />
                              )}
                            </td> */}
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

export default CharterList;
