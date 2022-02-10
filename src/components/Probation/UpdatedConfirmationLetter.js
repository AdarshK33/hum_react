import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { ProbationContext } from "../../context/ProbationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const ConfirmationLetter1 = () => {
  const {
    updateProbation,
    ViewProbationDataById,
    probationData,
    cnfLetterData,
    loader,
    setLetterView,
    empId,
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
      empId: cnfLetterData.empId,
      empName: user.firstName + " " + user.lastName,
      empEmail: "rajasekhar@theretailinsights.com",
      empPhNo: user.phone,
      history: history,
      path: "../probation",
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,380,185,480");
    setShow(false);
  };
  return (
    <Fragment>
      {typeof cnfLetterData !== undefined ? (
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
              <div id="cnfLetter" ref={inputRef}>
                <div>
                  <p className="">
                    <b>Date: {moment().format("DD-MM-YYYY")}</b>
                  </p>
                  <br></br>
                  <p>
                    To Ms./Mr. &nbsp;<b>{cnfLetterData.empName}</b>
                  </p>
                  <p>Address :</p>
                  <p>
                    <b>{cnfLetterData.address}</b>
                  </p>
                  <p className="mt-5 ">
                    {" "}
                    <b>Dear &nbsp;{cnfLetterData.empName},</b>{" "}
                  </p>
                  <p>
                    <b> Sub: Confirmation of Employment</b>
                  </p>

                  <div className=" ">
                    <p>
                      We are glad to inform you that the management is pleased
                      to confirm you in service with effect from{" "}
                      <b>{cnfLetterData.confirmationDate}</b>. All the other
                      terms and conditions of your appointment letter dated{" "}
                      shall remain same.
                      <br />
                      Please sign the copy of this letter as receipt of
                      acceptance.
                      <br />
                      <br />
                      Thanking You,
                    </p>
                    <p className="mt-5 ">
                      <b>For {cnfLetterData.company} Pvt Ltd,</b>
                    </p>
                    <div className="float-right "></div>
                  </div>
                </div>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            cnfLetterData &&
            Object.keys(cnfLetterData).length &&
            cnfLetterData.empId !== null &&
            cnfLetterData.empId !== undefined ? (
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

export default ConfirmationLetter1;
