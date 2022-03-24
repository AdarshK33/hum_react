import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { ProbationContext } from "../../context/ProbationState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { setGlobalCssModule } from "reactstrap/es/utils";
// import RelievingLetter from "../components/ManagerApproveEmployeeExit/RelivingLetter";
import ConfirmationLetter from "./ConfirmationLetter";
import ExtensionLetter from "./ExtensionLetter";
import calendarImage from "../../assets/images/calendar-image.png";

const ProbationView = () => {
  const [probationStatus, setProbationStatus] = useState("Confirmed");
  const [probationMonths, setProbationMonths] = useState("3 Months");
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [dateOfConfirmation, setDateOfConfirmation] = useState("");

  const [state, setState] = useState({
    empName: "",
    empId: "",
    empCostCenterName: "",
    empDateOfJoining: "",
    probationStatus: "",
    probationMonths: "",
    reason: "",
  });

  const { ViewProbationDataById, probationData, empId, loader } =
    useContext(ProbationContext);
  console.log("employeeId", empId);
  useEffect(() => {
    ViewProbationDataById(empId);
  }, [empId]);
  console.log("probationData->", probationData);
  useEffect(() => {
    if (
      probationData &&
      probationData &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      state.empName = probationData.empName;
      state.empId = probationData.empId;
      state.empCostCenterName = probationData.costCentre;
      state.empDateOfJoining = probationData.dateOfJoining;
      // state.probationStatus = probationData.status;
      // state.probationMonths = probationData.probationPeriod;

      state.reason =
        probationData.reason !== null && probationData.reason !== undefined
          ? probationData.reason
          : "";

      if (
        probationData.probationConfirmationDate !== null &&
        probationData.probationConfirmationDate !== undefined
      ) {
        setDateOfConfirmation(
          new Date(probationData.probationConfirmationDate)
        );
      } else {
        setDateOfConfirmation("");
      }

      if (probationData.status === 0 || probationData.status === 1) {
        setProbationStatus("Confirmed");
      } else if (probationData.status === 2) {
        setProbationStatus("Extended");
      }
      if (probationData.probationPeriod === 6) {
        setProbationMonths("6 Months");
      } else {
        setProbationMonths("3 Months");
      }
      console.log("Inside use effect");
    }
  }, [probationData, empId]);

  return (
    <Fragment>
      <Breadcrumb title="PROBATION VIEW" parent="PROBATION VIEW" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>PROBATION VIEW </b>
                </div>
                {loader === true ? (
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
                ) : (
                  <Form>
                    <Row
                      style={{
                        marginRight: "2rem",
                      }}
                    >
                      <Col>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Employee Id:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {" "}
                                {/* &nbsp;&nbsp; */}
                                {state.empId}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Employee Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp; */}
                                {state.empName}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp;  */}
                                {state.empCostCenterName}
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "2rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Date Of Joining:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp; */}
                                {state.empDateOfJoining}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Date Of Confirmation:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              probationData.probationConfirmationDate !== "" &&
                              probationData.probationConfirmationDate !==
                                null &&
                              probationData.probationConfirmationDate !==
                                undefined ? (
                                <label
                                  style={{ marginLeft: "-2rem" }}
                                  className="itemResult"
                                >
                                  {probationData.probationConfirmationDate}
                                </label>
                              ) : (
                                ""
                              )}
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Probation Status:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              probationData.status !== 0 &&
                              probationData.status !== null &&
                              probationData.status !== undefined ? (
                                <label
                                  style={{ marginLeft: "-2rem" }}
                                  className="itemResult"
                                >
                                  {/* &nbsp;&nbsp;{" "} */}
                                  {probationData.status == 1 ||
                                  probationData.status == 5
                                    ? "Confirm"
                                    : probationData.status == 2 ||
                                      probationData.status == 6
                                    ? "Extend"
                                    : probationData.status == 3
                                    ? "Reject"
                                    : ""}
                                </label>
                              ) : (
                                ""
                              )}
                            </div>
                          </Col>
                        </Row>
                        {probationData.status == 2 ? (
                          <div>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Should be extended by:</label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.probationExtensionPeriod !==
                                    0 &&
                                  probationData.probationExtensionPeriod !==
                                    null &&
                                  probationData.probationExtensionPeriod !==
                                    undefined ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp;{" "}
                                      {probationData.probationExtensionPeriod}{" "}
                                      Months
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                              <Col sm={1}></Col>
                              <Col sm={3}>
                                <div>
                                  <label>Date of probation extension:</label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.probationExtensionEndDate !==
                                    "" &&
                                  probationData.probationExtensionEndDate !==
                                    null &&
                                  probationData.probationExtensionEndDate !==
                                    undefined ? (
                                    <label
                                      style={{ marginLeft: "-2rem" }}
                                      className="itemResult"
                                    >
                                      {probationData.probationExtensionEndDate}
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Reason for extension:</label>
                                </div>
                              </Col>
                              <Col sm={8}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.reason !== "" &&
                                  probationData.reason !== null &&
                                  probationData.reason !== undefined ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {probationData.reason}
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : probationData.status === 3 ? (
                          <div>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Remarks for rejection:</label>
                                </div>
                              </Col>
                              <Col sm={8}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.remarks !== null &&
                                  probationData.remarks !== undefined &&
                                  probationData.remarks !== "" ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {probationData.remarks}
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProbationView;
