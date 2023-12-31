import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../../common/breadcrumb";
import "react-datepicker/dist/react-datepicker.css";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import ShowCauseNotice from "../Manager/ShowCauseNoticeLetter";
import NonPerformanceLetter from "../Manager/NonPerformanceLetter";
import ReasonByEmployee from "../Manager/ReasonByEmployee";
import WarningLetter from "../WarningManager/WarningLetter";
import { PermissionContext } from "../../../context/PermissionState";
import NonPerformanceWarningLetter from "../WarningManager/NonPerformanceWarningLetter";
const DisciplinaryView = () => {
  const [showCauseReason, setShowCauseReason] = useState("");
  const [EmpName, setEmpName] = useState();
  const [showShowCauseNoticeModal, setShow] = useState(false);
  const [employeeReasonShow, setEmployeeReasonShow] = useState(false);

  const [showShowCauseNoticeModalLink1, setShowLink1] = useState(false);

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empAddress: "",
    employeePosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    reasonForCause: "",
    reason: "",
    remarks: "",
    empRemark: "",
    warningReason: "",
    pip: "",
    warningComment: "",
    employeeCommentDW: "",
    pipEndDate: "",
    warningIssuedDateDW: "",
    showCauseLetter:"",
    employeeResponseLetter:"",
    warningLetter:""
  });
  const {
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    lettterview,
    setViewLetter,
    setModal,
    modalView,
    setShowValue,
    lettterviewShow
  } = useContext(DisciplinaryContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

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
      state.employeePosition = disciplinarySearchData.employeePosition;
      state.mngrId = disciplinarySearchData.managerId;
      state.mngrName = disciplinarySearchData.managerName;
      state.mngrPosition = disciplinarySearchData.managerPosition;
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
          state.showCauseLetter=disciplinarySearchData.disciplinaryAction.showCauseLetter
          state.employeeResponseLetter = disciplinarySearchData.disciplinaryAction.employeeResonseLetter
          setShowCauseReason(disciplinarySearchData.disciplinaryAction.reason);
      }
      if (
        disciplinarySearchData.disciplinaryWarning !== null &&
        disciplinarySearchData.disciplinaryWarning !== undefined &&
        disciplinarySearchData.disciplinaryWarning !== ""
      ) {
        state.employeeCommentDW =
          disciplinarySearchData.disciplinaryWarning.employeeComment;
        state.warningReason = disciplinarySearchData.disciplinaryWarning.reason;
        state.warningComment =
          disciplinarySearchData.disciplinaryWarning.managerComment;
        state.pip =
          disciplinarySearchData.disciplinaryWarning.improvementPeriod;
        state.pipEndDate =
          disciplinarySearchData.disciplinaryWarning.pipEndDate;
        state.warningIssuedDateDW =
          disciplinarySearchData.disciplinaryWarning.warningIssuedDate;
          state.warningLetter = 
          disciplinarySearchData.disciplinaryWarning.warningLetter;
      }
    }
  }, [disciplinarySearchData]);
  console.log("disciplinarySearchData", disciplinarySearchData);
  const LetterShow = () => {
    console.log(";;;;;");
    // setShowValue(true);21/06/2022
      setShow(true)
     ImageView(state.showCauseLetter,state.empId)
  };

  const handleShowCauseLetterClose = () => setShow(false);
  const LetterShow1 = () => {
    console.log(";;;;;");
    // setViewLetter(true);
    // setShowLink1(true);
    setShow(true)
     ImageView(state.warningLetter,state.empId)
  };
  const handleShowCauseLetterCloseLink = () => {
    setShow(false);
    setShowLink1(false);
  };

  const employeeReason = () => {
    console.log(";;;;;");
    // setModal(true);
    // setEmployeeReasonShow(true);
    setShow(true)
     ImageView(state.employeeResponseLetter,state.empId)
  };

  const handleEmployeeReason = () => setEmployeeReasonShow(false);
  const handleDocClose = () => {
    setShow(false);
  };
  return (
    <Fragment>
      {modalView &&
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction !== "" ? (
        <ReasonByEmployee sign={false} />
      ) : (
        ""
      )}
        {lettterviewShow?(<div>
          {disciplinarySearchData &&
            disciplinarySearchData &&
            disciplinarySearchData !== null &&
            disciplinarySearchData !== undefined &&
            Object.keys(disciplinarySearchData).length !== 0 &&
            disciplinarySearchData.disciplinaryAction !== null &&
            disciplinarySearchData.disciplinaryAction !== undefined &&
            disciplinarySearchData.disciplinaryAction !== "" &&
            disciplinarySearchData.disciplinaryAction.reasonId == 2 ? (
            <ShowCauseNotice sign={false} />
          ) : (
            <NonPerformanceLetter sign={false} />
          )}
        </div>):("")}
      {lettterview ? (
        <div>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== "" &&
          disciplinarySearchData.disciplinaryWarning.reasonId == 2 ? (
            <WarningLetter sign={false} />
          ) : disciplinarySearchData &&
            disciplinarySearchData !== null &&
            disciplinarySearchData !== undefined &&
            Object.keys(disciplinarySearchData).length !== 0 &&
            disciplinarySearchData.disciplinaryWarning !== null &&
            disciplinarySearchData.disciplinaryWarning !== undefined &&
            disciplinarySearchData.disciplinaryWarning !== "" &&
            disciplinarySearchData.disciplinaryWarning.reasonId == 1 ? (
            <NonPerformanceWarningLetter sign={false} />
          ) :<></>}
        </div>
      ) : (
        ""
      )}
       <Modal show={showShowCauseNoticeModal} onHide={handleDocClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {imageViewData !== undefined &&
             Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>

                  <iframe
                  src={
                    imageViewData.data ? imageViewData.data +
                    "#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
                {/* ) : (
                  <img
                  style={{ width: "100%", height: "100%" }}
                  src={imageViewData.data ? imageViewData.data:""}
                />
                )} */}
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
      {/* <Modal
        show={showShowCauseNoticeModal}
        onHide={handleShowCauseLetterCloseLink}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {
          disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" &&
          disciplinarySearchData.disciplinaryAction.reasonId == 2 
          ? (
            <ShowCauseNotice />
          ) : (
            <NonPerformanceLetter />
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={showShowCauseNoticeModalLink1}
        onHide={handleShowCauseLetterCloseLink}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== "" &&
          disciplinarySearchData.disciplinaryWarning.reasonId == 2 
          ? (
            <WarningLetter />
          ) : (
          <NonPerformanceWarningLetter/>
          )}
        </Modal.Body>
      </Modal> */}
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
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.employeePosition}
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
                              Position:
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
                        {showCauseReason === "Misconduct" ? (
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
                        ) : (
                          ""
                        )}
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
                            <label>View Show Cause Notice:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <a onClick={LetterShow}>
                              {" "}
                              <u className="itemResult">
                                View Show Cause Notice
                              </u>
                            </a>
                          </div>
                        </Col>
                      </Row>
                      {state.empRemark !== null &&
                      state.empRemark !== undefined &&
                      state.empRemark !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              {/* <label>Remarks:</label> */}
                              <label>Response to show cause notice:</label>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div>
                              <a onClick={employeeReason}>
                                {" "}
                                <u className="itemResult">
                                  Response to show cause notice
                                </u>
                              </a>
                            </div>
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
                                  Reason for Warning:
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.warningReason}
                                  </label>
                                </label>
                              </div>
                            </Col>
                            {showCauseReason === "Misconduct" ? (
                              ""
                            ) : (
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
                            )}
                          </Row>
                          {showCauseReason === "Misconduct" ? (
                            ""
                          ) : (
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
                                    PIP Start Date:
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {state.warningIssuedDateDW}
                                    </label>
                                  </label>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div>
                                  <label>
                                    PIP End Date:
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {state.pipEndDate}
                                    </label>
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          )}
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
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={2}>
                              <div>
                                <label>View Warning Letter:</label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <a onClick={LetterShow1}>
                                  {" "}
                                  <u className="itemResult">
                                    View Warning Letter
                                  </u>
                                </a>
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
