import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { ProbationContext } from "../../context/ProbationState";

const PdfView = (props) => {
  const { cnfLetterData, loader, setLetterPreView, ShowPreViewLetterModel } =
    useContext(ProbationContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  console.log("Show->", show);
  const { imageData, downloadFile } = useContext(DocsVerifyContext);
  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setLetterPreView(false);
  };
  const HandleSaveLetter = () => {
    if (imageData !== "" && imageData !== null && imageData !== undefined) {
      downloadFile(imageData);
      console.log("imageData-->", imageData);
    }
    setShow(false);
    setSaveLetter(true);
    setLetterPreView(false);
  };
  return (
    <Fragment>
      {true ? (
        // {true ? (
        <Modal show={ShowPreViewLetterModel} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {imageData !== "" &&
            imageData !== null &&
            imageData !== undefined ? (
              <div>
                <img
                  src={
                    "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                    imageData
                  }
                  //   height={100}
                  //   width={100}
                />
              </div>
            ) : (
              ""
            )}

            {!saveLetter ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Download
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

export default PdfView;
