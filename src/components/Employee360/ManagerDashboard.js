import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Card, Button, Table, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import man from "../../assets/images/dashboard/userImage.png";
import { AppContext } from "../../context/AppState";
import { Edit2, Eye, Search, Download } from "react-feather";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ScrollArea from "react-scrollbar";
import "./Employee360.css";
import { PermissionContext } from "../../context/PermissionState";
import { MasterFilesContext } from "../../context/MasterFilesState";
import TeamPerformanceCard from "./TeamPerformanceCard";
import TeamLeavesCard from "./TeamLeaveCard";
import Roster from "./Roster";
import HolidaysCard from "./HolidaysCard";
import MyDocumentsCard from "./MyDocumentsCard";
import ClusterCard from "./ClusterManager360Card";
import ApprovalsManager360Card from "./ApprovalsManager360Card";
import { useHistory } from "react-router-dom";
import { Employee360Context } from "../../context/Employee360State";

const ManagerDashboard = () => {
  const history = useHistory();
  const [showModal, setModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [intern, setIntern] = useState(false);
  const [showShowCauseNoticeModal, setShow] = useState(false);
  const [showShowCauseNoticeModalLink, setShowLink] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [employeeReasonShow, setEmployeeReasonShow] = useState(false);

  const { user,fetchemployeeData } = useContext(AppContext);

  const [stateId, setStateId] = useState("");
  const [state, setState] = useState({
    empId: "",
    empLocation: "",
    empState: "",
    empCountry: "",
  });
  const [country, setCountry] = useState("");
  const { locationDetails, locationDetailsList } =
    useContext(PermissionContext);
  const { rolePermission } = useContext(PermissionContext);
  const { stateList, viewStates } = useContext(MasterFilesContext);
  const { clusterLoader } = useContext(Employee360Context);

  useEffect(() => {
    locationDetails();
  }, []);
  useEffect(() => {
    viewStates();
  }, []);

  useEffect(() => {
    if (
      fetchemployeeData &&
      fetchemployeeData &&
      fetchemployeeData !== null &&
      fetchemployeeData !== undefined &&
      Object.keys(fetchemployeeData).length !== 0 &&
      locationDetailsList &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === user.locationId) {
          setState({
            ...state,
            ["empCity"]: item.cityName,
            ["empLocation"]: item.locationName,
          });
          setStateId(item.stateId);
          // state.empLocation = item.locationName;
        }
      });
    }
  }, [locationDetailsList, fetchemployeeData]);
  useEffect(() => {
    if (
      stateId !== "" &&
      stateList !== null &&
      stateList !== undefined &&
      Object.keys(stateList).length !== 0
    ) {
      console.log("stateist", stateList);
      stateList.map((item, i) => {
        if (item.stateId === stateId) {
          setState({
            ...state,
            ["empState"]: item.stateName,
          });
          setCountry(item.country);
          // state.empLocation = item.locationName;
        }
      });
    }
  }, [stateId, stateList]);
  const GoToDocuments = (e) => {
    history.push("./document-management");
  };
  const GoToCluster = (e) => {
    history.push("./manager_profile");
  };

  return (
    <Fragment>
      <Breadcrumb title="MANAGER 360" parent="MANAGER 360" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                {/* <div className="OnBoardHeading">
                  <b>EMplodewd</b>
                </div> */}
                <Form>
                  {fetchemployeeData !== null &&
                  fetchemployeeData !== undefined &&
                  Object.keys(fetchemployeeData).length !== 0 ? (
                    <Row
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                      }}
                    >
                      <Col
                        sm={1}
                        style={{
                          borderRight: "2px solid #006ebb",
                          height: "160px",
                          marginTop: "-1rem",
                        }}
                      >
                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                          <div className="media align-items-center">
                            <img
                              className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                              src={man}
                              alt="header-user"
                            />
                          </div>
                          <label
                            style={{
                              marginLeft: "-1rem",
                            }}
                          >
                            Profile Details{" "}
                          </label>
                        </div>
                      </Col>
                      {/* <div
                      style={{
                        borderLeft: "2px solid #006ebb",
                        height: "150px ",
                        marginTop: "-1rem",
                      }}
                    ></div> */}
                      <Col sm={3}>
                        <label>
                          <b> {fetchemployeeData.firstName + " " + fetchemployeeData.lastName}</b>
                        </label>
                        <br />
                        <label>{fetchemployeeData.position}</label>
                        <br />
                        <label style={{ marginRight: "1rem" }}>
                          {" "}
                          {fetchemployeeData.employeeId}
                        </label>
                        <label>|</label>
                        <label style={{ marginLeft: "1rem" }}>
                          {fetchemployeeData.contractType}
                        </label>
                        <br />

                        {user.active == "1" ? (
                          <div>
                            <span
                              style={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: "green",
                                borderRadius: "50%",
                                display: "inline-block",
                              }}
                            />{" "}
                            <label> Active </label>
                          </div>
                        ) : (
                          <div>
                            <span
                              style={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                display: "inline-block",
                              }}
                            />{" "}
                            <label>Inactive</label>
                          </div>
                        )}
                      </Col>
                      <Col sm={3}>
                        <Row>
                          <Col>
                            <div>
                              <label>
                                <b>Cost Center</b>
                              </label>
                              <br />
                              <label>{fetchemployeeData.costCentre}</label>
                              <br />
                              <label>
                                <b>City & State</b>
                              </label>
                              <br />
                              <label>{state.empCity}</label>
                              <label>{state.empState}</label>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <label>
                                <b>Country</b>
                              </label>
                              <br />
                              <label>{country}</label>
                              <br />
                              <label>
                                <b>Manager</b>
                              </label>
                              <br />
                              <label>{fetchemployeeData.managerName}</label>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={3}>
                        <Row>
                          <Col>
                            <div>
                              <label>
                                <b>Joining Date</b>
                              </label>
                              <br />
                              <label>{fetchemployeeData.joiningDate}</label>
                              <br />
                              <label>
                                <b>Work Location</b>
                              </label>
                              <br />
                              <label>{state.empLocation}</label>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <label>
                                <b>System Role</b>
                              </label>
                              <br />
                              <label>
                                {rolePermission == "costCenterManager"
                                  ? "Cost Center Manager"
                                  : rolePermission == "superCostCenterManager"
                                  ? "Super Cost Center Manager"
                                  : rolePermission == "admin"
                                  ? "Admin"
                                  : rolePermission == "manager"
                                  ? "Manager"
                                  : user.loginType == "2"
                                  ? "General User"
                                  : user.loginType == "4"
                                  ? "Finance Partner"
                                  : user.loginType == "5"
                                  ? "IT Admin"
                                  : user.loginType == "10"
                                  ? "HR Strategist"
                                  : " "}
                              </label>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Emergency Contact</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            Name: {fetchemployeeData.emergencyContactName}
                          </label>
                          <br />
                          <div style={{ color: "#006ebb" }}>
                            <i
                              style={{ fontSize: "25px" }}
                              className="fa fa-phone"
                            ></i>
                            <label> {fetchemployeeData.emergencyContactNo} </label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  <Row
                    style={{
                      borderTop: "2px solid #006ebb",
                      width: "98%",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  ></Row>

                  <Row
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                      height: "150%",
                    }}
                  >
                    {/* <Col sm={3}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "100%",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>Roster</label>
                        </div>
                        <Roster />
                      </Card>
                    </Col> */}
                    {fetchemployeeData.department==="Retail"|| rolePermission==="admin"?
                    <Fragment>
                    <Col sm={4}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "100%",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            Team Leaves
                          </label>
                        </div>
                        <TeamLeavesCard />
                      </Card>
                    </Col>
                    <Col sm={4} px={0}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "100%",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                          Team Performances
                          </label>
                        </div>
                        <TeamPerformanceCard />
                      </Card>
                    </Col>
                    </Fragment>
                    :""}
                    {/* <Col sm={3}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "100%",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                          Team Notifications
                          </label>
                        </div>
                      </Card>
                    </Col> */}
                    <Col sm={4}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height:fetchemployeeData.department==="Retail"|| rolePermission==="admin"?"100%":"92%",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="small-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            {` Holiday Calendar (${new Date().getFullYear()})`}
                          </label>
                        </div>
                        <HolidaysCard />
                      </Card>
                    </Col>
                  {/* </Row>
                  <Row
                    style={{
                      marginTop: "2rem",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                    }}
                  > */}
                
                    <Col style={{
                      marginTop:fetchemployeeData.department==="Retail"|| rolePermission==="admin"?"2rem":"0px",
                    }} sm={fetchemployeeData.department==="Retail"|| rolePermission==="admin"?6:6}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          boxShadow: "0px 0px 2px 0 black",
                          height: "500px",
                        }}
                        className="scrollbar big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>Team</label>
                        </div>
                        <ClusterCard />
                    
                        {/* {!clusterLoader  ? (
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
                        )} */}
                      </Card>
                    </Col>
                    {(fetchemployeeData.department === "Finance & Legal" ||fetchemployeeData.department === "Finance" || 
                fetchemployeeData.department === "IT")|| rolePermission === "admin"?
                    <Col style={{
                      marginTop:fetchemployeeData.department==="Retail"|| rolePermission==="admin"?"2rem":"0px",
                    }}sm={(fetchemployeeData.department === "Finance & Legal" || fetchemployeeData.department === "Finance" || 
                    fetchemployeeData.department === "IT")&&rolePermission !== "admin"?8 : rolePermission === "admin"?6:8}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          boxShadow: "0px 0px 2px 0 black",
                          height: "500px",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            Approvals
                          </label>
                        </div>
                        <ApprovalsManager360Card />
                      </Card>
                    </Col>
                    :""}
                  </Row>
                  {/* <Row
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                    }}
                  > */}
                    
                    {/* <Col sm={4}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "260px",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <label className="smallCardHeading">My Documents</label>

                        <MyDocumentsCard height={"200px"} />
                        <div style={{ float: "bottom", textAlign: "center" }}>
                          <label
                            className="itemResult"
                            onClick={(e) => GoToDocuments(e)}
                          >
                            View All
                          </label>
                        </div>
                      </Card>
                    </Col> */}
                    {/* <Col sm={6}>
                      <Card
                        style={{
                          borderRadius: "3%",
                          height: "260px",
                          boxShadow: "0px 0px 2px 0 black",
                        }}
                        className="big-card p-10 main-card"
                      >
                        <label className="smallCardHeading">
                          My Digital Signature
                        </label>
                      </Card>
                    </Col> */}
                  {/* </Row> */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManagerDashboard;
