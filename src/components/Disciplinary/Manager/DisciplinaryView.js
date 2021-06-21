import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../../common/breadcrumb";
import "react-datepicker/dist/react-datepicker.css";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import ShowCauseNotice from "../Manager/ShowCauseNoticeLetter";

const DisciplinaryView = () => {
  const [showCauseReason, setShowCauseReason] = useState("");
  const [EmpName, setEmpName] = useState();
  const [showShowCauseNoticeModal, setShow] = useState(false);

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empAddress: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    reasonForCause: "",
    reason: "",
    remarks: "",
    empRemarks: "",
    warningReason: "",
    pip: "",
    warningComment: "",
  });
  const { disciplinaryEmployeeSearch, disciplinarySearchData } =
    useContext(DisciplinaryContext);

  useEffect(() => {
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0
    ) {
      state.empId = disciplinarySearchData.employeeId;
      setEmpName(
        disciplinarySearchData.employeeName +
          " " +
          disciplinarySearchData.employeeId
      );

      state.empContractType = disciplinarySearchData.contractType;
      state.empCostCenterName = disciplinarySearchData.employeeCostCentre;
      state.empAddress = disciplinarySearchData.employeeAddress;
      state.mngrId = disciplinarySearchData.managerId;
      state.mngrName = disciplinarySearchData.managerName;
      state.mngrPosition = disciplinarySearchData.managerDesignation;
      state.mngrCostCenterName = disciplinarySearchData.managerCostCentre;

      if (
        disciplinarySearchData.disciplinaryAction !== null &&
        disciplinarySearchData.disciplinaryAction !== undefined &&
        disciplinarySearchData.disciplinaryAction !== ""
      ) {
        state.empRemark =
          disciplinarySearchData.disciplinaryAction.employeeComment;
        state.reasons =
          disciplinarySearchData.disciplinaryAction.managerComment;
        state.reasonForCause =
          disciplinarySearchData.disciplinaryAction.reasonDetails;
        setShowCauseReason(disciplinarySearchData.disciplinaryAction.reason);
      }
      if (
        disciplinarySearchData.disciplinaryWarning !== null &&
        disciplinarySearchData.disciplinaryWarning !== undefined &&
        disciplinarySearchData.disciplinaryWarning !== ""
      ) {
        state.warningReason = disciplinarySearchData.disciplinaryWarning.reason;
        state.warningComment =
          disciplinarySearchData.disciplinaryWarning.managerComment;
        state.pip =
          disciplinarySearchData.disciplinaryWarning.improvementPeriod;
      }
    }
  }, [disciplinarySearchData]);
  console.log("disciplinarySearchData", disciplinarySearchData);
  const LetterShow = () => {
    console.log(";;;;;");
    setShow(true);
  };
  const handleShowCauseLetterClose = () => setShow(false);

  return (
    <Fragment>
      <Modal
        show={showShowCauseNoticeModal}
        onHide={handleShowCauseLetterClose}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" ? (
            <ShowCauseNotice />
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
      <Breadcrumb
        title="DISCIPLINARY ACTION VIEW"
        parent="DISCIPLINARY ACTION VIEW"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DISCIPLINARY ACTION VIEW</b>
                </div>
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
                        <Col sm={4}>
                          <div>
                            <label>
                              Emp Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {EmpName}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={4}>
                          <div>
                            <label>
                              Contract Type:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empContractType}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empCostCenterName}
                              </label>
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
                        <Col sm={8}>
                          <div>
                            <label>
                              Address:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empAddress}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Manager Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrName}
                                &nbsp; {state.mngrId}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Designation:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={6}>
                          <div>
                            <label>
                              Issue Show Cause Notice For:
                              <label className="itemResult">
                                &nbsp;&nbsp; {showCauseReason}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label>
                              Reason For Show Cause Notice:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.reasonForCause}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>State Reason for Show Cause Notice:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.reasons}
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>Preview Show Cause Notice:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <a onClick={LetterShow}>
                              {" "}
                              <u className="itemResult">ShowCauseNotice.pdf</u>
                            </a>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>Add Remarks:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empRemarks}
                            </label>
                          </div>
                        </Col>
                      </Row>
                      {disciplinarySearchData &&
                      disciplinarySearchData &&
                      disciplinarySearchData !== null &&
                      disciplinarySearchData !== undefined &&
                      Object.keys(disciplinarySearchData).length !== 0 &&
                      disciplinarySearchData.disciplinaryWarning !== null &&
                      disciplinarySearchData.disciplinaryWarning !==
                        undefined &&
                      disciplinarySearchData.disciplinaryWarning !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={3}>
                            <label>Issue Warning Letter </label>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  disabled={true}
                                  checked={
                                    disciplinarySearchData &&
                                    disciplinarySearchData &&
                                    disciplinarySearchData !== null &&
                                    disciplinarySearchData !== undefined &&
                                    Object.keys(disciplinarySearchData)
                                      .length !== 0 &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      null &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      undefined &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      ""
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  disabled={true}
                                  checked={
                                    (disciplinarySearchData &&
                                      disciplinarySearchData &&
                                      disciplinarySearchData !== null &&
                                      disciplinarySearchData !== undefined &&
                                      Object.keys(disciplinarySearchData)
                                        .length !== 0 &&
                                      disciplinarySearchData.disciplinaryWarning ===
                                        null) ||
                                    disciplinarySearchData.disciplinaryWarning ===
                                      undefined ||
                                    disciplinarySearchData.disciplinaryWarning ===
                                      ""
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}

                      {disciplinarySearchData &&
                      disciplinarySearchData &&
                      disciplinarySearchData !== null &&
                      disciplinarySearchData !== undefined &&
                      Object.keys(disciplinarySearchData).length !== 0 &&
                      disciplinarySearchData.disciplinaryWarning !== null &&
                      disciplinarySearchData.disciplinaryWarning !==
                        undefined &&
                      disciplinarySearchData.disciplinaryWarning !== "" ? (
                        <div>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={6}>
                              <div>
                                <label>
                                  Reason for warning:
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.warningReason}
                                  </label>
                                </label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <label>
                                  Performance improvement period:
                                  <label className="itemResult">
                                    &nbsp;&nbsp;{" "}
                                    {state.pip !== 0
                                      ? state.pip === 1
                                        ? state.pip + " Month"
                                        : state.pip + " Months"
                                      : ""}
                                  </label>
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={2}>
                              <div>
                                <label>State detailed reason:</label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.warningComment}
                                </label>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DisciplinaryView;
