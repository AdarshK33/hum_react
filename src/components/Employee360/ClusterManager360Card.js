import React, { useState, useContext, useEffect } from "react";
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

const ClusterCard = () => {
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
    employeeAllTeam

  } = useContext(Employee360Context);
  
const { user } = useContext(AppContext);
// user.employeeId
// console.log("eeeeeeeeee",employeeAllTeam)

  const [clusterList, setClusterList] = useState([]);
  const [cluster, setCluster] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [directTeamArr, setDirectTeamArr] = useState([]);
  const [searchInputDirect, setSearchInputDirect] = useState("");
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
    getEmployeeMyTeam(user.employeeId); //MY team  //employeeMyTeam
    // ClusterDirectTeam("all"); //MY team //clusterDirect
    getEmployeeAllTeam(user.employeeId);// ALL team //employeeAllTeam
    ClusterSearchByEmployeeName("all", "all"); // ALL team //ClusterEmpList
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
    if (cluster !== "") {
      setSearchInput("");
      ClusterSearchByClusterName(cluster);
    }
  }, [cluster]);

  const searchDataHandler = () => {
     {/* all Team */}
    if (searchInput !== "") {
      ClusterSearchByEmployeeName("all", searchInput);
    } else {
      ClusterSearchByEmployeeName("all", "all");
    }
  };
  const searchDataHandlerDirect = () => {
    // my team
    if (searchInputDirect !== "") {
      ClusterDirectTeam(searchInputDirect);
    } else {
      ClusterDirectTeam("all");
    }
  };
  return (
    <Fragment>
      <div className="tabsHeading">
        <div
          className={tabIndex === 0 ? "activeTab" : "disabledTab"}
          onClick={(e) => setTabIndex(0)}
        >
          <label>My Team</label>
        </div>
        <div
          className={tabIndex === 1 ? "activeTab" : "disabledTab"}
          onClick={(e) => setTabIndex(1)}
        >
          <label>All Team</label>
        </div>
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
                      <Form.Control
                        type="text"
                        style={{ border: "1px solid #006ebb" }}
                        value={searchInputDirect}
                        placeholder="Search Employee Name/ID"
                        onChange={(e) => setSearchInputDirect(e.target.value)}
                        className="form-control searchButton"
                      />
                      <Search
                        className="search-icon mr-1"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandlerDirect}
                      />
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
                                        {item.personalEmail}
                                      </p>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "-1rem" }}>
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
                      <Form.Control
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
                      />
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
                      {employeeAllTeam !== null &&
                    employeeAllTeam !== undefined &&
                      Object.keys(employeeAllTeam).length !== 0 &&
                      employeeAllTeam !== null &&
                      employeeAllTeam !== undefined &&
                      Object.keys(employeeAllTeam).length !== 0 &&
                      employeeAllTeam !== null &&
                    
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
                                        {item.personalEmail}
                                      </p>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "-1rem" }}>
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
                  )}{" "}
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
