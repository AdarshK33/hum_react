import React, { useState, useContext, useEffect,useRef } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import Select from "react-select";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";
import LoaderIcon from "../Loader/LoaderIcon";
import { AppContext } from "../../context/AppState";
import { Typeahead } from "react-bootstrap-typeahead"; //Auto search
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";

import { PermissionContext } from "../../context/PermissionState";


const ClusterCard = () => {
  const history = useHistory();
  const { rolePermission } = useContext(PermissionContext);

  const [tabIndex, setTabIndex] = useState(0);
  const {
    ClusterView,
    ClusterData,
    ClusterSearchByClusterName,
    ClusterEmpList,
    clusterLoader,
    ClusterSearchByEmployeeName,
    ClusterDirectTeam,
    clusterDirect,
    getEmployeeMyTeam,
    employeeMyTeam,
    getEmployeeAllTeam,
    employeeAllTeam,
    total,

  } = useContext(Employee360Context);
  
const { user,fetchemployeeData } = useContext(AppContext);
const employeeMyTeamRef = useRef(null);
const employeeAllTeamRef = useRef(null);
//console.log("eeeeeeeeee",employeeAllTeam)
  const [clusterList, setClusterList] = useState([]);
  const [cluster, setCluster] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [directTeamArr, setDirectTeamArr] = useState([]);//my team data
 
  const [searchMyTeamSelected, setSearchMyTeamSelected] = useState("");
  const [searchAllTeamSelected, setSearchAllTeamSelected] = useState("");
  const [backToEmpList, setBackToEmpList] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  // useEffect(() => {
  //   // my Team data
  //   console.log("cccc",clusterDirect)
  //   if (
  //     clusterDirect !== null &&
  //     clusterDirect !== undefined &&
  //     Object.keys(clusterDirect).length !== 0
  //   ) {
  //     let tempArr = [];
  //     {
  //       clusterDirect.map((items) => {
  //         {
  //           items.employees.map((item) => {
  //             tempArr.push(item);
  //           });
  //         }
  //       });
  //     }
  //     setDirectTeamArr(tempArr);
  //   } else {
  //     setDirectTeamArr([]);
  //   }
  // }, [clusterDirect]);

  useEffect(() => {
    ClusterView(); //ClusterData
    getEmployeeMyTeam('all'); //MY team  //employeeMyTeam
    getEmployeeAllTeam(pageCount,'all');// ALL team //employeeAllTeam
    // ClusterDirectTeam("all"); //MY team //clusterDirect
    // ClusterSearchByEmployeeName("all", "all"); // ALL team //ClusterEmpList
  }, []);
  // console.log("ClusterData", ClusterData);
  // console.log("ClusterEmpList", ClusterEmpList); 
  // console.log("clusterDirect", clusterDirect);
  // console.log("directTeamArr", directTeamArr);
   useEffect(() => {
    // my Team data
    if (
      employeeMyTeam !== null &&
      employeeMyTeam !== undefined &&
      Object.keys(employeeMyTeam).length !== 0
    ) {
      let tempArr = [];
      {
        employeeMyTeam.map((items,itemIndex) => {
          {
            tempArr.push(items);
           
          }
        });
      
      }
      setDirectTeamArr(tempArr);
    } else {
      setDirectTeamArr([]);
    }
  }, [employeeMyTeam]);

  useEffect(() => {
    if ( employeeAllTeam!== null && employeeAllTeam !== undefined) {
      setCurrentRecords(employeeAllTeam);
    }
   
  }, [currentRecords]);

useEffect(() => {
  if (searchAllTeamSelected.length== 0) {
    getEmployeeAllTeam(pageCount,'all');
  } 
}, [searchAllTeamSelected]);

useEffect(() => {
  if (searchMyTeamSelected.length== 0) {
    getEmployeeMyTeam('all');
  } 
}, [searchMyTeamSelected]);

  useEffect(() => {
    if (cluster !== "") {
      setSearchInput("");
      ClusterSearchByClusterName(cluster);
    }
  }, [cluster]);
  const GoToCluster = (e) => {
    history.push("./manager_profile");
  };
  const searchDataHandler = () => {
     {/* all Team */}
    const searchText = employeeAllTeamRef.current.getInput();
    if (searchAllTeamSelected.length > 0) {
      // ClusterSearchByEmployeeName("all", searchText.value,pageCount);
      getEmployeeAllTeam('0',searchText.value);
     } 
     else {
      // ClusterSearchByEmployeeName("all", "all",pageCount);
      getEmployeeAllTeam(pageCount,'all');
     }
  };

  const searchDataHandlerDirect = () => {
    // my team 
    const searchText = employeeMyTeamRef.current.getInput();
    if (searchMyTeamSelected.length>0) {
      getEmployeeMyTeam(searchText.value);
    } 
    else {
      getEmployeeMyTeam("all");
    }
  };

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber-1);
    setCurrentPage(pageNumber);
    if (searchAllTeamSelected.length> 0) {
      getEmployeeAllTeam(pageNumber-1,searchAllTeamSelected);
    } 
    else {
      getEmployeeAllTeam(pageNumber-1,"all");
    }
    setCurrentRecords(employeeAllTeam);
  };

  /*-----------------Pagination------------------*/
  return (
    <Fragment>
      <div className="tabsHeading">
        <div
          className={tabIndex === 0 ? "activeTab" : "disabledTab"}
          onClick={() => {setSearchMyTeamSelected([]);setTabIndex(0); }}
        >
        <label>My Team</label>
        </div>
        {fetchemployeeData.department == "Retail"||rolePermission === "admin" &&
        <div
          className={tabIndex === 1 ? "activeTab" : "disabledTab"}
          onClick={() => {setSearchAllTeamSelected([]);setTabIndex(1);}}
        >
        <label>All Team</label>
        </div>
        }
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        {(() => {
          switch (tabIndex) {
            case 0:
              return (
                <Fragment>
                  <Row
                    style={{
                      marginBottom: "1rem",
                      marginLeft: "-5px",
                      marginRight: "-10px",
                    }}
                  >
                    <Col sm={6}></Col>

                    <Col
                      md={6}
                      style={{
                        marginTop: "7px",
                        marginLeft: "-13px",
                      }}
                    >
                      {/* My Team */}
                      {/* <Form.Control
                        type="text"
                        style={{ border: "1px solid #006ebb" }}
                        value={searchInputDirect}
                        placeholder="Search Employee Name/ID"
                        onChange={(e) => setSearchInputDirect(e.target.value)}
                        className="form-control searchButton"
                          <Search
                        className="search-icon mr-1"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandlerDirect}
                      />
                      /> */}
                                      <Typeahead
                                        id="_myEmpSearchId"
                                        name='MyEmpName'
                                        filterBy={['firstName', 'lastName', 'employeeId']}
                                        minLength={2}
                                        // labelKey='firstName'
                                        type="text"
                                        ref={employeeMyTeamRef}
                                        options={employeeMyTeam}
                                        labelKey={option => `${option.firstName  ?? ''} ${option.lastName ?? ''}`}
                                        placeholder="Search Employee Name/ID"
                                        onChange={setSearchMyTeamSelected}
                                        selected={searchMyTeamSelected}
                                        style={{ border: "1px solid #006ebb" }}
                                      />
                    
                                {searchMyTeamSelected.length > 0  ? (

                                      <Search
                                      className="search-icon mr-1"
                                      style={{ color: "#313131" }}
                                      onClick={searchDataHandlerDirect}
                                      />
                                      ) : (
                                      ""
                                      )}
                    </Col>
                  </Row>
                  {clusterLoader ? (
                    <LoaderIcon />
                  ) : (
                    <>
                    <ScrollArea
                      speed={0.4}
                      // className="area"
                      // contentClassName="content"
                      smoothScrolling={true}
                      horizontal={false}
                      style={{ zIndex: "0", height: "310px" }}
                    >
                      {/* <div className="circle"></div> */}
                      {directTeamArr !== null &&
                      directTeamArr !== undefined &&
                      Object.keys(directTeamArr).length !== 0 ? (
                        <div>
                          {directTeamArr.map((item) => {
                            return (
                              <div className="clusterEmpployeeBox">
                                <div
                                  style={{ padding: "10px", fontSize: "17px" }}
                                >
                                  <label>
                                    <b>
                                      {item.firstName + " " + item.lastName}
                                    </b>
                                  </label>
                                  <Row style={{ marginTop: "-0.5rem" }}>
                                    <Col sm={5}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "15px",
                                        }}
                                      >
                                        <b>Employee Id:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.employeeId}
                                      </label>
                                    </Col>

                                    <Col sm={7}>
                                      <p style={{ fontSize: "initial" }}>
                                        <span
                                          style={{
                                            fontSize: "15px",
                                            marginRight: "15px",
                                          }}
                                        >
                                          <b>Email:</b>
                                        </span>
                                        {item.email}
                                      </p>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "0rem" }}>
                                    <Col sm={5}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "70px",
                                        }}
                                      >
                                        <b>Role:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.role}
                                      </label>
                                    </Col>

                                    <Col sm={7}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "15px",
                                        }}
                                      >
                                        <b>Ph No:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.phone}
                                      </label>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            );
                          })}
                          
                        </div>
                      ) : (
                        <h4
                          style={{
                            textAlign: "center",
                            width: "100%",
                            marginTop: "25%",
                          }}
                        >
                          No Records Found
                        </h4>
                      )}
                    </ScrollArea>
    {!clusterLoader  ? (
      <div style={{ float: "bottom", textAlign: "center" }}>
        <label
          className="itemResult"
          onClick={(e) => GoToCluster(e)}
        >
          View All
        </label>
      </div>
    ) : (
      ""
    )}
                    </>
                  )}{" "}
                </Fragment>
              );

            case 1:
              return (
                <Fragment>
                  <Row
                    style={{
                      marginBottom: "1rem",
                      marginLeft: "-5px",
                      marginRight: "-10px",
                    }}
                  >
                    <Col sm={6}>
                      {/* <Form.Control
                        as="select"
                        aria-label="Select Transfer Type"
                        style={{ border: "1px solid #4f90ff" }}
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                        className="probation_status_search"
                      >
                        <option value="" disabled selected hidden>
                          Select Cluster
                        </option>
                        {clusterList.map((item) => {
                          return <option key={item.value}>{item.label}</option>;
                        })}
                      </Form.Control> */}
                    </Col>

                    <Col
                      md={6}
                      style={{ marginTop: "7px", marginLeft: "-13px" }}
                    >
                       {/*All Team */}
                      {/* <Form.Control
                        type="text"
                        style={{ border: "1px solid #006ebb" }}
                        value={searchInput}
                        placeholder="Search Employee Name/ID"
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="form-control searchButton"
                      />
                      <Search
                        className="search-icon mr-1"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandler}
                      /> */}

                                         <Typeahead
                                        id="_AllEmpSearchId"
                                        name='EmpName'
                                        filterBy={['firstName', 'lastName', 'employeeId']}
                                        minLength={2}
                                        // labelKey='firstName'
                                        type="text"
                                        ref={employeeAllTeamRef}
                                        options={employeeAllTeam}
                                        labelKey={option => `${option.firstName  ?? ''} ${option.lastName ?? ''}`}
                                        placeholder="Search Employee Name/ID"
                                        onChange={setSearchAllTeamSelected}
                                        selected={searchAllTeamSelected}
                                        style={{ border: "1px solid #006ebb" }}
                                      />
                    
                                {searchAllTeamSelected.length > 0  ? (

                                      <Search
                                      className="search-icon mr-1"
                                      style={{ color: "#313131" }}
                                      onClick={searchDataHandler}
                                      />
                                      ) : (
                                      ""
                                      )}
                    </Col>
                  </Row>
                  {clusterLoader ? (
                    <LoaderIcon />
                  ) : (
                  
                    <ScrollArea
                      speed={0.4}
                      // className="area"
                      // contentClassName="content"
                      smoothScrolling={true}
                      horizontal={false}
                      style={{ zIndex: "0", height: "310px" }}
                    >
                      {/* <div className="circle"></div> */}
                      {
                      employeeAllTeam !== null &&
                      employeeAllTeam !== undefined &&
                      Object.keys(employeeAllTeam).length !== 0 ? (
                        <div>
                        
                          {employeeAllTeam.map((item) => {
                            return (
                              <div className="clusterEmpployeeBox">
                                <div
                                  style={{ padding: "10px", fontSize: "17px" }}
                                >
                                  <label>
                                    <b>
                                      {item.firstName + " " + item.lastName}
                                    </b>
                                  </label>
                                  <Row style={{ marginTop: "-0.5rem" }}>
                                    <Col sm={5}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "15px",
                                        }}
                                      >
                                        <b>Employee Id:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.employeeId}
                                      </label>
                                    </Col>

                                    <Col sm={7}>
                                      <p style={{ fontSize: "initial" }}>
                                        <span
                                          style={{
                                            fontSize: "15px",
                                            marginRight: "15px",
                                          }}
                                        >
                                          <b>Email:</b>
                                        </span>
                                        {item.email}
                                      </p>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "0rem" }}>
                                    <Col sm={5}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "70px",
                                        }}
                                      >
                                        <b>Role:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.role}
                                      </label>
                                    </Col>

                                    <Col sm={7}>
                                      <label
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "15px",
                                        }}
                                      >
                                        <b>Ph No:</b>
                                      </label>
                                      <label style={{ fontSize: "15px" }}>
                                        {item.phone}
                                      </label>
                                    </Col>


                                  </Row>
                                </div>
                              </div>
                            );
                          })}
                                                                <div>
                                                      {employeeAllTeam !== null  && employeeAllTeam !== undefined && searchAllTeamSelected.length>0  ?(
                                      
                                    ""
                                          ):(
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
                                            )
                                        }
                                        </div>
                        </div>
                        
                      ) : (
                        <h4
                          style={{
                            textAlign: "center",
                            width: "100%",
                            marginTop: "25%",
                          }}
                        >
                          No Records Found
                        </h4>
                      )}
                    </ScrollArea>
                    
                 
                  )}
               
                  {" "}
                
                </Fragment>
                
              );

            default:
              return <div>nothing</div>;
          }
        })()}
      </div>
   
      {/* <Row style={{ marginTop: "1rem", marginLeft: "1rem" }}> */}
    </Fragment>
  );
};
export default ClusterCard;
