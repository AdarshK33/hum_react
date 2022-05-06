import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import PartTimeOfferLetter from "../Offers/partTimeOfferLetter";
import PermanentOfferLetter from "./permanentOfferLetter";
import InternOfferLetter from "./internOfferLetter";
import LocalExpatOfferLetter from "./localExpatOfferLetter";
import { Link } from "react-router-dom";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

const GenerateOfferLetter = () => {
  const [showModal, setShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [offerButtonEnable, setOfferButtonEnable] = useState(false);

  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
    finalSubmitOfferLetter,
    candidateData,
    workInfoViewData,
    lettterview,
    setViewLetter,
  } = useContext(OfferContext);

  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log("candidateData useeffect", candidateData);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      Object.keys(candidateData).length !== 0 &&
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined &&
      Object.keys(candidateData.candidateInformation).length !== 0 &&
      candidateData.workInformation !== "" &&
      candidateData.workInformation !== null &&
      candidateData.workInformation !== undefined &&
      Object.keys(candidateData.workInformation).length !== 0 &&
      candidateData.remuneration !== null &&
      candidateData.remuneration !== undefined &&
      Object.keys(candidateData.remuneration).length !== 0
    ) {
      setOfferButtonEnable(true);
      //changes
      let remunerationDataInfo =
        candidateData !== null &&
        candidateData !== undefined &&
        candidateData.remuneration;
      if (
        (candidateData.workInformation.contractType === "Parttime" &&
          remunerationDataInfo.fixedGross > 400) ||
        (candidateData.workInformation.contractType === "Fulltime" &&
          remunerationDataInfo.fixedGross < 18000) ||
        (candidateData.workInformation.contractType === "Local Expat" &&
          remunerationDataInfo.fixedGross < 25000)
      ) {
        console.log("in side yes", remunerationDataInfo.fixedGross);
        setOfferButtonEnable(false);
      } else {
        setOfferButtonEnable(true);
      }
      //changes
    } else {
      setOfferButtonEnable(false);
    }
  }, [candidateData]);

  const offerLetterClick = () => {
    // console.log("offer candidate id", createCandidateResponse.candidateId);
    console.log("candidateData id", candidateData);
    generateOfferLetter(candidateData.candidateInformation.candidateId);
    console.log("offer letter response data", offerLetterData);
    setViewLetter(true);
    handleShow();
  };
  const handleShow = () => {
    console.log("inside show moodal");
    // if (offerLetterData.length > 0) {
    setShow(true);
    console.log("offer letter response", offerLetterData);
    // }
  };
  const ref = React.createRef();
  const inputRef = useRef(null);
  const saveOfferLetter = () => {
    setSaveLetter(true);
    const pdfTable = inputRef.current;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    var last_page = null;
    const documentDefinition = {
      content: html,
      footer: function (currentPage, pageCount) {
        last_page = pageCount;
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
    console.log("offer letter response sig", offerLetterData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const submitOfferLetter = () => {
    console.log("offer Letter id", createCandidateResponse.candidateId);
    if (
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined
    ) {
      console.log(
        "offer Letter id",
        candidateData.candidateInformation.candidateId
      );
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      finalSubmitOfferLetter(candidateData.candidateInformation.candidateId);
    }
  };

  const previewOfferLetter = () => {
    if (
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined
    ) {
      generateOfferLetter(candidateData.candidateInformation.candidateId);
      console.log("offer letter response data", offerLetterData);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  return (
    <Fragment>
      {lettterview ? (
        <div>
          {(previewLetter || showModal) &&
          offerLetterData &&
          offerLetterData.contractType !== undefined &&
          offerLetterData.contractType !== null &&
          offerLetterData.contractType === "Fulltime" ? (
            <PermanentOfferLetter />
          ) : (previewLetter || showModal) &&
            offerLetterData &&
            offerLetterData.contractType !== undefined &&
            offerLetterData.contractType !== null &&
            offerLetterData.contractType === "Parttime" ? (
            <PartTimeOfferLetter />
          ) : (previewLetter || showModal) &&
            offerLetterData &&
            offerLetterData.contractType !== undefined &&
            offerLetterData.contractType !== null &&
            offerLetterData.contractType === "Local Expat" ? (
            <LocalExpatOfferLetter />
          ) : previewLetter || showModal ? (
            <InternOfferLetter />
          ) : null}
        </div>
      ) : null}

      {offerButtonEnable === true ? (
        <Fragment>
          <Form onSubmit={submitHandler}>
            {
              !saveLetter ? (
                <Row>
                  <Col sm={5}></Col>
                  <Col sm={2}>
                    <Button type="button" onClick={offerLetterClick}>
                      Generate Offer Letter
                    </Button>
                  </Col>
                </Row>
              ) : null
              // <div className="preview-section">
              //   <Button type="button" onClick={previewOfferLetter}>
              //     Preview Offer Letter
              //   </Button>
              //   <br></br>
              //   <br></br>
              //   <img src={calendarImage} alt="calendar" width="200px" />
              //   <br></br>
              //   <br></br>
              //   {letterSent ? (
              //     ""
              //   ) : (
              //     <Button
              //       type="button"
              //       onClick={submitOfferLetter}
              //       style={{ textAlign: "center" }}
              //     >
              //       Submit
              //     </Button>
              //   )}
              // </div>
            }
          </Form>
          {/* {submitLetter ? (
              <Modal.Body>
                <div className="offer-letter-message ">
                  <p>Offer Letter Sent to Candidate</p>
                  <br></br>
                  <Link to="/offer-release-list" className="text-center">
                    <Button type="button" onClick={handleClose}>
                      Close
                    </Button>
                  </Link>
                </div>
              </Modal.Body>
            ) :  */}
        </Fragment>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          Please Enter all the details to generate offer letter
        </p>
      )}
    </Fragment>
  );
};

export default GenerateOfferLetter;
