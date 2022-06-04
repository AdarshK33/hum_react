import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, EyeOff,Search, AlertCircle,Download } from "react-feather";
import ViewTheLetter from "./view"
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { DSICharterContext } from "../../context/DSICharterState";
import { AppContext } from "../../context/AppState";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { PermissionContext } from "../../context/PermissionState";

import moment from "moment";
const CharterList = () => {
  const { user } = useContext(AppContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { dsiCharterCreate ,dsiCharterData,SetLetterView,letterShow,
    viewCharter,total,loader,downloadFile,charterData} = useContext(DSICharterContext);
const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)  
const [showLetter, setShowLetter] = useState(false);
const [LetterName, setLetterName] = useState("");
const [Name, setName] = useState("");
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
  console.log("charterDatalist", employeeProfileData,charterData);

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
        // viewCharter(user.employeeId, pageNumber - 1);4/6/2022 paginationissue
        viewCharter("all", pageNumber - 1);

      }
    }
    setCurrentRecords(charterData);
  };

  /*-----------------Pagination------------------*/
const handleDate = (data)=>{
  let current = new Date(data)
let cDate = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
let hours = current.getHours();
let am_pm = (hours >= 12) ? "PM" : "AM";
let minutes = current.getMinutes()<10?("0"+current.getMinutes()):current.getMinutes()
if(hours >= 12){
    hours -=12;
}

let cTime = hours==0?("12" + ":" + minutes +"  "+ am_pm):(hours + ":" + minutes +"  "+ am_pm)
let dateTime = cDate + '   ' + cTime;
return dateTime
}

const showTheLetter = (e, name) => {
  console.log("check", e);
  setLetterName(e);
  setName(name);
  setShowLetter(true);
  SetLetterView(true);
  ImageView(e)
  // return <ViewTheLetter DocName={e} />;
};
console.log(imageViewData,"imageViewData charter")
const downloadTheLetter = (e,data) => {
  console.log("check", e);
  downloadFile(e,data);
};
  return (
    <Fragment>
            {letterShow? <ViewTheLetter DocName={LetterName} Name={Name} /> :""}
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
                      <th scope="col">Updated Date</th>
                      <th scope="col">Code of Conduct</th>
                      <th scope="col">Code of Conduct File</th>
                      <th scope="col">IT Charter</th>
                      <th scope="col">IT Charter File</th>
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
                            <td>{handleDate(item.auditField.updatedDate)}</td>
                            <td>{item.isCodeOfConduct?"Yes":"No"}</td>
                            <td>{item.isCodeOfConduct?<Row>
                            <Col
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Eye
                  display={item.isCodeOfConduct}
                  // display={imageViewData.data}
                    style={{
                      textAlign: "right",
                      fontSize: "xx-small",
                      color: "#4f90ff",
                    }}
                    onClick={(e) =>
                      showTheLetter(item.codeOfConductLetter,item)
                    }
                  />
                </Col>
                <Col>
                  <Download
                   display={item.isCodeOfConduct}
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                    onClick={(e) => downloadTheLetter(item.codeOfConductLetter,item)}
                  />
                </Col>
                              </Row>:<Row>
                            <Col
                  style={{
                    textAlign: "right",
                  }}
                >
                  <EyeOff
                    style={{
                      textAlign: "right",
                      fontSize: "xx-small",
                      color: "#4f90ff",
                    }}
                  />
                </Col>
                <Col>
                  <Download
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                  />
                </Col>
                              </Row>}</td>
                            <td>{item.isDsiItCharter?"Yes":"No"}</td>
                            <td>{item.isDsiItCharter?<Row>
                            <Col
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Eye
                  display={item.isDsiItCharter}
                  // display={imageViewData.data}

                    style={{
                      textAlign: "right",
                      fontSize: "xx-small",
                      color: "#4f90ff",
                    }}
                    onClick={(e) =>
                      showTheLetter(item.itCharterLetter, item)
                    }
                  />
                </Col>
                <Col>
                  <Download
                  display={item.isDsiItCharter}
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                    onClick={(e) => downloadTheLetter(item.itCharterLetter,item)}
                  />
                </Col>
                              </Row>:<Row>
                            <Col
                  style={{
                    textAlign: "right",
                  }}
                >
                  <EyeOff
                    style={{
                      textAlign: "right",
                      fontSize: "xx-small",
                      color: "#4f90ff",
                    }}
                  />
                </Col>
                <Col>
                  <Download
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                  />
                </Col>
                              </Row>}</td>
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
