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
import MyPerformanceCard from "./MyPerformanceCard";
import MyLeavesCard from "./MyLeavesCard";
import Roster from "./Roster";
import HolidaysCard from "./HolidaysCard";
import MyDocumentsCard from "./MyDocumentsCard";
import ClusterCard from "./ClusterManager360Card";
import ApprovalsEmp360Card from "./ApprovalsEmp360Card";

// view-----
const EmployeeDashboard = () => {
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

  const { user } = useContext(AppContext);

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
  const { stateList, viewStates } = useContext(MasterFilesContext);

  useEffect(() => {
    locationDetails();
  }, []);
  useEffect(() => {
    viewStates();
  }, []);

  useEffect(() => {
    if (
      user &&
      user &&
      user !== null &&
      user !== undefined &&
      Object.keys(user).length !== 0 &&
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
  }, [locationDetailsList, user]);
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

  return (
    <Fragment>
      <Breadcrumb title="EMPLOYEE 360" parent="EMPLOYEE 360" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                {/* <div className="OnBoardHeading">
                  <b>EMplodewd</b>
                </div> */}
                <Form>
                  {user !== null &&
                  user !== undefined &&
                  Object.keys(user).length !== 0 ? (
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
                            View Profile{" "}
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
                          <b> {user.firstName + " " + user.lastName}</b>
                        </label>
                        <br />
                        <label>{user.position}</label>
                        <br />
                        <label style={{ marginRight: "1rem" }}>
                          {" "}
                          {user.employeeId}
                        </label>
                        <label>|</label>
                        <label style={{ marginLeft: "1rem" }}>
                          {user.contractType}
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
                              <label>{user.costCentre}</label>
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
                              <label>{user.managerName}</label>
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
                              <label>{user.joiningDate}</label>
                              <br />
                              <label>
                                <b>Login Type</b>
                              </label>
                              <br />
                              <label>
                                {/* Type {user.loginType} */}
                                {user.loginType == "1"
                                  ? "Admin"
                                  : user.loginType == "2"
                                  ? "General User"
                                  : user.loginType == "4"
                                  ? "Finance Partner"
                                  : user.loginType == "5"
                                  ? "IT Admin"
                                  : user.loginType == "7"
                                  ? "Cost Center Manager"
                                  : user.loginType == "9"
                                  ? "Super Cost Center Manager"
                                  : user.loginType == "10"
                                  ? "HR Strategist"
                                  : "NA"}
                              </label>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <label>
                                <b>Work Location</b>
                              </label>
                              <br />
                              <label>{state.empLocation}</label>
                              <br />
                              <label>
                                <b>Additional Role</b>
                              </label>
                              <br />
                              <label>
                                {user.additionalRole == "1"
                                  ? "Admin"
                                  : user.additionalRole == "2"
                                  ? "General User"
                                  : user.additionalRole == "4"
                                  ? "Finance Partner"
                                  : user.additionalRole == "5"
                                  ? "IT Admin"
                                  : user.additionalRole == "7"
                                  ? "Cost Center Manager"
                                  : user.additionalRole == "9"
                                  ? "Super Cost Center Manager"
                                  : user.additionalRole == "10"
                                  ? "HR Strategist"
                                  : "NA"}
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
                            Name: {user.emergencyContactName}
                          </label>
                          <br />
                          <div style={{ fontSize: "25px", color: "#006ebb" }}>
                            <i className="fa fa-phone"></i>
                            <label> {user.emergencyContactName} </label>
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
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%", height: "100%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>Roster</label>
                        </div>
                        <Roster />
                      </Card>
                    </Col>
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%", height: "100%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            My Leaves
                          </label>
                        </div>
                        <MyLeavesCard />
                      </Card>
                    </Col>
                    <Col sm={3} px={0}>
                      <Card
                        style={{ borderRadius: "3%", height: "100%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            My Performances
                          </label>
                        </div>
                        <MyPerformanceCard />
                      </Card>
                    </Col>
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%", height: "100%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            Notifications
                          </label>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "2rem",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <Col sm={6}>
                      <Card
                        style={{ borderRadius: "3%" }}
                        className="scrollbar big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            Approvals
                          </label>
                        </div>
                        <ApprovalsEmp360Card />
                      </Card>
                    </Col>
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            {" Holiday Calendar (2021)"}
                          </label>
                        </div>
                        <HolidaysCard />
                      </Card>
                    </Col>
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%", height: "55%" }}
                        className="big-card p-10 main-card"
                      >
                        <label className="smallCardHeading">My Documents</label>
                        <MyDocumentsCard />
                      </Card>

                      <Card
                        style={{ borderRadius: "3%", height: "30%" }}
                        className="big-card p-10 main-card"
                      >
                        <label className="smallCardHeading">
                          My Digital Signature
                        </label>
                      </Card>
                    </Col>
                  </Row>
                  {/* <Row
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <Col sm={6}>
                      <Card
                        style={{ borderRadius: "3%" }}
                        className="scrollbar big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>My Team</label>
                        </div>
                        <ClusterCard />
                        
                      </Card>
                    </Col>
                  </Row> */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeDashboard;
