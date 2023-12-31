import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { OnBoardContext } from "../../context/OnBoardState";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import { DocsVerifyContext } from "../../context/DocverificationState";
import moment from "moment";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";


const InsuranceNominationFormLetter = (props) => {
  const { CandidatePersonalInfo, candidatePersonalInfoData } =
    useContext(OnBoardContext);
  const [clickSave, setClickSave] = useState(false);
  const {
    insuranceResponse,
    ExportPDFandUploadInsurance,
    downloadFileOnboard,
    candidateProfileData,
    uploadInsurranceNominationForm,
  } = useContext(DocsVerifyContext);

  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  const ref = React.createRef();
  const inputRef = useRef(null);
  useEffect(() => {
    if (candidateProfileData) {
      CandidatePersonalInfo(candidateProfileData.candidateId);
      console.log(candidatePersonalInfoData, "candidatePersonalInfoData");
    }
  }, [candidateProfileData]);

  const HandleDownloadLetter = () => {
    downloadFileOnboard(insuranceResponse);
  };
  const HandleSaveLetter = () => {
    const doc = new jsPDF();
    //get table html
    const pdfTable = document.getElementById("insurance");
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.createPdf(documentDefinition).open();
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBuffer((buffer) => {
      var blobStore = new Blob([buffer], { type: "application/pdf" });
      blobStore.name = "insurance.pdf";
      const data = {
        dsiType: "insurance",
        fileType: 24,
      };

      ExportPDFandUploadInsurance(
        blobStore,
        0,
        24,
        props.data.candidateId
      );
      setClickSave(true);
        });
   
  };
  console.log(props.data, "props");
  return (
    <Fragment>
      {typeof props !== undefined ? (
        <Fragment>
          <div id="insurance" ref={inputRef}>
            <p className="">
              {" "}
              Date: <b>{moment().format("DD-MM-YYYY")}</b>
            </p>
            <br></br>

            <p>To ,</p>
            <p>
              <b>Human Resource</b>
            </p>
            <p>
              <b>{`(${props.data.companyName})`}</b>
            </p>
            <p>
              <b>Subject : </b>Nominee nomination in case of death for Group
              Personal Accidental & Group Term Life Policy
            </p>
            <div className=" ">
              <p className="mt-5 ">
                {" "}
                Dear{" "}
                <b>
                  {props.data !== undefined &&
                  ((props.data.gender == "Male" ||
                    props.data.gender == "male" ||
                    props.data.gender == "MALE")&& ((props.data.maritalStatus == "single" ||
                    props.data.maritalStatus == "Single" ||
                    props.data.maritalStatus == "SINGLE")||(props.data.maritalStatus == "married" ||
                    props.data.maritalStatus == "Married" ||
                    props.data.maritalStatus == "MARRIED")))
                    ? `Mr.${props.data.employeeName}`
                    : ((props.data.gender == "Female" ||
                        props.data.gender == "female" ||
                        props.data.gender == "FEMALE") &&
                      (props.data.maritalStatus == "single" ||
                        props.data.maritalStatus == "Single" ||
                        props.data.maritalStatus == "SINGLE"))
                    ? `Miss. ${props.data.employeeName}`:
                    ((props.data.gender == "Female" ||
                        props.data.gender == "female" ||
                        props.data.gender == "FEMALE") &&(props.data.maritalStatus == "married" ||
                    props.data.maritalStatus == "Married" ||
                    props.data.maritalStatus == "MARRIED"))?
                    `Mrs.${props.data.employeeName}`
                    : (props.data.gender == "Other" ||
                    props.data.gender == "other" ||
                    props.data.gender == "OTHER") 
                    ?
                    props.data.employeeName 
                    :" "}
                </b>{" "}
              </p>
              <br></br>

              <p>
                I would hereby authorize the nominee to receive the Insurance
                benefits in case of my death towards the Group Personal Accident
                and Group Term Life Policy.
                <br />
                <br />
              </p>
              <p>
                {" "}
                <b> Nominee Name:</b>&nbsp;&nbsp;{props.data.nomineeName}
              </p>
              <p>
                <b>Nominee Date of Birth:</b>&nbsp;&nbsp;
                {moment(props.data.nomineeDateOfBirth).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>Relationship with Nominee:</b>&nbsp;&nbsp;
                {props.data.nomineeRelationship}
              </p>
              <p>
                <b> Thanks,</b>
              </p>
              <br />
              <p> Employee Name:&nbsp;&nbsp;{props.data.employeeName}</p>
              <p>Employee Signature:&nbsp;&nbsp;{}</p>
              <p>
                Employee Aadhaar Number:&nbsp;&nbsp;
                {props.data.employeeAadharNumber}
              </p>
              <div className="float-right "></div>
            </div>
          </div>
          {clickSave ? (
            <Row>
              <Col sm={4}></Col>
              <Col sm={5}>
                <br></br>
                <br></br>
                <button
                  className={"stepperButtons"}
                  onClick={HandleDownloadLetter}
                >
                  Download
                </button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm={4}></Col>
              <Col sm={5}>
                <br></br>
                <br></br>
                <button className={"stepperButtons"} onClick={HandleSaveLetter}>
                  Save
                </button>
              </Col>
            </Row>
          )}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InsuranceNominationFormLetter;
