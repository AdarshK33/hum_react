import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { ProbationContext } from "../../context/ProbationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const ExtensionLetter1 = () => {
  const {
    updateProbation,
    ViewProbationDataById,
    probationData,
    extensionLetterData,
    loader,
    setLetterView,
    empId,
    ViewExtensionLetter,
  } = useContext(ProbationContext);
  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setLetterView(false);
  };
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    const InfoData = {
      company: probationData.company,
      costCentre: probationData.costCentre,
      dateOfJoining: probationData.dateOfJoining,
      dueDays: probationData.dueDays,
      emailId: probationData.emailId,
      empId: probationData.empId,
      empName: probationData.empName,
      probationConfirmationDate: probationData.probationConfirmationDate,
      probationConfirmationLetter: probationData.probationConfirmationLetter,
      probationExtensionEndDate: probationData.probationExtensionEndDate,
      probationExtensionPeriod: probationData.probationExtensionPeriod,
      probationExtensionStartDate: null,
      probationId: probationData.probationId,
      reason: probationData.reason,
      probationPeriod: probationData.probationPeriod,
      remarks: probationData.remarks,
      reminderSent: probationData.reminderSent,
      status:
        probationData.status === 5 ? 1 : probationData.status === 6 ? 2 : 3,
    };

    console.log("InfoData", InfoData);
    updateProbation(InfoData, probationData.empId);
    ViewProbationDataById(empId);
    const infoData = {
      inputRef: inputRef,
      empId: extensionLetterData.empId,
      candidateId: 0,
      module: "Probation",
      empName: user.firstName + " " + user.lastName,
      empEmail: "amit.kumar@qsometech.com",
      empPhNo: user.phone,
      history: history,
      path: "../probation",
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,260,185,360");
    ViewExtensionLetter(probationData.empId);
    setShow(false);
  };
  return (
    <Fragment>
      {typeof extensionLetterData !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
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
              <div id="extLetter" ref={inputRef}>
                <p> Date: {moment().format("DD-MM-YYYY")}</p>
                <br></br>
                <p>
                  <b>To,</b>
                </p>
                <p>
                  <b>Name: &nbsp;{extensionLetterData.empName}</b>
                </p>
                <p>
                  <b>EmployeeId: &nbsp;{extensionLetterData.empId}</b>
                </p>
                {/* <p>Designation:{relivingLetterData.designation}</p> */}
                <br></br>
                <p className="mt-5 ">
                  {" "}
                  Dear &nbsp;<b>{extensionLetterData.empName},</b>{" "}
                </p>
                <br />
                <h5 style={{ textAlign: "center" }}>
                  {" "}
                  <u>LETTER OF EXTENSION OF PROBATIONARY PERIOD </u>
                </h5>

                <div className=" ">
                  <p>
                    Based on the probation assessment, we regret to inform you
                    that your performance is unsatisfactory and we are unable to
                    confirm your employment at this point. We have decided to
                    extend your probationary period for a further{" "}
                    <b>{extensionLetterData.probationExtensionPeriod}</b> months
                    starting from{" "}
                    <b>{extensionLetterData.probationStartDate}</b> to{" "}
                    <b>{extensionLetterData.probationEndDate}</b>.
                    <br />
                    Within this period, you are advised to improve your skills
                    and performance and to work closely with your manager for
                    guidance and feedback.
                    <br />
                    At the end of this period, your performance will be
                    appraised and the final decision regarding your employment
                    will be made in view of your performance in the period.
                    <br />
                    However, if your performance is still unsatisfactory, the
                    company may decide to terminate your services due to
                    non-confirmation.
                    <br />
                    All the other terms and conditions of your appointment
                    letter dated{" "}
                    <b>{extensionLetterData.appointmentLetterDate}</b>, shall
                    remain the same.
                    <br />
                    <br />
                    Please sign the copy of this letter as receipt of
                    acceptance.
                    <br />
                    <br />
                    Yours Sincerely,
                    <br />
                  </p>
                  <p className="mt-5 ">
                    <b>For {extensionLetterData.company} Pvt Ltd,</b>
                  </p>
                  <div className="float-right "></div>
                </div>
              </div>
            )}
            {!saveLetter && !loader ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ExtensionLetter1;
