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
import MyPerformanceCard from "./MyPerformanceCard";
import MyLeavesCard from "./MyLeavesCard";
import Roster from "./Roster";
import HolidaysCard from "./HolidaysCard";
import MyDocumentsCard from "./MyDocumentsCard";

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
  const [tabIndex, setTabIndex] = useState(0);

  const [state, setState] = useState({
    empId: "",
  });

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
                            <label>{user.costCentre}</label>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <label>
                              <b>Country</b>
                            </label>
                            <br />
                            <label>{user.costCentre}</label>
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
                              <b>Work Location</b>
                            </label>
                            <br />
                            <label>{user.costCentre}</label>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <label>
                              <b>Login Type</b>
                            </label>
                            <br />
                            <label>{user.loginType}</label>
                            <br />
                            <label>
                              <b>Additional Role</b>
                            </label>
                            <br />
                            <label>{user.additionalRole}</label>
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
                    }}
                  >
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%" }}
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
                        style={{ borderRadius: "3%" }}
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
                        style={{ borderRadius: "3%" }}
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
                        style={{ borderRadius: "3%" }}
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
                          <label style={{ marginLeft: "1rem" }}>
                            Approvals
                          </label>
                        </div>
                        <div className="tabsHeading">
                          <div
                            className={
                              tabIndex === 0 ? "activeTab" : "disabledTab"
                            }
                            onClick={(e) => setTabIndex(0)}
                          >
                            <label>Leaves</label>
                          </div>
                          <div
                            className={
                              tabIndex === 1 ? "activeTab" : "disabledTab"
                            }
                            onClick={(e) => setTabIndex(1)}
                          >
                            <label>Promotions</label>
                          </div>
                          <div
                            className={
                              tabIndex === 2 ? "activeTab" : "disabledTab"
                            }
                            onClick={(e) => setTabIndex(2)}
                          >
                            <label>Transfers</label>
                          </div>
                          <div
                            className={
                              tabIndex === 3 ? "activeTab" : "disabledTab"
                            }
                            onClick={(e) => setTabIndex(3)}
                          >
                            <label>Others</label>
                          </div>
                        </div>
                        <div>
                          {(() => {
                            switch (tabIndex) {
                              case 0:
                                return <h1>Hiiii</h1>;

                              case 1:
                                return <h1>Bye</h1>;
                              case 2:
                                return <h1>Bye2</h1>;
                              case 3:
                                return <h1>Bye3</h1>;

                              default:
                                return <div>nothing</div>;
                            }
                          })()}
                        </div>
                        {/* <Tabs
                          selectedIndex={tabIndex}
                          onSelect={(index) => setTabIndex(index)}
                        >
                           <TabList>
                            <Tab
                              className={
                                tabIndex === 0 ? "activeTab" : "disabledTab"
                              }
                            >
                              Leaves
                            </Tab>
                            <Tab
                              className={
                                tabIndex === 1 ? "activeTab" : "disabledTab"
                              }
                            >
                              Promotions
                            </Tab>
                            <Tab
                              className={
                                tabIndex === 2 ? "activeTab" : "disabledTab"
                              }
                            >
                              Transfers
                            </Tab>
                            <Tab
                              className={
                                tabIndex === 3 ? "activeTab" : "disabledTab"
                              }
                            >
                              Others
                            </Tab>
                          </TabList>

                          <TabPanel>
                            <h1>Leaves {tabIndex}</h1>
                          </TabPanel>
                          <TabPanel>
                            <h1>Promotions {tabIndex}</h1>
                          </TabPanel>
                          <TabPanel>
                            <h1>Transfers {tabIndex}</h1>
                          </TabPanel>
                          <TabPanel>
                            <h1>Others {tabIndex}</h1>
                          </TabPanel>
                        </Tabs> */}
                      </Card>
                    </Col>
                    <Col sm={3}>
                      <Card
                        style={{ borderRadius: "3%" }}
                        className="big-card p-10 main-card"
                      >
                        <div className="CardHeading">
                          <label style={{ marginLeft: "1rem" }}>
                            Holiday Calendar
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
