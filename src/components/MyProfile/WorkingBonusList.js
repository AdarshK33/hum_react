import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { SeparationContext } from "../../context/SepearationState";
// import { RoleManagementContext } from "../../context/RoleManagementState";
// import { AdminContext } from "../../context/AdminState";

const WorkingBonusList = () => {
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationView,
    ModeOfSeparationData,
    loader,
    total,
    changeEmployeeId,
    makeEmployeeDataNull,
  } = useContext(EmployeeSeparationContext);
  const { MakeCostCenterDataNull } = useContext(SeparationContext);
  const { makeSearchEmp1DataNull } = useContext(OfferContext);
  const [actionStatus, setActionStatus] = useState("9");
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [employeeExitStatus, setEmployeeExitStatus] = useState("");

  //   useEffect(() => {
  //     EmployeeSeparationListView("all", pageCount, actionStatus);
  //   }, []);

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
      EmployeeSeparationListView(searchValue, pageNumber - 1, actionStatus);
    } else {
      EmployeeSeparationListView("all", pageNumber - 1, actionStatus);
    }
    setCurrentRecords(EmployeeSeparationList);
  };

  /*-----------------Pagination------------------*/

  return (
    <Fragment>
      <Container>
        <Row style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
          <Col>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Holiday Name</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Bonus</th>
                    </tr>
                  </thead>
                  {loader === true &&
                  EmployeeSeparationList !== null &&
                  EmployeeSeparationList !== undefined &&
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
                  ) : EmployeeSeparationList !== undefined &&
                    EmployeeSeparationList !== null &&
                    EmployeeSeparationList.length > 0 &&
                    ModeOfSeparationData !== null &&
                    ModeOfSeparationData !== undefined ? (
                    EmployeeSeparationList.map((item, i) => {
                      return (
                        <tbody key={item.candidateId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.position}</td>
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
      {EmployeeSeparationList !== null &&
        EmployeeSeparationList !== undefined &&
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
  );
};

export default WorkingBonusList;
