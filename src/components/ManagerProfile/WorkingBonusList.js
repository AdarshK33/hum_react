import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { AppContext } from "../../context/AppState";
import { useParams, Link } from "react-router-dom";

const WorkingBonusList = () => {
  const { user } = useContext(AppContext);
  const {
    HolidayWorkingBonusView,
    holidayWorkingBonusList,
    EmpProfile,
    currentEmpId,
  } = useContext(EmployeeProfileContext);

  const params = useParams();
  const empId = params["employeeid"];
console.log("paramsid",empId);

  const [actionStatus, setActionStatus] = useState("9");
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [employeeExitStatus, setEmployeeExitStatus] = useState("");
  useEffect(() => {
    if (
      EmpProfile !== null &&
      EmpProfile !== undefined &&
      Object.keys(EmpProfile).length !== 0
    ) {
      if(currentEmpId !== 0 && currentEmpId !== null && currentEmpId !== undefined) {
      HolidayWorkingBonusView(currentEmpId);
      }else{
        HolidayWorkingBonusView(empId);
      }
    }
  }, []);
  console.log("holidayWorkingBonusList", holidayWorkingBonusList);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  // const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  // const handlePageChange = (pageNumber) => {
  //   setPageCount(pageNumber - 1);
  //   setCurrentPage(pageNumber);
  //   if (searchValue !== "") {
  //     EmployeeSeparationListView(searchValue, pageNumber - 1, actionStatus);
  //   } else {
  //     EmployeeSeparationListView("all", pageNumber - 1, actionStatus);
  //   }
  //   setCurrentRecords(holidayWorkingBonusList);
  // };

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
                      <th scope="col">Holiday Date</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Bonus</th>
                    </tr>
                  </thead>
                  {false ? (
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
                  ) : holidayWorkingBonusList !== undefined &&
                    holidayWorkingBonusList !== null &&
                    holidayWorkingBonusList.length > 0 ? (
                    holidayWorkingBonusList.map((item, i) => {
                      return (
                        <tbody key={item.employeeId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.holidayName}</td>
                            <td>{item.holidayDate}</td>
                            <td>{item.workingHours}</td>
                            <td>{item.holidayWorkingBonus}</td>
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
      {/* {holidayWorkingBonusList !== null &&
        holidayWorkingBonusList !== undefined &&
         (
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
        )} */}
    </Fragment>
  );
};

export default WorkingBonusList;
