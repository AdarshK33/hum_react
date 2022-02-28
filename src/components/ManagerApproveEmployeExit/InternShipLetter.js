import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const InternShipLetter = () => {
  const { fetchRelievingLetterData, relivingLetterData, loader } = useContext(
    EmployeeSeparationContext
  );
  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    // setLetterView(false);
  };
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    const infoData = {
      inputRef: inputRef,
      empId: relivingLetterData.employeeId,
      candidateId: 0,
      module: "Separation",
      empName: user.firstName + " " + user.lastName,
      empEmail: "rajasekhar@theretailinsights.com",
      empPhNo: user.phone,
      history: history,
      path: "../employee-separation-listing",
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,470,185,570");
    setShow(false);
  };
  return (
    <Fragment>
      {typeof relivingLetterData !== undefined ? (
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
              <div id="intLetter" ref={inputRef}>
                <p>
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <h5 style={{ textAlign: "center" }}>
                  TO WHOMSOEVER IT MAY CONCERN
                </h5>

                <p>
                  This is to certify that{" "}
                  {relivingLetterData !== undefined &&
                  (relivingLetterData.gender === "male" ||
                    relivingLetterData.gender === "MALE" ||
                    relivingLetterData.gender === "Male")
                    ? `Mr.${relivingLetterData.employeeName}`
                    : ((relivingLetterData.gender === "female" ||
                        relivingLetterData.gender == "FEMALE" ||
                        relivingLetterData.gender == "Female") &&
                        relivingLetterData.maritalStatus === "single") ||
                      relivingLetterData.maritalStatus === "SINGLE" ||
                      relivingLetterData.maritalStatus === "Single"
                    ? `Miss. ${relivingLetterData.employeeName}`
                    : `Mrs.${relivingLetterData.employeeName}`}{" "}
                  has completed internship at {relivingLetterData.company} Pvt
                  Ltd, from <b>{relivingLetterData.dateOfJoining}</b> to{" "}
                  <b>{relivingLetterData.lastWorkingDate}</b> on under the
                  guidance of {relivingLetterData.managerName}.<br />
                  <br />
                  During the period of{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  internship programme with us, we found{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "he"
                    : "she"}{" "}
                  was punctual, hardworking and inquisitive. We wish{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  all the very best for{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  future endeavours.
                </p>
                <br />
                <p>
                  <b>For {relivingLetterData.company} Pvt Ltd,</b>
                </p>
                <p>
                  <b>Authorised Signatory</b>
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            relivingLetterData &&
            Object.keys(relivingLetterData).length &&
            relivingLetterData.employeeId !== null &&
            relivingLetterData.employeeId !== undefined ? (
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

export default InternShipLetter;
